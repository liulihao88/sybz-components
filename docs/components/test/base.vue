<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
const cc = ref(123)
const isShow = ref(false)
</script>

<template>
  <div>
    <el-input v-model="cc" v-copy="cc"></el-input>
    1233334455
    <div></div>

    <el-button type="primary" size="small">测试02</el-button>
    <s-button theme="chenghua" size="small" type="primary"></s-button>
    <s-table></s-table>
    <s-empty description="暂无数据" width="48" height="48"></s-empty>

    <el-dialog title="33"></el-dialog>
    <s-dialog
      v-model="isShow"
      title2="12321"
      theme="chenghua"
      type="drawer"
      confirmText=""
      :show-confirm="false"
    ></s-dialog>

    <s-tag theme="chenghua2"></s-tag>

    <s-date-picker ></s-date-picker>

    <s-input v-model="cc" height="30" size="large" :clearable="false" theme="chenghua"></s-input>

    <!-- <s-select multiple label="1" ></s-select> -->
  </div>
</template>
