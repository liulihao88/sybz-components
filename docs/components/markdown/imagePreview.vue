<script setup lang="ts">
const source = `
![组件示例图一](/img/hero.jpg)

![组件示例图二](/img/error.png)
`
</script>

<template>
  <s-markdown :source="source" image-preview />
</template>
