<script setup lang="ts">
import { ref } from 'vue'

const form = ref({ keyword: '', date: '' })
const fields = [
  { prop: 'date', label: '创建日期' },
  { prop: 'keyword', label: '关键词' },
]
</script>

<template>
  <s-table-search v-model="form" :options="fields" theme="shijingshan" :column="2">
    <template #field-date="{ model }">
      <s-date-picker v-model="model.date" type="date" title="创建日期" width="100%" />
    </template>
    <template #actions>
      <s-button>导出</s-button>
    </template>
  </s-table-search>
</template>
