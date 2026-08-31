<script setup lang="tsx">
import { ref } from 'vue'
const data = ref([{ name: 'andy' }])
const columns = [
  {
    label: '名字',
    prop: 'name',
    render: ({ row, scope, value, column, index }) => {
      return (
        <>
          <sFlex align="center">
            <sIcon icon="delete"></sIcon> <span class="cl-blue">render1111</span>
          </sFlex>
        </>
      )
    },
  },
  {
    key: 'operation',
    label: '操作',
    btns: [
      {
        content: '编辑',
      },
      {
        width: 80,
        content: '编辑',
        render: ({ row, scope, value, column, action, index }) => {
          return (
            <>
              <sIcon icon="delete"></sIcon> <span class="cl-blue">render</span>
            </>
          )
        },
      },

      {
        content: '编辑3',
        width: 80,
        render: ({ row, scope, value, column, action, index }) => {
          return (
            <>
              <sIcon icon="plus"></sIcon> <span class="cl-blue">我是蓝色</span>
            </>
          )
        },
      },
    ],
  },
]
</script>

<template>
  <div>
    <s-table ref="tableRef" :columns="columns" :data="data"></s-table>
  </div>
</template>
