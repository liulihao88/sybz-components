<script setup lang="ts">
import { ref } from 'vue'
import { useElementSize } from '@/index.ts'

const boxRef = ref<HTMLElement>()
const boxWidth = ref(260)
const { width, height } = useElementSize(boxRef)
</script>

<template>
  <s-flex direction="column" gap="12" align="flex-start">
    <el-slider v-model="boxWidth" :min="180" :max="520" style="width: 320px" />
    <div ref="boxRef" class="hooks-size-demo" :style="{ width: `${boxWidth}px` }">拖动滑块改变宽度</div>
    <el-tag>{{ Math.round(width) }}px x {{ Math.round(height) }}px</el-tag>
  </s-flex>
</template>

<style scoped>
.hooks-size-demo {
  height: 88px;
  padding: 12px;
  border: 1px solid var(--el-border-color);
  background: var(--el-fill-color-light);
  box-sizing: border-box;
}
</style>
