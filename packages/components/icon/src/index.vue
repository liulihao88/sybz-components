<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { toLine } from '@sybz-components/utils'
import SSvg from '@/components/svg'
import useGlobalComponentConfig from '@/hooks/useGlobalComponentConfig'

defineOptions({
  name: 'SIcon',
})
const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  color: {
    type: String,
  },
  size: {
    type: [String, Number],
    default: '16px', // 1em, 10px 10, 100%,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  type: {
    type: String,
    default: '', // svg
  },
  svgAttrs: {
    type: Object,
    default: () => ({}),
  },
  dangerouslyUseHTMLString: {
    type: Boolean,
    default: false,
  },
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

const tooltipAttrs = computed(() => {
  const restAttrs = { ...attrs }
  delete restAttrs.dangerouslyUseHTMLString

  return {
    ...restAttrs,
    rawContent: mergedProps.value.dangerouslyUseHTMLString || restAttrs.rawContent || restAttrs['raw-content'],
  }
})
</script>

<template>
  <el-icon
    :color="parseColor"
    props.disabled
    :size="mergedProps.size"
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
