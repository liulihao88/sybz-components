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
    <s-flex gap="8">
      <s-select v-model="value" title="服务名称" width="200" height="40" :options="options" />
      <s-select v-model="quickValue" title="快速切换1" width="200" size="small" :options="options" />
      <s-select v-model="quickValue" title="快速切换2" width="200" height="32" :options="options" />
      <s-select v-model="quickValue" title="快速切换2" width="200" height="20" :options="options" />
    </s-flex>
  </div>
</template>

<style scoped lang="scss"></style>
