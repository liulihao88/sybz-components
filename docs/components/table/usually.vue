<script setup lang="tsx">
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
function handleDetail({ row }) {
  console.log(`row`, row)
  proxy.$toast(row.name)
  proxy.log(`row`, row, '9行 test/t1.vue')
}
function handleDetail2({ row }) {
  console.log('handleDetail2', row)
}
const downloadRow = ({ row }) => {
  console.log(`56 row`, row)
}
const columns = [
  {
    label: 'I want to , if you like it , please tell me. good',
    prop: 'name',
    width: 200,
    sortable: true,
    handler: handleDetail,
  },
  {
    label: '负责人',
    prop: 'owner',
    width: 200,
    sortable: true,
    handler: handleDetail2,
  },
  {
    label: '结束时间',
    prop: 'endTime',
    filter: ({ value }) => {
      return proxy.formatTime(value)
    },
  },
  {
    label: '状态',
    prop: 'status',
    align: 'center',
    render: ({ row }) => {
      return row.status === 0 ? <s-tag type="primary">进行中</s-tag> : <s-tag type="success">已完成</s-tag>
    },
  },
  {
    prop: 'operation',
    label: '操作',
    btns: [
      {
        content: '编辑',
        handler: () => {},
        comp: 's-icon',
        attrs: {
          icon: 'edit',
          content: '编辑',
        },
        disabled: ({ row }) => row.status === 'Loading',
      },
      {
        handler: () => {},
        comp: 's-icon',
        attrs: {
          icon: 'view',
          content: '查看',
        },
        disabled: ({ row }) => row.status === 'Loading',
      },
      {
        title: ({ row, index }) => {
          let type = ['', 'danger', 'warning', 'success']
          return `删除后将无法恢复，确定删除<mark type="${type[index]}">${row.name}</mark>吗？`
        },
        reConfirm: true,
        handler: () => {},
        comp: 's-icon',
        attrs: {
          icon: 'delete',
          content: '删除',
        },
      },
      {
        prop: 'download',
        useSlot: true,
        handler: downloadRow,
      },
      {
        content: '删除11',
        reConfirm: true,
        handler: handleDetail,
        isShow: false,
      },
    ],
  },
]
const data = ref([])
const orgData = [
  {
    name: 'name1name1name1name1name1name1',
    owner:
      'owner1I want to set some random text, if you like it , please tell me. good wish for you! thank you so much. hive a nice day!I want to set some random text, if you like it , please tell me. good wish for you! thank you so much. hive a nice day!I want to set some random text, if you like it , please tell me. good wish for you! thank you so much. hive a nice day!I want to set some random text, if you like it , please tell me. good wish for you! thank you so much. hive a nice day!I want to set some random text, if you like it , please tell me. good wish for you! thank you so much. hive a nice day!I want to set some random text, if you like it , please tell me. good wish for you! thank you so much. hive a nice day!I want to set some random text, if you like it , please tell me. good wish for you! thank you so much. hive a nice day!',
    endTime: '2022-08-02',
    status: 0,
  },
  {
    name: 'name4',
    owner: 'owner2',
    endTime: new Date(),

    status: 1,
  },
]
const num = ref(1)
const total = ref(0)

async function init() {
  await proxy.delay(300)
  num.value++
  data.value = proxy.clone(orgData, num.value)
  console.log(`data.value`, data.value)
  total.value = data.value.length ?? 0
}
init()
</script>

<template>
  <div>
    <el-button type="primary" @click="init">新增数据</el-button>
    {{ total }}
    <s-table ref="tableRef" :columns="columns" :total="total" :data="data">
      <template #download="{ row }">
        <el-button
          type="text"
          :disabled="
            (() => {
              return row.status === 'Loading'
            })()
          "
        >
          <template #icon>
            <s-icon icon="download" />
          </template>
          下载
        </el-button>
      </template>
    </s-table>
  </div>
</template>

<style scoped lang="scss"></style>
