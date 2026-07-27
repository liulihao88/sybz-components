<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import type { ElTooltipProps } from 'element-plus'
import { processWidth, toLine } from '@sybz-components/utils'
import SSvg from '@/components/svg'
import useGlobalComponentConfig from '@/hooks/useGlobalComponentConfig'

defineOptions({
  name: 'SIcon',
})
interface IconProps {
  name: string
  color?: string
  size?: string | number
  disabled?: boolean
  type?: string
  svgAttrs?: Record<string, any>
  dangerouslyUseHTMLString?: boolean
  rotate?: string | number
}

const props = withDefaults(defineProps<IconProps>(), {
  color: undefined,
  size: '16px', // 1em, 10px 10, 100%,
  disabled: false,
  type: '', // svg
  svgAttrs: () => ({}),
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
  return mergedProps.value.color
})

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
    :class="mergedProps.disabled && 's-icon__not-allowed'"
    @click="handleClick"
  >
    <el-tooltip :disabled="!tooltipAttrs.content" v-bind="tooltipAttrs">
      <span ref="contentRef">
        <slot v-if="$slots.default"></slot>
        <!-- 仅在默认插槽为空时渲染图标 -->
        <template v-else>
          <s-svg v-if="mergedProps.type === 'svg'" v-bind="mergedProps.svgAttrs" :name="mergedProps.name"></s-svg>
          <component :is="`el-icon-${toLine(mergedProps.name || '')}`" v-else></component>
        </template>
      </span>
    </el-tooltip>
  </el-icon>
</template>

<style scoped lang="scss">
.s-icon {
  // cursor: pointer;
}
.s-icon__not-allowed {
  cursor: not-allowed;
}
.s-icon + .s-icon {
  margin-left: 8px;
}
</style>
