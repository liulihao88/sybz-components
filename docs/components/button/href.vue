<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
</script>

<template>
  <div>
    <s-button href="https://element-plus.org" target="_blank">在新窗口打开文档</s-button>
  </div>
</template>
