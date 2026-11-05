<script setup lang="ts">
import type { TableColumnList } from 'sybz-components/types/table'

type TypeRow = {
  name: string
  basic: number
  medium: number
  hard: number
  total: number
  score: number
}

const columns: TableColumnList<TypeRow> = [
  { prop: 'name', label: '题型' },
  { prop: 'basic', label: '基础', w: 35, align: 'center' },
  { prop: 'medium', label: '中等', w: 35, align: 'center' },
  { prop: 'hard', label: '提高', w: 35, align: 'center' },
  { prop: 'total', label: '题量', w: 35, align: 'center' },
  { prop: 'score', label: '分值', w: 38, align: 'center' },
]

const data: TypeRow[] = [
  { name: '拼音选择题', basic: 1, medium: 0, hard: 0, total: 1, score: 15 },
  { name: '看图填空题', basic: 1, medium: 0, hard: 0, total: 1, score: 15 },
  { name: '生字书写题', basic: 1, medium: 0, hard: 0, total: 1, score: 20 },
  { name: '课文内容连线题', basic: 0, medium: 1, hard: 0, total: 1, score: 15 },
  { name: '阅读理解题', basic: 0, medium: 1, hard: 0, total: 1, score: 15 },
  { name: '看图写话题', basic: 0, medium: 0, hard: 1, total: 1, score: 20 },
]

const cellStyle = { padding: '4px 2px', height: '28px', fontSize: '11px' }
const headerStyle = { ...cellStyle, background: '#f5f8ff', color: '#52607a' }
</script>

<template>
  <div class="compact-table-demo">
    <s-table
      :columns="columns"
      :data="data"
      :show-index="false"
      :show-page="false"
      :cell-style="cellStyle"
      :custom-header-cell-style="headerStyle"
      cell-class-name="compact-body-cell"
      header-cell-class-name="compact-header-cell"
      :border="false"
      height="100%"
      size="small"
    />
  </div>
</template>

<style scoped>
.compact-table-demo {
  width: 268px;
  height: 190px;
  overflow: hidden;
  border-radius: 8px;
}

.compact-table-demo :deep(.compact-header-cell .cell),
.compact-table-demo :deep(.compact-body-cell .cell) {
  padding: 0 2px;
  font-size: 11px;
}

.compact-table-demo :deep(.el-table__body-wrapper .el-scrollbar__wrap) {
  overflow-x: hidden;
  scrollbar-width: none;
}

.compact-table-demo :deep(.el-table__header col[name='gutter']) {
  width: 0 !important;
}

.compact-table-demo :deep(.el-table__header th.gutter) {
  display: none !important;
}

.compact-table-demo :deep(.el-table__body) {
  width: 100% !important;
}

.compact-table-demo :deep(.el-table__body-wrapper .el-scrollbar__wrap::-webkit-scrollbar),
.compact-table-demo :deep(.el-table__body-wrapper .el-scrollbar__bar) {
  display: none;
}
</style>
