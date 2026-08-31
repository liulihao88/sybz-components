<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import type { ElTooltipProps } from 'element-plus'
import { Icon as IconifyIcon } from '@iconify/vue'
import { processWidth, toLine } from '@sybz-components/utils'
import SSvg from '@/components/svg'
import useGlobalComponentConfig from '@/hooks/useGlobalComponentConfig'
import type { SIconName, SIconSource, SIconType, SIconVariant } from '@/types/component-props'

defineOptions({
  name: 'SIcon',
})
interface IconProps {
  name?: SIconName
  color?: string
  size?: string | number
  disabled?: boolean
  source?: SIconSource
  type?: SIconType
  variant?: SIconVariant
  svgAttrs?: Record<string, any>
  iconifyAttrs?: Record<string, any>
  dangerouslyUseHTMLString?: boolean
  rotate?: string | number
}

const props = withDefaults(defineProps<IconProps>(), {
  name: '',
  color: undefined,
  size: '16px', // 1em, 10px 10, 100%,
  disabled: false,
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
  if (mergedProps.value.type === 'default') return 'var(--el-text-color-regular)'
  if (mergedProps.value.variant === 'solid') return 'var(--el-color-white)'
  return `var(--el-color-${mergedProps.value.type})`
})

const isIconify = computed(
  () =>
    mergedProps.value.source === 'iconify' ||
    (mergedProps.value.source === 'auto' && mergedProps.value.name.includes(':')),
)

const iconClasses = computed(() => [
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
    :style="{ transform: parseRotate ? `rotate(${parseRotate})` : undefined }"
    class="s-icon"
    :class="iconClasses"
    @click="handleClick"
  >
    <el-tooltip :disabled="!tooltipAttrs.content" v-bind="tooltipAttrs">
      <span ref="contentRef">
        <slot v-if="$slots.default"></slot>
        <!-- 仅在默认插槽为空时渲染图标 -->
        <template v-else>
          <s-svg v-if="mergedProps.source === 'svg'" v-bind="mergedProps.svgAttrs" :name="mergedProps.name"></s-svg>
          <iconify-icon
            v-else-if="isIconify"
            v-bind="mergedProps.iconifyAttrs"
            :icon="mergedProps.name"
            aria-hidden="true"
          />
          <component :is="`el-icon-${toLine(mergedProps.name || '')}`" v-else></component>
        </template>
      </span>
    </el-tooltip>
  </el-icon>
</template>

<style scoped lang="scss">
.s-icon {
  // cursor: pointer;

  &--light,
  &--solid {
    box-sizing: content-box;
    padding: 4px;
    border-radius: 4px;
  }

  &--light {
    background-color: var(--el-fill-color-light);
  }

  &--solid {
    background-color: var(--el-bg-color);
    border: 1px solid var(--el-border-color);
  }

  @each $type in primary, success, warning, danger, info {
    &--#{$type}.s-icon--light {
      background-color: var(--el-color-#{$type}-light-9);
    }

    &--#{$type}.s-icon--solid {
      background-color: var(--el-color-#{$type});
      border-color: var(--el-color-#{$type});
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
