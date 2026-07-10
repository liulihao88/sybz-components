<script setup lang="ts">
import { ref } from 'vue'

const value = ref('archive')
const disabledValue = ref('storage')

const options = [
  { label: '智慧档案检索', value: 'archive' },
  { label: '对象存储巡检', value: 'storage' },
  { label: 'AI 审核任务', value: 'ai' },
  { label: '平台运维发布', value: 'ops' },
]
</script>

<template>
  <div class="select-shijingshan-demo">
    <s-select v-model="value" width="320" theme="shijingshan" title="服务名称" :options="options" />
    <s-select v-model="disabledValue" width="320" theme="shijingshan" title="禁用服务" :options="options" disabled />
  </div>
</template>

<style scoped lang="scss">
.select-shijingshan-demo {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
</style>
