<script setup lang="ts">
import { ref } from 'vue'

const multipleValue = ref(['archive', 'ai'])

const options = [
  { label: '智慧档案检索', value: 'archive' },
  { label: '对象存储巡检', value: 'storage' },
  { label: 'AI 审核任务', value: 'ai' },
  { label: '平台运维发布', value: 'ops' },
]
</script>

<template>
  <div class="select-chenghua-demo">
    <s-select v-model="multipleValue" width="100%" theme="chenghua" multiple title="多选服务" :options="options" />
  </div>
</template>

<style scoped lang="scss">
.select-chenghua-demo {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
</style>
