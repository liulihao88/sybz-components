<script setup lang="ts">
import { ref } from 'vue'

const status = ref('pending')
const pendingCount = ref(3)
const completedCount = ref(1)
const statusOptions = [
  { label: '待处理', value: 'pending', color: '#f0444c' },
  { label: '已完结', value: 'completed', color: '#16a66a' },
]

function customLabel({ option }) {
  const count = option.value === 'pending' ? pendingCount.value : completedCount.value
  return `${option.label} ${count}`
}
</script>

<template>
  <s-radio v-model="status" show-type="button" :options="statusOptions" :custom-label="customLabel" size="small" />
</template>
