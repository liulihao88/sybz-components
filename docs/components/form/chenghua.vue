<script setup lang="ts">
import { ref } from 'vue'

const model = ref({
  company: '',
  industry: '',
  status: 'active',
})

const fieldList = [
  { type: 'title', title: '企业信息', subTitle: '完善企业基础资料' },
  { label: '企业名称', prop: 'company', required: true },
  {
    label: '所属行业',
    prop: 'industry',
    comp: 's-select',
    attrs: {
      options: [
        { label: '人工智能', value: 'ai' },
        { label: '软件服务', value: 'software' },
      ],
    },
  },
  {
    label: '经营状态',
    prop: 'status',
    comp: 's-radio',
    attrs: {
      options: [
        { label: '正常经营', value: 'active' },
        { label: '筹备中', value: 'preparing' },
      ],
    },
  },
]
</script>

<template>
  <s-form :model="model" :field-list="fieldList" :show-footer="false" :column="2" label-width="88" theme="chenghua" />
</template>
