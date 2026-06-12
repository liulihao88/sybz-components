<script setup lang="ts">
import { confirm } from '@/utils/src/index'

const deleteConfirm = () => {
  confirm('确定删除文件 <span> <code>成华AI服务申请表.xlsx</code></span> 吗？<br />删除后无法恢复。', {
    title: '删除确认',
    theme: 'chenghua',
    confirmButtonText: '确认删除',
    cancelButtonText: '再想想',
    confirmButtonClass: 's-confirm-danger-button',
  })
}

const noCancel = () => {
  confirm('当前申请已提交，请等待平台审核。', {
    title: '提交成功',
    theme: 'chenghua',
    showCancelButton: false,
    confirmButtonText: '知道了',
  })
}

const noConfirm = () => {
  confirm('当前内容存在未保存修改，建议返回检查后再离开。', {
    title: '离开提醒',
    theme: 'chenghua',
    showConfirmButton: false,
    cancelButtonText: '返回检查',
  })
}

const customText = () => {
  confirm('确定提交当前服务申请吗？', {
    title: '成华 AI 服务申请',
    theme: 'chenghua',
    confirmButtonText: '立即提交',
    cancelButtonText: '再想想',
  })
}
</script>

<template>
  <div class="chenghua-confirm-demo">
    <s-button theme="chenghua" type="danger" @click="deleteConfirm">删除确认</s-button>
    <s-button theme="chenghua" type="primary" @click="noCancel">无取消按钮</s-button>
    <s-button theme="chenghua" @click="noConfirm">无确定按钮</s-button>
    <s-button theme="chenghua" type="success" @click="customText">自定义文案</s-button>
  </div>
</template>

<style lang="scss" scoped>
.chenghua-confirm-demo {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}
</style>

<style lang="scss">

.s-confirm-danger-button {
  --el-button-bg-color: var(--el-color-danger);
  --el-button-border-color: var(--el-color-danger);
  --el-button-hover-bg-color: var(--el-color-danger-light-3);
  --el-button-hover-border-color: var(--el-color-danger-light-3);
  --el-button-active-bg-color: var(--el-color-danger-dark-2);
  --el-button-active-border-color: var(--el-color-danger-dark-2);
}
</style>
