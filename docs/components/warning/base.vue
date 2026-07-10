<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
</script>

<template>
  <div>
    <s-warning content="这是基础用法" title="我是title"></s-warning>
  </div>
</template>
