<script setup lang="ts">
import { ref } from 'vue'

const service = ref('audit')
const priority = ref('high')
const mode = ref('auto')

const serviceOptions = [
  { label: '智能审核', value: 'audit' },
  { label: '模型训练', value: 'training' },
  { label: '资源巡检', value: 'inspect' },
]

const priorityOptions = [
  { label: '普通', value: 'normal' },
  { label: '高优先级', value: 'high' },
  { label: '紧急', value: 'urgent' },
]

const modeOptions = [
  {
    label: '自动处理',
    value: 'auto',
  },
  { label: '人工复核', value: 'manual' },
  { label: '延后处理', value: 'delay' },
]
</script>

<template>
  <div class="radio-sybz-demo">
    <div class="radio-sybz-demo__list">
      <s-radio v-model="service" title="服务类型" theme="sybz" :options="serviceOptions" />
      <s-radio v-model="priority" theme="sybz" :options="priorityOptions" border />
      <s-radio v-model="mode" theme="sybz" :options="modeOptions" show-type="button" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.radio-sybz-demo {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.radio-sybz-demo__list {
  display: flex;
  flex-direction: column;
  gap: 14px;
}
</style>
