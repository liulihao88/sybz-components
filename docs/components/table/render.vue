<script setup lang="tsx">
import { ref, computed } from 'vue'
const data = ref([{ name: 'andy' }])
const columns = computed(() => {
  return [
    {
      label: '名字',
      prop: 'name',
      render: ({ row, scope, value, column, index }) => {
        return (
          <s-flex align="center" gap="small">
            <sIcon name="delete"></sIcon> <span class="cl-blue">render1111</span>
          </s-flex>
        )
      },
    },
    {
      key: 'operation',
      label: '操作',
      width: 300,
      maxBtns: 2,
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
                <sIcon name="delete"></sIcon> <span class="cl-blue">render</span>
              </>
            )
          },
        },
        {
          content: '编辑3',
          render: ({ row, scope, value, column, action, index }) => {
            return (
              <>
                <sIcon name="plus"></sIcon> <span class="cl-blue">我是蓝色</span>
              </>
            )
          },
        },
      ],
    },
  ]
})
</script>

<template>
  <div>
    <s-table ref="tableRef" :columns="columns" :data="data"></s-table>
  </div>
</template>
