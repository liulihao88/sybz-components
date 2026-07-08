<script setup lang="ts">
import { ref } from 'vue'

const yearValue = ref('')
const yearsValue = ref([])
const monthValue = ref('')
const monthsValue = ref([])
const weekValue = ref('')
const datesValue = ref([])
</script>

<template>
  <div class="date-picker-demo">
    <div class="demo-list">
      <s-date-picker v-model="yearValue" type="year" placeholder="选择年份"></s-date-picker>
      <s-date-picker v-model="yearsValue" type="years" placeholder="选择多个年份"></s-date-picker>
      <s-date-picker v-model="monthValue" type="month" placeholder="选择月份"></s-date-picker>
      <s-date-picker v-model="monthsValue" type="months" placeholder="选择多个月份"></s-date-picker>
      <s-date-picker v-model="weekValue" type="week" placeholder="选择周" show-week-number></s-date-picker>
      <s-date-picker v-model="datesValue" type="dates" placeholder="选择多个日期"></s-date-picker>
    </div>

    <div class="demo-value">
      {{ yearValue }} / {{ yearsValue }} / {{ monthValue }} / {{ monthsValue }} / {{ weekValue }} / {{ datesValue }}
    </div>
  </div>
</template>

<style scoped lang="scss">
.date-picker-demo {
  display: grid;
  gap: 12px;
}

.demo-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px 12px;
}

.demo-value {
  color: var(--el-text-color-secondary);
  font-size: 12px;
  line-height: 1.5;
}
</style>
