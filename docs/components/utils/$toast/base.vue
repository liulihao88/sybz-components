<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
import { $toast, sleep } from '@sybz-components/utils'
const isTest52 = async () => {
  $toast('测试成功')
  await sleep(300)
  $toast('测试成功2')
}
</script>

<template>
  <div>
    <el-button type="primary" @click="isTest52">测试11</el-button>
  </div>
</template>
