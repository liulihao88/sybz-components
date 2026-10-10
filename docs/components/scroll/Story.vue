<template>
  <div class="scroll-story" :style="{ width: wide ? '600px' : undefined }">
    <h4>喷火龙（宝可梦）</h4>
    <p v-for="index in 8" :key="index">第 {{ index }} 段：喷火龙展开翅膀穿过山谷，尾端的火焰随着风轻轻摇动。</p>
  </div>
</template>
<script setup lang="ts">
defineProps<{ wide?: boolean }>()
</script>
<style scoped>
.scroll-story {
  padding: 8px 12px;
  line-height: 1.6;
}
.scroll-story h4 {
  margin: 0 0 8px;
}
.scroll-story p {
  margin: 0 0 8px;
}
</style>
