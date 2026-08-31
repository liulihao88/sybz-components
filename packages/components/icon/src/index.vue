<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import type { Component } from 'vue'
import type { ElTooltipProps } from 'element-plus'
import { Icon as IconifyIcon } from '@iconify/vue'
import { processWidth, toLine } from '@sybz-components/utils'
import SSvg from '@/components/svg'
import useGlobalComponentConfig from '@/hooks/useGlobalComponentConfig'
import type {
  SIconCursor,
  SIconName,
  SIconSource,
  SIconType,
  SIconVariant,
  SybzComponentTheme,
} from '@/types/component-props'

defineOptions({
  name: 'SIcon',
})
interface IconProps {
  icon?: SIconName | Component
  color?: string
  size?: string | number
  borderRadius?: string | number
  cursor?: SIconCursor
  disabled?: boolean
  theme?: SybzComponentTheme
  source?: SIconSource
  type?: SIconType
  variant?: SIconVariant
  svgAttrs?: Record<string, any>
  iconifyAttrs?: Record<string, any>
  dangerouslyUseHTMLString?: boolean
  rotate?: string | number
}

const props = withDefaults(defineProps<IconProps>(), {
  icon: '',
  color: undefined,
  size: '16px', // 1em, 10px 10, 100%,
  borderRadius: '',
  cursor: 'pointer',
  disabled: false,
  theme: 'default',
  source: 'auto',
  type: undefined,
  variant: 'plain',
  svgAttrs: () => ({}),
  iconifyAttrs: () => ({}),
  dangerouslyUseHTMLString: false,
  rotate: '',
})
const mergedProps = useGlobalComponentConfig('icon', props)
const attrs = useAttrs()
const emits = defineEmits(['click'])
function handleClick($event) {
  if (mergedProps.value.disabled) return
  emits('click', $event)
}
const parseColor = computed(() => {
  if (mergedProps.value.disabled) return 'var(--el-disabled-text-color)'
  if (mergedProps.value.color) return mergedProps.value.color
  if (!mergedProps.value.type) return undefined
  if (mergedProps.value.type === 'default') return 'var(--s-icon-color)'
  if (mergedProps.value.variant === 'solid') return 'var(--el-color-white)'
  return 'var(--s-icon-color)'
})

const isIconify = computed(
  () =>
    mergedProps.value.source === 'iconify' ||
    (mergedProps.value.source === 'auto' &&
      typeof mergedProps.value.icon === 'string' &&
      mergedProps.value.icon.includes(':')),
)

const resolvedIcon = computed(() => {
  if (typeof mergedProps.value.icon !== 'string') return mergedProps.value.icon
  return `el-icon-${toLine(mergedProps.value.icon)}`
})

const iconClasses = computed(() => [
  mergedProps.value.theme !== 'default' && `s-icon--${mergedProps.value.theme}`,
  mergedProps.value.type && `s-icon--${mergedProps.value.type}`,
  mergedProps.value.type && `s-icon--${mergedProps.value.variant}`,
  mergedProps.value.disabled && 's-icon__not-allowed',
])

const parseRotate = computed(() => {
  const rotate = mergedProps.value.rotate
  const processedRotate = processWidth(rotate, true)

  if (processedRotate.endsWith('px')) return `${processedRotate.slice(0, -2)}deg`
  if (typeof rotate === 'string' && /^-?(?:\d+\.?\d*|\.\d+)(?:deg|grad|rad|turn)$/.test(rotate)) return rotate
  return ''
})

const tooltipAttrs = computed<Partial<ElTooltipProps> & Record<string, any>>(() => {
  const restAttrs = { ...attrs }
  delete restAttrs.dangerouslyUseHTMLString
  const htmlStringEnabled = mergedProps.value.dangerouslyUseHTMLString

  return {
    ...restAttrs,
    rawContent: Boolean(htmlStringEnabled || restAttrs.rawContent || restAttrs['raw-content']),
  }
})
</script>

<template>
  <el-icon
    :color="parseColor"
    props.disabled
    :size="mergedProps.size"
    :style="{
      cursor: mergedProps.disabled ? 'not-allowed' : mergedProps.cursor,
      borderRadius: mergedProps.borderRadius ? processWidth(mergedProps.borderRadius, true) : undefined,
      transform: parseRotate ? `rotate(${parseRotate})` : undefined,
    }"
    class="s-icon"
    :class="iconClasses"
    @click="handleClick"
  >
    <el-tooltip :disabled="!tooltipAttrs.content" v-bind="tooltipAttrs">
      <span ref="contentRef">
        <slot v-if="$slots.default"></slot>
        <!-- 仅在默认插槽为空时渲染图标 -->
        <template v-else>
          <s-svg
            v-if="mergedProps.source === 'svg' && typeof mergedProps.icon === 'string'"
            v-bind="mergedProps.svgAttrs"
            :icon="mergedProps.icon"
          ></s-svg>
          <iconify-icon
            v-else-if="isIconify"
            v-bind="mergedProps.iconifyAttrs"
            :icon="String(mergedProps.icon)"
            aria-hidden="true"
          />
          <component :is="resolvedIcon" v-else></component>
        </template>
      </span>
    </el-tooltip>
  </el-icon>
</template>

<style scoped lang="scss">
.s-icon {
  &--light,
  &--solid {
    box-sizing: content-box;
    padding: 4px;
    border-radius: 8px;
  }

  &--light {
    background-color: var(--s-icon-light-bg);
  }

  &--solid {
    background-color: var(--s-icon-solid-bg);
    border: 1px solid var(--s-icon-solid-border);
  }

  &--default {
    --s-icon-color: var(--el-text-color-regular);
    --s-icon-light-bg: var(--el-fill-color-light);
    --s-icon-solid-bg: var(--el-bg-color);
    --s-icon-solid-border: var(--el-border-color);
  }

  @each $type in primary, success, warning, danger, info {
    &--#{$type} {
      --s-icon-color: var(--el-color-#{$type});
      --s-icon-light-bg: var(--el-color-#{$type}-light-9);
      --s-icon-solid-bg: var(--el-color-#{$type});
      --s-icon-solid-border: var(--el-color-#{$type});
    }
  }

  :deep(.iconify) {
    display: block;
  }
}
.s-icon__not-allowed {
  cursor: not-allowed;
}
.s-icon + .s-icon {
  margin-left: 8px;
}
</style>
