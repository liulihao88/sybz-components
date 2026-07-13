<script setup lang="ts">
import { ref } from 'vue'

const model = ref({
  project: '',
  category: '',
  stage: 'review',
})

const fieldList = [
  { type: 'title', title: '项目信息', subTitle: '配置产业项目申报资料' },
  { label: '项目名称', prop: 'project', required: true },
  {
    label: '项目类别',
    prop: 'category',
    comp: 's-select',
    attrs: {
      options: [
        { label: '技术创新', value: 'technology' },
        { label: '产业升级', value: 'industry' },
      ],
    },
  },
  {
    label: '申报阶段',
    prop: 'stage',
    comp: 's-radio',
    attrs: {
      options: [
        { label: '材料审核', value: 'review' },
        { label: '项目评审', value: 'evaluation' },
      ],
    },
  },
]
</script>

<template>
  <s-form
    :model="model"
    :field-list="fieldList"
    :show-footer="false"
    :column="2"
    label-width="88"
    theme="shijingshan"
  />
</template>
