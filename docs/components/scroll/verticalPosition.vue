<template>
  <el-radio-group v-model="position" style="margin-bottom: 12px">
    <el-radio-button value="left">left</el-radio-button>
    <el-radio-button value="right">right</el-radio-button>
  </el-radio-group>
  <s-scroll
    width="300px"
    height="200px"
    type="always"
    scrollbars="y"
    :vertical-scrollbar-position="position"
    offset-scrollbars
  >
    <Story />
  </s-scroll>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import Story from './Story.vue'
const position = ref<'left' | 'right'>('right')
</script>
