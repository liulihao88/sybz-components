<template>
  <s-upload v-model="files" :auto-upload="false" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { UploadUserFile } from 'element-plus'

const files = ref<UploadUserFile[]>([])
</script>
