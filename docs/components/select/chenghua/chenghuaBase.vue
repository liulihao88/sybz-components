<script setup lang="ts">
import { ref } from 'vue'

const value = ref('archive')

const options = [
  { label: '智慧档案检索', value: 'archive' },
  { label: '对象存储巡检', value: 'storage' },
  { label: 'AI 审核任务', value: 'ai' },
  { label: '平台运维发布', value: 'ops' },
]
</script>

<template>
  <div class="select-chenghua-demo">
    <div class="select-demo-meta">
      <span>属性: theme</span>
      <span>可选值: '' | 'chenghua' | 'shijingshan'</span>
      <span>默认值: ''</span>
      <span>属性: title</span>
      <span>可选值: string</span>
      <span>默认值: ''</span>
    </div>

    <s-select v-model="value" width="320" theme="chenghua" title="服务名称" :options="options" />
  </div>
</template>

<style scoped lang="scss">
.select-chenghua-demo {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.select-demo-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 8px 12px;
  color: var(--el-text-color-secondary);
  font-size: 12px;
  line-height: 1.5;
}
</style>
