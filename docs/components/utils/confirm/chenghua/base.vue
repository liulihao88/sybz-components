<script setup lang="ts">
import { confirm } from '@/utils/src/index'

const deleteConfirm = () => {
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

const noClose = () => {
  confirm('该操作需要通过底部按钮明确选择，右上角关闭按钮已隐藏。', {
    title: '隐藏关闭按钮',
    theme: 'chenghua',
    showClose: false,
    closeOnClickModal: false,
    closeOnPressEscape: false,
    confirmButtonText: '继续处理',
    cancelButtonText: '暂不处理',
  })
}

const differentColorButtons = () => {
  confirm('请选择当前审批结果，同意和驳回使用不同的按钮颜色。', {
    title: '审批处理',
    theme: 'chenghua',
    confirmButtonText: '同意',
    cancelButtonText: '驳回',
    confirmButtonClass: 's-confirm-success-button',
    cancelButtonClass: 's-confirm-warning-button',
  })
}

const warningConfirm = () => {
  confirm('当前任务执行后会影响线上配置，建议确认关联服务状态后继续。', {
    title: '高风险变更',
    theme: 'chenghua',
    showClose: false,
    confirmButtonText: '继续变更',
    cancelButtonText: '取消变更',
    confirmButtonClass: 's-confirm-warning-button',
    cancelButtonClass: 's-confirm-info-button',
  })
}
</script>

<template>
  <div class="chenghua-confirm-demo">
    <s-button theme="chenghua" type="danger" @click="deleteConfirm">删除确认</s-button>
    <s-button theme="chenghua" type="primary" @click="noCancel">无取消按钮</s-button>
    <s-button theme="chenghua" @click="noConfirm">无确定按钮</s-button>
    <s-button theme="chenghua" type="success" @click="customText">自定义文案</s-button>
    <s-button theme="chenghua" type="primary" @click="noClose">不显示 X 按钮</s-button>
    <s-button theme="chenghua" type="success" @click="differentColorButtons">不同颜色按钮</s-button>
    <s-button theme="chenghua" type="warning" @click="warningConfirm">警告确认</s-button>
  </div>
</template>

<style lang="scss" scoped>
.chenghua-confirm-demo {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}
</style>
