<script setup lang="ts">
import { getCurrentInstance } from 'vue'

const proxy = getCurrentInstance()?.proxy as { $toast?: (message: string) => void } | null

function confirm() {
  proxy?.$toast?.('confirm')
}
</script>

<template>
  <s-popconfirm theme="sybz" variant="delete" target="智慧档案检索" @confirm="confirm">
    <s-button theme="sybz" type="danger">删除</s-button>
  </s-popconfirm>

  <s-popconfirm
    theme="sybz"
    variant="warning"
    content="将<code>发布</code>到<mark>生产环境</mark>, 请确认配置无误。"
    @confirm="confirm"
  >
    <s-button theme="sybz" type="primary">警告</s-button>
  </s-popconfirm>
  <s-popconfirm theme="sybz" content="是否确认?" @confirm="confirm">
    <s-button theme="sybz" type="primary">常规</s-button>
  </s-popconfirm>
</template>

<style scoped lang="scss"></style>
