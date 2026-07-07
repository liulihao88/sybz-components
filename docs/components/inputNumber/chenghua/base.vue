<script setup lang="ts">
import { ref } from 'vue'

const count = ref(12)
const quota = ref(36)
const disabledValue = ref(8)
</script>

<template>
  <div class="input-number-chenghua-demo">
    <div class="input-number-chenghua-demo__meta">
      <span>属性: theme</span>
      <span>可选值: '' | 'chenghua' | 'shijingshan'</span>
      <span>默认值: ''</span>
      <span>属性: title</span>
      <span>可选值: string</span>
      <span>默认值: ''</span>
      <span>属性: width</span>
      <span>可选值: string | number</span>
      <span>默认值: ''</span>
      <span>属性: height</span>
      <span>可选值: string | number</span>
      <span>默认值: ''</span>
      <span>属性: controls-position</span>
      <span>可选值: '' | 'right'</span>
      <span>默认值: 'right'</span>
    </div>

    <s-item-wrapper flex="1" wrap="wrap">
      <s-input-number v-model="count" theme="chenghua" title="审核数量" width="240" height="40" :min="0" />
      <s-input-number
        v-model="quota"
        theme="chenghua"
        title="容量配额"
        height="40"
        :min="0"
        :step="2"
        controls-position=""
      />
      <s-input-number v-model="disabledValue" theme="chenghua" title="禁用项" height="40" :min="0" disabled />
    </s-item-wrapper>
  </div>
</template>

<style scoped lang="scss">
.input-number-chenghua-demo {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.input-number-chenghua-demo__meta {
  display: flex;
  flex-wrap: wrap;
  gap: 8px 12px;
  color: var(--el-text-color-secondary);
  font-size: 12px;
  line-height: 1.5;
}

.input-number-chenghua-demo__list {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  align-items: center;
}
</style>
