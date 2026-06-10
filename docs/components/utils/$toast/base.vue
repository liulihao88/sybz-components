<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
import { $toast } from '@sybz-components/utils'
const isTest52 = async () => {
  $toast('测试成功')
}
</script>

<template>
  <div>
    <el-button type="primary" @click="isTest52">测试</el-button>
  </div>
</template>
