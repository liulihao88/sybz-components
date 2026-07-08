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
  <div class="checkbox-chenghua-demo">
    <div class="checkbox-chenghua-demo__list">
      <s-checkbox v-model="checkedServices" theme="chenghua" :options="options" gap="18"></s-checkbox>
      <s-checkbox
        v-model="checkedModes"
        theme="chenghua"
        :options="modeOptions"
        show-type="button"
        :show-all="false"
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
