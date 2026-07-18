<template>
  <s-upload
    v-model="files"
    accept="image/*"
    list-type="picture-card"
    multiple
    :limit="6"
    :max-file-size-bytes="2 * 1024 * 1024"
    :auto-upload="false"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { UploadUserFile } from 'element-plus'

const files = ref<UploadUserFile[]>([])
</script>
