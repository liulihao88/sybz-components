<script setup lang="ts">
import { ref } from 'vue'

const maxValue = ref('25.66736')
</script>

<template>
  <s-input v-model="maxValue" top-title="X 最大值最大" width="300" />
  <s-input v-model="maxValue" top-title="X 最大值最大" width="300" disabled />
</template>
