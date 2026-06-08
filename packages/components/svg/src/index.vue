<template>
  <svg aria-hidden="true" v-bind="$attrs" class="s-svg-box" :style="parseStyle">
    <use :href="symbolId" :fill="color" />
  </svg>
</template>

<script setup lang="ts" name="SSvg">
import { computed } from 'vue'
import { processWidth } from '@sybz-components/utils'
const props = defineProps({
  prefix: {
    type: String,
    default: 'icon',
  },
  name: {
    type: String,
    required: true,
  },
  color: {
    type: String,
  },
  customStyle: {
    type: Object,
    default: () => {},
  },
  size: {
    type: [String, Number],
    default: '16px',
  },
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
