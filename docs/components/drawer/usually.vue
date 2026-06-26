<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
import { sleep } from '@sybz-components/utils'

const { proxy } = getCurrentInstance()
const confirmLoading = ref(false)
function btnClick() {
  isShow.value = true
}
const a = ref(33)
const isShow = ref(false)
async function cusConfirm() {
  confirmLoading.value = true
  await sleep(2000)
  confirmLoading.value = false
  isShow.value = false
}
</script>

<template>
  <div>
    <s-drawer
      ref="dialogRef"
      v-model="isShow"
      title="App"
      :confirm-attrs="{
        loading: confirmLoading,
      }"
      @confirm="cusConfirm"
    >
      <div>这是内容</div>
      <div>这是内容</div>
      <div>这是内容</div>
      <div>这是内容</div>
      <div>这是内容</div>
      <div>这是内容</div>
      <div>这是内容</div>
      <div>这是内容</div>
      <div>这是内容</div>
      <div>这是内容</div>
      <div>这是内容</div>
      <div>这是内容</div>
      <div>这是内容</div>
      <div>这是内容</div>
      <div>这是内容</div>
      <div>这是内容</div>
      <div>这是内容</div>
      <div>这是内容</div>
      <div>这是内容</div>
      <div>这是内容</div>
      <div>这是内容</div>
      <div>这是内容</div>
      <div>这是内容</div>
      <div>这是内容</div>
      <div>这是内容</div>
      <div>这是内容</div>
      <div>这是内容</div>
      <div>这是内容</div>
      <div>这是内容</div>
      <div>这是内容</div>
      <div>这是内容</div>
      <div>这是内容</div>
      <div>这是内容</div>
      <div>这是内容</div>
      <div>这是内容</div>
      <div>这是内容</div>
      <div>这是内容</div>
      <div>这是内容</div>
      <div>这是内容</div>
      <div>这是内容</div>
      <div>这是内容</div>
      <div>这是内容</div>
      <div>这是内容</div>
      <div>这是内容</div>
      <div>这是内容</div>
      <div>这是内容</div>
      <div>这是内容</div>
      <div>这是内容</div>
      <div>这是内容</div>
      <div>这是内容</div>
      <div>这是内容</div>
      <div>这是内容</div>
      <div>这是内容</div>
      <div>这是内容</div>
      <div>这是内容</div>
      <div>这是内容</div>
      <div>这是内容</div>
      <div>这是内容</div>
      <div>这是内容</div>
      <div>这是内容</div>
      <div>这是内容</div>
      <div>这是内容</div>
      <div>这是内容</div>
      <div>这是内容</div>
      <div>这是内容</div>
      <div>这是内容</div>
      <div>这是内容</div>
      <div>这是内容</div>
      <div>这是内容</div>
      <div>这是内容</div>
      <div>这是内容</div>
      <div>这是内容</div>
      <div>这是内容</div>
      <div>这是内容</div>
      <div>这是内容</div>
      <div>这是内容</div>
      <div>这是内容</div>
      <div>这是内容</div>
      <div>这是内容</div>
      <div>这是内容</div>
      <div>这是内容</div>
      <div>这是内容</div>
      <div>这是内容</div>
    </s-drawer>
    <el-button type="danger" @click="btnClick">打开drawer</el-button>
  </div>
</template>

<style scoped lang="scss"></style>
