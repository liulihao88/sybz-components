<template>
  <div class="s-progress">
    <el-progress
      :percentage="percentageVal"
      v-bind="{ ...originAttrs, ...$attrs }"
      :color="$attrs.color || customColorMethod(percentageVal)"
    >
      <slot :percentage="percentageVal"></slot>
    </el-progress>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'

defineOptions({
  name: 'SProgress',
})

interface ProgressProps {
  percentage: number
  animationTime?: number
  isAnimation?: boolean
  customColor?: boolean
}

const props = withDefaults(defineProps<ProgressProps>(), {
  animationTime: 500,
  isAnimation: true,
  customColor: true, // 是否开启自定义颜色, 不开启则使用el-progress默认颜色
})

const originAttrs = {
  'stroke-width': 16,
}

const percentageVal = ref<number>(0)
const animation = () => {
  let t = Math.ceil(props.animationTime / props.percentage)
  let timer = setInterval(() => {
    percentageVal.value = Number(percentageVal.value) + 1
    if (percentageVal.value >= props.percentage || percentageVal.value >= 100) {
      percentageVal.value = props.percentage >= 100 ? 100 : props.percentage
      clearInterval(timer)
    }
  }, t)
}

const customColorMethod = (percentage: number) => {
  if (props.customColor) {
    if (percentage < 30) {
      return 'var(--el-text-color-placeholder)'
    }
    if (percentage < 70) {
      return 'var(--el-color-warning)'
    }
    return 'var(--el-color-success)'
  } else {
    return ''
  }
}
watch(
  () => props.percentage,
  () => {
    if (props.isAnimation) {
      animation()
    }
  },
  {
    immediate: true,
  },
)
</script>

<style lang="scss" scoped>
.s-progress {
  width: 100%;
}
</style>
