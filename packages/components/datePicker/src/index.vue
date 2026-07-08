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
interface DatePickerProps {
  title?: string
  width?: string | number
  height?: string | number
  compTitleStyle?: Record<string, any>
  theme?: 'default' | 'chenghua' | 'shijingshan'
  size?: '' | 'large' | 'default' | 'small'
}

const props = withDefaults(defineProps<DatePickerProps>(), {
  title: '',
  width: '300px',
  height: '',
  compTitleStyle: undefined,
  theme: 'default',
  size: '',
})
const mergedProps = useGlobalComponentConfig('datePicker', props)

const pickerType = computed(() => String(attrs.type || 'date'))
const isRangeType = computed(() => ['daterange', 'datetimerange', 'monthrange', 'yearrange'].includes(pickerType.value))

const startOfDay = (date = new Date()) => new Date(date.getFullYear(), date.getMonth(), date.getDate())
const endOfDay = (date = new Date()) => new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59, 999)
const getDayRange = (date = new Date()) => [startOfDay(date), endOfDay(date)]
const addDays = (date: Date, amount: number) => {
  const result = new Date(date)
  result.setDate(result.getDate() + amount)
  return result
}
const addMonths = (date: Date, amount: number) => new Date(date.getFullYear(), date.getMonth() + amount, date.getDate())
const getDaysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate()
const addYears = (date: Date, amount: number) => {
  const year = date.getFullYear() + amount
  const month = date.getMonth()
  const day = Math.min(date.getDate(), getDaysInMonth(year, month))

  return new Date(year, month, day)
}
const startOfWeek = (date = new Date()) => {
  const day = date.getDay() || 7
  return addDays(startOfDay(date), 1 - day)
}
const endOfWeek = (date = new Date()) => endOfDay(addDays(startOfWeek(date), 6))
const getWeekRange = (date = new Date()) => [startOfWeek(date), endOfWeek(date)]
const startOfMonth = (date = new Date()) => new Date(date.getFullYear(), date.getMonth(), 1)
const endOfMonth = (date = new Date()) => new Date(date.getFullYear(), date.getMonth() + 1, 0, 23, 59, 59, 999)
const getMonthRange = (date = new Date()) => [startOfMonth(date), endOfMonth(date)]
const startOfQuarter = (date = new Date()) => new Date(date.getFullYear(), Math.floor(date.getMonth() / 3) * 3, 1)
const endOfQuarter = (date = new Date()) => {
  const quarterStartMonth = Math.floor(date.getMonth() / 3) * 3
  return new Date(date.getFullYear(), quarterStartMonth + 3, 0, 23, 59, 59, 999)
}
const getQuarterRange = (date = new Date()) => [startOfQuarter(date), endOfQuarter(date)]
const startOfYear = (date = new Date()) => new Date(date.getFullYear(), 0, 1)
const endOfYear = (date = new Date()) => new Date(date.getFullYear(), 11, 31, 23, 59, 59, 999)
const getYearRange = (date = new Date()) => [startOfYear(date), endOfYear(date)]
const rangeToToday = (startDate: Date) => [startDate, endOfDay()]
const rangeToCurrentMonth = (startDate: Date) => [startDate, endOfMonth()]
const recentDays = (amount: number) => {
  const today = new Date()
  return [startOfDay(addDays(today, 1 - amount)), endOfDay(today)]
}
const recentMonths = (amount: number) => {
  const currentMonth = startOfMonth()
  return [startOfMonth(addMonths(currentMonth, 1 - amount)), endOfMonth(currentMonth)]
}
const recentYears = (amount: number) => {
  const currentYear = startOfYear()
  return [startOfYear(addYears(currentYear, 1 - amount)), endOfYear(currentYear)]
}
const recentCalendarYears = (amount: number) => {
  const today = new Date()
  return [startOfDay(addYears(today, -amount)), endOfDay(today)]
}

const defaultDateRangeShortcuts = [
  {
    text: '今天',
    value: () => getDayRange(),
  },
  {
    text: '昨天',
    value: () => getDayRange(addDays(new Date(), -1)),
  },
  {
    text: '最近7天',
    value: () => recentDays(7),
  },
  {
    text: '最近30天',
    value: () => recentDays(30),
  },
  {
    text: '最近90天',
    value: () => recentDays(90),
  },
  {
    text: '最近1年',
    value: () => recentCalendarYears(1),
  },
  {
    text: '本周至今',
    value: () => rangeToToday(startOfWeek()),
  },
  {
    text: '本月至今',
    value: () => rangeToToday(startOfMonth()),
  },
  {
    text: '本季度至今',
    value: () => rangeToToday(startOfQuarter()),
  },
  {
    text: '今年至今',
    value: () => rangeToToday(startOfYear()),
  },
  {
    text: '上周',
    value: () => getWeekRange(addDays(new Date(), -7)),
  },
  {
    text: '上月',
    value: () => getMonthRange(addMonths(startOfMonth(), -1)),
  },
  {
    text: '上季度',
    value: () => getQuarterRange(addMonths(startOfQuarter(), -3)),
  },
  {
    text: '去年',
    value: () => getYearRange(addYears(startOfYear(), -1)),
  },
]

const defaultMonthRangeShortcuts = [
  {
    text: '本月',
    value: () => getMonthRange(),
  },
  {
    text: '上月',
    value: () => getMonthRange(addMonths(startOfMonth(), -1)),
  },
  {
    text: '最近3个月',
    value: () => recentMonths(3),
  },
  {
    text: '最近6个月',
    value: () => recentMonths(6),
  },
  {
    text: '最近12个月',
    value: () => recentMonths(12),
  },
  {
    text: '今年至今',
    value: () => rangeToCurrentMonth(startOfYear()),
  },
  {
    text: '去年',
    value: () => getYearRange(addYears(startOfYear(), -1)),
  },
]

const defaultYearRangeShortcuts = [
  {
    text: '今年',
    value: () => getYearRange(),
  },
  {
    text: '去年',
    value: () => getYearRange(addYears(startOfYear(), -1)),
  },
  {
    text: '最近3年',
    value: () => recentYears(3),
  },
  {
    text: '最近5年',
    value: () => recentYears(5),
  },
  {
    text: '最近10年',
    value: () => recentYears(10),
  },
]

const defaultRangeShortcuts = computed(() => {
  if (pickerType.value === 'monthrange') {
    return defaultMonthRangeShortcuts
  }

  if (pickerType.value === 'yearrange') {
    return defaultYearRangeShortcuts
  }

  return defaultDateRangeShortcuts
})

const defaultSingleShortcuts = [
  {
    text: '今天',
    value: () => new Date(),
  },
  {
    text: '昨天',
    value: () => addDays(new Date(), -1),
  },
  {
    text: '7天前',
    value: () => addDays(new Date(), -7),
  },
  {
    text: '30天前',
    value: () => addDays(new Date(), -30),
  },
]

const shortcuts = computed(() => {
  if (Array.isArray(attrs.shortcuts)) {
    return attrs.shortcuts
  }

  if (attrs.shortcuts === false) {
    return undefined
  }

  return isRangeType.value ? defaultRangeShortcuts.value : defaultSingleShortcuts
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
  's-date-picker--shijingshan': mergedProps.value.theme === 'shijingshan',
  'has-title': !!mergedProps.value.title,
}))
const rootClass = computed<any>(() => [datePickerClass.value, attrs.class])
const rootStyle = computed<any>(() => [datePickerStyle.value, attrs.style])
const compTitleProps = computed(() => {
  const titleProps: Record<string, any> = {
    title: mergedProps.value.title,
    size: mergedProps.value.size,
    theme: mergedProps.value.theme,
  }

  if (mergedProps.value.compTitleStyle !== undefined) {
    titleProps.compTitleStyle = mergedProps.value.compTitleStyle
  }

  return titleProps
})
const inheritedPopperClass = computed(() => {
  return [attrs['popper-class'], attrs.popperClass].filter((item) => typeof item === 'string' && item.trim()).join(' ')
})
const datePickerPopperClass = computed(() => {
  return [
    inheritedPopperClass.value,
    mergedProps.value.theme === 'chenghua' ? 's-date-picker__popper--chenghua' : '',
    mergedProps.value.theme === 'shijingshan' ? 's-date-picker__popper--shijingshan' : '',
  ]
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
    size: mergedProps.value.size || undefined,
  }
  const merged = {
    ...baseAttrs,
    ...Object.entries(attrs).reduce<Record<string, any>>((obj, [key, value]) => {
      if (
        ![
          'compTitleStyle',
          'comp-title-style',
          'class',
          'style',
          'popper-class',
          'popperClass',
          'shortcuts',
          'size',
        ].includes(key)
      ) {
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
    <s-comp-title v-bind="compTitleProps"></s-comp-title>
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
