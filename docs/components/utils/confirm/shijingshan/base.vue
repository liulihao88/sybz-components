<script setup lang="ts">
import { confirm } from '@/utils/src/index'

const deleteConfirm = () => {
  confirm({
    variant: 'delete',
    target:
      '4a731a90594a4af544c0c25941171jpeg.jpeg、小米汽车.png、蓝紫渐变闪粉艺术玻璃花瓶产品参数.xlsx、戴珍珠耳环的少女.png、雕像.png Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fuga a eveniet corporis, maiores ab laboriosam eligendi quia ex atque aspernatur odit sint numquam assumenda impedit voluptas reiciendis inventore eos veniam!',
    theme: 'shijingshan',
  })
}

const noCancel = () => {
  confirm('当前申请已提交，请等待平台审核。', {
    title: '提交成功',
    theme: 'shijingshan',
    showCancelButton: false,
    confirmButtonText: '知道了',
  })
}

const noConfirm = () => {
  confirm('当前内容存在未保存修改，建议返回检查后再离开。', {
    title: '离开提醒',
    theme: 'shijingshan',
    showConfirmButton: false,
    cancelButtonText: '返回检查',
  })
}

const customText = () => {
  confirm('确定提交当前服务申请吗？', {
    title: '石景山 AI 服务申请',
    theme: 'shijingshan',
    confirmButtonText: '立即提交',
    cancelButtonText: '再想想',
  })
}

const noClose = () => {
  confirm('该操作需要通过底部按钮明确选择，右上角关闭按钮已隐藏。', {
    title: '隐藏关闭按钮',
    theme: 'shijingshan',
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
    theme: 'shijingshan',
    confirmButtonText: '同意',
    cancelButtonText: '驳回',
    confirmButtonClass: 's-confirm-success-button',
    cancelButtonClass: 's-confirm-warning-button',
  })
}

const warningConfirm = () => {
  confirm('该操作可能影响现有数据，请确认后继续。', {
    variant: 'warning',
    theme: 'shijingshan',
  })
}
</script>

<template>
  <div class="shijingshan-confirm-demo">
    <s-button theme="shijingshan" type="danger" @click="deleteConfirm">删除确认</s-button>
    <s-button theme="shijingshan" type="primary" @click="noCancel">无取消按钮</s-button>
    <s-button theme="shijingshan" @click="noConfirm">无确定按钮</s-button>
    <s-button theme="shijingshan" type="success" @click="customText">自定义文案</s-button>
    <s-button theme="shijingshan" type="primary" @click="noClose">不显示 X 按钮</s-button>
    <s-button theme="shijingshan" type="success" @click="differentColorButtons">不同颜色按钮</s-button>
    <s-button theme="shijingshan" type="warning" @click="warningConfirm">警告确认</s-button>
  </div>
</template>

<style lang="scss" scoped>
.shijingshan-confirm-demo {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}
</style>
