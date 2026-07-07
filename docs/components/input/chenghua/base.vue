<template>
  <div class="input-chenghua-demo">
    <div class="input-demo-meta">
      <span>属性: theme</span>
      <span>可选值: 'default' | 'chenghua' | 'shijingshan'</span>
      <span>默认值: 'default'</span>
      <span>属性: size</span>
      <span>可选值: '' | 'small' | 'default' | 'large'</span>
      <span>默认值: ''</span>
      <span>属性: maxlength</span>
      <span>可选值: string | number</span>
      <span>默认值: 10</span>
      <span>属性: hideMaxLengthError</span>
      <span>可选值: true | false</span>
      <span>默认值: false</span>
    </div>

    <s-flex gap="small" direction="column">
      <s-input v-model="input" width="320" theme="chenghua" size="large" placeholder="请输入服务名称" />
      <s-input v-model="owner" width="320" theme="chenghua" title="负责人" placeholder="请输入负责人" :maxlength="10" />
      <s-input v-model="hiddenError" width="320" theme="chenghua" title="隐藏提示" placeholder="超出长度不展示 toast" />
      <s-input v-model="textarea" width="320" theme="chenghua" type="textarea" :rows="3" placeholder="请输入备注" />
    </s-flex>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const input = ref('')
const owner = ref('')
const hiddenError = ref('')
const textarea = ref('')
</script>

<style scoped lang="scss">
.input-chenghua-demo {
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
