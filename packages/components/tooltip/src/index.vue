<template>
  <el-tooltip class="s-tooltip-box" :disabled="handleDisabled" :effect="mergedProps.effect" v-bind="mergedTooltipAttrs">
    <span
      v-if="mergedProps.showSlot"
      ref="textRef"
      class="s-tooltip-box__text"
      :class="{
        's-tooltip-box__text--multiline': isMultiLineClamp,
        's-tooltip-box__text--custom-trigger': hasDefaultSlot,
      }"
      :style="textStyle"
      v-bind="triggerAttrs"
      @click="contentClick"
      @mouseover="onMouseOver"
    >
      <span ref="positionRef" class="s-tooltip-box__content">
        <slot>
          {{ $attrs.content }}
        </slot>
      </span>
    </span>
    <slot v-else name="trigger" />
    <template v-if="$slots.content" #content>
      <slot name="content"></slot>
    </template>
    <!-- 添加对 VNode 类型 content 的支持 -->
    <template v-else-if="isVNodeContent" #content>
      <component :is="dynamicComponent" />
    </template>
  </el-tooltip>
</template>

<script setup lang="ts">
import { computed, getCurrentInstance, ref, useAttrs, useSlots } from 'vue'
import type { CSSProperties } from 'vue'
import { processWidth } from '@sybz-components/utils'
import useGlobalComponentConfig from '@/hooks/useGlobalComponentConfig'

defineOptions({
  name: 'STooltip',
  inheritAttrs: false,
})
const slots = useSlots()
const attrs = useAttrs()
const callerScopeId = getCurrentInstance()?.vnode.scopeId
const hasDefaultSlot = computed(() => Boolean(slots.default))

interface TooltipProps {
  width?: string
  lineClamp?: string | number
  showSlot?: boolean
  effect?: string
  dangerouslyUseHTMLString?: boolean
}

const props = withDefaults(defineProps<TooltipProps>(), {
  width: '100%',
  lineClamp: 1,
  showSlot: true,
  effect: 'dark',
  dangerouslyUseHTMLString: false,
})
const mergedProps = useGlobalComponentConfig('tooltip', props)
const ownPropKeys = ['width', 'lineClamp', 'showSlot', 'effect', 'dangerouslyUseHTMLString']

const mergedTooltipAttrs = computed(() => {
  const tooltipAttrs = Object.keys(mergedProps.value).reduce<Record<string, any>>((attrs, key) => {
    if (!ownPropKeys.includes(key)) {
      attrs[key] = mergedProps.value[key]
    }
    return attrs
  }, {})
  const forwardedAttrs = { ...attrs }
  delete forwardedAttrs.class
  delete forwardedAttrs.style

  const htmlStringEnabled = mergedProps.value.dangerouslyUseHTMLString
  const rawContent =
    htmlStringEnabled ||
    attrs.rawContent ||
    attrs['raw-content'] ||
    tooltipAttrs.rawContent ||
    tooltipAttrs['raw-content']

  return {
    ...forwardedAttrs,
    ...tooltipAttrs,
    rawContent: Boolean(rawContent),
    ...(useContentReference.value ? { referenceEl: positionRef.value } : {}),
  }
})

const positionRef = ref<HTMLElement>()
const useContentReference = computed(
  () =>
    mergedProps.value.showSlot &&
    (attrs.class != null || attrs.style != null) &&
    !('referenceEl' in attrs) &&
    !('reference-el' in attrs),
)

const triggerAttrs = computed(() => {
  const triggerAttrs = { ...attrs }
  const tooltipOnlyAttrs = [
    'content',
    'rawContent',
    'raw-content',
    'placement',
    'trigger',
    'showAfter',
    'show-after',
    'hideAfter',
    'hide-after',
    'visible',
    'disabled',
  ]

  tooltipOnlyAttrs.forEach((key) => {
    delete triggerAttrs[key]
  })
  if (callerScopeId) triggerAttrs[callerScopeId] = ''

  return triggerAttrs
})

const normalizedLineClamp = computed(() => {
  const lineClamp = Number(mergedProps.value.lineClamp)
  if (!Number.isFinite(lineClamp) || lineClamp <= 0) {
    return 1
  }
  return Math.floor(lineClamp)
})

const isMultiLineClamp = computed(() => normalizedLineClamp.value > 1)

const textStyle = computed<CSSProperties>(() => {
  const baseStyle: CSSProperties = {
    maxWidth: processWidth(mergedProps.value.width, true),
  }

  if (!isMultiLineClamp.value) {
    return baseStyle
  }

  return {
    ...baseStyle,
    display: '-webkit-box',
    whiteSpace: 'normal',
    WebkitBoxOrient: 'vertical' as const,
    WebkitLineClamp: String(normalizedLineClamp.value),
  }
})

// 检查 content 是否为 VNode
const isVNodeContent = computed(() => {
  const content = attrs.content
  return content && typeof content === 'object' && Object.prototype.hasOwnProperty.call(content, 'type')
})

// 创建一个动态组件来渲染 VNode
const dynamicComponent = computed(() => {
  const content = attrs.content
  if (isVNodeContent.value) {
    return {
      render: () => content,
    }
  }
  return null
})

const textRef = ref<HTMLElement>()
const isDisabled = ref(false)
const handleDisabled = computed<boolean>(() => {
  if (attrs.disabled) {
    return Boolean(attrs.disabled)
  }
  if (!attrs.content && !slots.content) {
    return true
  }
  if (slots.default) {
    return false
  }
  return isDisabled.value
})
function onMouseOver() {
  if (!mergedProps.value.showSlot) {
    return
  }
  // 内容超出，显示文字提示内容
  const tag = textRef.value
  if (!tag) return
  const isOverflowWidth = tag.scrollWidth > tag.clientWidth
  const isOverflowHeight = tag.scrollHeight > tag.clientHeight
  isDisabled.value = !isOverflowWidth && !isOverflowHeight
}
const emits = defineEmits(['click'])
function contentClick() {
  emits('click')
}
</script>
<style lang="scss" scoped>
.s-tooltip-box__text {
  display: inline-block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  vertical-align: bottom;
}

.s-tooltip-box__text--multiline {
  text-overflow: initial;
}

.s-tooltip-box__text--custom-trigger {
  display: inline-flex;
  width: fit-content;
  max-width: 100%;
  flex: 0 0 auto;
}

.s-tooltip-box__text:has(.el-button) + :deep(.el-button),
.el-button + .s-tooltip-box__text :deep(.el-button),
.s-tooltip-box__text:has(.el-button) + .s-tooltip-box__text:has(.el-button) {
  margin-left: 12px !important;
}
</style>
