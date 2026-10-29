<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import type { CSSProperties } from 'vue'
import type { ElTooltipProps } from 'element-plus'
import { Icon as IconifyIcon } from '@iconify/vue'
import { processWidth } from '@sybz-components/utils'
import SSvg from '@/components/svg'
import {
  isElementPlusIconName,
  isEmojiIcon,
  isIconifyIconName,
  isRemoteIconUrl,
  resolveIconValue,
} from '@/components/utils/icon'
import useGlobalComponentConfig from '@/hooks/useGlobalComponentConfig'
import { useStyleProps } from '@/hooks/useStyleProps'
import type {
  SIconCursor,
  SIconSource,
  SIconType,
  SIconVariant,
  SIconValue,
  SybzComponentTheme,
} from '@/types/component-props'

defineOptions({
  name: 'SIcon',
})
interface IconProps {
  icon?: SIconValue
  color?: string
  size?: string | number
  width?: string | number | boolean
  w?: string | number | boolean
  height?: string | number | boolean
  h?: string | number | boolean
  borderRadius?: string | number
  cursor?: SIconCursor
  hoverAnimation?: boolean
  highlight?: boolean
  shadow?: 'always' | 'never' | 'hover'
  disabled?: boolean
  theme?: SybzComponentTheme
  source?: SIconSource
  type?: SIconType
  variant?: SIconVariant
  svgAttrs?: Record<string, any>
  iconifyAttrs?: Record<string, any>
  imageAttrs?: Record<string, any>
  dangerouslyUseHTMLString?: boolean
  rotate?: string | number
}

const props = withDefaults(defineProps<IconProps>(), {
  color: undefined,
  size: '16px', // 1em, 10px 10, 100%,
  width: undefined,
  height: undefined,
  borderRadius: '',
  cursor: 'pointer',
  hoverAnimation: false,
  highlight: false,
  shadow: 'never',
  disabled: false,
  theme: 'default',
  source: 'auto',
  type: 'default',
  variant: 'plain',
  svgAttrs: () => ({}),
  iconifyAttrs: () => ({}),
  imageAttrs: () => ({}),
  dangerouslyUseHTMLString: false,
  rotate: '',
})
const mergedProps = useGlobalComponentConfig('icon', props)
const attrs = useAttrs()
const { style } = useStyleProps()
const dimensionStyle = computed<CSSProperties>(() => {
  const { width, height } = mergedProps.value
  const hasWidth = width !== undefined && width !== null && width !== ''
  const hasHeight = height !== undefined && height !== null && height !== ''
  if (!hasWidth && !hasHeight) return {}

  return {
    width: hasWidth ? processWidth(width, true) : 'auto',
    height: hasHeight ? processWidth(height, true) : 'auto',
    // 百分比只用于指定的一边，另一边由宽高比计算，避免相对父容器的不同边取值。
    aspectRatio: hasWidth && hasHeight ? 'auto' : '1',
    boxSizing: 'border-box',
    flexShrink: 0,
    minWidth: 0,
    minHeight: 0,
  }
})
const emits = defineEmits(['click'])
function handleClick($event) {
  if (mergedProps.value.disabled) return
  emits('click', $event)
}
const parseColor = computed(() => {
  if (mergedProps.value.disabled) return 'var(--el-disabled-text-color)'
  if (mergedProps.value.color) return mergedProps.value.color
  if (!mergedProps.value.type || (mergedProps.value.type === 'default' && mergedProps.value.variant === 'plain')) {
    return undefined
  }
  if (mergedProps.value.type === 'default') return 'var(--s-icon-color)'
  if (mergedProps.value.variant === 'solid') return 'var(--el-color-white)'
  return 'var(--s-icon-color)'
})

const isRemoteImage = computed(() => {
  if (mergedProps.value.source === 'url') return typeof mergedProps.value.icon === 'string'
  if (mergedProps.value.source !== 'auto' || typeof mergedProps.value.icon !== 'string') return false
  return isRemoteIconUrl(mergedProps.value.icon)
})

const isIconify = computed(() => {
  if (mergedProps.value.source === 'iconify') return true
  if (mergedProps.value.source !== 'auto' || typeof mergedProps.value.icon !== 'string') return false
  return isIconifyIconName(mergedProps.value.icon)
})

const isCssClass = computed(
  () =>
    typeof mergedProps.value.icon === 'string' &&
    (mergedProps.value.source === 'css' ||
      (mergedProps.value.source === 'auto' && !isElementPlusIconName(mergedProps.value.icon))),
)

const isEmoji = computed(
  () =>
    mergedProps.value.source === 'auto' &&
    typeof mergedProps.value.icon === 'string' &&
    isEmojiIcon(mergedProps.value.icon),
)

const resolvedIcon = computed(() => resolveIconValue(mergedProps.value.icon))

/**
 * 高亮只在“默认色 + 矢量图标”时改成主题色；
 * 语义色图标要保留自己的颜色（warning 还是 warning、danger 还是 danger），
 * 图片和 Emoji 靠 color 改不动，同样走同色系加深。
 */
const isHighlightColorMode = computed(
  () => (!mergedProps.value.type || mergedProps.value.type === 'default') && !isRemoteImage.value && !isEmoji.value,
)

const iconClasses = computed(() => [
  mergedProps.value.theme !== 'default' && `s-icon--${mergedProps.value.theme}`,
  mergedProps.value.type && `s-icon--${mergedProps.value.type}`,
  mergedProps.value.type && `s-icon--${mergedProps.value.variant}`,
  mergedProps.value.hoverAnimation && 's-icon--hover-animation',
  mergedProps.value.highlight && 's-icon--highlight',
  mergedProps.value.highlight && isHighlightColorMode.value && 's-icon--highlight-color',
  mergedProps.value.shadow === 'always' && 's-icon--shadow-always',
  mergedProps.value.shadow === 'hover' && 's-icon--shadow-hover',
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
    :style="[
      {
        ...dimensionStyle,
        cursor: mergedProps.disabled ? 'not-allowed' : mergedProps.cursor,
        borderRadius: mergedProps.borderRadius ? processWidth(mergedProps.borderRadius, true) : undefined,
        transform: parseRotate ? `rotate(${parseRotate})` : undefined,
      },
      style,
    ]"
    class="s-icon"
    :class="iconClasses"
    @click="handleClick"
  >
    <el-tooltip :disabled="!tooltipAttrs.content" v-bind="tooltipAttrs">
      <span ref="contentRef">
        <slot v-if="$slots.default"></slot>
        <!-- 仅在默认插槽为空时渲染图标 -->
        <template v-else>
          <img
            v-if="isRemoteImage"
            v-bind="mergedProps.imageAttrs"
            class="s-icon__image"
            :src="String(mergedProps.icon)"
            :alt="String(mergedProps.imageAttrs.alt || '')"
          />
          <span v-else-if="isEmoji" class="s-icon__emoji" aria-hidden="true">{{ mergedProps.icon }}</span>
          <s-svg
            v-else-if="mergedProps.source === 'svg' && typeof mergedProps.icon === 'string'"
            v-bind="mergedProps.svgAttrs"
            :icon="mergedProps.icon"
          ></s-svg>
          <iconify-icon
            v-else-if="isIconify"
            v-bind="mergedProps.iconifyAttrs"
            :icon="String(mergedProps.icon)"
            aria-hidden="true"
          />
          <!-- 未匹配到内置图标时，按 CSS 图标类名兜底，兼容 Font Awesome 等图标库。 -->
          <i v-else-if="isCssClass" :class="String(mergedProps.icon)" aria-hidden="true"></i>
          <component :is="resolvedIcon" v-else></component>
        </template>
      </span>
    </el-tooltip>
  </el-icon>
</template>

<style scoped lang="scss">
.s-icon {
  position: relative;
  top: 0;
  transition:
    top 0.2s ease,
    box-shadow 0.2s ease;

  // 鼠标移入高亮：只改线条，不动背景、圆角和尺寸。
  &--highlight:not(.s-icon__not-allowed) {
    transition:
      top 0.2s ease,
      color 0.2s ease,
      filter 0.2s ease,
      box-shadow 0.2s ease;

    // 语义色图标和图片 / Emoji：保持自己的颜色，同色系加深一档。
    &:hover {
      filter: var(--s-icon-hover-filter, brightness(0.85));
    }

    // 默认色矢量图标：线条变成主题色，类似把 type 从 default 换成 primary。
    &.s-icon--highlight-color:hover {
      --s-icon-color: var(--s-icon-hover-color, var(--s-gl-primary, var(--el-color-primary)));
      color: var(--s-icon-hover-color, var(--s-gl-primary, var(--el-color-primary)));
      filter: none;
    }
  }

  &--shadow-always {
    box-shadow: var(--s-icon-shadow, var(--el-box-shadow-light));
  }

  &--shadow-hover:not(.s-icon__not-allowed):hover {
    box-shadow: var(--s-icon-shadow, var(--el-box-shadow-light));
  }

  &--hover-animation:not(.s-icon__not-allowed):hover {
    top: -2px;
  }

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

  &__image {
    display: block;
    width: 1em;
    height: 1em;
    object-fit: contain;
  }

  &__emoji {
    display: block;
    font-size: 1em;
    line-height: 1;
  }
}
.s-icon__not-allowed {
  cursor: not-allowed;
}
.s-icon + .s-icon {
  margin-left: 8px;
}
</style>
