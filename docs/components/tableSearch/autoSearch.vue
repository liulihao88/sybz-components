<script setup lang="ts">
import { ref } from 'vue'

const form = ref({ name: '', type: '' })
const count = ref(0)
const fields = [
  { prop: 'name', label: '名称', searchOn: ['change'] },
  {
    prop: 'type',
    label: '类型',
    comp: 's-select',
    attrs: {
      options: [
        { label: '公开', value: 'public' },
        { label: '私有', value: 'private' },
      ],
    },
  },
]
</script>

<template>
  <s-table-search v-model="form" :items="fields" :column="2" @search="count++" />
  <p class="result">已触发搜索 {{ count }} 次</p>
</template>

<style scoped>
.result {
  margin: 16px 0 0;
  color: var(--vp-c-text-2);
}
</style>
