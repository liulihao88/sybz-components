<script setup lang="ts">
import { ref } from 'vue'

const dateRange = ref([null, null])
const choiceStartDate = ref<number | ''>('')

const disabledDate = (time: Date) => {
  if (choiceStartDate.value) {
    const oneDay = 24 * 60 * 60 * 1000
    const minTime = choiceStartDate.value - 7 * oneDay
    const maxTime = choiceStartDate.value + 7 * oneDay
    return time.getTime() < minTime || time.getTime() > maxTime
  }

  return false
}

const calendarChange = (value: [Date, Date]) => {
  const [start, end] = value

  if (start && !end) {
    choiceStartDate.value = start.getTime()
    return
  }

  choiceStartDate.value = ''
}
</script>

<template>
  <div class="date-picker-demo">
    <div class="demo-meta">
      <span>属性: disabled-date</span>
      <span>可选值: (date: Date) => boolean</span>
      <span>默认值: undefined</span>
      <span>事件: calendar-change</span>
      <span>可选值: (value) => void</span>
      <span>默认值: undefined</span>
    </div>

    <s-date-picker
      v-model="dateRange"
      type="daterange"
      width="520"
      format="YYYY-MM-DD"
      value-format="YYYY-MM-DD"
      :disabled-date="disabledDate"
      @calendar-change="calendarChange"
    ></s-date-picker>

    <div class="demo-value">{{ dateRange }}</div>
  </div>
</template>

<style scoped lang="scss">
.date-picker-demo {
  display: grid;
  gap: 12px;
}

.demo-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 8px 12px;
}

.demo-meta,
.demo-value {
  color: var(--el-text-color-secondary);
  font-size: 12px;
  line-height: 1.5;
}
</style>
