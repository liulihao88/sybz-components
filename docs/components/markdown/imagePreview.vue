<script setup lang="ts">
const source = `
![组件示例图一](/img/hero.jpg){width="200"}

![组件示例图二](/img/error.png){width="200"}
`
</script>

<template>
  <s-markdown :source="source" image-preview />
</template>
