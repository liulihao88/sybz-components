<script setup lang="ts">
import { ref } from 'vue'

const count = ref(12)
const rightCount = ref(3)
const smallCount = ref(1)
</script>

<template>
  <div class="input-number-size-demo">
    <div class="input-number-size-demo__meta">
      <span>属性: size</span>
      <span>可选值: large | default | small</span>
      <span>默认值: ''</span>
    </div>

    <div class="input-number-size-demo__list">
      <s-input-number v-model="smallCount" title="小尺寸" size="small" :min="0" />
      <s-input-number v-model="smallCount" title="默认尺寸" :min="0" />
      <s-input-number v-model="smallCount" title="大尺寸" size="large" :min="0" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.input-number-size-demo {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.input-number-size-demo__meta {
  display: flex;
  flex-wrap: wrap;
  gap: 8px 12px;
  color: var(--el-text-color-secondary);
  font-size: 12px;
  line-height: 1.5;
}

.input-number-size-demo__list {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  align-items: center;
}
</style>
