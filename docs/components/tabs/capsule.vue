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
  <div class="tabs-capsule-demo">
    <s-tabs v-model="defaultActiveTab" :options="navList" type="capsule">
      <template #web-label>
        <el-icon><Monitor /></el-icon>
        <span>网页应用</span>
      </template>

      <template #mini-label>
        <el-icon><Grid /></el-icon>
        <span>小程序</span>
        <em>NEW</em>
      </template>

      <template #skill-label>
        <el-icon><SetUp /></el-icon>
        <span>技能创建</span>
      </template>

      <template #web>网页应用内容</template>
      <template #mini>小程序内容</template>
      <template #skill>技能创建内容</template>
    </s-tabs>
  </div>
</template>

<style scoped lang="scss">
.tabs-capsule-demo {
  --s-tabs-capsule-active-bg: var(--el-color-primary);
  display: flex;
  flex-direction: column;
  gap: 18px;
  align-items: flex-start;

  :deep(.el-tabs__content) {
    color: var(--el-text-color-regular);
    font-size: 14px;
  }

  :deep(.s-tabs__label em) {
    color: #8b5cf6;
    font-size: 13px;
    font-style: normal;
    font-weight: 800;
  }

  :deep(.el-tabs__item.is-active .s-tabs__label em) {
    color: rgba(255, 255, 255, 0.86);
  }
}
</style>
