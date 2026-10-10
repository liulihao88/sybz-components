<script setup lang="ts">
import { docThemeOptions } from '../../.vitepress/theme/theme'

import { ref } from 'vue'
const theme = ref<(typeof docThemeOptions)[number]>('default')

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
  <s-radio v-model="theme" :options="docThemeOptions" variant="button" title="theme" class="p-b-10" />
  <div class="checkbox-chenghua-demo">
    <div class="checkbox-chenghua-demo__list">
      <s-checkbox v-model="checkedServices" :theme="theme" :options="options" gap="18"></s-checkbox>
      <s-checkbox
        v-model="checkedModes"
        :theme="theme"
        :options="modeOptions"
        variant="button"
        title="无敌"
      ></s-checkbox>
    </div>
  </div>
</template>

<style scoped lang="scss">
.checkbox-chenghua-demo {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.checkbox-chenghua-demo__list {
  display: flex;
  flex-direction: column;
  gap: 14px;
}
</style>
