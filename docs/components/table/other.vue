<script setup lang="ts">
import { ref, computed } from 'vue'

const data = ref([
  { name: '张三', address: '北京市朝阳区', status: 0 },
  { name: '李四', address: '上海市浦东新区上海市浦东新区上海市浦东新区上海市浦东新区', status: 1 },
  { name: '李四', address2: '2上海市浦东新区上海市浦东新区上海市浦东新区上海市浦东新区', status: 2 },
  { name: '王五', address: '河南省项城市', status: 0 },
  { name: '王五', address: '河南省项城市', status: 0 },
])
const otherParams = ref({
  showPage: true,
  fixed: false,
  border: true,
  size: 'default',
  disabled: false,
  simple: false,
  showOverflowTooltip: true,
  sortable: false,
})
const columns = computed(() => {
  return [
    {
      label: '名字',
      prop: 'name',
      width: 400,
    },
    {
      label: '地址',
      prop: 'address',
      width: 200,
      sortable: false,
      fixed: otherParams.value.fixed ? 'left' : false,
    },
    {
      label: '地址2',
      prop: 'address2',
      width: 200,
      fixed: otherParams.value.fixed ? 'left' : false,
    },
    {
      label: '状态',
      prop: 'status',
      render: ({ row }) => {
        return row.status === 0 ? '关闭' : '开启'
      },
    },
    {
      label: '状态',
      prop: 'status',
      render: ({ row }) => {
        return row.status === 0 ? '关闭' : '开启'
      },
    },
    {
      label: '状态',
      prop: 'status',
      render: ({ row }) => {
        return row.status === 0 ? '关闭' : '开启'
      },
    },
    {
      label: '状态',
      prop: 'status',
      render: ({ row }) => {
        return row.status === 0 ? '关闭' : '开启'
      },
    },
    {
      label: '状态',
      prop: 'status',
      render: ({ row }) => {
        return row.status === 0 ? '关闭' : '开启'
      },
    },
    {
      label: '状态',
      prop: 'status',
      render: ({ row }) => {
        return row.status === 0 ? '关闭' : '开启'
      },
    },
    {
      label: '状态',
      prop: 'status',
      render: ({ row }) => {
        return row.status === 0 ? '关闭' : '开启'
      },
    },

    {
      key: 'operation',
      label: '操作',
      btns: [
        {
          reConfirm: true,
          content: ({ scope }) => {
            if (data.value[scope.$index].status === 0) {
              return '关闭'
            } else {
              return '开启'
            }
          },
          title: ({ scope }) => {
            return data.value[scope.$index].status === 0 ? '确定开启吗?' : '确定关闭吗?'
          },
          handler: ({ scope }) => {
            data.value[scope.$index].status = data.value[scope.$index].status === 0 ? 1 : 0
          },
        },
      ],
    },
  ]
})
</script>

<template>
  <div>
    <s-flex gap="small" direction="column">
      <s-radio v-model="otherParams.size" :options="['small', 'default', 'large']" type="simple" title="size"></s-radio>
      <s-radio v-model="otherParams.showPage" :options="[true, false]" type="simple" title="showPage"></s-radio>
      <s-radio v-model="otherParams.fixed" :options="[true, false]" type="simple" title="地址固定: fixed"></s-radio>
      <s-radio v-model="otherParams.border" :options="[true, false]" type="simple" title="border"></s-radio>
      <s-radio v-model="otherParams.disabled" :options="[true, false]" type="simple" title="disabled"></s-radio>
      <s-radio v-model="otherParams.simple" :options="[true, false]" type="simple" title="simple"></s-radio>
      <s-radio
        v-model="otherParams.sortable"
        :options="[true, false]"
        type="simple"
        title="sortable（默认 false：有 prop 的列统一排序；地址列单独关闭）"
      ></s-radio>
      <s-radio
        v-model="otherParams.showOverflowTooltip"
        :options="[true, false]"
        type="simple"
        title="showOverflowTooltip（默认 true：截断并显示提示；false：显示完整内容）"
      ></s-radio>
    </s-flex>
    <s-table :columns="columns" :data="data" v-bind="otherParams"></s-table>
  </div>
</template>
