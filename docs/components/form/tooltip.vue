<script setup lang="ts">
import { reactive } from 'vue'
import type { SFormFieldItem } from 'sybz-components/types'

const model = reactive({ date: '', owner: '' })
const fieldList: SFormFieldItem[] = [
  {
    label: '日期组件',
    prop: 'date',
    comp: 's-date-picker',
    required: true,
    tooltip: '请选择业务实际发生的日期，提交后不可修改',
  },
  {
    label: '负责人',
    prop: 'owner',
    tooltip: ({ model }) =>
      model.date
        ? `<strong style="color: #f56c6c;">当前日期：</strong>${model.date}`
        : '<strong>请先选择日期</strong><br />选择后这里会动态展示日期',
    tooltipAttrs: {
      dangerouslyUseHTMLString: true,
      placement: 'top',
    },
  },
]
</script>

<template>
  <s-form :model="model" :field-list="fieldList" :show-footer="false" />
</template>
