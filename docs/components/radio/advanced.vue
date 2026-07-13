<script setup lang="ts">
import { computed, ref } from 'vue'

const status = ref('pending')
const pendingCount = ref(0)
const completedCount = ref(0)

setTimeout(() => {
  pendingCount.value = pendingCount.value + 2
  completedCount.value = completedCount.value + 1
}, 3000)

const statusOptions = computed(() => {
  return [
    {
      label: `待处理 ${pendingCount.value}`,
      value: 'pending',
      color: '#f0444c',
      class: ['status-radio', 'pending-radio'],
    },
    {
      label: `已完结 ${completedCount.value}`,
      value: 'completed',
      color: '#16a66a',
      class: ['status-radio', 'completed-radio'],
    },
  ]
})
</script>

<template>
  <s-radio v-model="status" show-type="button" :options="statusOptions" theme="shijingshan" />
</template>

<style scoped lang="scss">
:deep(.status-radio .el-radio-button__inner) {
  min-width: 80px;
  font-weight: 900;
  // font-size: 16px;
  // background: blue;
  // color: red;
}

:deep(.pending-radio .el-radio-button__inner) {
  text-align: left;
}

:deep(.completed-radio .el-radio-button__inner) {
  text-align: right;
}
</style>
