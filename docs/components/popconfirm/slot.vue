<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
const popoverRef = ref()
function confirm() {
  console.log('confirm')
}
function cusConfirm() {
  console.log('cusConfirm')
  popoverRef.value?.close()
}
</script>

<template>
  <div>
    <s-popconfirm ref="popoverRef" trigger="click" title="" @confirm="confirm">
      <template #content>我是slot的content</template>
      <template #footer>
        <el-button size="small" type="primary" @click="cusConfirm">我是slot的footer</el-button>
      </template>
      <el-button type="danger">
        <s-icon name="delete"></s-icon>
        你好啊
      </el-button>
    </s-popconfirm>
  </div>
</template>

<style scoped lang="scss"></style>
