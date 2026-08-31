<template>
  <div class="pagination-narrow-box">
    <s-pagination :total="990" :page-size="10" :pager-count="11" />
  </div>
</template>

<style scoped>
.pagination-narrow-box {
  width: 320px;
  max-width: 100%;
  padding: 12px;
  border: 1px solid var(--el-border-color);
}
</style>
