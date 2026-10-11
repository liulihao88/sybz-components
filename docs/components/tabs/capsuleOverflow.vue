<script setup lang="ts">
import { ref } from 'vue'

const active = ref()

const options = [
  'GIS部',
  'IT服务台',
  '专项部',
  '产品部',
  '人力资源',
  '人力资源部',
  '付费媒体部',
  '供应链部',
  '学术部',
  '安全部',
  '工程部',
  '支持部',
  '法务部',
  '测试部',
  '游戏开发部',
  '空间计算部',
  '营销部',
  '行政后勤',
  '设计部',
  '通用',
  '金融部',
  '销售部',
  '项目管理部',
].map((v) => {
  return {
    label: v,
    value: v,
  }
})

function toggleCategoryTab(tab) {
  console.log(`68 tab`, tab)
  console.log(`2238 48行 docs/components/tabs/capsuleOverflow.vue tab.paneName `, tab.paneName)
  if (tab.paneName === active.value) {
    active.value = ''
  }
}
</script>

<template>
  <s-tabs v-model="active" :options="options" />
  <s-tabs
    v-model="active"
    :options="options"
    type="capsule"
    theme="shijingshan"
    header-margin="0"
    @tab-click="toggleCategoryTab"
  />
  <p>当前选中：{{ active }}</p>
</template>

<style scoped></style>
