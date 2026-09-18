<script setup lang="ts">
import { reactive } from 'vue'
import type { SFormFieldItem } from 'sybz-components/types'

const model = reactive({ title: '', content: '', published: true })
const fieldList: SFormFieldItem[] = [
  {
    label: '公告标题',
    prop: 'title',
    required: true,
    placeholder: '例如：系统升级通知',
  },
  {
    label: '公告内容',
    prop: 'content',
    comp: 's-input',
    required: true,
    attrs: { type: 'textarea', rows: 4 },
  },
  {
    label: '发布',
    subLabel: '设为当前活跃公告',
    prop: 'published',
    comp: 's-switch',
    attrs: { activeText: '发布' },
  },
]
</script>

<template>
  <s-form :model="model" :field-list="fieldList" :show-footer="false" label-width="auto" />
</template>
