<script setup lang="ts">
import { ref } from 'vue'

const form = ref({ keyword: '', date: '' })
const fields = [
  { prop: 'keyword', label: '关键词' },
  { prop: 'date', label: '创建日期' },
]
</script>

<template>
  <g-table-search v-model="form" :options="fields">
    <template #field-date="{ model }">
      <s-date-picker v-model="model.date" type="date" title="创建日期" />
    </template>
    <template #actions>
      <s-button>导出</s-button>
    </template>
  </g-table-search>
</template>
