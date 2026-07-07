<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch, computed, defineAsyncComponent } from 'vue'
const VChart = defineAsyncComponent(async () => {
  await import('@/utils/local/useEcharts')
  return import('vue-echarts')
}) // 因为直接引入vue-echarts, 使用vitepress打包回报错, 在使用 VitePress 打包时，如果引入的 vue-echarts 中包含对 document 的引用，可能会导致 document is not defined 的错误。这是因为 VitePress 使用了服务器端渲染（SSR），而 document 是浏览器环境中的对象，在服务器端环境中不存在。以下是几种可能的解决
import { getPieColorByDataIndex } from '@/utils/local/packageUtils'
import { formatBytes, formatBytesConvert, clone, getVariable } from '@sybz-components/utils'
defineOptions({
  name: 'SQuotaPie',
})
interface QuotaPieProps {
  used: string | number
  total: string | number
  type?: string
  text?: string
}

const props = withDefaults(defineProps<QuotaPieProps>(), {
  type: 'used',
  text: '总使用量 / 总可用量',
})
// 添加容器尺寸的响应式引用
const containerRef = ref(null)
const containerSize = ref({ width: 0, height: 0 })
const isEmpty = ref(false)
const options = ref()

const usedNum = ref(0)
const totalNum = ref(0)
let resizeObserver: ResizeObserver | null = null
let themeObserver: MutationObserver | null = null

const usedPercent = computed(() => `${((usedNum.value / totalNum.value) * 100).toFixed(2)}%`)
const getValue = computed(() => {
  let num = `${formatBytes(formatBytesConvert(props.used))} / ${formatBytes(formatBytesConvert(props.total))}`
  return `${usedPercent.value}\n\n${num}\n\n${props.text}`
})
const toFiniteNumber = (value: unknown) => {
  const numberValue = Number(value)
  return Number.isFinite(numberValue) ? numberValue : 0
}

const syncQuotaPieTheme = () => {
  initOptions.title.textStyle.color = getVariable('--blue')
  initOptions.series[0].label.backgroundColor = getVariable('--chart-pie-label-bg')
  initOptions.series[0].label.borderColor = getVariable('--chart-pie-divider')
  initOptions.series[0].label.textStyle.color = getVariable('--chart-pie-label-text')
  initOptions.series[0].label.rich.a.color = getVariable('--chart-pie-label-muted')
  initOptions.series[0].label.rich.hr.borderColor = getVariable('--chart-pie-divider')
  initOptions.series[0].label.rich.b.color = getVariable('--chart-pie-label-strong')
  initOptions.graphic.style.fill = getVariable('--chart-center-text')
}

const updateChartOptions = () => {
  syncQuotaPieTheme()
  initOptions.series[0].data = [usedNum.value, totalNum.value - usedNum.value]
  initOptions.graphic.style.text = getValue.value
  options.value = clone(initOptions)
}

let initOptions = {
  title: {
    text: '',
    textStyle: {
      color: '',
      fontSize: 16,
    },
  },
  legend: {
    top: 'bottom',
    textStyle: {
      fontSize: 10, // 更改图例文本字体大小为 14px
    },
    left: 'center',
  },
  tooltip: {
    trigger: 'item',
    show: false,
  },
  toolbox: {
    show: true,
    feature: {
      mark: { show: true },
    },
  },
  series: [
    {
      type: 'pie',
      radius: ['75%', '95%'], // 设置饼图的内外半径，内容显示在内部
      center: ['50%', '50%'], // 设置饼图的中心位置
      label: {
        backgroundColor: '',
        borderColor: '',
        position: 'inner', // 标签显示在扇形内部
        borderRadius: 4,
        textStyle: {
          fontSize: 12,
          color: '',
        },
        rich: {
          a: {
            color: '',
            lineHeight: 22,
            fontSize: 10,
            align: 'center',
          },
          hr: {
            borderColor: '',
            width: '100%',
            borderWidth: 1,
            height: 0,
          },
          b: {
            color: '',
            fontSize: 12,
            fontWeight: 'bold',
            lineHeight: 33,
          },
        },
      },
      itemStyle: {
        borderRadius: 8,
        color: (params) => getPieColorByDataIndex(params, usedPercent.value),
      },
      data: [],
    },
  ],
  graphic: {
    type: 'text',
    left: 'center',
    top: 'center',
    style: {
      text: '', // 自定义文本内容
      textAlign: 'center',
      fill: '',
      fontSize: 14,
      fontWeight: 'bold',
    },
  },
}

watch(
  () => [props.used, props.total],
  ([usedNew, totalNew]) => {
    if (usedNew || totalNew) {
      isEmpty.value = false
      usedNum.value = toFiniteNumber(formatBytesConvert(usedNew))
      totalNum.value = toFiniteNumber(formatBytesConvert(totalNew))
      updateChartOptions()
    } else {
      isEmpty.value = true
    }
  },
  {
    deep: true,
    immediate: true,
  },
)

// 根据容器尺寸调整字体大小的函数
const adjustFontSize = (width: number, height: number) => {
  let baseSize = Math.min(width, height) / 20

  const minFontSize = 10
  const maxFontSize = 24
  if (baseSize < minFontSize) {
    baseSize = minFontSize
  } else if (baseSize > maxFontSize) {
    baseSize = maxFontSize
  }
  initOptions.graphic.style.fontSize = baseSize // 中央文本大小

  initOptions.series[0].label.textStyle = {
    fontSize: baseSize / 30,
    color: getVariable('--chart-pie-label-text'),
  }

  initOptions.title.textStyle = {
    color: getVariable('--blue'),
    fontSize: baseSize / 25,
  }

  initOptions.legend.textStyle = {
    fontSize: baseSize / 35,
  }

  updateChartOptions()
}

// 监听容器大小变化
onMounted(() => {
  resizeObserver = new ResizeObserver((entries) => {
    for (let entry of entries) {
      const { width, height } = entry.contentRect
      containerSize.value = { width, height }
      adjustFontSize(width, height)
    }
  })

  if (containerRef.value) {
    resizeObserver.observe(containerRef.value)
  }

  if (typeof MutationObserver !== 'undefined') {
    themeObserver = new MutationObserver(() => {
      updateChartOptions()
    })
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class', 'data-theme', 'style'],
    })
  }
})

onBeforeUnmount(() => {
  resizeObserver?.disconnect()
  themeObserver?.disconnect()
})
</script>

<template>
  <template v-if="isEmpty">
    <s-empty class="s-quota-pie__empty" />
  </template>
  <template v-else>
    <div ref="containerRef" class="vChart-box">
      <v-chart class="s-quota-pie__chart" :option="options" autoresize />
    </div>
  </template>
</template>

<style lang="scss" scoped>
.s-quota-pie__empty {
  height: 100%;
}

.s-quota-pie__chart {
  height: 100%;
  min-height: 100px;
}
</style>
