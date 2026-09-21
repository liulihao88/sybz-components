<script setup lang="ts">
import { ref } from 'vue'

const data = ref({
  service: 'knowledge-base',
  enabled: true,
  retries: 3,
  endpoints: [
    { name: 'primary', url: '/api/search' },
    { name: 'backup', url: '/api/search-backup' },
  ],
})
</script>

<template>
  <s-json v-model:data="data" height="360" />
</template>
