<template>
  <s-scroll autosize max-height="300px" width="400px" @overflow-change="overflow = $event">
    <p v-for="index in count" :key="index">第 {{ index }} 段：内容增加到最大高度后开始滚动。</p>
  </s-scroll>
  <p>Overflow: {{ overflow }}</p>
  <s-button @click="count = Math.max(0, count - 1)">Remove paragraph</s-button>
  <s-button @click="count++">Add paragraph</s-button>
</template>
<script setup lang="ts">
import { ref } from 'vue'
const count = ref(3)
const overflow = ref(false)
</script>
