<script setup lang="ts">
import { ref } from 'vue'

const smallValue = ref('archive')
const defaultValue = ref('storage')
const largeValue = ref('ai')

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
      <span>可选值: '' | 'chenghua'</span>
      <span>默认值: ''</span>
      <span>属性: size</span>
      <span>可选值: '' | 'small' | 'default' | 'large'</span>
      <span>默认值: ''</span>
    </div>

    <s-flex gap="small" direction="column">
      <s-select v-model="smallValue" width="320" theme="chenghua" size="small" :options="options" />
      <s-select v-model="defaultValue" width="320" theme="chenghua" size="default" :options="options" />
      <s-select v-model="largeValue" width="320" theme="chenghua" size="large" :options="options" />
    </s-flex>
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
