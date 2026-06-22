<script setup lang="ts">
import { ref } from 'vue'

const dateValue = ref('')
const timestampValue = ref('')
const customValue = ref('')
</script>

<template>
  <div class="date-picker-demo">
    <div class="demo-meta">
      <span>属性: format</span>
      <span>可选值: dayjs 格式字符串</span>
      <span>默认值: YYYY-MM-DD</span>
      <span>属性: value-format</span>
      <span>可选值: dayjs 格式字符串 | x | X</span>
      <span>默认值: YYYY-MM-DD</span>
    </div>

    <div class="demo-list">
      <s-date-picker v-model="dateValue" format="YYYY/MM/DD" value-format="YYYY/MM/DD"></s-date-picker>
      <s-date-picker v-model="timestampValue" type="datetime" value-format="x" width="360"></s-date-picker>
      <s-date-picker v-model="customValue" type="month" format="YYYY 年 MM 月" value-format="YYYY-MM"></s-date-picker>
    </div>

    <div class="demo-value">{{ dateValue }} / {{ timestampValue }} / {{ customValue }}</div>
  </div>
</template>

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
