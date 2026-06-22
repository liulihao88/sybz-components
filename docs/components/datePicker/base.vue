<script setup lang="ts">
import { ref } from 'vue'

const dateValue = ref('')
</script>

<template>
  <div class="date-picker-demo">
    <div class="demo-meta">
      <span>属性: type</span>
      <span>
        可选值: year | years | month | months | date | dates | week | datetime | daterange | datetimerange | monthrange
        | yearrange
      </span>
      <span>默认值: date</span>
      <span>属性: value-format</span>
      <span>可选值: dayjs 格式字符串 | x | X</span>
      <span>默认值: YYYY-MM-DD</span>
      <span>属性: width</span>
      <span>可选值: string | number</span>
      <span>默认值: 300px</span>
    </div>

    <s-date-picker v-model="dateValue"></s-date-picker>
    <div class="demo-value">{{ dateValue }}</div>
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
  color: var(--el-text-color-secondary);
  font-size: 12px;
  line-height: 1.5;
}

.demo-value {
  color: var(--el-text-color-secondary);
  font-size: 12px;
}
</style>
