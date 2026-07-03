<template>
  <s-form :model="formData" :field-list="fieldList" :column="2" label-width="96">
    <template #slotTitle="{ item }">
      <s-title v-bind="item.attrs" type="form">
        <template #title>
          <span class="form-title-demo__slot-title">{{ item.title }}</span>
        </template>
        <template #extra>
          <span class="form-title-demo__tip">插槽标题</span>
        </template>
      </s-title>
    </template>
  </s-form>
</template>

<script setup lang="tsx">
import { ref } from 'vue'

const formData = ref({
  hallName: '11',
  hallDesc: '22',
  category: '汽车展厅',
  access: '公开',
  startTime: '2026-07-01 15:28',
  endTime: '2026-07-08 15:28',
  trigger: '点击触发',
  template: '展品讲解模板',
  quota: ['展品停留时长'],
})

const fieldList = [
  {
    type: 'title',
    title: '基本信息',
    subTitle: '补充展厅名称与介绍',
    attrs: {
      theme: 'chenghua',
      type: 'form',
    },
  },
  {
    label: '展厅描述',
    prop: 'hallDesc',
    attrs: {
      type: 'textarea',
      rows: 4,
    },
    column: 1,
  },
  {
    type: 'title',
    title: '统计配置',
    attrs: {
      theme: 'chenghua',
      type: 'form',
    },
    render: ({ item }: any) => {
      return (
        <s-title
          title={item.title}
          theme="chenghua"
          type="form"
          v-slots={{ extra: () => <span class="form-title-demo__tip">render标题</span> }}
        ></s-title>
      )
    },
  },

  {
    label: '展厅名称',
    prop: 'hallName',
  },

  {
    label: '开始时间',
    prop: 'startTime',
    comp: 's-date-picker',
    attrs: {
      type: 'datetime',
    },
  },
  {
    label: '结束时间',
    prop: 'endTime',
    comp: 's-date-picker',
    attrs: {
      type: 'datetime',
    },
  },
]
</script>

<style scoped lang="scss">
.form-title-demo__slot-title {
  color: var(--s-ch-primary, var(--blue));
}

.form-title-demo__tip {
  color: var(--el-text-color-placeholder);
  font-size: 13px;
  font-weight: 400;
}
</style>
