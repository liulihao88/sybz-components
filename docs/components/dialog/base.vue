<script setup lang="ts">
import { ref } from 'vue'
const isShow = ref(false)
</script>

<template>
  <div>
    <el-button type="primary" @click="isShow = true">显示dialog</el-button>
    <s-dialog title="基础dialog" v-model="isShow">内容</s-dialog>
  </div>
</template>
