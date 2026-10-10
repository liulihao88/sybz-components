<template>
  <p>Top: {{ count.top }} | Bottom: {{ count.bottom }} | Left: {{ count.left }} | Right: {{ count.right }}</p>
  <s-scroll
    width="300px"
    height="200px"
    @top-reached="count.top++"
    @bottom-reached="count.bottom++"
    @left-reached="count.left++"
    @right-reached="count.right++"
  >
    <div style="width: 600px">
      <p v-for="index in 50" :key="index">Line {{ index }} — 这是一行需要横向滚动的长内容</p>
    </div>
  </s-scroll>
</template>
<script setup lang="ts">
import { reactive } from 'vue'
const count = reactive({ top: 0, bottom: 0, left: 0, right: 0 })
</script>
