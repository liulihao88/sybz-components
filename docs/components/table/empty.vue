<script setup lang="ts">
const columns = [
  {
    label: '名字',
    prop: 'name',
  },
  {
    label: '地址',
    prop: 'address',
  },
]
</script>

<template>
  <s-table :columns="columns" :data="[]" :show-page="false">
    <template #empty>
      <div class="custom-empty">暂无符合条件的数据</div>
    </template>
  </s-table>
</template>

<style scoped>
.custom-empty {
  padding: 32px 0;
  color: var(--el-text-color-secondary);
}
</style>
