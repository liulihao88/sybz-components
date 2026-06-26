<template>
  <svg aria-hidden="true" v-bind="$attrs" class="s-svg-box" :style="parseStyle">
    <use :href="symbolId" :fill="color" />
  </svg>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { processWidth } from '@sybz-components/utils'

defineOptions({
  name: 'SSvg',
})
interface SvgProps {
  prefix?: string
  name: string
  color?: string
  customStyle?: Record<string, any>
  size?: string | number
}

const props = withDefaults(defineProps<SvgProps>(), {
  prefix: 'icon',
  color: undefined,
  customStyle: () => ({}),
  size: '16px',
})
const symbolId = computed(() => `#${props.prefix}-${props.name}`)
const parseStyle = computed(() => {
  return {
    width: processWidth(props.size, true),
    height: processWidth(props.size, true),
    ...props.customStyle,
  }
})
</script>
<style lang="scss" scoped>
.s-svg-box {
  fill: currentColor;
  overflow: hidden;
}
</style>
