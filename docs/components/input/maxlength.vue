<template>
  <div class="input-maxlength-demo">
    <div class="input-demo-meta">
      <span>属性: maxlength</span>
      <span>可选值: string | number</span>
      <span>默认值: 10</span>
      <span>属性: hideMaxLengthError</span>
      <span>可选值: true | false</span>
      <span>默认值: false</span>
      <span>属性: maxLengthErrorText</span>
      <span>可选值: string</span>
      <span>默认值: ''</span>
    </div>

    <s-flex gap="small" direction="column">
      <s-input
        v-model="customValue"
        width="320"
        title="自定义 maxlength 和 toast 文案"
        :maxlength="6"
        max-length-error-text="最多只能输入 6 个字符"
      />
      <s-input v-model="hiddenToastValue" title="隐藏 toast 提示" width="320" :maxlength="8" hide-max-length-error />
    </s-flex>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const defaultValue = ref('')
const customValue = ref('')
const hiddenToastValue = ref('')
</script>

<style scoped lang="scss">
.input-maxlength-demo {
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
