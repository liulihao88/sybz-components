<script setup lang="ts">
const source = `<article>
  <h2>完整 HTML 片段</h2>

    <div>
      空行后的四空格缩进不会再被识别为 Markdown 代码块。
    </div>
</article>`
</script>

<template>
  <s-markdown :source="source" content-type="html" />
</template>
