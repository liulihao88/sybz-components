<script setup lang="ts">
import { ref } from 'vue'

const data = ref({
  project: 'sybz-components',
  version: '1.0.0',
  published: true,
  features: ['highlight', 'format', 'validate'],
  author: {
    name: 'Sybz',
    location: 'Beijing',
  },
})
</script>

<template>
  <s-json v-model="data" />
</template>
