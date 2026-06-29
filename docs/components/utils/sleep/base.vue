<script setup lang="ts">
import { ref } from 'vue'
import { sleep, $toast } from '@/utils/src/index.ts'
const loading = ref(false)

const sleepHandler = async () => {
  loading.value = true
  await sleep(2000)
  loading.value = false
  $toast('sleep后显示')
}
</script>

<template>
  <div>
    <el-button type="primary" :loading="loading" @click="sleepHandler">2秒后显示</el-button>
  </div>
</template>
