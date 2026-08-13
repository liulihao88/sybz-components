<template>
  <component :is="component" :style="flexStyles" class="s-flex" :class="{ 's-flex--gap': hasGap }">
    <slot />
  </component>
</template>

<script setup lang="ts">
import { computed, type Component } from 'vue'
import { processWidth } from '@sybz-components/utils'

defineOptions({
  name: 'SFlex',
})

interface FlexProps {
  direction?: 'row' | 'column' | 'row-reverse' | 'column-reverse'
  wrap?: 'nowrap' | 'wrap' | 'wrap-reverse'
  justify?: 'start' | 'end' | 'center' | 'space-between' | 'space-around' | 'space-evenly' | 'normal'
  align?: 'start' | 'end' | 'center' | 'baseline' | 'stretch' | 'normal'
  flex?: string
  gap?: string | number
  width?: string | number
  height?: string | number
  component?: string | Component
}

// --- Props 定义 ---
const props = withDefaults(defineProps<FlexProps>(), {
  direction: 'row', // column row-reverse column-reverse
  wrap: 'nowrap',
  justify: 'normal',
  align: 'normal',
  flex: '',
  gap: '0px', // small default large
  component: 'div',
})

const gapValue = computed(() => parseGapValue())
const hasGap = computed(() => !/^0(?:[a-z%]+)?$/i.test(String(gapValue.value).trim()))

// --- 计算 Style ---
const flexStyles = computed(() => {
  return {
    'flex-direction': props.direction,
    'flex-wrap': props.wrap,
    'justify-content': props.justify === 'normal' ? undefined : props.justify,
    'align-items': props.align === 'normal' ? undefined : props.align,
    flex: props.flex && props.flex !== 'normal' ? props.flex : undefined,
    gap: gapValue.value,
    width: props.width === undefined ? undefined : processWidth(props.width, true),
    height: props.height === undefined ? undefined : processWidth(props.height, true),
  }
})

function parseGapValue() {
  let gap = props.gap
  if (gap === 'small') {
    return '8px'
  } else if (gap === 'default') {
    return '16px'
  } else if (gap === 'large') {
    return '24px'
  } else {
    return processWidth(gap, true)
  }
}
</script>

<style scoped lang="scss">
.s-flex {
  display: flex;
  box-sizing: border-box;
  min-width: 0; /* Important for flex items to shrink properly */
}

.s-flex--gap > :deep(.el-button + .el-button) {
  margin-left: 0;
}
</style>
