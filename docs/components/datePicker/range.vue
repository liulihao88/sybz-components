<template>
  <div class="date-picker-demo">
    <div class="demo-meta">
      <span>属性: type</span>
      <span>可选值: daterange | datetimerange | monthrange | yearrange</span>
      <span>默认值: date</span>
      <span>属性: unlink-panels</span>
      <span>可选值: boolean</span>
      <span>默认值: false</span>
      <span>属性: range-separator</span>
      <span>可选值: string</span>
      <span>默认值: -</span>
    </div>

    <div class="demo-list">
      <s-date-picker
        v-model="dateRange"
        type="daterange"
        width="520"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
      ></s-date-picker>
      <s-date-picker
        v-model="dateTimeRange"
        type="datetimerange"
        width="640"
        range-separator="至"
        start-placeholder="开始时间"
        end-placeholder="结束时间"
        unlink-panels
      ></s-date-picker>
      <s-date-picker
        v-model="monthRange"
        type="monthrange"
        width="520"
        start-placeholder="开始月份"
        end-placeholder="结束月份"
      ></s-date-picker>
      <s-date-picker
        v-model="yearRange"
        type="yearrange"
        width="520"
        start-placeholder="开始年份"
        end-placeholder="结束年份"
      ></s-date-picker>
    </div>

    <div class="demo-value">{{ dateRange }} / {{ dateTimeRange }} / {{ monthRange }} / {{ yearRange }}</div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const dateRange = ref([])
const dateTimeRange = ref([])
const monthRange = ref([])
const yearRange = ref([])
</script>

<style scoped lang="scss">
.date-picker-demo {
  display: grid;
  gap: 12px;
}

.demo-meta,
.demo-list {
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
