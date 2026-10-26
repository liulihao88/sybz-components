<script setup lang="ts">
import { ref } from 'vue'

const value = ref('number')
const options = [
  { label: '定义与数值', value: 'number' },
  { label: '显示与格式', value: 'format' },
]
</script>

<template>
  <s-select v-model="value" :options="options" top-title="显示" :show-quick="false" width="300" />
  <s-select v-model="value" :options="options" top-title="显示" disabled width="300" />
</template>
