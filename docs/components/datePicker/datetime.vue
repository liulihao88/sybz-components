<script setup lang="ts">
import { ref } from 'vue'

const datetimeValue = ref('')
const datetimeRangeValue = ref([])
</script>

<template>
  <div class="date-picker-demo">
    <div class="demo-list">
      <s-date-picker v-model="datetimeValue" type="datetime" width="360" placeholder="选择日期时间"></s-date-picker>
      <s-date-picker
        v-model="datetimeRangeValue"
        type="datetimerange"
        width="640"
        start-placeholder="开始时间"
        end-placeholder="结束时间"
      ></s-date-picker>
    </div>

    <div class="demo-value">{{ datetimeValue }} / {{ datetimeRangeValue }}</div>
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
