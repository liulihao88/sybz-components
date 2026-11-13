<template>
  <component
    :is="mergedProps.component"
    class="s-text"
    :class="[
      's-text--' + mergedProps.theme,
      {
        's-text--block': needsInlineBlock,
        's-text--clamp': clamped,
        's-text--gradient': hasGradient,
        's-text--unselectable': mergedProps.unselectable,
      },
    ]"
    :style="[textStyle, style, gradientStyle]"
  >
    <slot />
  </component>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { resolveStyleColor, resolveThemeColor, useStyleProps } from '@/hooks/useStyleProps'
import useGlobalComponentConfig from '@/hooks/useGlobalComponentConfig'
import type { STextProps } from './types'

defineOptions({ name: 'SText' })

const props = withDefaults(defineProps<STextProps>(), {
  theme: 'default',
  type: 'default',
  component: 'span',
  lineClamp: 0,
  italic: false,
  mark: false,
  unselectable: false,
})
const mergedProps = useGlobalComponentConfig('text', props)
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

const rootTag = computed(() =>
  typeof mergedProps.value.component === 'string' ? mergedProps.value.component.toLowerCase() : '',
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

const textStyle = computed(() => ({
  color: mergedProps.value.color
    ? resolveStyleColor(mergedProps.value.color, mergedProps.value.theme)
    : mergedProps.value.type === 'default'
      ? resolveStyleColor('default', mergedProps.value.theme)
      : resolveThemeColor(mergedProps.value.type, mergedProps.value.theme),
  fontStyle: mergedProps.value.italic ? 'italic' : undefined,
  backgroundColor: mergedProps.value.mark ? 'var(--s-text-mark)' : undefined,
  WebkitLineClamp: clamped.value ? mergedProps.value.lineClamp : undefined,
}))
</script>

<style scoped lang="scss">
.s-text {
  box-sizing: border-box;
}

.s-text--default,
.s-text--sybz {
  --s-text-mark: var(--s-sybz-yellow-100);
}

.s-text--chenghua {
  --s-text-mark: var(--s-ch-primary-soft);
}

.s-text--shijingshan {
  --s-text-mark: var(--s-sjs-primary-soft);
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
