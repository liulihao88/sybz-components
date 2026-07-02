<script setup lang="ts">
import { ref } from 'vue'

const data = ref([
  { name: '智慧档案检索', owner: '张三', department: '数据服务部', status: 'Loading', progress: '82%' },
  { name: '对象存储巡检', owner: '李四', department: '平台运维部', status: 'Loading', progress: '46%' },
  { name: 'AI 审核任务', owner: '王五', department: '智能应用部', status: 'complete', progress: '100%' },
])

const columns = [
  {
    label: '服务名称',
    prop: 'name',
    minWidth: 150,
  },
  {
    label: '负责人',
    prop: 'owner',
    width: 100,
    align: 'center',
  },
  {
    label: '所属部门',
    prop: 'department',
    minWidth: 140,
  },
  {
    label: '状态',
    prop: 'status',
    width: 110,
    align: 'center',
  },
  {
    label: '进度',
    prop: 'progress',
    width: 110,
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
        reConfirm: ({ row }) => row.status !== 'Loading',
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
  <div class="chenghua-table-demo">
    <div class="chenghua-table-demo__meta">
      <span>属性: theme</span>
      <span>可选值: '' | 'chenghua'</span>
      <span>默认值: ''</span>
      <span>属性: size</span>
      <span>可选值: '' | 'small' | 'default' | 'large'</span>
      <span>默认值: ''</span>
    </div>
    <s-table theme="chenghua" size="small" :columns="columns" :data="data" :total="36" />
  </div>
</template>

<style scoped lang="scss">
.chenghua-table-demo {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.chenghua-table-demo__meta {
  display: flex;
  flex-wrap: wrap;
  gap: 8px 12px;
  color: var(--el-text-color-regular);
  font-size: 13px;
}
</style>
