<template>
  <ClientOnly>
    <el-tooltip raw-content effect="light" trigger="click" :teleported="false">
      <template #content>
        <code class="docs-tip-code">
          {{ content }}
        </code>
      </template>
      <el-icon :size="16" class="docs-tip-icon"><warning /></el-icon>
    </el-tooltip>
  </ClientOnly>
</template>

<script lang="ts" setup>
import { Warning } from '@element-plus/icons-vue'

defineProps({
  content: {
    type: String,
    default: '',
  },
})

defineOptions({
  name: 'OTip',
})
</script>

<style lang="scss" scoped>
.docs-tip-code {
  color: #101010;
  background-color: #f5f7fa;
}
.docs-tip-icon {
  vertical-align: middle;
  color: #409eda;
  cursor: pointer;
}
</style>
