<script setup lang="ts">
import { ref } from 'vue'

const rangeValue = ref([])
const dateValue = ref('')
</script>

<template>
  <div class="date-range-chenghua-demo">
    <div class="date-range-chenghua-demo__meta">
      <span>属性: theme</span>
      <span>可选值: '' | 'chenghua'</span>
      <span>默认值: ''</span>
      <span>属性: type</span>
      <span>可选值: date | datetime | daterange | datetimerange | monthrange | yearrange</span>
      <span>默认值: daterange</span>
      <span>属性: width</span>
      <span>可选值: string | number</span>
      <span>默认值: 300px</span>
      <span>属性: height</span>
      <span>可选值: string | number</span>
      <span>默认值: ''</span>
    </div>

    <div class="date-range-chenghua-demo__list">
      <s-date-range
        v-model="rangeValue"
        theme="chenghua"
        title="审核周期"
        width="520"
        height="40"
        :boxStyle="{ width: 84 }"
      ></s-date-range>
      <s-date-range
        v-model="dateValue"
        theme="chenghua"
        title="发布日期"
        type="date"
        width="320"
        height="40"
        placeholder="选择发布日期"
        :boxStyle="{ width: 84 }"
      ></s-date-range>
    </div>
  </div>
</template>

<style scoped lang="scss">
.date-range-chenghua-demo {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.date-range-chenghua-demo__meta {
  display: flex;
  flex-wrap: wrap;
  gap: 8px 12px;
  color: var(--el-text-color-secondary);
  font-size: 12px;
  line-height: 1.5;
}

.date-range-chenghua-demo__list {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  align-items: center;
}
</style>
