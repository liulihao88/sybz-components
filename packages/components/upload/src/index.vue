<template>
  <el-upload
    ref="uploadRef"
    v-bind="uploadAttrs"
    :file-list="modelValue"
    :http-request="requestHandler"
    :before-upload="handleBeforeUpload"
    @change="handleChange"
  >
    <template v-for="(_, name) in forwardedSlots" #[name]="scope">
      <slot :name="name" v-bind="scope || {}" />
    </template>

    <slot v-if="$slots.default" />
    <div v-else class="s-upload__trigger">
      <el-icon class="s-upload__icon"><UploadFilled /></el-icon>
      <span class="s-upload__placeholder">{{ placeholder }}</span>
      <span v-if="resolvedTip" class="s-upload__tip">{{ resolvedTip }}</span>
    </div>
  </el-upload>
</template>

<script setup lang="ts">
import { computed, ref, useAttrs, useSlots } from 'vue'
import { ElMessage, ElUpload } from 'element-plus'
import { UploadFilled } from '@element-plus/icons-vue'
import { ajaxUpload } from 'element-plus/es/components/upload/src/ajax'
import type {
  UploadFile,
  UploadFiles,
  UploadInstance,
  UploadRawFile,
  UploadRequestHandler,
  UploadUserFile,
} from 'element-plus'
import type { SUploadCancel, SUploadRequest, SUploadValidationError } from './type'

defineOptions({
  name: 'SUpload',
  inheritAttrs: false,
})

interface SUploadSelfProps {
  modelValue?: UploadUserFile[]
  maxFileSizeBytes?: number
  request?: SUploadRequest
  cancel?: SUploadCancel
  showValidationMessage?: boolean
  placeholder?: string
  tip?: string
}

const props = withDefaults(defineProps<SUploadSelfProps>(), {
  modelValue: () => [],
  maxFileSizeBytes: Infinity,
  request: undefined,
  cancel: undefined,
  showValidationMessage: true,
  placeholder: '拖拽文件到此处，或点击上传',
  tip: '',
})

const emit = defineEmits<{
  'update:modelValue': [files: UploadUserFile[]]
  change: [file: UploadFile, files: UploadFiles]
  'validation-error': [error: SUploadValidationError]
}>()

const attrs = useAttrs()
const slots = useSlots()
const uploadRef = ref<UploadInstance>()

const forwardedSlots = computed(() => Object.fromEntries(Object.entries(slots).filter(([name]) => name !== 'default')))

const uploadAttrs = computed<Record<string, unknown>>(() => ({
  action: '#',
  drag: true,
  ...attrs,
}))

const accept = computed(() => (typeof uploadAttrs.value.accept === 'string' ? uploadAttrs.value.accept : ''))

const formatSize = (bytes: number) => {
  if (bytes >= 1024 ** 3) return `${Number((bytes / 1024 ** 3).toFixed(2))}GB`
  if (bytes >= 1024 ** 2) return `${Number((bytes / 1024 ** 2).toFixed(2))}MB`
  if (bytes >= 1024) return `${Number((bytes / 1024).toFixed(2))}KB`
  return `${bytes}B`
}

const resolvedTip = computed(() => {
  if (props.tip) return props.tip
  const parts: string[] = []
  if (accept.value) parts.push(`支持 ${accept.value}`)
  if (Number.isFinite(props.maxFileSizeBytes)) {
    parts.push(`单个文件不超过 ${formatSize(props.maxFileSizeBytes)}`)
  }
  return parts.join('，')
})

const isAccepted = (file: File) => {
  const tokens = accept.value
    .split(',')
    .map((token) => token.trim().toLowerCase())
    .filter(Boolean)
  if (!tokens.length || tokens.includes('*/*')) return true

  const fileType = file.type.toLowerCase()
  const extension = file.name.includes('.') ? `.${file.name.split('.').pop()?.toLowerCase()}` : ''
  return tokens.some((token) => {
    if (token.startsWith('.')) return extension === token
    if (token.endsWith('/*')) return fileType.startsWith(token.slice(0, -1))
    return fileType === token
  })
}

const rejectFile = (error: SUploadValidationError) => {
  emit('validation-error', error)
  if (props.showValidationMessage) ElMessage.error(error.message)
  return false
}

const handleBeforeUpload = async (file: UploadRawFile) => {
  if (!isAccepted(file)) {
    return rejectFile({ file, reason: 'type', message: `文件 ${file.name} 的类型不符合要求` })
  }
  if (file.size > props.maxFileSizeBytes) {
    return rejectFile({
      file,
      reason: 'size',
      message: `文件 ${file.name} 不能超过 ${formatSize(props.maxFileSizeBytes)}`,
    })
  }

  const beforeUpload = attrs.beforeUpload ?? attrs['before-upload']
  if (typeof beforeUpload !== 'function') return true
  const result = await beforeUpload(file)
  if (result === false) {
    emit('validation-error', { file, reason: 'before-upload', message: `文件 ${file.name} 未通过上传校验` })
  }
  return result
}

const requestHandler: UploadRequestHandler = (options) => {
  if (props.request) {
    const { file, ...context } = options
    return props.request(file, context)
  }
  const nativeRequest = attrs.httpRequest ?? attrs['http-request']
  if (typeof nativeRequest === 'function') return nativeRequest(options)
  return ajaxUpload(options)
}

const handleChange = (file: UploadFile, files: UploadFiles) => {
  emit('update:modelValue', files)
  emit('change', file, files)
}

const cancel = async (file?: UploadFile | UploadRawFile, remove = true) => {
  if (!file) {
    props.modelValue
      .filter((item) => item.status === 'uploading')
      .forEach((item) => uploadRef.value?.abort(item as UploadFile))
    return
  }
  const uploadFile = 'raw' in file ? file : undefined
  const rawFile = uploadFile?.raw ?? (file instanceof File ? file : undefined)
  if ('status' in file) uploadRef.value?.abort(file)
  if (rawFile && props.cancel) {
    await props.cancel(rawFile, {
      action: String(uploadAttrs.value.action ?? '#'),
      method: String(uploadAttrs.value.method ?? 'post'),
      data: (uploadAttrs.value.data ?? {}) as Record<string, string | Blob | [Blob, string]>,
      filename: String(uploadAttrs.value.name ?? 'file'),
      headers: (uploadAttrs.value.headers ?? {}) as Headers | Record<string, string | number | null | undefined>,
      onError: () => undefined,
      onProgress: () => undefined,
      onSuccess: () => undefined,
      withCredentials: Boolean(uploadAttrs.value.withCredentials),
    })
  }
  if (remove && 'status' in file) await uploadRef.value?.handleRemove(file)
}

defineExpose({
  abort: (...args: Parameters<UploadInstance['abort']>) => uploadRef.value?.abort(...args),
  clearFiles: (...args: Parameters<UploadInstance['clearFiles']>) => uploadRef.value?.clearFiles(...args),
  handleStart: (...args: Parameters<UploadInstance['handleStart']>) => uploadRef.value?.handleStart(...args),
  handleRemove: (...args: Parameters<UploadInstance['handleRemove']>) => uploadRef.value?.handleRemove(...args),
  submit: () => uploadRef.value?.submit(),
  cancel,
})
</script>

<style scoped lang="scss">
.s-upload__trigger {
  min-height: 148px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 20px;
  color: var(--el-text-color-regular);
}

.s-upload__icon {
  font-size: 32px;
  color: var(--el-color-primary);
}

.s-upload__placeholder {
  line-height: 22px;
}

.s-upload__tip {
  max-width: 100%;
  color: var(--el-text-color-secondary);
  font-size: 12px;
  line-height: 18px;
  overflow-wrap: anywhere;
}
</style>
