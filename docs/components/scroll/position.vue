<template>
  <s-scroll width="300px" height="200px" @scroll-position-change="position = $event"><Story wide /></s-scroll>
  <p>Scroll position: {{ position }}</p>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import Story from './Story.vue'
const position = ref({ x: 0, y: 0 })
</script>
