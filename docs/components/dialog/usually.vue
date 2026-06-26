<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
function btnClick() {
  isShow.value = true
}
const a = ref(33)
const isShow = ref(false)
const confirmLoading = ref(false)
async function cusConfirm() {
  console.log(`***** 点我作甚  10行 docs/examples/SDialog/usually.vue  15:06:26`)
  confirmLoading.value = true
  proxy.$toast('正在保存', 'i')
  await sleep(2000)
  proxy.$toast('保存成功', { duration: 3000 })
  confirmLoading.value = false
  isShow.value = false
}
function sleep(delay = 0, fn = () => {}) {
  return new Promise((resolve) =>
    setTimeout(() => {
      fn && fn()
      resolve()
    }, delay),
  )
}
</script>

<template>
  <el-button type="danger" @click="btnClick">打开dialog</el-button>
  <s-dialog
    ref="dialogRef"
    v-model="isShow"
    title="常用的dialog"
    width="100%"
    :close-on-click-modal="false"
    :confirm-attrs="{
      loading: confirmLoading,
    }"
    confirm-text="保存"
    cancel-text="高级配置"
    :cancel-attrs="{
      type: 'primary',
      icon: 'el-icon-edit',
    }"
    @confirm="cusConfirm"
    @cancel="proxy.$toast('哈哈')"
  >
    <div v-for="(v, i) in 40" :key="i">
      <div>超长文本</div>
    </div>
  </s-dialog>
</template>

<style scoped lang="scss"></style>
