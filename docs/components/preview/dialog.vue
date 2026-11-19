<script setup lang="ts">
import { ref } from 'vue'

const previewRef = ref<{ open: () => void; close: () => void }>()
</script>

<template>
  <s-button @click="previewRef?.open()">预览发票</s-button>
  <s-preview ref="previewRef" src="/sybz-components/img/发票 (1).pdf" mode="dialog" name="发票.pdf">
    <template #trigger />
  </s-preview>
</template>
