<script setup lang="ts">
import { ref } from 'vue'
import { $toast } from '@sybz-components/utils'
const isTest52 = async () => {
  $toast('基础')
}
</script>

<template>
  <div>
    <el-button type="primary" @click="isTest52">基础</el-button>
  </div>
</template>
