<script setup lang="ts">
import { ref } from 'vue'
import { delay, $toast } from '@/utils/src/index.ts'
const loading = ref(false)

const delayHandler = async () => {
  loading.value = true
  await delay(2000)
  loading.value = false
  $toast('delay后显示')
}
</script>

<template>
  <div>
    <el-button type="primary" :loading="loading" @click="delayHandler">2秒后显示</el-button>
  </div>
</template>
