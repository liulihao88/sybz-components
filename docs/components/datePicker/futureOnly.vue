<script setup lang="ts">
import { ref } from 'vue'

const dateValue = ref('')
const datetimeValue = ref('')
const rangeValue = ref([])
</script>

<template>
  <div class="date-picker-future-demo">
    <s-date-picker v-model="dateValue" future-only placeholder="选择今天或未来日期" />
    <s-date-picker
      v-model="datetimeValue"
      future-only
      type="datetime"
      width="360"
      placeholder="选择当前时刻以后的时间"
    />
    <s-date-picker
      v-model="rangeValue"
      future-only
      type="daterange"
      width="520"
      start-placeholder="未来开始日期"
      end-placeholder="未来结束日期"
    />
  </div>
</template>

<style scoped>
.date-picker-future-demo {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}
</style>
