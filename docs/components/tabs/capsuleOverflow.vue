<script setup lang="ts">
import { ref } from 'vue'

const active = ref('all')
const options = [
  { label: '全部内容', value: 'all' },
  { label: '对话与任务', value: 'conversation' },
  { label: '知识与内容', value: 'knowledge' },
  { label: '智能体构建', value: 'agent' },
  { label: '系统管理', value: 'system' },
  { label: '运营数据', value: 'operation' },
  { label: '使用帮助', value: 'help' },
]
</script>

<template>
  <div class="capsule-overflow-demo">
    <s-tabs v-model="active" :options="options" width="100%" />
    <s-tabs v-model="active" :options="options" type="capsule" width="100%" />
    <p>当前选中：{{ active }}</p>
  </div>
</template>

<style scoped>
.capsule-overflow-demo {
  width: min(100%, 560px);
}
.capsule-overflow-demo p {
  margin: 14px 0 0;
  color: var(--el-text-color-secondary);
  font-size: 14px;
}
</style>
