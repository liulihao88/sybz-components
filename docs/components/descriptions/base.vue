<script setup lang="ts">
const options = [
  { label: '名字', value: 'andy' },
  { label: '年龄', value: '18' },
  { label: '身高很高', value: '1.88' },
]
</script>

<template>
  <s-descriptions :options="options"></s-descriptions>
</template>
