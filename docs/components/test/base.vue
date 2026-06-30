<script lang="ts" setup>
import { ref } from 'vue'
import { confirm } from '@sybz-components/utils'
const cc = ref(123)
const isShow = ref(false)
const c = ref(false)

confirm(
  '确定删除文件 <code>成华AI服务申请表.xlsx</code> 吗？<br />删除后无法恢复。 <code type="danger">错误</code> <code type="warning">警告</code><code type="info">消息</code>',
  {
    title: '删除确认',
    theme: 'chenghua',
    confirmButtonText: '确认删除',
    cancelButtonText: '再想想',
    confirmButtonClass: 's-confirm-danger-button',
  },
)

const deleteConfirm = () => {
  confirm('确定删除文件 <code>成华AI服务申请表.xlsx</code> 吗？<br />删除后无法恢复。', {
    title: '删除确认',
    theme: 'chenghua',
    confirmButtonText: '确认删除',
    cancelButtonText: '再想想',
    confirmButtonClass: 's-confirm-danger-button',
  })
}
</script>

<template>
  <div>
    <!-- <s-dialog v-model="isShow"></s-dialog> -->
    <s-warning content="你好啊 "></s-warning>
    <s-button @click="deleteConfirm"></s-button>
  </div>
</template>
