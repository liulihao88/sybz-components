<script setup lang="ts">
import { docThemeOptions } from '../../.vitepress/theme/theme'

import { ref } from 'vue'
const theme = ref<(typeof docThemeOptions)[number]>('default')

const value = ref('archive')
const disabledValue = ref('storage')
const smallValue = ref('archive')
const defaultValue = ref('storage')
const largeValue = ref('ai')
const multipleValue = ref(['archive', 'ai'])

const options = [
  { label: '智慧档案检索', value: 'archive' },
  { label: '对象存储巡检', value: 'storage' },
  { label: 'AI 审核任务', value: 'ai' },
  { label: '平台运维发布', value: 'ops' },
]
</script>

<template>
  <s-radio v-model="theme" :options="docThemeOptions" variant="button" title="theme" class="p-b-10" />
  <div class="select-chenghua-demo">
    <s-select v-model="value" width="320" :theme="theme" title="服务名称" :options="options" />
    <s-select v-model="disabledValue" width="320" :theme="theme" title="禁用服务" :options="options" disabled />
    <s-select v-model="smallValue" width="320" :theme="theme" size="small" :options="options" />
    <s-select v-model="defaultValue" width="320" :theme="theme" size="default" :options="options" />
    <s-select v-model="largeValue" width="320" :theme="theme" size="large" :options="options" />
    <s-select v-model="multipleValue" width="100%" :theme="theme" multiple title="多选服务" :options="options" />
  </div>
</template>

<style scoped lang="scss">
.select-chenghua-demo {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
</style>
