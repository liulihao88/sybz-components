<script setup lang="ts">
import { ref } from 'vue'
const isShow = ref(false)
</script>

<template>
  <div>
    <s-button type="primary" @click="isShow = true">显示dialog</s-button>
    <s-dialog v-model="isShow">内容</s-dialog>
  </div>
</template>
