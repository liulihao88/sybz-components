<script setup lang="tsx">
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
const data = ref([{ name: 'andy' }])
const columns = [
  {
    label: '名字',
    prop: 'name',
    render: ({ row, scope, value, column, index }) => {
      return (
        <>
          <sFlex align="center">
            <sIcon name="delete"></sIcon> <span class="text-[var(--blue)]">render1111</span>
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
              <sIcon name="delete"></sIcon> <span class="text-[var(--blue)]">render</span>
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
              <sIcon name="plus"></sIcon> <span class="text-[var(--blue)]">我是蓝色</span>
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
    <s-table :columns="columns" :data="data" ref="tableRef"></s-table>
  </div>
</template>
