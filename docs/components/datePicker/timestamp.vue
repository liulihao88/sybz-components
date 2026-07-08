<script setup lang="ts">
import { ref } from 'vue'

const millisecondValue = ref('')
const secondValue = ref('')
const rangeValue = ref([])
</script>

<template>
  <div class="date-picker-demo">
    <div class="demo-list">
      <s-date-picker
        v-model="millisecondValue"
        type="datetime"
        value-format="x"
        width="360"
        placeholder="毫秒时间戳"
      ></s-date-picker>
      <s-date-picker
        v-model="secondValue"
        type="datetime"
        value-format="X"
        width="360"
        placeholder="秒级时间戳"
      ></s-date-picker>
      <s-date-picker
        v-model="rangeValue"
        type="datetimerange"
        value-format="x"
        width="640"
        start-placeholder="开始时间戳"
        end-placeholder="结束时间戳"
      ></s-date-picker>
    </div>

    <div class="demo-value">{{ millisecondValue }} / {{ secondValue }} / {{ rangeValue }}</div>
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
