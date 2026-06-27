<script setup lang="ts">
import { CopyDocument } from '@element-plus/icons-vue'

import { copy } from '@sybz-components/utils'

defineOptions({
  name: 'DocBasicUsage',
})

interface DocBasicUsageProps {
  code: string
  label?: string
  tooltip?: string
  successMessage?: string
}

const props = withDefaults(defineProps<DocBasicUsageProps>(), {
  label: '基础用法',
  tooltip: '复制基础用法',
  successMessage: '已复制基础用法',
})

const handleCopy = () => {
  copy(props.code)
}
</script>

<template>
  <div class="doc-basic-usage">
    <span class="doc-basic-usage__label">{{ label }}：</span>
    <code class="doc-basic-usage__code">{{ code }}</code>
    <el-tooltip :content="tooltip" :show-arrow="false">
      <el-icon
        class="doc-basic-usage__copy"
        role="button"
        tabindex="0"
        :aria-label="tooltip"
        @click="handleCopy"
        @keydown.enter="handleCopy"
        @keydown.space.prevent="handleCopy"
      >
        <CopyDocument />
      </el-icon>
    </el-tooltip>
  </div>
</template>

<style scoped lang="scss">
.doc-basic-usage {
  display: flex;
  align-items: center;
  gap: 6px;
  margin: 12px 0 18px;
  color: var(--el-text-color-regular);
  font-size: 14px;
  line-height: 22px;
}

.doc-basic-usage__label {
  flex: 0 0 auto;
}

.doc-basic-usage__code {
  min-width: 0;
  padding: 0;
  background: transparent;
  color: var(--el-text-color-primary);
  white-space: pre-wrap;
  word-break: break-all;
}

.doc-basic-usage__copy {
  flex: 0 0 auto;
  color: var(--el-text-color-secondary);
  cursor: pointer;
  outline: none;
  transition: color 0.2s ease;

  &:hover,
  &:focus-visible {
    color: var(--el-color-primary);
  }
}
</style>
