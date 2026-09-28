<script setup lang="ts">
import { docThemeOptions } from '../../.vitepress/theme/theme'

import { getCurrentInstance, ref } from 'vue'
const theme = ref<(typeof docThemeOptions)[number]>('default')

const proxy = getCurrentInstance()?.proxy as { $toast?: (message: string) => void } | null

function confirm() {
  proxy?.$toast?.('confirm')
}
</script>

<template>
  <s-radio v-model="theme" :options="docThemeOptions" show-type="button" title="theme" class="p-b-10" />
  <s-popconfirm :theme="theme" variant="delete" target="智慧档案检索" @confirm="confirm">
    <s-button :theme="theme" type="danger">删除</s-button>
  </s-popconfirm>

  <s-popconfirm
    :theme="theme"
    variant="warning"
    content="将<code>发布</code>到<mark>生产环境</mark>, 请确认配置无误。"
    @confirm="confirm"
  >
    <s-button :theme="theme" type="primary">警告</s-button>
  </s-popconfirm>
  <s-popconfirm :theme="theme" content="是否确认?" @confirm="confirm">
    <s-button :theme="theme" type="primary">常规</s-button>
  </s-popconfirm>
</template>

<style scoped lang="scss"></style>
