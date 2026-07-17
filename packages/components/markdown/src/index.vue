<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, ref, watch } from 'vue'
import DOMPurify from 'dompurify'
import MarkdownIt from 'markdown-it'
import markdownItAnchor from 'markdown-it-anchor'
import markdownItAttrs from 'markdown-it-attrs'
import markdownItDeflist from 'markdown-it-deflist'
import markdownItFootnote from 'markdown-it-footnote'
import markdownItIns from 'markdown-it-ins'
import markdownItMark from 'markdown-it-mark'
import markdownItSub from 'markdown-it-sub'
import markdownItSup from 'markdown-it-sup'
import markdownItTaskLists from 'markdown-it-task-lists'
import markdownItTexmath from 'markdown-it-texmath'
import katex from 'katex'
import Prism from 'prismjs'
import 'prismjs/components/prism-markup-templating'
import 'prismjs/components/prism-javascript'
import 'prismjs/components/prism-typescript'
import 'prismjs/components/prism-jsx'
import 'prismjs/components/prism-tsx'
import 'prismjs/components/prism-bash'
import 'prismjs/components/prism-json'
import 'prismjs/components/prism-css'
import 'prismjs/components/prism-scss'
import 'prismjs/components/prism-python'
import 'prismjs/components/prism-java'
import 'prismjs/components/prism-sql'
import 'prismjs/components/prism-yaml'
import 'prismjs/components/prism-markdown'
import type { MarkdownHeading, MarkdownLinkClickPayload, MarkdownProps, MarkdownRenderPayload } from './types'

defineOptions({ name: 'SMarkdown' })

const props = withDefaults(defineProps<MarkdownProps>(), {
  source: '',
  allowHtml: false,
  sanitize: true,
  breaks: false,
  linkify: true,
  typographer: true,
  highlight: true,
  copyCode: true,
  mermaid: true,
  math: true,
  headingAnchors: true,
  externalLinks: true,
  baseUrl: '',
  imageLazy: true,
  emptyText: '',
})

const emit = defineEmits<{
  rendered: [payload: MarkdownRenderPayload]
  error: [error: unknown]
  copy: [code: string]
  linkClick: [payload: MarkdownLinkClickPayload]
}>()

const rootRef = ref<HTMLElement | null>(null)
const renderedHtml = ref('')
const headings = ref<MarkdownHeading[]>([])
let renderVersion = 0

const slugify = (text: string) =>
  text
    .trim()
    .toLowerCase()
    .replace(/<[^>]+>/g, '')
    .replace(/[^\p{Letter}\p{Number}\s-]/gu, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')

const resolveUrl = (value: string) => {
  if (!props.baseUrl || /^(?:[a-z]+:|#|\/\/)/i.test(value)) return value
  try {
    return new URL(value, props.baseUrl).href
  } catch {
    return value
  }
}

const escapeHtml = (value: string) =>
  value.replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]!)

const createMarkdown = () => {
  const currentHeadings: MarkdownHeading[] = []
  const md = new MarkdownIt({
    html: props.allowHtml,
    breaks: props.breaks,
    linkify: props.linkify,
    typographer: props.typographer,
    highlight(code, language) {
      if (!props.highlight || !language || !Prism.languages[language]) return escapeHtml(code)
      return Prism.highlight(code, Prism.languages[language], language)
    },
  })

  md.use(markdownItAttrs)
  md.use(markdownItDeflist)
  md.use(markdownItFootnote)
  md.use(markdownItIns)
  md.use(markdownItMark)
  md.use(markdownItSub)
  md.use(markdownItSup)
  md.use(markdownItTaskLists, { enabled: true, label: true, labelAfter: true })
  if (props.math) md.use(markdownItTexmath, { engine: katex, delimiters: 'dollars' })
  if (props.headingAnchors) {
    md.use(markdownItAnchor, {
      slugify,
      callback(token: { tag: string; attrGet: (name: string) => string | null }, info: { title: string }) {
        currentHeadings.push({ level: Number(token.tag.slice(1)), text: info.title, slug: token.attrGet('id') || '' })
      },
    })
  }

  const defaultFence = md.renderer.rules.fence!
  md.renderer.rules.fence = (tokens, index, options, env, self) => {
    const token = tokens[index]
    const language = token.info.trim().split(/\s+/)[0]
    if (props.mermaid && language === 'mermaid') {
      return `<div class="s-markdown__mermaid" data-mermaid-source="${encodeURIComponent(token.content)}"></div>`
    }
    const rendered = defaultFence(tokens, index, options, env, self)
    if (!props.copyCode) return rendered
    return `<div class="s-markdown__code"><button class="s-markdown__copy" type="button" data-copy-code aria-label="复制代码" title="复制代码">复制</button>${rendered}</div>`
  }

  const defaultLinkOpen =
    md.renderer.rules.link_open || ((tokens, index, options, _env, self) => self.renderToken(tokens, index, options))
  md.renderer.rules.link_open = (tokens, index, options, env, self) => {
    const hrefIndex = tokens[index].attrIndex('href')
    if (hrefIndex >= 0) {
      const href = resolveUrl(tokens[index].attrs![hrefIndex][1])
      tokens[index].attrs![hrefIndex][1] = href
      if (props.externalLinks && /^https?:\/\//i.test(href)) {
        tokens[index].attrSet('target', '_blank')
        tokens[index].attrSet('rel', 'noopener noreferrer')
      }
    }
    return defaultLinkOpen(tokens, index, options, env, self)
  }

  const defaultImage = md.renderer.rules.image!
  md.renderer.rules.image = (tokens, index, options, env, self) => {
    const srcIndex = tokens[index].attrIndex('src')
    if (srcIndex >= 0) tokens[index].attrs![srcIndex][1] = resolveUrl(tokens[index].attrs![srcIndex][1])
    if (props.imageLazy) {
      tokens[index].attrSet('loading', 'lazy')
      tokens[index].attrSet('decoding', 'async')
    }
    return defaultImage(tokens, index, options, env, self)
  }

  return { md, currentHeadings }
}

const sanitizeHtml = (html: string) => {
  if (!props.sanitize || typeof window === 'undefined') return html
  return DOMPurify.sanitize(html, {
    ADD_ATTR: ['target', 'data-copy-code', 'data-mermaid-source'],
  })
}

const enhanceMermaid = async (version: number) => {
  const container = rootRef.value
  const blocks = container?.querySelectorAll<HTMLElement>('.s-markdown__mermaid')
  if (!blocks?.length) return
  try {
    const { default: mermaid } = await import('mermaid')
    if (version !== renderVersion) return
    mermaid.initialize({ startOnLoad: false, securityLevel: 'strict', theme: 'default' })
    await Promise.all(
      [...blocks].map(async (block, index) => {
        const source = decodeURIComponent(block.dataset.mermaidSource || '')
        const { svg } = await mermaid.render(`s-markdown-mermaid-${version}-${index}`, source)
        // Mermaid strict 模式已处理图表源码；再次按 HTML 过滤会删除 SVG foreignObject 中的文字。
        if (version === renderVersion && block.isConnected) block.innerHTML = svg
      }),
    )
  } catch (error) {
    blocks.forEach((block) => block.classList.add('is-error'))
    emit('error', error)
  }
}

const render = async () => {
  const version = ++renderVersion
  try {
    const { md, currentHeadings } = createMarkdown()
    const html = sanitizeHtml(md.render(props.source || ''))
    if (version !== renderVersion) return
    headings.value = currentHeadings
    renderedHtml.value = html
    await nextTick()
    await enhanceMermaid(version)
    if (version === renderVersion) emit('rendered', { html, headings: currentHeadings })
  } catch (error) {
    emit('error', error)
  }
}

const handleClick = async (event: MouseEvent) => {
  const target = event.target as HTMLElement
  const copyButton = target.closest<HTMLElement>('[data-copy-code]')
  if (copyButton) {
    const code = copyButton.parentElement?.querySelector('code')?.textContent || ''
    try {
      await navigator.clipboard.writeText(code)
      copyButton.textContent = '已复制'
      window.setTimeout(() => (copyButton.textContent = '复制'), 1200)
      emit('copy', code)
    } catch (error) {
      emit('error', error)
    }
    return
  }
  const anchor = target.closest<HTMLAnchorElement>('a[href]')
  if (anchor) emit('linkClick', { event, href: anchor.href })
}

const exposed = computed(() => ({ html: renderedHtml.value, headings: headings.value }))
defineExpose({ render, renderedHtml, headings, state: exposed })

watch(() => ({ ...props }), render, { immediate: true, deep: true })
onBeforeUnmount(() => ++renderVersion)
</script>

<template>
  <div ref="rootRef" class="s-markdown" @click="handleClick">
    <!-- 输出在赋值前默认经过 DOMPurify；关闭 sanitize 需要由调用方明确选择。 -->
    <!-- eslint-disable-next-line vue/no-v-html -->
    <div v-if="renderedHtml" class="s-markdown__content" v-html="renderedHtml"></div>
    <div v-else-if="emptyText" class="s-markdown__empty">{{ emptyText }}</div>
  </div>
</template>

<style scoped lang="scss">
.s-markdown {
  color: var(--el-text-color-primary);
  font-size: 14px;
  line-height: 1.75;
  overflow-wrap: anywhere;
}
.s-markdown :deep(h1),
.s-markdown :deep(h2),
.s-markdown :deep(h3),
.s-markdown :deep(h4),
.s-markdown :deep(h5),
.s-markdown :deep(h6) {
  color: var(--el-text-color-primary);
  line-height: 1.35;
  margin: 1.4em 0 0.65em;
  font-weight: 600;
  scroll-margin-top: 16px;
}
.s-markdown :deep(h1) {
  font-size: 2em;
  border-bottom: 1px solid var(--el-border-color-lighter);
  padding-bottom: 0.3em;
}
.s-markdown :deep(h2) {
  font-size: 1.5em;
  border-bottom: 1px solid var(--el-border-color-lighter);
  padding-bottom: 0.3em;
}
.s-markdown :deep(h3) {
  font-size: 1.25em;
}
.s-markdown :deep(p),
.s-markdown :deep(ul),
.s-markdown :deep(ol),
.s-markdown :deep(blockquote),
.s-markdown :deep(table) {
  margin: 0 0 1em;
}
.s-markdown :deep(ul),
.s-markdown :deep(ol) {
  padding-left: 2em;
}
.s-markdown :deep(a) {
  color: var(--el-color-primary);
  text-decoration: none;
}
.s-markdown :deep(a:hover) {
  text-decoration: underline;
}
.s-markdown :deep(blockquote) {
  border-left: 4px solid var(--el-color-primary-light-5);
  color: var(--el-text-color-secondary);
  padding: 0.6em 1em;
  background: var(--el-fill-color-lighter);
}
.s-markdown :deep(blockquote > :last-child) {
  margin-bottom: 0;
}
.s-markdown :deep(img),
.s-markdown :deep(video) {
  display: block;
  max-width: 100%;
  height: auto;
}
.s-markdown :deep(hr) {
  border: 0;
  border-top: 1px solid var(--el-border-color);
  margin: 1.5em 0;
}
.s-markdown :deep(code) {
  border-radius: 4px;
  background: var(--el-fill-color-light);
  padding: 0.15em 0.35em;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  font-size: 0.9em;
}
.s-markdown :deep(pre) {
  margin: 0 0 1em;
  overflow: auto;
  border-radius: 6px;
  background: #1f2329;
  padding: 16px;
  color: #e6edf3;
}
.s-markdown :deep(pre code) {
  background: transparent;
  padding: 0;
  color: inherit;
}
.s-markdown :deep(.s-markdown__code) {
  position: relative;
}
.s-markdown :deep(.s-markdown__copy) {
  position: absolute;
  z-index: 1;
  top: 8px;
  right: 8px;
  border: 1px solid #ffffff33;
  border-radius: 4px;
  background: #ffffff14;
  color: #fff;
  cursor: pointer;
  padding: 3px 8px;
  font-size: 12px;
}
.s-markdown :deep(table) {
  display: block;
  width: max-content;
  min-width: 100%;
  max-width: 100%;
  overflow-x: auto;
  border-collapse: collapse;
}
.s-markdown :deep(th),
.s-markdown :deep(td) {
  border: 1px solid var(--el-border-color);
  padding: 8px 12px;
  text-align: left;
}
.s-markdown :deep(th) {
  background: var(--el-fill-color-light);
  font-weight: 600;
}
.s-markdown :deep(.task-list-item) {
  list-style: none;
}
.s-markdown :deep(.task-list-item-checkbox) {
  margin: 0 0.5em 0 -1.5em;
}
.s-markdown :deep(.footnotes) {
  border-top: 1px solid var(--el-border-color);
  color: var(--el-text-color-secondary);
  font-size: 0.9em;
  margin-top: 2em;
}
.s-markdown :deep(.katex-display),
.s-markdown :deep(.s-markdown__mermaid) {
  overflow-x: auto;
  padding: 8px 0;
  text-align: center;
}
.s-markdown :deep(.s-markdown__mermaid.is-error::before) {
  content: 'Mermaid 图表渲染失败';
  color: var(--el-color-danger);
}
.s-markdown__empty {
  color: var(--el-text-color-placeholder);
  padding: 24px 0;
  text-align: center;
}
</style>
