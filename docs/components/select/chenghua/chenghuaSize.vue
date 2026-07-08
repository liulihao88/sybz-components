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
</style>
