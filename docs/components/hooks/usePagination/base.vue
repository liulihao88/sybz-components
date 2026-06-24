<script setup lang="ts">
import { computed } from 'vue'
import { usePagination } from '@/index.ts'

const { page, pageSize, total, pageCount, offset, limit, setPage, setPageSize } = usePagination({
  page: 1,
  pageSize: 10,
  total: 86,
})

const rangeText = computed(() => {
  const start = total.value ? offset.value + 1 : 0
  const end = Math.min(offset.value + limit.value, total.value)

  return `${start}-${end}`
})
</script>

<template>
  <s-flex direction="column" gap="12" align="flex-start">
    <s-flex gap="8" wrap>
      <el-tag>当前页：{{ page }}</el-tag>
      <el-tag>每页：{{ pageSize }}</el-tag>
      <el-tag>总页数：{{ pageCount }}</el-tag>
      <el-tag>当前范围：{{ rangeText }}</el-tag>
    </s-flex>
    <el-pagination
      background
      layout="total, sizes, prev, pager, next"
      :current-page="page"
      :page-size="pageSize"
      :page-sizes="[10, 20, 30, 50]"
      :total="total"
      @update:current-page="setPage"
      @update:page-size="setPageSize"
    />
  </s-flex>
</template>
