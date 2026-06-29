<script setup lang="ts">
import { ref, shallowRef, watch, markRaw, onBeforeUnmount, computed } from 'vue'
import * as echarts from 'echarts'
import { debounce, processWidth } from '@sybz-components/utils'
import { useEcharts } from './useEcharts.ts'

defineOptions({
  name: 'SChart',
})
const echartDivRef = shallowRef<HTMLElement | null>(null)

const emits = defineEmits(['chart'])

const chart = ref()

const props = withDefaults(
  defineProps<{
    width?: string
    height?: string
    id?: string
    option: Record<string, any>
    theme?: string
    isEmpty?: boolean | ((options: Record<string, any>) => boolean)
    description?: string
  }>(),
  {
    height: '400px',
    isEmpty: false,
    width: '100%',
    theme: undefined,
    description: '暂无数据',
    id: () => Math.random().toString(36).substring(2, 8),
  },
)

const initChart = () => {
  if (!echartDivRef.value) return

  chart.value = markRaw(echarts.init(echartDivRef.value, props.theme))
  // setOption(props.option)
  // 返回chart实例
  emits('chart', chart.value)
  setTimeout(() => {
    useEcharts(chart.value, props.option)
  }, 0)
}

// 重绘图表函数
const resizeChart = debounce(
  () => {
    chart.value?.resize()
  },
  300,
  true,
)

watch(
  [() => props.width, () => props.height],
  () => {
    resizeChart()
  },
  {
    deep: true,
    immediate: true,
  },
)
watch(
  () => [props.option],
  () => {
    setTimeout(() => {
      initChart()
      resizeChart()
    }, 0)
  },
  {
    deep: true,
    immediate: true,
  },
)

watch(
  () => props.theme,
  async () => {
    chart.value?.dispose()
    initChart()
  },
)

const formatEmpty = computed(() => {
  if (typeof props.isEmpty === 'function') {
    return props.isEmpty(props.option)
  }
  return props.isEmpty
})

defineExpose({
  initChart,
  resizeChart,
})

onBeforeUnmount(() => {
  // 取消监听
  // window.removeEventListener('resize', resizeChart)
  // 销毁echarts实例
  chart.value?.dispose()
  chart.value = null
})
</script>

<template>
  <div class="s-chart" :style="{ height: processWidth(height, true), width: processWidth(width, true) }">
    <div v-show="!formatEmpty" :id="id" ref="echartDivRef" class="s-chart-container" />
    <slot v-if="formatEmpty" name="empty">
      <el-empty v-bind="$attrs" :description="description" />
    </slot>
    <slot></slot>
  </div>
</template>

<style scoped lang="scss">
.s-chart {
  position: relative;
}

.s-chart-container {
  height: 100%;
  width: 100%;
}
</style>
