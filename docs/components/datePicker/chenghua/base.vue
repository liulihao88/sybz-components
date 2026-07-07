<script setup lang="ts">
import { ref } from 'vue'

const rangeValue = ref([])
const dateValue = ref('')
</script>

<template>
  <div class="date-picker-chenghua-demo">
    <div class="date-picker-chenghua-demo__meta">
      <span>属性: theme</span>
      <span>可选值: '' | 'chenghua' | 'shijingshan'</span>
      <span>默认值: ''</span>
      <span>属性: type</span>
      <span>
        可选值: year | years | month | months | date | dates | week | datetime | daterange | datetimerange | monthrange
        | yearrange
      </span>
      <span>默认值: date</span>
      <span>属性: width</span>
      <span>可选值: string | number</span>
      <span>默认值: 300px</span>
      <span>属性: height</span>
      <span>可选值: string | number</span>
      <span>默认值: ''</span>
      <span>属性: compTitleStyle</span>
      <span>可选值: object</span>
      <span>默认值: {}</span>
    </div>

    <div class="date-picker-chenghua-demo__list">
      <s-date-picker
        v-model="rangeValue"
        theme="chenghua"
        type="daterange"
        title="审核周期"
        width="520"
        height="40"
      ></s-date-picker>
      <s-date-picker
        v-model="dateValue"
        theme="chenghua"
        title="发布日期"
        type="date"
        width="320"
        height="40"
        placeholder="选择发布日期"
      ></s-date-picker>
    </div>
  </div>
</template>

<style scoped lang="scss">
.date-picker-chenghua-demo {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.date-picker-chenghua-demo__meta {
  display: flex;
  flex-wrap: wrap;
  gap: 8px 12px;
  color: var(--el-text-color-secondary);
  font-size: 12px;
  line-height: 1.5;
}

.date-picker-chenghua-demo__list {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  align-items: center;
}
</style>
