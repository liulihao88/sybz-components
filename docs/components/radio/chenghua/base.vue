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
  { label: '自动处理', value: 'auto' },
  { label: '人工复核', value: 'manual' },
  { label: '延后处理', value: 'delay' },
]
</script>

<template>
  <div class="radio-chenghua-demo">
    <div class="radio-chenghua-demo__meta">
      <span>属性: theme</span>
      <span>可选值: '' | 'chenghua'</span>
      <span>默认值: ''</span>
      <span>属性: showType</span>
      <span>可选值: radio | button</span>
      <span>默认值: radio</span>
      <span>属性: border</span>
      <span>可选值: true | false</span>
      <span>默认值: false</span>
    </div>

    <div class="radio-chenghua-demo__list">
      <s-radio v-model="service" title="服务类型" theme="chenghua" :options="serviceOptions" />
      <s-radio v-model="priority" theme="chenghua" :options="priorityOptions" border />
      <s-radio v-model="mode" theme="chenghua" :options="modeOptions" show-type="button" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.radio-chenghua-demo {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.radio-chenghua-demo__meta {
  display: flex;
  flex-wrap: wrap;
  gap: 8px 12px;
  color: var(--el-text-color-secondary);
  font-size: 12px;
  line-height: 1.5;
}

.radio-chenghua-demo__list {
  display: flex;
  flex-direction: column;
  gap: 14px;
}
</style>
