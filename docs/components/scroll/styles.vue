<template>
  <s-scroll class="custom-scroll" w="300px" height="200px" type="always" offset-scrollbars><Story wide /></s-scroll>
</template>
<script setup lang="ts">
import Story from './Story.vue'
</script>
<style scoped>
.custom-scroll {
  border: 1px solid #e5e7eb;
  border-radius: 8px;
}
.custom-scroll :deep(.s-scroll__track) {
  background: #e0f2fe;
}
.custom-scroll :deep(.s-scroll__thumb) {
  background: blue;
}
</style>
