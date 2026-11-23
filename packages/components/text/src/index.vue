<template>
  <component
    :is="rootComponent"
    class="s-text"
    :class="[
      's-text--' + mergedProps.theme,
      {
        's-text--block': needsInlineBlock,
        's-text--clamp': clamped,
        's-text--gradient': hasGradient,
        's-text--unselectable': mergedProps.unselectable,
        's-text--code': isCode,
        's-mark': mergedProps.mark,
        [`s-mark--${mergedProps.theme}`]: mergedProps.mark && !!markTheme,
      },
    ]"
    :type="codeTypeAttr"
    :style="[textStyle, style, gradientStyle]"
  >
    <RichTextContent v-if="mergedProps.dangerouslyUseHTMLString" />
    <slot v-else />
  </component>
</template>

<script setup lang="ts">
import { computed, Fragment, h, isVNode, Text, useSlots, type VNode } from 'vue'
import { resolveStyleColor, resolveThemeColor, useStyleProps } from '@/hooks/useStyleProps'
import useGlobalComponentConfig from '@/hooks/useGlobalComponentConfig'
import type { STextProps } from './types'
import { createRichTextNodes } from '@/components/utils/safeHtml'

defineOptions({ name: 'SText' })

const props = withDefaults(defineProps<STextProps>(), {
  theme: 'default',
  type: 'default',
  lineClamp: 0,
  italic: false,
  mark: false,
  code: false,
  unselectable: false,
  dangerouslyUseHTMLString: true,
})
const mergedProps = useGlobalComponentConfig('text', props)
const slots = useSlots()
function renderRichNode(node: VNode | string): (VNode | string)[] {
  if (typeof node === 'string' || node.type === Text) {
    const result = createRichTextNodes(typeof node === 'string' ? node : String(node.children ?? ''), {
      theme: mergedProps.value.theme,
    })
    return typeof result === 'string' ? [result] : result
  }
  if (node.type === Fragment && Array.isArray(node.children)) {
    return node.children.flatMap((child) => (typeof child === 'string' || isVNode(child) ? renderRichNode(child) : []))
  }
  return [node]
}
const RichTextContent = () => h(Fragment, null, (slots.default?.() ?? []).flatMap(renderRichNode))
const { style, hasBlockOnlyStyleProps } = useStyleProps()
const clamped = computed(() => Number.isInteger(mergedProps.value.lineClamp) && mergedProps.value.lineClamp > 0)

/** 行内标签：纵向内外边距和宽高在这些标签上不生效，需要自动补 display: inline-block */
const INLINE_TAGS = new Set([
  'a',
  'abbr',
  'b',
  'bdi',
  'bdo',
  'cite',
  'code',
  'data',
  'del',
  'dfn',
  'em',
  'i',
  'ins',
  'kbd',
  'label',
  'mark',
  'q',
  's',
  'samp',
  'small',
  'span',
  'strong',
  'sub',
  'sup',
  'time',
  'u',
  'var',
])

/** code 模式未显式指定根元素时默认使用原生 code，其余保持 span。 */
const rootComponent = computed(() => mergedProps.value.component || (mergedProps.value.code ? 'code' : 'span'))

const rootTag = computed(() => (typeof rootComponent.value === 'string' ? rootComponent.value.toLowerCase() : ''))

/** 根元素是 code（显式传 component="code" 也算）时统一使用 code 的等宽字体和语义配色。 */
const isCode = computed(() => mergedProps.value.code === true || rootTag.value === 'code')

/** code 根元素保留 type 属性，语义配色由 code.css 的 type 选择器提供。 */
const codeTypeAttr = computed(() =>
  rootTag.value === 'code' && mergedProps.value.type !== 'default' ? mergedProps.value.type : undefined,
)

/** mark 的主题 class：让 .s-mark 使用对应主题的高亮底色。 */
const markTheme = computed(() =>
  mergedProps.value.mark && mergedProps.value.theme !== 'default' ? mergedProps.value.theme : '',
)

/**
 * 默认的 span 是行内元素，`mt / mb / pt / pb / p / w / h` 等块级简写会被浏览器忽略。
 * 检测到这类属性时自动切换为行内块，用户不必再额外传 `component="div"`。
 * `lineClamp > 0` 时显示方式交给 `.s-text--clamp` 的 `-webkit-box`。
 */
const needsInlineBlock = computed(
  () => hasBlockOnlyStyleProps.value && INLINE_TAGS.has(rootTag.value) && !clamped.value,
)
const hasGradient = computed(() => Boolean(mergedProps.value.gradient?.trim()))
const gradientStyle = computed(() =>
  hasGradient.value
    ? { backgroundImage: mergedProps.value.gradient, color: 'transparent', WebkitTextFillColor: 'transparent' }
    : undefined,
)

const textStyle = computed(() => {
  const { color, type, theme, mark, italic, lineClamp } = mergedProps.value
  const resolveColor = () => {
    if (color) return resolveStyleColor(color, theme)
    // code 的文字色交给 code 的 CSS（type 属性 + 主题变量），避免内联色覆盖语义配色
    if (isCode.value) return undefined
    // mark 只加高亮底色；未显式设置颜色时继承外层文字色
    if (mark && type === 'default') return 'inherit'
    if (type !== 'default') return resolveThemeColor(type, theme)
    return resolveStyleColor('default', theme)
  }

  return {
    color: resolveColor(),
    fontStyle: italic ? 'italic' : undefined,
    WebkitLineClamp: clamped.value ? lineClamp : undefined,
  }
})
</script>

<style scoped lang="scss">
.s-text {
  box-sizing: border-box;
}

.s-text--gradient {
  background-clip: text;
  -webkit-background-clip: text;
}

.s-text--block {
  display: inline-block;
}

.s-text--clamp {
  display: -webkit-box;
  overflow: hidden;
  -webkit-box-orient: vertical;
}

.s-text--unselectable {
  user-select: none;
}
</style>
