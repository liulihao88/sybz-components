<script setup lang="ts">
import { ref } from 'vue'

const checkedServices = ref(['storage'])
const checkedModes = ref(['auto'])

const options = [
  { label: '对象存储巡检', value: 'storage' },
  { label: 'AI 审核任务', value: 'audit' },
  { label: '容量预警订阅', value: 'quota' },
]

const modeOptions = [
  { label: '自动审核', value: 'auto' },
  { label: '人工复核', value: 'manual' },
  { label: '延后处理', value: 'delay' },
]
</script>

<template>
  <div class="checkbox-shijingshan-demo">
    <div class="checkbox-shijingshan-demo__meta">
      <span>属性: theme</span>
      <span>可选值: 'default' | 'chenghua' | 'shijingshan'</span>
      <span>默认值: 'default'</span>
      <span>属性: showType</span>
      <span>可选值: check | button</span>
      <span>默认值: check</span>
      <span>属性: showAll</span>
      <span>可选值: true | false</span>
      <span>默认值: true</span>
      <span>属性: gap</span>
      <span>可选值: number | string</span>
      <span>默认值: ''</span>
    </div>

    <div class="checkbox-shijingshan-demo__list">
      <s-checkbox v-model="checkedServices" theme="shijingshan" :options="options" gap="18"></s-checkbox>
      <s-checkbox
        v-model="checkedModes"
        theme="shijingshan"
        :options="modeOptions"
        show-type="button"
        :show-all="false"
      ></s-checkbox>
    </div>
  </div>
</template>

<style scoped lang="scss">
.checkbox-shijingshan-demo {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.checkbox-shijingshan-demo__meta {
  display: flex;
  flex-wrap: wrap;
  gap: 8px 12px;
  color: var(--el-text-color-secondary);
  font-size: 12px;
  line-height: 1.5;
}

.checkbox-shijingshan-demo__list {
  display: flex;
  flex-direction: column;
  gap: 14px;
}
</style>
