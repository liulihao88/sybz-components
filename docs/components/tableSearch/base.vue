<script setup lang="ts">
import { ref } from 'vue'

const form = ref({ keyword: '', status: '' })
const fields = [
  { prop: 'keyword', label: '关键词' },
  {
    prop: 'status',
    label: '状态',
    comp: 's-select',
    attrs: {
      options: [
        { label: '启用', value: 'enabled' },
        { label: '停用', value: 'disabled' },
      ],
    },
  },
]

const result = ref('尚未搜索')
const handleSearch = (value: Record<string, unknown>) => {
  result.value = JSON.stringify(value)
}
</script>

<template>
  <s-table-search v-model="form" :options="fields" @search="handleSearch" />
  <p class="result">搜索参数：{{ result }}</p>
</template>

<style scoped>
.result {
  margin: 16px 0 0;
  color: var(--vp-c-text-2);
}
</style>
