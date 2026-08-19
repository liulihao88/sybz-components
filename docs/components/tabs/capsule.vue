<script setup lang="ts">
import { ref } from 'vue'
import { Grid, Monitor, SetUp } from '@element-plus/icons-vue'

const smallActiveTab = ref('skill')
const defaultActiveTab = ref('skill')
const largeActiveTab = ref('skill')
const chenghuaActiveTab = ref('mini')

const navList = [
  {
    label: '网页应用',
    value: 'web',
  },
  {
    label: '小程序',
    value: 'mini',
    tag: 'NEW',
  },
  {
    label: '技能创建',
    value: 'skill',
  },
]
</script>

<template>
  <s-tabs v-model="defaultActiveTab" :options="navList" type="capsule">
    <template #web-label>
      <el-icon><Monitor /></el-icon>
      <span>网页应用</span>
    </template>

    <template #mini-label>
      <el-icon><Grid /></el-icon>
      <span>小程序</span>
    </template>

    <template #skill-label>
      <el-icon><SetUp /></el-icon>
      <span>技能创建</span>
    </template>

    <template #web>网页应用内容</template>
    <template #mini>小程序内容</template>
    <template #skill>技能创建内容</template>
  </s-tabs>
</template>

<style scoped lang="scss"></style>
