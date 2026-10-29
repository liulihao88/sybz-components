<template>
  <component
    :is="component"
    :style="[flexStyles, style]"
    class="s-flex"
    :class="{ 's-flex--gap': hasGap, 's-flex--inline': inline }"
  >
    <slot />
  </component>
</template>

<script setup lang="ts">
import { computed, type Component } from 'vue'
import { processWidth } from '@sybz-components/utils'
import { parseGap, type Gap } from '@/hooks/parseGap'
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
  alignContent?: 'start' | 'end' | 'center' | 'stretch' | 'space-between' | 'space-around' | 'space-evenly' | 'normal'
  inline?: boolean
  flex?: string
  gap?: Gap
  width?: string | number | boolean
  w?: string | number | boolean
  height?: string | number | boolean
  h?: string | number | boolean
  component?: string | Component
}

// --- Props 定义 ---
const props = withDefaults(defineProps<FlexProps>(), {
  direction: 'row', // column row-reverse column-reverse
  wrap: 'nowrap',
  justify: 'normal',
  align: 'normal',
  alignContent: 'normal',
  inline: false,
  flex: '',
  gap: '0px', // small default large
  component: 'div',
})
const sizeProps = useSizeAliases(props)
const { style } = useStyleProps()

const gapValues = computed(() => parseGap(props.gap))
const hasGap = computed(() =>
  [gapValues.value.x, gapValues.value.y].some((value) => !/^0(?:[a-z%]+)?$/i.test(String(value).trim())),
)
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
    'align-content': props.alignContent === 'normal' ? undefined : props.alignContent,
    flex: props.flex && props.flex !== 'normal' ? props.flex : undefined,
    'row-gap': gapValues.value.y,
    'column-gap': gapValues.value.x,
    width: sizeProps.value.width === undefined ? undefined : processWidth(sizeProps.value.width, true),
    height: sizeProps.value.height === undefined ? undefined : processWidth(sizeProps.value.height, true),
  }
})
</script>

<style scoped lang="scss">
.s-flex {
  display: flex;
  box-sizing: border-box;
  min-width: 0; /* Important for flex items to shrink properly */
}

.s-flex--inline {
  display: inline-flex;
}

.s-flex--gap > :deep(.el-button + .el-button),
.s-flex--gap > :deep(.s-icon + .s-icon) {
  margin-left: 0;
}
</style>
