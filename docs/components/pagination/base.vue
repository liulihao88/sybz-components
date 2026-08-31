<script setup lang="ts">
import { ref } from 'vue'

const page = ref(1)
const message = ref('当前第 1 页')
const handleChange = (value: number) => {
  message.value = `当前第 ${value} 页`
}
</script>

<template>
  <s-pagination v-model:current-page="page" :total="96" :page-size="10" @change="handleChange" />
  <p class="pagination-result">{{ message }}</p>
</template>

<style scoped>
.pagination-result {
  margin: 12px 0 0;
  text-align: center;
}
</style>
