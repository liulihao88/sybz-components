<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
const isShowAbandon = ref(false)
const isShow = ref(false)
function btnClick() {
  isShowAbandon.value = true
}
function btnClick2() {
  isShow.value = true
}
</script>

<template>
  <div>
    <el-button type="primary" @click="btnClick">打开旧drawer(废弃)</el-button>
    <el-button type="primary" @click="btnClick2">打开新drawer(推荐使用)</el-button>
    <s-dialog ref="dialogRef" v-model="isShow" title="drawer抽屉" type="drawer">
      <div>以后请使用这种用法打开drawer</div>
      <div>以后请使用这种用法打开drawer</div>
      <div>以后请使用这种用法打开drawer</div>
      <div>以后请使用这种用法打开drawer</div>
      <div>以后请使用这种用法打开drawer</div>
      <div>以后请使用这种用法打开drawer</div>
      <div>以后请使用这种用法打开drawer</div>
      <div>以后请使用这种用法打开drawer</div>
      <div>以后请使用这种用法打开drawer</div>
      <div>以后请使用这种用法打开drawer</div>
      <div>以后请使用这种用法打开drawer</div>
      <div>以后请使用这种用法打开drawer</div>
      <div>以后请使用这种用法打开drawer</div>
      <div>以后请使用这种用法打开drawer</div>
      <div>以后请使用这种用法打开drawer</div>
      <div>以后请使用这种用法打开drawer</div>
      <div>以后请使用这种用法打开drawer</div>
      <div>以后请使用这种用法打开drawer</div>
      <div>以后请使用这种用法打开drawer</div>
      <div>以后请使用这种用法打开drawer</div>
      <div>以后请使用这种用法打开drawer</div>
      <div>以后请使用这种用法打开drawer</div>
      <div>以后请使用这种用法打开drawer</div>
      <div>以后请使用这种用法打开drawer</div>
      <div>以后请使用这种用法打开drawer</div>
      <div>以后请使用这种用法打开drawer</div>
      <div>以后请使用这种用法打开drawer</div>
      <div>以后请使用这种用法打开drawer</div>
      <div>以后请使用这种用法打开drawer</div>
      <div>以后请使用这种用法打开drawer</div>
      <div>以后请使用这种用法打开drawer</div>
      <div>以后请使用这种用法打开drawer</div>
      <div>以后请使用这种用法打开drawer</div>
      <div>以后请使用这种用法打开drawer</div>
      <div>以后请使用这种用法打开drawer</div>
      <div>以后请使用这种用法打开drawer</div>
      <div>以后请使用这种用法打开drawer</div>
      <div>以后请使用这种用法打开drawer</div>
      <div>以后请使用这种用法打开drawer</div>
      <div>以后请使用这种用法打开drawer</div>
      <div>以后请使用这种用法打开drawer</div>
      <div>以后请使用这种用法打开drawer</div>
      <div>以后请使用这种用法打开drawer</div>
      <div>以后请使用这种用法打开drawer</div>
      <div>以后请使用这种用法打开drawer</div>
      <div>以后请使用这种用法打开drawer</div>
      <div>以后请使用这种用法打开drawer</div>
      <div>以后请使用这种用法打开drawer</div>
      <div>以后请使用这种用法打开drawer</div>
      <div>以后请使用这种用法打开drawer</div>
      <div>以后请使用这种用法打开drawer</div>
      <div>以后请使用这种用法打开drawer</div>
      <div>以后请使用这种用法打开drawer</div>
      <div>以后请使用这种用法打开drawer</div>
      <div>以后请使用这种用法打开drawer</div>
    </s-dialog>
    <s-drawer v-model="isShowAbandon" title="baseDrawer">
      我是drawer的基础用法(废弃维护当前drawer组件, 改为统一在dialog组件中维护)
    </s-drawer>
  </div>
</template>

<style scoped lang="scss"></style>
