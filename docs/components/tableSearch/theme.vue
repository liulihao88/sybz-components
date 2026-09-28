<template>
  <s-radio v-model="theme" :options="docThemeOptions" show-type="button" title="theme" class="p-b-10" />
  <s-table-search v-model="form" :theme="theme" :options="fields" :column="2" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { docThemeOptions } from '../../.vitepress/theme/theme'
const theme = ref<(typeof docThemeOptions)[number]>('default')
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
</script>
