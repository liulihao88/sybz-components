<script setup lang="ts">
import { ref } from 'vue'
const isShow = ref(true)
</script>

<template>
  <div>
    <s-button type="primary" @click="isShow = true">显示dialog</s-button>
    <s-dialog v-model="isShow" :loading="true" maximize-height></s-dialog>
  </div>
</template>
