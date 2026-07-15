<script setup lang="ts">
import { ref } from 'vue'
import { useFlexFillSize } from '@/index.ts'

const tableContainerRef = ref<HTMLElement>()
const { width, height } = useFlexFillSize(tableContainerRef)

const tableData = Array.from({ length: 8 }, (_, index) => ({
  name: `任务 ${index + 1}`,
  status: index % 2 ? '运行中' : '已完成',
}))
</script>

<template>
  <div class="flex-fill-demo">
    <s-title title="顶部" />
    <el-table ref="tableContainerRef" :data="tableData" :height="height">
      <el-table-column prop="name" label="名称" />
      <el-table-column prop="status" label="状态" />
    </el-table>
    <s-title title="底部">
      <template #append>可用区域：{{ Math.round(width) }}px x {{ Math.round(height) }}px</template>
    </s-title>
  </div>
</template>

<style scoped>
.flex-fill-demo {
  display: flex;
  flex-direction: column;
  height: 300px;
}
</style>
