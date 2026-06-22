<script setup lang="ts">
import { ref } from 'vue'

const beforeDateValue = ref('')
const readonlyValue = ref('2026-06-22')
const disabledValue = ref('2026-06-22')

const disabledAfterToday = (time: Date) => {
  return time.getTime() > Date.now()
}
</script>

<template>
  <div class="date-picker-demo">
    <div class="demo-meta">
      <span>属性: disabled-date</span>
      <span>可选值: (date: Date) => boolean</span>
      <span>默认值: undefined</span>
      <span>属性: readonly</span>
      <span>可选值: boolean</span>
      <span>默认值: false</span>
      <span>属性: disabled</span>
      <span>可选值: boolean</span>
      <span>默认值: false</span>
    </div>

    <div class="demo-list">
      <s-date-picker
        v-model="beforeDateValue"
        type="datetime"
        value-format="x"
        width="360"
        placeholder="仅可选择当前时间之前"
        :disabled-date="disabledAfterToday"
      ></s-date-picker>
      <s-date-picker v-model="readonlyValue" readonly></s-date-picker>
      <s-date-picker v-model="disabledValue" disabled></s-date-picker>
    </div>

    <div class="demo-value">{{ beforeDateValue }} / {{ readonlyValue }} / {{ disabledValue }}</div>
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
