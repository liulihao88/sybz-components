<script setup lang="ts">
const source = `# Markdown 渲染

支持 **粗体**、*斜体*、~~删除线~~、==高亮==、[链接](https://example.com) 与图片。

> 这是引用内容。

- [x] 已完成任务
- [ ] 待完成任务

| 能力 | 状态 |
| --- | --- |
| GFM 表格 | 支持 |
| 代码高亮 | 支持 |

\`\`\`ts
const message: string = 'Hello Markdown'
console.log(message)
\`\`\`
`
</script>

<template>
  <s-markdown :source="source" />
</template>
