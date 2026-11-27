<script setup lang="ts">
import { ref } from 'vue'

const ports = ref<string[]>(['80'])
</script>

<template>
  <s-input-tag
    v-model="ports"
    :regexp="/^([1-9]|[1-9][0-9]{1,3}|[1-5][0-9]{4}|6[0-5][0-5][0-3][0-5])$/"
    message="请输入 1-65535 之间的端口号"
    placeholder="输入端口号后回车，如 80,443"
    style="max-width: 420px"
  />
  <div>v-model：{{ ports }}</div>
</template>
