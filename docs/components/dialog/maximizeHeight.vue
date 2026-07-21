<script setup lang="ts">
import { ref } from 'vue'

const isShow = ref(false)
</script>

<template>
  <div>
    <el-button type="primary" @click="isShow = true">打开最大化高度 dialog</el-button>
    <s-dialog v-model="isShow" title="最大化高度 dialog" maximize-height>
      <p v-for="item in 24" :key="item">第 {{ item }} 条信息</p>
    </s-dialog>
  </div>
</template>
