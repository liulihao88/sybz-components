<template>
  <div class="input-size-demo">
    <div class="input-demo-meta">
      <span>属性: size</span>
      <span>可选值: '' | 'small' | 'default' | 'large'</span>
      <span>默认值: ''</span>
    </div>

    <s-flex gap="small" align="center">
      <s-input v-model="input" width="220" size="large" placeholder="large" />
      <s-input v-model="input" width="220" size="default" placeholder="default" />
      <s-input v-model="input" width="220" size="small" placeholder="small" />
    </s-flex>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const input = ref('')
</script>

<style scoped lang="scss">
.input-size-demo {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.input-demo-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 8px 12px;
  color: var(--el-text-color-secondary);
  font-size: 12px;
  line-height: 1.5;
}
</style>
