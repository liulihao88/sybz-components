<script setup lang="ts">
import { $toast } from '@sybz-components/utils'
const showToast = () => {
  $toast('保存成功')
}
</script>

<template>
  <div>
    <el-button type="primary" @click="showToast">基础</el-button>
  </div>
</template>
