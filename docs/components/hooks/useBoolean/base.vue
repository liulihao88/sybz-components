<script setup lang="ts">
import { useBoolean } from '@/index.ts'

const { state: visible, setTrue: open, setFalse: close, toggle } = useBoolean(false)
</script>

<template>
  <s-flex gap="12" align="center" wrap>
    <el-button type="primary" @click="open">打开</el-button>
    <el-button @click="close">关闭</el-button>
    <el-button @click="toggle">切换</el-button>
    <el-tag :type="visible ? 'success' : 'info'">visible: {{ visible }}</el-tag>
  </s-flex>
</template>
