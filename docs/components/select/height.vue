<script setup lang="ts">
import { ref } from 'vue'

const value = ref('archive')
const quickValue = ref('ops')

const options = [
  { label: '智慧档案检索', value: 'archive' },
  { label: '对象存储巡检', value: 'storage' },
  { label: 'AI 审核任务', value: 'audit' },
  { label: '平台运维发布', value: 'ops' },
]
</script>

<template>
  <div class="select-height-demo">
    <div class="demo-meta">
      <span>属性: height</span>
      <span>可选值: string | number</span>
      <span>默认值: ''</span>
    </div>

    <div class="demo-list">
      <s-select v-model="value" title="服务名称" width="200" height="40" :options="options" />
      <s-select v-model="quickValue" title="快速切换1" width="200" size="small" :options="options" showQuick />
      <s-select v-model="quickValue" title="快速切换2" width="200" height="32" :options="options" showQuick />
    </div>
  </div>
</template>

<style scoped lang="scss">
.select-height-demo {
  display: grid;
  gap: 16px;
}

.demo-meta {
  display: flex;
  gap: 18px;
  flex-wrap: wrap;
  color: var(--el-text-color-secondary);
  font-size: 12px;
  line-height: 1.5;
}

.demo-list {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  align-items: center;
}
</style>
