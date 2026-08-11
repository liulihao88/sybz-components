<script setup lang="ts">
import { ref } from 'vue'

const fence = '```'
const source = ref(String.raw`

## 数学公式

行内公式 $E = mc^2$：

$$
\int_{-\infty}^{\infty} e^{-x^2} dx = \sqrt{\pi}
$$

## Mermaid

${fence}mermaid
flowchart LR
  A[Markdown] --> B{解析}
  B --> C[HTML]
  B --> D[图表和公式]
${fence}

## 脚注与定义列表

Markdown 可以包含脚注[^note]。

术语
: 这是定义列表的内容。

[^note]: 这是脚注内容。

## Emoji 与图片

原生 Emoji：😀 🎉 👍 ❤️

![Markdown 图片](/img/hero.jpg)
`)

const handleError = (error: unknown) => console.error(error)
</script>

<template>
  <s-markdown :source="source" :allow-html="true" @error="handleError" />
</template>
