<script setup lang="ts">
import { ref, shallowRef, watch, markRaw, onMounted, onBeforeUnmount, computed } from 'vue'
import { debounce, processWidth } from '@sybz-components/utils'
import { registerShijingshanChartTheme } from './shijingshanTheme.ts'

defineOptions({
  name: 'SChart',
})
const echartDivRef = shallowRef<HTMLElement | null>(null)

const emits = defineEmits(['chart'])

const chart = ref()
let chartLoadToken = 0
let resizeObserver: ResizeObserver | undefined

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

const initChart = async () => {
  if (!echartDivRef.value) return

  const token = ++chartLoadToken
  const echarts = await import('echarts')

  if (token !== chartLoadToken || !echartDivRef.value) return

  if (props.theme === 'shijingshan') {
    registerShijingshanChartTheme(echarts)
  }

  const chartTheme = props.theme === 'default' ? undefined : props.theme

  chart.value?.dispose()
  chart.value = markRaw(echarts.init(echartDivRef.value, chartTheme))
  // setOption(props.option)
  // 返回chart实例
  emits('chart', chart.value)
  setTimeout(() => {
    if (token !== chartLoadToken || !chart.value) return
    chart.value.setOption(props.option)
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

onMounted(() => {
  if (typeof ResizeObserver !== 'undefined' && echartDivRef.value) {
    resizeObserver = new ResizeObserver(() => resizeChart())
    resizeObserver.observe(echartDivRef.value)
  } else if (typeof window !== 'undefined') {
    window.addEventListener('resize', resizeChart)
  }
})

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
  chartLoadToken += 1
  resizeObserver?.disconnect()
  window.removeEventListener('resize', resizeChart)
  resizeChart.cancel()
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
