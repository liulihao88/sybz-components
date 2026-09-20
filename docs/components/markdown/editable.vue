<script setup lang="ts">
import { ref } from 'vue'

const source = ref(`# 可编辑 Markdown

现在使用 md-editor-v3 提供完整编辑能力。

- 支持 **工具栏、快捷键和实时预览**
- 支持 Mermaid、KaTeX 和代码高亮
- 通过 \`v-model\` 同步内容`)

const handleSave = (value: string) => {
  console.log('保存 Markdown：', value)
}
</script>

<template>
  <s-markdown v-model="source" editable language="zh-CN" :show-code-row-number="true" @on-save="handleSave" />
</template>
