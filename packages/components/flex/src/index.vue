<template>
  <component :is="component" :style="[flexStyles, style]" class="s-flex" :class="{ 's-flex--gap': hasGap }">
    <slot />
  </component>
</template>

<script setup lang="ts">
import { computed, type Component } from 'vue'
import { processWidth } from '@sybz-components/utils'
import useSizeAliases from '@/hooks/useSizeAliases'
import { useStyleProps } from '@/hooks/useStyleProps'

defineOptions({
  name: 'SFlex',
})

interface FlexProps {
  direction?: 'row' | 'column' | 'row-reverse' | 'column-reverse'
  wrap?: boolean | 'nowrap' | 'wrap' | 'wrap-reverse'
  justify?: 'start' | 'end' | 'center' | 'space-between' | 'space-around' | 'space-evenly' | 'normal'
  align?: 'start' | 'end' | 'center' | 'baseline' | 'stretch' | 'normal'
  flex?: string
  gap?: boolean | string | number
  width?: string | number
  w?: string | number
  height?: string | number
  h?: string | number
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
const sizeProps = useSizeAliases(props)
const { style } = useStyleProps()

const gapValue = computed(() => parseGapValue())
const hasGap = computed(() => !/^0(?:[a-z%]+)?$/i.test(String(gapValue.value).trim()))
const wrapValue = computed(() => {
  if (props.wrap === true) return 'wrap'
  if (props.wrap === false) return 'nowrap'
  return props.wrap
})

// --- 计算 Style ---
const flexStyles = computed(() => {
  return {
    'flex-direction': props.direction,
    'flex-wrap': wrapValue.value,
    'justify-content': props.justify === 'normal' ? undefined : props.justify,
    'align-items': props.align === 'normal' ? undefined : props.align,
    flex: props.flex && props.flex !== 'normal' ? props.flex : undefined,
    gap: gapValue.value,
    width: sizeProps.value.width === undefined ? undefined : processWidth(sizeProps.value.width, true),
    height: sizeProps.value.height === undefined ? undefined : processWidth(sizeProps.value.height, true),
  }
})

function parseGapValue() {
  const gap = props.gap
  // boolean 形式：裸写 gap（或 :gap="true"）等价于 gap="small"；:gap="false" 等价于不设间距
  if (gap === true || gap === '') {
    return '8px'
  } else if (gap === false) {
    return '0px'
  } else if (gap === 'small') {
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

.s-flex--gap > :deep(.el-button + .el-button),
.s-flex--gap > :deep(.s-icon + .s-icon) {
  margin-left: 0;
}
</style>
