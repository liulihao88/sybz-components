<script setup lang="ts">
import { ref } from 'vue'

const isShow = ref(false)
</script>

<template>
  <div>
    <el-button type="primary" @click="isShow = true">显示成华样式</el-button>
    <s-dialog title="默认" theme="chenghua" width="512px" v-model="isShow">哈哈</s-dialog>
  </div>
</template>
