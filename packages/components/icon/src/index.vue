<script setup lang="ts">
import { ref, computed } from 'vue'
import { toLine } from '@/utils/src'
import SSvg from '@/components/svg'

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
})
const emits = defineEmits(['click'])
function handleClick($event) {
  if (props.disabled) return
  emits('click', $event)
}
const parseColor = computed(() => {
  if (props.disabled) return 'var(--el-disabled-text-color)'
  return props.color
})
</script>

<template>
  <el-icon
    :color="parseColor"
    props.disabled
    :size="props.size"
    class="s-icon"
    :class="props.disabled && 's-icon__not-allowed'"
    @click="handleClick"
  >
    <el-tooltip :disabled="!$attrs.content" v-bind="$attrs">
      <span ref="contentRef">
        <slot v-if="$slots.default"></slot>
        <!-- 仅在默认插槽为空时渲染图标 -->
        <template v-else>
          <s-svg v-if="type === 'svg'" v-bind="svgAttrs" :name="name"></s-svg>
          <component :is="`el-icon-${toLine(props.name || '')}`" v-else></component>
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
