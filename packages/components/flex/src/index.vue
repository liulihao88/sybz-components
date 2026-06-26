<template>
  <component :is="component" :style="flexStyles" class="s-flex">
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

// --- 计算 Style ---
const flexStyles = computed(() => {
  let gapValue = parseGapValue()

  return {
    'flex-direction': props.direction,
    'flex-wrap': props.wrap,
    'justify-content': props.justify === 'normal' ? undefined : props.justify,
    'align-items': props.align === 'normal' ? undefined : props.align,
    flex: props.flex && props.flex !== 'normal' ? props.flex : undefined,
    gap: gapValue,
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
</style>
