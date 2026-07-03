<script setup lang="tsx">
import { ref } from 'vue'

const data = ref([
  { name: '智慧档案检索', owner: '张三', department: '数据服务部', status: 'Loading', progress: '82' },
  { name: '对象存储巡检', owner: '李四', department: '平台运维部', status: 'Loading', progress: '46' },
  { name: 'AI 审核任务', owner: '王五', department: '智能应用部', status: 'complete', progress: '100' },
])

const columns = [
  {
    label: '服务名称',
    prop: 'name',
    handler: ({ row }) => {
      console.log(`row`, row)
    },
  },
  {
    label: '负责人',
    prop: 'owner',
    align: 'center',
    filter: ({ row, index, value }) => {
      return `${value} (${row.department})`
    },
  },
  {
    label: '状态',
    prop: 'status',
    align: 'center',
    useSlot: true,
  },
  {
    label: '进度',
    prop: 'progress',
    minWidth: 200,
    render: ({ row }) => {
      return <s-progress type="line" percentage={row.progress} />
    },
    align: 'center',
  },
  {
    key: 'operation',
    label: '操作',
    width: 150,
    btns: [
      {
        content: '编辑',
        handler: ({ row }) => eidtRow(row),
        comp: 's-icon',
        attrs: {
          name: 'edit',
          content: '编辑',
        },
        disabled: ({ row }) => row.status === 'Loading',
      },
      {
        handler: ({ row }) => viewRow(row),
        comp: 's-icon',
        attrs: {
          name: 'view',
          content: '查看',
        },
        disabled: ({ row }) => row.status !== 'Loading',
      },
      {
        title: ({ row, index }) => {
          return `删除后将无法恢复，确定删除<mark type="danger">${row.name}</mark>吗？`
        },
        handler: ({ row }) => deleteRow(row),
        disabled: ({ row }) => row.status === 'Loading',
        reConfirm: true,
        comp: 's-icon',
        attrs: {
          name: 'delete',
          content: '删除',
        },
      },
      {
        prop: 'download',
        comp: 's-icon',
        attrs: {
          name: 'download',
          content: '下载',
        },
        handler: ({ row }) => downloadRow(row),
      },
    ],
  },
]

function eidtRow(row) {
  console.log('编辑', row)
}
function viewRow(row) {
  console.log('查看', row)
}
function deleteRow(row) {
  console.log('删除', row)
}
function downloadRow(row) {
  console.log('下载', row)
}
</script>

<template>
  <s-table theme="chenghua" :columns="columns" :data="data" :total="data.length">
    <template #status="{ row }">
      <s-tag v-if="row.status === 'Loading'" type="info">进行中</s-tag>
      <s-tag v-else type="success">已完成</s-tag>
    </template>
  </s-table>
</template>

<style scoped lang="scss"></style>
