<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
import { $toast } from '@sybz-components/utils'
const isShow = ref(false)
const closeType = ref()
const confirm = async () => {
  if (closeType.value === 'noClose') {
    await proxy.delay(300)
    $toast('点击了确认但不关闭')
    return
  }
  await proxy.delay(300)
  proxy.$toast(1)
  await proxy.delay(1000)
  proxy.$toast(2)
  isShow.value = false
}
const open = (type: string) => {
  isShow.value = true
  closeType.value = type
}
</script>

<template>
  <div>
    <s-dialog v-model="isShow" :confirm="confirm">
      <div>内容</div>
    </s-dialog>
    <s-button type="primary" @click="open('base')">打开dialog</s-button>
    <s-button type="primary" @click="open('noClose')">打开dialog并且点击确认不关闭</s-button>
  </div>
</template>
