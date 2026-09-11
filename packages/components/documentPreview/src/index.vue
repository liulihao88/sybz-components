<script setup lang="ts">
import { computed, nextTick, onMounted, ref, watch } from 'vue'
import { renderAsync } from 'docx-preview'

defineOptions({ name: 'SDocumentPreview' })

type DocumentPreviewType = 'auto' | 'pdf' | 'word'

const props = withDefaults(
  defineProps<{
    src: string
    type?: DocumentPreviewType
    height?: string | number
    width?: string | number
    download?: boolean
  }>(),
  { type: 'pdf', height: '600px', width: '100%', download: true },
)

const failed = ref(false)
const detectedType = ref<DocumentPreviewType>()
const wordRef = ref<HTMLElement>()
const pathname = computed(() => {
  try {
    return new URL(props.src, window.location.href).pathname
  } catch {
    return props.src.split('?')[0].split('#')[0]
  }
})
const ext = computed(() => pathname.value.split('.').pop()?.toLowerCase())
const activeType = ref<DocumentPreviewType>(
  props.type === 'pdf' && ['doc', 'docx'].includes(ext.value) ? 'word' : props.type,
)
const isPdf = computed(
  () =>
    activeType.value === 'pdf' ||
    (activeType.value === 'auto' && (ext.value === 'pdf' || detectedType.value === 'pdf')),
)
const isWord = computed(
  () =>
    activeType.value === 'word' ||
    (activeType.value === 'auto' && (['doc', 'docx'].includes(ext.value || '') || detectedType.value === 'word')),
)
const detectType = async () => {
  if (activeType.value !== 'auto' || ext.value) return
  const url = new URL(props.src, window.location.href)
  if (/\/pdf(?:\/|$)/i.test(url.pathname)) {
    detectedType.value = 'pdf'
    return
  }
  try {
    const response = await fetch(props.src, { method: 'HEAD' })
    const contentType = response.headers.get('content-type') || ''
    if (contentType.includes('application/pdf')) detectedType.value = 'pdf'
    else if (contentType.includes('word') || contentType.includes('officedocument')) detectedType.value = 'word'
  } catch {
    // 跨域无法读取响应头时，保留下载兜底。
  }
}
const renderWord = async () => {
  if (!isWord.value || !wordRef.value) return
  try {
    failed.value = false
    wordRef.value.replaceChildren()
    const response = await fetch(props.src)
    if (!response.ok) throw new Error('Word 文件加载失败')
    await renderAsync(await response.arrayBuffer(), wordRef.value)
  } catch {
    failed.value = true
  }
}
onMounted(renderWord)
onMounted(detectType)
watch(
  () => props.src,
  () => nextTick(renderWord),
)
watch(() => props.src, detectType)
watch(detectedType, () => nextTick(renderWord))
watch(isWord, () => nextTick(renderWord))
watch(
  () => props.type,
  (value) => {
    activeType.value = value
    failed.value = false
  },
)
watch(
  () => props.src,
  () => {
    activeType.value = props.type === 'pdf' && ['doc', 'docx'].includes(ext.value) ? 'word' : props.type
    failed.value = false
  },
)
const frameStyle = computed(() => ({
  width: typeof props.width === 'number' ? `${props.width}px` : props.width,
  height: typeof props.height === 'number' ? `${props.height}px` : props.height,
}))
</script>

<template>
  <div class="s-document-preview" :style="frameStyle">
    <div v-if="isPdf && !failed" class="s-document-preview__canvas">
      <iframe :src="src" title="PDF 预览" frameborder="0" @error="activeType = 'word'" />
    </div>
    <div v-else-if="isWord && !failed" ref="wordRef" class="s-document-preview__word" />
    <div v-else class="s-document-preview__fallback">
      <slot name="fallback">当前环境无法在线预览，请下载文件后查看。</slot>
      <a v-if="download" :href="src" target="_blank" rel="noopener noreferrer" download>下载文件</a>
    </div>
  </div>
</template>

<style scoped>
.s-document-preview {
  overflow: auto;
  min-height: 120px;
}
.s-document-preview iframe {
  display: block;
  width: 100%;
  height: 100%;
  border: 0;
}
.s-document-preview__canvas {
  height: 100%;
}
.s-document-preview__word {
  min-height: 100%;
  padding: 24px;
  background: #f5f6f8;
}
.s-document-preview__word :deep(.docx-wrapper) {
  padding: 0;
  background: transparent;
}
.s-document-preview__fallback {
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: center;
  gap: 12px;
  color: var(--el-text-color-secondary);
}
</style>
