<script setup lang="ts">
import { ref } from 'vue'

const form = ref({ keyword: '', date: '' })
const fields = [
  { prop: 'date', label: '创建日期', useSlot: true },
  { prop: 'keyword', label: '关键词' },
]
</script>

<template>
  <s-table-search v-model="form" :options="fields" theme="shijingshan" :column="2">
    <template #date="{ value, update, theme }">
      <s-date-picker
        :model-value="value"
        :theme="theme"
        type="date"
        title="创建日期"
        width="100%"
        @update:model-value="update"
      />
    </template>
    <template #actions="{ theme }">
      <s-button :theme="theme">导出</s-button>
    </template>
  </s-table-search>
</template>
