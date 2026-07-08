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
