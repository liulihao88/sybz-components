<template>
  <s-upload
    ref="uploadRef"
    v-model="files"
    accept=".pdf,.doc,.docx"
    :max-file-size-bytes="10 * 1024 * 1024"
    :request="uploadFile"
    :cancel="cancelFile"
  />
  <s-button @click="uploadRef?.cancel(files[0])">取消第一个文件</s-button>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { UploadUserFile } from 'element-plus'
import type { SUploadCancel, SUploadRequest } from 'sybz-components'

const files = ref<UploadUserFile[]>([])
const uploadRef = ref<{ cancel: (file?: UploadUserFile) => Promise<void> }>()
const controllers = new Map<string, AbortController>()

const uploadFile: SUploadRequest = async (file, { data, filename, onProgress, onSuccess }) => {
  const controller = new AbortController()
  controllers.set(file.name, controller)
  const formData = new FormData()
  formData.append(filename, file)
  Object.entries(await data).forEach(([key, value]) => formData.append(key, value as Blob | string))
  const response = await fetch('/api/upload', { method: 'POST', body: formData, signal: controller.signal })
  onProgress({ percent: 100 } as ProgressEvent & { percent: number })
  const result = await response.json()
  onSuccess(result)
  return result
}

const cancelFile: SUploadCancel = (file) => {
  controllers.get(file.name)?.abort()
  controllers.delete(file.name)
}
</script>
