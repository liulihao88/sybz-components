<script setup lang="ts">
/**
  "inCount": {
      "<1024B": 2,
      "1K-1MB": 11,
      "1MB-10MB": 4,
      "10MB-50MB": 0,
      "50MB-100MB": 0,
      "100MB-500MB": 0,
      "500MB-1GB": 0,
      "1GB-5GB": 0,
      ">5GB": 0
  },
  "inSize": {
      "<1024B": 559,
      "1K-1MB": 4239524,
      "1MB-10MB": 5298741,
      "10MB-50MB": 0,
      "50MB-100MB": 0,
      "100MB-500MB": 0,
      "500MB-1GB": 0,
      "1GB-5GB": 0,
      ">5GB": 0
  },
 */
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'
import SChart from '@/components/chart/index.ts'
import { clone, formatBytes, formatThousands, getVariable } from '@sybz-components/utils'

defineOptions({
  name: 'SCountBarOld',
})
interface CountBarOldProps {
  data?: any[]
}

const props = withDefaults(defineProps<CountBarOldProps>(), {
  data: () => [], // [{name: '<1024kb', value: 22}]
})
const option = ref()
const isEmpty = ref(false)
const themeVersion = ref(0)
let themeObserver: MutationObserver | null = null

const syncCountBarOldTheme = () => {
  initOption.tooltip.backgroundColor = getVariable('--chart-tooltip-bg')
  initOption.tooltip.borderColor = getVariable('--chart-tooltip-border')
  initOption.tooltip.textStyle.color = getVariable('--chart-tooltip-text')
  initOption.xAxis.axisLabel.color = getVariable('--chart-axis-text')
  initOption.yAxis[0].splitLine.lineStyle.color = getVariable('--chart-grid-primary')
  initOption.yAxis[0].axisLabel.color = getVariable('--chart-axis-text')
  initOption.yAxis[1].splitLine.lineStyle.color = getVariable('--chart-grid-secondary')
  initOption.yAxis[1].axisLabel.color = getVariable('--chart-axis-text')
  initOption.series[0].itemStyle.color = getVariable('--chart-series-primary')
  initOption.series[1].itemStyle.color = getVariable('--chart-series-secondary')
}

let initOption = {
  tooltip: {
    trigger: 'axis', // 设置触发方式为坐标轴
    backgroundColor: '',
    borderColor: '',
    textStyle: {
      color: '',
    },
    formatter: (params) => {
      const param = params[0]
      return `${param.name}: ${formatThousands(param.value)}个 <br> 总大小: ${formatBytes(params[1].value)}`
    },
  },
  grid: {
    containLabel: true,
    top: '8%',
    right: '2%',
    bottom: '2%',
    left: '2%',
  },
  xAxis: {
    type: 'category',
    data: [],
    axisLabel: {
      color: '',
      interval: 0, // 显示所有标签
      rotate: 0,
    },
  },
  yAxis: [
    {
      type: 'value',
      axisLine: {
        show: false, // 不显示y轴轴线
      },
      splitLine: {
        lineStyle: {
          type: 'dashed', // 设置分隔线为虚线
          color: '',
          opacity: 0.4,
        },
      },
      minInterval: 1,
      axisLabel: {
        color: '',
        formatter: (value) => {
          let res = formatNumberWithChineseAbbreviation(value)
          return res
        },
      },
    },
    {
      type: 'value',
      position: 'right',
      axisLine: {
        show: false, // 不显示y轴轴线
      },
      splitLine: {
        lineStyle: {
          opacity: 0.4,
          color: '',
        },
      },
      axisLabel: {
        color: '',
        formatter: (value) => {
          let res = formatBytes(value, { digit: 2 })
          return res
        },
      },
    },
  ],
  series: [
    {
      data: [],
      type: 'bar',
      barWidth: '20%',
      label: {
        show: true,
        position: 'top',
        formatter: (params) => {
          return formatThousands(params.value)
        },
      },
      itemStyle: {
        borderRadius: 10, // 设置柱子的圆角
        color: '',
      },
    },
    {
      data: [],
      type: 'bar',
      yAxisIndex: 1,
      barWidth: '20%',
      label: {
        show: true,
        position: 'top',
        formatter: (params) => {
          return formatBytes(params.value)
        },
      },
      itemStyle: {
        borderRadius: 10, // 设置柱子的圆角
        color: '',
      },
    },
  ],
}
function formatNumberWithChineseAbbreviation(num) {
  if (num >= 1e12) {
    return formatThousands(num / 1e12) + '兆'
  } else if (num >= 1e8) {
    return formatThousands(num / 1e8) + '亿'
  } else if (num >= 1e4) {
    return formatThousands(num / 1e4) + '万'
  } else {
    return formatThousands(num)
  }
}

watch(
  () => props.data,
  (val) => {
    syncCountBarOldTheme()
    isEmpty.value = val.every((v) => {
      return !v.value
    })
    let filterEmptyData = val.filter((v) => {
      return v.value
    })
    let xData = filterEmptyData.map((v) => v.name)
    let yData = filterEmptyData.map((v) => v.value)
    let y2Data = filterEmptyData.map((v) => v.value2)
    if (xData.length > 4) {
      initOption.xAxis.axisLabel.rotate = 45
    } else {
      initOption.xAxis.axisLabel.rotate = 0
    }
    // _parseYAxisMax(y2Data)
    initOption.series[0].data = yData
    initOption.series[1].data = y2Data
    initOption.xAxis.data = xData
    option.value = clone(initOption)
  },
  {
    deep: true,
    immediate: true,
  },
)

watch(themeVersion, () => {
  syncCountBarOldTheme()
  option.value = clone(initOption)
})

onMounted(() => {
  if (typeof MutationObserver !== 'undefined') {
    themeObserver = new MutationObserver(() => {
      themeVersion.value += 1
    })
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class', 'data-theme', 'style'],
    })
  }
})

onBeforeUnmount(() => {
  themeObserver?.disconnect()
})
</script>

<template>
  <div class="s-count-bar-old">
    <s-empty v-if="isEmpty" class="s-count-bar-old__empty" />
    <SChart v-else class="s-count-bar-old__chart" :option="option" width="100%" height="100%" />
  </div>
</template>

<style lang="scss" scoped>
.s-count-bar-old {
  min-width: 0;
  height: 100%;
}

.s-count-bar-old__empty {
  height: 100%;
}

.s-count-bar-old__chart {
  height: 100%;
  min-height: 100px;
}
</style>
