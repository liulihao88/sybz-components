<script setup lang="ts">
import { tableData } from './data'

const tableRowClassName = ({ rowIndex }: { rowIndex: number }) => {
  if (rowIndex === 1 || rowIndex === 5) {
    return 's-warning-row'
  } else if (rowIndex === 3 || rowIndex === 7) {
    return 's-success-row'
  }
  return ''
}

const columns: TableColumnList = [
  {
    label: '日期',
    prop: 'date',
  },
  {
    label: '姓名',
    prop: 'name',
  },
  {
    label: '地址',
    prop: 'address',
  },
]
</script>

<template>
  <s-table :data="tableData" :columns="columns" :row-class-name="tableRowClassName" />
</template>

<style scoped lang="scss">
:deep(.s-warning-row) {
  --el-table-tr-bg-color: var(--el-color-warning-light-9);
}

:deep(.s-success-row) {
  --el-table-tr-bg-color: var(--el-color-success-light-9);
}
</style>
