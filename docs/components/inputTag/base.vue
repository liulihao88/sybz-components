<script setup lang="ts">
import { ref } from 'vue'

const tags = ref<string[]>(['vue'])
</script>

<template>
  <s-input-tag
    v-model="tags"
    placeholder="输入 123,345.456、567 后回车"
    w="500"
    :input-attrs="{ width: '100px', clearable: true }"
  />
</template>
