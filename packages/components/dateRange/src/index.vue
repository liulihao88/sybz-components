<script setup lang="ts">
import { ref, useAttrs, getCurrentInstance, computed } from 'vue'
import { processWidth } from '@/utils/src'
import SCompTitle from '@/components/compTitle'
import useGlobalComponentConfig from '@/hooks/useGlobalComponentConfig'

defineOptions({
  name: 'SDateRange',
})
const attrs = useAttrs()
const props = defineProps({
  title: {
    type: String,
    default: '',
  },
  width: {
    type: [String, Number],
    default: '300px',
  },
  height: {
    type: [String, Number],
    default: '',
  },
  theme: {
    type: String,
    default: '',
    validator: (value: string) => ['', 'chenghua'].includes(value),
  },
})
const mergedProps = useGlobalComponentConfig('dateRange', props)

const oneDay = 3600 * 1000 * 24
const shortcuts = computed(() => {
  if (mergedAttrs.value.type === 'daterange' || mergedAttrs.value.type === 'datetimerange') {
    return [
      {
        text: '今天',
        value: () => {
          const startTimestamp = new Date(new Date().toLocaleDateString()).getTime()
          return [new Date(startTimestamp), new Date(startTimestamp + oneDay - 1)]
        },
      },
      {
        text: '昨天',
        value: () => {
          const start = new Date(new Date(new Date().toLocaleDateString()).getTime() - oneDay)
          const yesEnd = new Date(new Date(new Date().toLocaleDateString()).getTime() - 1)
          return [start, yesEnd]
        },
      },
      {
        text: '最近7天',
        value: () => {
          const end = new Date()
          const start = new Date()
          start.setTime(start.getTime() - 3600 * 1000 * 24 * (7 - 1))
          return [start, end]
        },
      },
      {
        text: '本周',
        value: () => {
          const end = new Date()
          const start = new Date()
          const nows = start.getDay() || 7
          start.setTime(start.getTime() - 3600 * 1000 * 24 * (nows - 1))
          return [start, end]
        },
      },
      {
        text: '上周',
        value: () => {
          const end = new Date()
          const start = new Date()
          const nows = start.getDay() || 7
          console.log(`63 nows`, nows)
          start.setTime(start.getTime() - 3600 * 1000 * 24 * (nows - 1 + 7))
          end.setTime(end.getTime() - 3600 * 1000 * 24 * nows)
          return [start, end]
        },
      },
      {
        // 本月起始时间-本月结束
        text: '本月',
        value: () => {
          const nowTemp = new Date().getTime() // 当前时间戳-1673325323605
          const nextMonth = nowTemp + oneDay * new Date().getDate() // 保证是下个月1676090190150
          const end = new Date()
          const start = new Date(new Date(new Date().toLocaleDateString()).setDate(1))
          return [start, end]
        },
      },
      {
        text: '上月',
        value: () => {
          const start = new Date()
          const end = new Date(start)
          end.setMonth(start.getMonth())
          start.setMonth(start.getMonth() - 1)
          end.setDate(0)
          start.setDate(1)
          return [start, end]
        },
      },
      {
        text: '最近30天',
        value: () => {
          const end = new Date()
          const start = new Date()
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
          return [start, end]
        },
      },
      {
        text: '最近90天',
        value: () => {
          const end = new Date()
          const start = new Date()
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
          return [start, end]
        },
      },
      {
        text: '最近1年',
        value: () => {
          const end = new Date()
          const start = new Date()
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 365)
          return [start, end]
        },
      },
      {
        text: '一月以前30天',
        value: () => {
          const start = new Date(new Date(new Date().toLocaleDateString()).getTime() - oneDay * 60)
          const yesEnd = new Date(new Date(new Date().toLocaleDateString()).getTime() - oneDay * 30)
          return [start, yesEnd]
        },
      },
    ]
  } else {
    return [
      {
        text: '今天',
        value: new Date(),
      },
      {
        text: '昨天',
        value: () => {
          const date = new Date()
          date.setTime(date.getTime() - 3600 * 1000 * 24)
          return date
        },
      },
      {
        text: '一周前',
        value: () => {
          const date = new Date()
          date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
          return date
        },
      },
    ]
  }
})
const dateRangeStyle = computed(() => {
  const style: Record<string, any> = {}

  if (mergedProps.value.width) {
    style.width = processWidth(mergedProps.value.width, true)
  }

  if (mergedProps.value.height) {
    const dateRangeHeight = processWidth(mergedProps.value.height, true)
    style.height = dateRangeHeight
    style['--s-date-range-height'] = dateRangeHeight
    style['--el-input-height'] = dateRangeHeight
  }

  return style
})
const dateRangeClass = computed(() => ({
  's-date-range--chenghua': mergedProps.value.theme === 'chenghua',
  'has-title': !!mergedProps.value.title,
}))
const inheritedPopperClass = computed(() => {
  return [attrs['popper-class'], attrs.popperClass]
    .filter((item) => typeof item === 'string' && item.trim())
    .join(' ')
})
const dateRangePopperClass = computed(() => {
  return [
    inheritedPopperClass.value,
    mergedProps.value.theme === 'chenghua' ? 's-date-range__popper--chenghua' : '',
  ]
    .filter(Boolean)
    .join(' ')
})
/**
* @描述 日期dateRange选择框
* @使用方法
const dateValue = ref([])
<s-date-range
  v-model="dateValue"
  format="YYYY-MM-DD HH:mm:ss"
></s-date-range>
* @param
*/

const mergedAttrs = computed(() => {
  const baseAttrs: Record<string, any> = {
    'value-format': 'YYYY-MM-DD HH:mm:ss',
    format: attrs.type !== 'datetime' ? 'YYYY-MM-DD' : 'YYYY-MM-DD HH:mm:ss',
    type: 'daterange',
    placeholder: '请选择日期',
    'start-placeholder': '开始日期',
    'end-placeholder': '结束日期',
    'range-separator': '-',
  }
  const merged = {
    ...baseAttrs,
    ...Object.entries(attrs).reduce<Record<string, any>>((obj, [key, value]) => {
      if (!['class', 'style', 'popper-class', 'popperClass'].includes(key)) {
        obj[key] = value
      }
      return obj
    }, {}),
  }
  if (dateRangePopperClass.value) {
    merged['popper-class'] = dateRangePopperClass.value
  }
  console.log(`66 merged`, merged)
  return merged
})
</script>

<template>
  <span class="s-date-range" :class="dateRangeClass" :style="dateRangeStyle">
    <s-comp-title :title="mergedProps.title" :size="attrs.size" :boxStyle="$attrs.boxStyle ?? {}"></s-comp-title>
    <el-date-picker :shortcuts="shortcuts" v-bind="mergedAttrs" class="s-date-range__picker"></el-date-picker>
  </span>
</template>

<style scoped lang="scss">
.s-date-range {
  display: inline-flex;
  align-items: stretch;
  vertical-align: middle;

  :deep(.el-date-editor) {
    flex: 1;
    height: 100%;
    min-height: var(--s-date-range-height, var(--el-input-height, 32px));
  }
}
</style>
