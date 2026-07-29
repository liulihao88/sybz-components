<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { Download, FullScreen, RefreshLeft, RefreshRight, ZoomIn, ZoomOut } from '@element-plus/icons-vue'
import DOMPurify from 'dompurify'
import { ElIcon, ElImageViewer } from 'element-plus'
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
import type { MarkdownEmits, MarkdownHeading, MarkdownProps } from './types'

let markdownInstanceSeed = 0

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
  imagePreview: true,
  emptyText: '',
})

const emit = defineEmits<MarkdownEmits>()

const rootRef = ref<HTMLElement | null>(null)
const renderedHtml = ref('')
const headings = ref<MarkdownHeading[]>([])
const previewVisible = ref(false)
const previewUrls = ref<string[]>([])
const previewInitialIndex = ref(0)
const isClientMounted = ref(false)
const instanceId = ++markdownInstanceSeed
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
  if (!value.trim()) return ''
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
  const canRenderHtmlExtensions = !props.sanitize || isClientMounted.value
  const md = new MarkdownIt({
    html: props.allowHtml && canRenderHtmlExtensions,
    breaks: props.breaks,
    linkify: props.linkify,
    typographer: props.typographer,
    highlight(code, language) {
      if (!props.highlight || !language || !Prism.languages[language]) return escapeHtml(code)
      return Prism.highlight(code, Prism.languages[language], language)
    },
  })

  if (canRenderHtmlExtensions) md.use(markdownItAttrs)
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
    if (srcIndex >= 0) {
      const src = resolveUrl(tokens[index].attrs![srcIndex][1])
      if (!src) return escapeHtml(tokens[index].content)
      tokens[index].attrs![srcIndex][1] = src
    }
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
        const { svg } = await mermaid.render(`s-markdown-mermaid-${instanceId}-${version}-${index}`, source)
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
  previewVisible.value = false
  try {
    const { md, currentHeadings } = createMarkdown()
    const html = sanitizeHtml(md.render(props.source || ''))
    if (version !== renderVersion) return
    headings.value = currentHeadings
    renderedHtml.value = html
    await nextTick()
    await enhanceMermaid(version)
    if (version !== renderVersion) return
    enhanceImages()
    const finalHtml = rootRef.value?.querySelector<HTMLElement>('.s-markdown__content')?.innerHTML || html
    renderedHtml.value = finalHtml
    emit('rendered', { html: finalHtml, headings: currentHeadings })
  } catch (error) {
    emit('error', error)
  }
}

const getPreviewImages = () =>
  [...(rootRef.value?.querySelectorAll<HTMLImageElement>('.s-markdown__content img') || [])].filter(
    (image) =>
      image.getAttribute('src')?.trim() &&
      !image.classList.contains('is-image-load-error') &&
      (!image.complete || image.naturalWidth > 0),
  )

const updateImagePreviewState = (image: HTMLImageElement) => {
  const isLoadError = image.complete && image.naturalWidth === 0
  image.classList.toggle('is-image-load-error', isLoadError)

  if (isLoadError) {
    image.removeAttribute('tabindex')
    image.removeAttribute('role')
    image.removeAttribute('aria-label')
    return
  }

  image.tabIndex = 0
  image.setAttribute('role', 'button')
  image.setAttribute('aria-label', `预览图片：${image.alt || '图片'}`)
}

const handleImageLoadState = (event: Event) => {
  if (!props.imagePreview) return
  const image = (event.target as HTMLElement).closest<HTMLImageElement>('.s-markdown__content img')
  if (image) updateImagePreviewState(image)
}

const enhanceImages = () => {
  if (!props.imagePreview) return
  const images = rootRef.value?.querySelectorAll<HTMLImageElement>('.s-markdown__content img') || []
  Array.from(images).forEach(updateImagePreviewState)
}

const openImagePreview = (image: HTMLImageElement) => {
  const images = getPreviewImages()
  const initialIndex = images.indexOf(image)
  if (initialIndex < 0) return false
  previewUrls.value = images.map((item) => item.currentSrc || item.src)
  previewInitialIndex.value = initialIndex
  previewVisible.value = true
  return true
}

const getImageFileName = (url: string, index: number) => {
  try {
    const parsedUrl = new URL(url, window.location.href)
    if (!['http:', 'https:', 'file:'].includes(parsedUrl.protocol)) return `image-${index + 1}`
    const pathname = parsedUrl.pathname
    const fileName = decodeURIComponent(pathname.split('/').pop() || '').replace(/[\\/:*?"<>|]/g, '-')
    if (fileName) return fileName
  } catch {
    // 使用兜底文件名
  }
  return `image-${index + 1}`
}

const triggerImageDownload = (url: string, fileName: string, openInNewTab = false) => {
  const link = document.createElement('a')
  link.href = url
  link.download = fileName
  if (openInNewTab) {
    link.target = '_blank'
    link.rel = 'noopener noreferrer'
  }
  document.body.appendChild(link)
  link.click()
  link.remove()
}

const downloadPreviewImage = async (index: number) => {
  const url = previewUrls.value[index]
  if (!url) return

  const fileName = getImageFileName(url, index)
  try {
    const response = await fetch(url)
    if (!response.ok) throw new Error(`图片下载失败：${response.status}`)
    const objectUrl = URL.createObjectURL(await response.blob())
    triggerImageDownload(objectUrl, fileName)
    window.setTimeout(() => URL.revokeObjectURL(objectUrl), 0)
  } catch {
    // 跨域图片未开放 CORS 时，交由浏览器和图片服务器直接处理下载。
    triggerImageDownload(url, fileName, true)
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
  const image = target.closest<HTMLImageElement>('.s-markdown__content img')
  if (props.imagePreview && image && openImagePreview(image)) {
    event.preventDefault()
    return
  }
  const anchor = target.closest<HTMLAnchorElement>('a[href]')
  if (anchor) emit('linkClick', { event, href: anchor.href })
}

const handleKeydown = (event: KeyboardEvent) => {
  if (!props.imagePreview || (event.key !== 'Enter' && event.key !== ' ')) return
  const image = (event.target as HTMLElement).closest<HTMLImageElement>('.s-markdown__content img')
  if (image && openImagePreview(image)) event.preventDefault()
}

const exposed = computed(() => ({ html: renderedHtml.value, headings: headings.value }))
defineExpose({ render, renderedHtml, headings, state: exposed })

watch(() => ({ ...props }), render, { immediate: true, deep: true })
onMounted(() => {
  isClientMounted.value = true
  render()
})
onBeforeUnmount(() => {
  ++renderVersion
  previewVisible.value = false
})
</script>

<template>
  <div
    ref="rootRef"
    class="s-markdown"
    :class="{ 'is-image-preview-enabled': imagePreview }"
    @click="handleClick"
    @keydown="handleKeydown"
    @load.capture="handleImageLoadState"
    @error.capture="handleImageLoadState"
  >
    <!-- 输出在赋值前默认经过 DOMPurify；关闭 sanitize 需要由调用方明确选择。 -->
    <!-- eslint-disable-next-line vue/no-v-html -->
    <div v-if="renderedHtml" class="s-markdown__content" v-html="renderedHtml"></div>
    <div v-else-if="emptyText" class="s-markdown__empty">{{ emptyText }}</div>
    <el-image-viewer
      v-if="previewVisible"
      :url-list="previewUrls"
      :initial-index="previewInitialIndex"
      teleported
      hide-on-click-modal
      @close="previewVisible = false"
    >
      <template #toolbar="{ actions, reset, activeIndex }">
        <button
          class="s-markdown__viewer-action"
          type="button"
          title="缩小"
          aria-label="缩小"
          @click="actions('zoomOut')"
        >
          <el-icon><ZoomOut /></el-icon>
        </button>
        <button
          class="s-markdown__viewer-action"
          type="button"
          title="放大"
          aria-label="放大"
          @click="actions('zoomIn')"
        >
          <el-icon><ZoomIn /></el-icon>
        </button>
        <i class="el-image-viewer__actions__divider"></i>
        <button
          class="s-markdown__viewer-action"
          type="button"
          title="切换适应模式"
          aria-label="切换适应模式"
          @click="reset"
        >
          <el-icon><FullScreen /></el-icon>
        </button>
        <i class="el-image-viewer__actions__divider"></i>
        <button
          class="s-markdown__viewer-action"
          type="button"
          title="逆时针旋转"
          aria-label="逆时针旋转"
          @click="actions('anticlockwise')"
        >
          <el-icon><RefreshLeft /></el-icon>
        </button>
        <button
          class="s-markdown__viewer-action"
          type="button"
          title="顺时针旋转"
          aria-label="顺时针旋转"
          @click="actions('clockwise')"
        >
          <el-icon><RefreshRight /></el-icon>
        </button>
        <i class="el-image-viewer__actions__divider"></i>
        <button
          class="s-markdown__viewer-action"
          type="button"
          title="下载图片"
          aria-label="下载图片"
          @click="downloadPreviewImage(activeIndex)"
        >
          <el-icon><Download /></el-icon>
        </button>
      </template>
    </el-image-viewer>
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
.s-markdown.is-image-preview-enabled :deep(.s-markdown__content img) {
  cursor: zoom-in;
}
.s-markdown.is-image-preview-enabled :deep(.s-markdown__content img.is-image-load-error) {
  cursor: default;
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
.s-markdown__viewer-action {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 0;
  background: transparent;
  color: inherit;
  cursor: pointer;
  font-size: inherit;
  padding: 0;
}
</style>
