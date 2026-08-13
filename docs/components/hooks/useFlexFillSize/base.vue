<script setup lang="ts">
import { ref } from 'vue'
import { useFlexFillSize } from '@/index.ts'
import { $toast } from '@sybz-components/utils'

const tableContainerRef = ref<HTMLElement>()
const { width, height } = useFlexFillSize(tableContainerRef)

const tableData = Array.from({ length: 8 }, (_, index) => ({
  name: `任务 ${index + 1}`,
  status: index % 2 ? '运行中' : '已完成',
}))

const data = ref([
  { name: '张三', address: '北京市朝阳区', status: 0 },
  { name: '李四', address: '上海市浦东新区', status: 1 },
  {
    name: '王五',
    address:
      '河南省项城市河南省项城市河南省项城市河南省项城市河南省项城市河南省项城市河南省项城市河南省项城市河南省项城市',
    status: 0,
  },
])
const columns = [
  {
    label: '名字',
    prop: 'name',
  },
  {
    label: '地址',
    prop: 'address',
  },
  {
    key: 'operation',
    label: '操作',
    btns: [
      {
        content: '编辑',
        handler: () => {},
        comp: 's-icon',
        attrs: {
          name: 'edit',
          content: '编辑',
        },
        disabled: ({ row }) => {
          return row.status === 0
        },
      },
    ],
  },
]

const loading = ref(false)
const toggleLoading = async () => {
  loading.value = true
  await new Promise((resolve) => setTimeout(resolve, 2000))
  loading.value = false
}
</script>

<template>
  <div class="flex-fill-demo">
    <s-title title="顶部" />
    <s-table ref="tableContainerRef" :columns="columns" :data="data" :loading="loading" :height="height"></s-table>
    <s-title title="底部"> 可用区域：{{ Math.round(width) }}px x {{ Math.round(height) }}px </s-title>
  </div>
</template>

<style scoped>
.flex-fill-demo {
  display: flex;
  flex-direction: column;
  height: 300px;
}
</style>
