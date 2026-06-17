<script setup lang="ts">
import { ref } from 'vue'

const value = ref('')
const selectValue = ref('')
const count = ref(12)

const options = [
  { label: '审核规则', value: 'rule' },
  { label: '容量预警', value: 'quota' },
  { label: '服务巡检', value: 'service' },
]
</script>

<template>
  <div class="comp-title-chenghua-demo">
    <div class="comp-title-chenghua-demo__meta">
      <span>属性: theme</span>
      <span>可选值: '' | 'chenghua'</span>
      <span>默认值: ''</span>
      <span>属性: title</span>
      <span>可选值: string</span>
      <span>默认值: ''</span>
      <span>属性: boxStyle</span>
      <span>可选值: object</span>
      <span>默认值: {}</span>
      <span>透传属性: size</span>
      <span>可选值: large | default | small</span>
      <span>默认值: default</span>
    </div>

    <div class="comp-title-chenghua-demo__list">
      <s-comp-title title="审核周期" theme="chenghua" :box-style="{ width: 96 }" />

      <div class="comp-title-chenghua-demo__row">
        <s-comp-title title="服务名称" theme="chenghua" :box-style="{ width: 96 }" />
        <el-input v-model="value" placeholder="请输入服务名称" />
      </div>

      <s-select
        v-model="selectValue"
        theme="chenghua"
        size="small"
        title="业务类型"
        width="360"
        :box-style="{ width: 96 }"
        :options="options"
        placeholder="请选择业务类型"
      />

      <s-input-number
        v-model="count"
        theme="chenghua"
        title="容量配额"
        size="large"
        width="360"
        :box-style="{ width: 96 }"
        :min="0"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.comp-title-chenghua-demo {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.comp-title-chenghua-demo__meta {
  display: flex;
  flex-wrap: wrap;
  gap: 8px 12px;
  color: var(--el-text-color-secondary);
  font-size: 12px;
  line-height: 1.5;
}

.comp-title-chenghua-demo__list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.comp-title-chenghua-demo__row {
  display: flex;
  align-items: stretch;
  width: 360px;
  min-width: 0;
}

.comp-title-chenghua-demo__row :deep(.el-input) {
  flex: 1;
  min-width: 0;
}

.comp-title-chenghua-demo__row :deep(.el-input__wrapper) {
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}
</style>
