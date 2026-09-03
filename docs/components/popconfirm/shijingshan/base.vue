<script setup lang="ts">
import { getCurrentInstance } from 'vue'

const proxy = getCurrentInstance()?.proxy as { $toast?: (message: string) => void } | null

function confirm() {
  proxy?.$toast?.('confirm')
}
</script>

<template>
  <s-popconfirm
    theme="shijingshan"
    title="确认删除任务"
    content="确定删除<mark>智慧档案检索</mark>吗?"
    :dangerouslyUseHTMLString="true"
    width="260"
    trigger="click"
    confirm-button-text="删除"
    cancel-button-text="暂不删除"
    confirm-button-type="danger"
    cancel-button-type="text"
    @confirm="confirm"
  >
    <s-button theme="shijingshan" type="danger">删除服务</s-button>
  </s-popconfirm>

  <s-popconfirm
    theme="shijingshan"
    title="发布确认"
    content="将发布到<mark>生产环境</mark>, 请确认配置无误。"
    :dangerouslyUseHTMLString="true"
    width="280"
    trigger="click"
    @confirm="confirm"
  >
    <s-button theme="shijingshan" type="primary">发布配置</s-button>
  </s-popconfirm>
</template>

<style scoped lang="scss"></style>
