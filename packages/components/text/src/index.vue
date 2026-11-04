<template>
  <component
    :is="mergedProps.component"
    class="s-text"
    :class="[
      's-text--' + mergedProps.theme,
      {
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
const { style } = useStyleProps()
const clamped = computed(() => Number.isInteger(mergedProps.value.lineClamp) && mergedProps.value.lineClamp > 0)
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

.s-text--clamp {
  display: -webkit-box;
  overflow: hidden;
  -webkit-box-orient: vertical;
}

.s-text--unselectable {
  user-select: none;
}
</style>
