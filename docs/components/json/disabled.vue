<script setup lang="ts">
import { ref } from 'vue'

const data = ref({
  service: 'knowledge-base',
})
</script>

<template>
  <div class="h-200">
    <s-json v-model="data" disabled />
  </div>
</template>
