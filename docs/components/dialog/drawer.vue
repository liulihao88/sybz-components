<script setup lang="ts">
import { ref } from 'vue'

const isShow = ref(false)
</script>

<template>
  <div>
    <el-button type="primary" @click="isShow = true">打开 drawer</el-button>
    <s-dialog v-model="isShow" title="抽屉式 dialog" type="drawer">
      <p>设置 type="drawer" 后，s-dialog 会使用抽屉方式从页面侧边打开。</p>
      <p>type 可选值：''、drawer；默认值：''。</p>
    </s-dialog>
  </div>
</template>
