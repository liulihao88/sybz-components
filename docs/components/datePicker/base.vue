<script setup lang="ts">
import { ref } from 'vue'

const dateValue = ref('')
</script>

<template>
  <div class="date-picker-demo">
    <s-date-picker v-model="dateValue"></s-date-picker>
    <div class="demo-value">{{ dateValue }}</div>
  </div>
</template>

<style scoped lang="scss">
.date-picker-demo {
  display: grid;
  gap: 12px;
}

.demo-value {
  color: var(--el-text-color-secondary);
  font-size: 12px;
}
</style>
