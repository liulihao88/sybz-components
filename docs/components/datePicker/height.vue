<script setup lang="ts">
import { ref } from 'vue'

const rangeValue = ref([])
const dateValue = ref('')
</script>

<template>
  <div class="date-picker-height-demo">
    <div class="demo-list">
      <s-date-picker
        v-model="rangeValue"
        title="时间范围"
        type="daterange"
        width="520"
        height="40"
        :comp-title-style="{ width: 84 }"
      ></s-date-picker>
      <s-date-picker v-model="dateValue" title="日期" type="date" width="280" height="48"></s-date-picker>
    </div>
  </div>
</template>

<style scoped lang="scss">
.date-picker-height-demo {
  display: grid;
  gap: 16px;
}

.demo-list {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  align-items: center;
}
</style>
