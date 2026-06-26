<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
const isShow = ref(false)
const isShow2 = ref(false)
const data = ref([
  { name: '张三', address: '北京市朝阳区' },
  { name: '李四', address: '上海市浦东新区' },
  { name: '王五', address: '河南省项城市' },
  { name: '张三', address: '北京市朝阳区' },
  { name: '李四', address: '上海市浦东新区' },
  { name: '王五', address: '河南省项城市' },
  { name: '张三', address: '北京市朝阳区' },
  { name: '李四', address: '上海市浦东新区' },
  { name: '王五', address: '河南省项城市' },
  { name: '张三', address: '北京市朝阳区' },
  { name: '李四', address: '上海市浦东新区' },
  { name: '王五', address: '河南省项城市' },
  { name: '张三', address: '北京市朝阳区' },
  { name: '李四', address: '上海市浦东新区' },
  { name: '王五', address: '河南省项城市' },
  { name: '张三', address: '北京市朝阳区' },
  { name: '李四', address: '上海市浦东新区' },
  { name: '王五', address: '河南省项城市' },
  { name: '张三', address: '北京市朝阳区' },
  { name: '李四', address: '上海市浦东新区' },
  { name: '王五', address: '河南省项城市' },
  { name: '张三', address: '北京市朝阳区' },
  { name: '李四', address: '上海市浦东新区' },
  { name: '王五', address: '河南省项城市' },
  { name: '张三', address: '北京市朝阳区' },
  { name: '李四', address: '上海市浦东新区' },
  { name: '王五', address: '河南省项城市' },
  { name: '张三', address: '北京市朝阳区' },
  { name: '李四', address: '上海市浦东新区' },
  { name: '王五', address: '河南省项城市' },
  { name: '张三', address: '北京市朝阳区' },
  { name: '李四', address: '上海市浦东新区' },
  { name: '王五', address: '河南省项城市' },
  { name: '张三', address: '北京市朝阳区' },
  { name: '李四', address: '上海市浦东新区' },
  { name: '王五', address: '河南省项城市' },
  { name: '张三', address: '北京市朝阳区' },
  { name: '李四', address: '上海市浦东新区' },
  { name: '王五', address: '河南省项城市' },
  { name: '张三', address: '北京市朝阳区' },
  { name: '李四', address: '上海市浦东新区' },
  { name: '王五', address: '河南省项城市' },
])
const columns = [
  {
    label: '名字',
    prop: 'name',
  },
  {
    key: 'operation',
    label: '操作',
    btns: [
      {
        content: '编辑',
        comp: 's-icon',
        attrs: {
          name: 'edit',
          content: '编辑',
        },
      },
      {
        content: '删除',
        comp: 's-icon',
        attrs: {
          name: 'delete',
          content: '删除',
        },
      },
    ],
  },
]
</script>

<template>
  <div>
    <s-dialog v-model="isShow" title="基础dialog" fill-slot type="drawer">
      <s-table ref="tableRef" :columns="columns" :data="data" height="100%"></s-table>
    </s-dialog>
    <el-button type="primary" @click="isShow = true">基础</el-button>
    <el-button type="primary" @click="isShow2 = true">复杂些的</el-button>
    <s-dialog v-model="isShow2" title="基础dialog" fill-slot type="drawer">
      <s-flex direction="column" class="h-block">
        <div class="m-b-16">这是上面的数据</div>
        <div class="m-b-16">这是上面的数据</div>
        <div class="m-b-16">这是上面的数据</div>
        <div class="m-b-16">这是上面的数据</div>
        <s-table ref="tableRef" :columns="columns" :data="data" height="100%"></s-table>
      </s-flex>
    </s-dialog>
  </div>
</template>

<style scoped lang="scss"></style>
