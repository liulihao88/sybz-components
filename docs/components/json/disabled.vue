<script setup lang="ts">
import { ref } from 'vue'

const data = ref({
  project: 'sybz-components',
  status: 'disabled',
  locked: true,
})
</script>

<template>
  <s-json v-model="data" disabled />
</template>
