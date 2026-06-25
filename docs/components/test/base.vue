<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
const cc = ref(123)
</script>

<template>
  <div>
    <el-input v-model="cc" v-copy="cc"></el-input>
    1233334455
    <div></div>

    <el-button type="primary2" size="small2d">测试02</el-button>
    <s-button theme="chenghua2" size="small2d" type="primary2"></s-button>
    <s-table></s-table>
    <s-empty description="暂无数据" width="48" height="48"></s-empty>
  </div>
</template>
