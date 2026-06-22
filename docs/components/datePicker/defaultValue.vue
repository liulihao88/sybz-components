<script setup lang="ts">
import { ref } from 'vue'

const dateValue = ref('')
const dateTimeRange = ref([])
const defaultValue = new Date(2026, 5, 22)
const defaultTime = [new Date(2000, 1, 1, 9, 0, 0), new Date(2000, 1, 1, 18, 0, 0)]
</script>

<template>
  <div class="date-picker-demo">
    <div class="demo-meta">
      <span>属性: default-value</span>
      <span>可选值: Date | Date[]</span>
      <span>默认值: undefined</span>
      <span>属性: default-time</span>
      <span>可选值: Date | Date[]</span>
      <span>默认值: undefined</span>
    </div>

    <div class="demo-list">
      <s-date-picker v-model="dateValue" :default-value="defaultValue"></s-date-picker>
      <s-date-picker
        v-model="dateTimeRange"
        type="datetimerange"
        width="640"
        :default-time="defaultTime"
        start-placeholder="默认 09:00:00"
        end-placeholder="默认 18:00:00"
      ></s-date-picker>
    </div>

    <div class="demo-value">{{ dateValue }} / {{ dateTimeRange }}</div>
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
