<script setup lang="ts">
import { ref } from 'vue'

const enabled = ref(true)
const audit = ref(false)
const priority = ref(1)

const attrs = [
  { label: 'theme', value: "'default' | 'chenghua' | 'shijingshan'", defaultValue: "'default'" },
  { label: 'width', value: 'string | number', defaultValue: "''" },
  { label: 'active-text', value: 'string', defaultValue: "''" },
  { label: 'inactive-text', value: 'string', defaultValue: "''" },
]
</script>

<template>
  <div class="switch-shijingshan-demo">
    <div class="switch-shijingshan-demo__meta">
      <span v-for="item in attrs" :key="item.label">
        属性: {{ item.label }} / 可选值: {{ item.value }} / 默认值: {{ item.defaultValue }}
      </span>
    </div>

    <div class="switch-shijingshan-demo__list">
      <s-switch v-model="enabled" theme="shijingshan" active-text="启用" inactive-text="停用" />
      <s-switch v-model="audit" theme="shijingshan" active-text="自动审核" inactive-text="人工复核" :width="92" />
      <s-switch
        v-model="priority"
        theme="shijingshan"
        active-text="高优先级"
        inactive-text="普通"
        :active-value="1"
        :inactive-value="0"
        width="104"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.switch-shijingshan-demo {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.switch-shijingshan-demo__meta {
  display: flex;
  flex-wrap: wrap;
  gap: 8px 12px;
  color: var(--el-text-color-secondary);
  font-size: 12px;
  line-height: 1.5;
}

.switch-shijingshan-demo__list {
  display: flex;
  flex-wrap: wrap;
  gap: 14px 24px;
  align-items: center;
}
</style>
