<script setup lang="ts">
import { ref } from 'vue'
import { useZIndex } from '@/index.ts'

const { currentZIndex, nextZIndex } = useZIndex(2000)
const cards = ref([
  { title: '第一层', zIndex: nextZIndex() },
  { title: '第二层', zIndex: nextZIndex() },
])

const addLayer = () => {
  cards.value.push({
    title: `第 ${cards.value.length + 1} 层`,
    zIndex: nextZIndex(),
  })
}
</script>

<template>
  <s-flex direction="column" gap="12" align="flex-start">
    <s-flex gap="8" align="center">
      <el-button type="primary" @click="addLayer">新增一层</el-button>
      <el-tag>currentZIndex: {{ currentZIndex }}</el-tag>
    </s-flex>
    <div class="hooks-z-index-demo">
      <div
        v-for="(item, index) in cards"
        :key="index"
        class="hooks-z-index-demo__card"
        :style="{ left: `${index * 42}px`, top: `${index * 18}px`, zIndex: item.zIndex }"
      >
        {{ item.title }}
        <span>z-index: {{ item.zIndex }}</span>
      </div>
    </div>
  </s-flex>
</template>

<style scoped>
.hooks-z-index-demo {
  position: relative;
  width: 360px;
  height: 150px;
  border: 1px solid var(--el-border-color);
  background: var(--el-fill-color-lighter);
  overflow: hidden;
}

.hooks-z-index-demo__card {
  position: absolute;
  width: 160px;
  height: 72px;
  padding: 10px;
  border: 1px solid var(--el-color-primary-light-5);
  background: var(--el-bg-color);
  box-shadow: var(--el-box-shadow-light);
  box-sizing: border-box;
}

.hooks-z-index-demo__card span {
  display: block;
  margin-top: 8px;
  color: var(--el-text-color-secondary);
  font-size: 12px;
}
</style>
