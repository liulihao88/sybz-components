<script setup lang="ts">
import { computed, ref, useAttrs } from 'vue'
import { processWidth } from '@sybz-components/utils'
import SCompTitle from '@/components/compTitle'
import useGlobalComponentConfig from '@/hooks/useGlobalComponentConfig'

defineOptions({
  name: 'SDatePicker',
  inheritAttrs: false,
})
const attrs = useAttrs()
const datePickerRef = ref()
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
  boxStyle: {
    type: Object,
    default: () => ({}),
  },
  theme: {
    type: String,
    default: '',
    validator: (value: string) => ['', 'chenghua'].includes(value),
  },
})
const mergedProps = useGlobalComponentConfig('datePicker', props)

const oneDay = 3600 * 1000 * 24
const pickerType = computed(() => String(attrs.type || 'date'))
const isRangeType = computed(() => ['daterange', 'datetimerange', 'monthrange', 'yearrange'].includes(pickerType.value))

const getDayStartTime = (date = new Date()) => new Date(date.toLocaleDateString()).getTime()

const defaultRangeShortcuts = [
  {
    text: '今天',
    value: () => {
      const startTimestamp = getDayStartTime()
      return [new Date(startTimestamp), new Date(startTimestamp + oneDay - 1)]
    },
  },
  {
    text: '昨天',
    value: () => {
      const todayStart = getDayStartTime()
      return [new Date(todayStart - oneDay), new Date(todayStart - 1)]
    },
  },
  {
    text: '最近7天',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - oneDay * (7 - 1))
      return [start, end]
    },
  },
  {
    text: '本周',
    value: () => {
      const end = new Date()
      const start = new Date()
      const day = start.getDay() || 7
      start.setTime(start.getTime() - oneDay * (day - 1))
      return [start, end]
    },
  },
  {
    text: '上周',
    value: () => {
      const end = new Date()
      const start = new Date()
      const day = start.getDay() || 7
      start.setTime(start.getTime() - oneDay * (day - 1 + 7))
      end.setTime(end.getTime() - oneDay * day)
      return [start, end]
    },
  },
  {
    text: '本月',
    value: () => {
      const end = new Date()
      const start = new Date(getDayStartTime())
      start.setDate(1)
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
      start.setTime(start.getTime() - oneDay * 30)
      return [start, end]
    },
  },
  {
    text: '最近90天',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - oneDay * 90)
      return [start, end]
    },
  },
  {
    text: '最近1年',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - oneDay * 365)
      return [start, end]
    },
  },
  {
    text: '一月以前30天',
    value: () => {
      const todayStart = getDayStartTime()
      return [new Date(todayStart - oneDay * 60), new Date(todayStart - oneDay * 30)]
    },
  },
]

const defaultSingleShortcuts = [
  {
    text: '今天',
    value: () => new Date(),
  },
  {
    text: '昨天',
    value: () => {
      const date = new Date()
      date.setTime(date.getTime() - oneDay)
      return date
    },
  },
  {
    text: '一周前',
    value: () => {
      const date = new Date()
      date.setTime(date.getTime() - oneDay * 7)
      return date
    },
  },
]

const shortcuts = computed(() => {
  if (Array.isArray(attrs.shortcuts)) {
    return attrs.shortcuts
  }

  if (attrs.shortcuts === false) {
    return undefined
  }

  return isRangeType.value ? defaultRangeShortcuts : defaultSingleShortcuts
})

const datePickerStyle = computed(() => {
  const style: Record<string, any> = {}

  if (mergedProps.value.width) {
    style.width = processWidth(mergedProps.value.width, true)
  }

  if (mergedProps.value.height) {
    const datePickerHeight = processWidth(mergedProps.value.height, true)
    style.height = datePickerHeight
    style['--s-date-picker-height'] = datePickerHeight
    style['--el-input-height'] = datePickerHeight
  }

  return style
})
const datePickerClass = computed(() => ({
  's-date-picker--chenghua': mergedProps.value.theme === 'chenghua',
  'has-title': !!mergedProps.value.title,
}))
const rootClass = computed<any>(() => [datePickerClass.value, attrs.class])
const rootStyle = computed<any>(() => [datePickerStyle.value, attrs.style])
const inheritedPopperClass = computed(() => {
  return [attrs['popper-class'], attrs.popperClass].filter((item) => typeof item === 'string' && item.trim()).join(' ')
})
const datePickerPopperClass = computed(() => {
  return [inheritedPopperClass.value, mergedProps.value.theme === 'chenghua' ? 's-date-picker__popper--chenghua' : '']
    .filter(Boolean)
    .join(' ')
})

const defaultFormat = computed(() => {
  if (['datetime', 'datetimerange'].includes(pickerType.value)) {
    return 'YYYY-MM-DD HH:mm:ss'
  }

  if (pickerType.value === 'year' || pickerType.value === 'years' || pickerType.value === 'yearrange') {
    return 'YYYY'
  }

  if (pickerType.value === 'month' || pickerType.value === 'months' || pickerType.value === 'monthrange') {
    return 'YYYY-MM'
  }

  if (pickerType.value === 'week') {
    return 'YYYY 第 ww 周'
  }

  return 'YYYY-MM-DD'
})

const defaultValueFormat = computed(() => {
  if (['datetime', 'datetimerange'].includes(pickerType.value)) {
    return 'YYYY-MM-DD HH:mm:ss'
  }

  if (pickerType.value === 'year' || pickerType.value === 'years' || pickerType.value === 'yearrange') {
    return 'YYYY'
  }

  if (pickerType.value === 'month' || pickerType.value === 'months' || pickerType.value === 'monthrange') {
    return 'YYYY-MM'
  }

  return 'YYYY-MM-DD'
})

const mergedAttrs = computed(() => {
  const baseAttrs: Record<string, any> = {
    'value-format': defaultValueFormat.value,
    format: defaultFormat.value,
    type: 'date',
    placeholder: '请选择日期',
    'start-placeholder': '开始日期',
    'end-placeholder': '结束日期',
    'range-separator': '-',
  }
  const merged = {
    ...baseAttrs,
    ...Object.entries(attrs).reduce<Record<string, any>>((obj, [key, value]) => {
      if (!['boxStyle', 'class', 'style', 'popper-class', 'popperClass', 'shortcuts'].includes(key)) {
        obj[key] = value
      }
      return obj
    }, {}),
  }

  if (shortcuts.value) {
    merged.shortcuts = shortcuts.value
  }

  if (datePickerPopperClass.value) {
    merged['popper-class'] = datePickerPopperClass.value
  }

  return merged
})

defineExpose({
  focus: () => datePickerRef.value?.focus(),
  blur: () => datePickerRef.value?.blur(),
  handleOpen: () => datePickerRef.value?.handleOpen(),
  handleClose: () => datePickerRef.value?.handleClose(),
})
</script>

<template>
  <span class="s-date-picker" :class="rootClass" :style="rootStyle">
    <s-comp-title
      :title="mergedProps.title"
      :size="attrs.size"
      :boxStyle="mergedProps.boxStyle"
      :theme="mergedProps.theme"
    ></s-comp-title>
    <el-date-picker ref="datePickerRef" v-bind="mergedAttrs" class="s-date-picker__picker">
      <template v-for="(_, slotName) in $slots" #[slotName]="slotProps">
        <slot :name="slotName" v-bind="slotProps"></slot>
      </template>
    </el-date-picker>
  </span>
</template>

<style scoped lang="scss">
.s-date-picker {
  display: inline-flex;
  align-items: stretch;
  vertical-align: middle;

  :deep(.el-date-editor) {
    flex: 1;
    height: 100%;
    min-height: var(--s-date-picker-height, var(--el-input-height, 32px));
  }
}
</style>
