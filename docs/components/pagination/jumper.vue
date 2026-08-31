<script setup lang="ts">
import { ref } from 'vue'

const page = ref(1)
const message = ref('请填写页码后按回车')
const handleJump = (value: number) => {
  message.value = `已通过回车跳到第 ${value} 页`
}
</script>

<template>
  <s-pagination v-model:current-page="page" :total="200" :page-size="10" @jump="handleJump" />
  <p class="pagination-result">{{ message }}</p>
</template>

<style scoped>
.pagination-result {
  margin: 12px 0 0;
  text-align: center;
}
</style>
