<script setup lang="ts">
import { computed, ref } from 'vue'

defineOptions({ name: 'SDocumentPreview' })

type DocumentPreviewType = 'auto' | 'pdf' | 'word'
type WordPreviewMode = 'office' | 'google' | 'download'

const props = withDefaults(
  defineProps<{
    src: string
    type?: DocumentPreviewType
    wordPreview?: WordPreviewMode
    height?: string | number
    width?: string | number
    download?: boolean
  }>(),
  { type: 'auto', wordPreview: 'office', height: '600px', width: '100%', download: true },
)

const failed = ref(false)
const ext = computed(() => props.src.split('?')[0].split('#')[0].split('.').pop()?.toLowerCase())
const isPdf = computed(() => props.type === 'pdf' || (props.type === 'auto' && ext.value === 'pdf'))
const isWord = computed(
  () => props.type === 'word' || (props.type === 'auto' && ['doc', 'docx'].includes(ext.value || '')),
)
const previewUrl = computed(() => {
  if (isPdf.value || !isWord.value) return props.src
  if (props.wordPreview === 'google')
    return `https://docs.google.com/gview?embedded=1&url=${encodeURIComponent(props.src)}`
  if (props.wordPreview === 'office')
    return `https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(props.src)}`
  return ''
})
const frameStyle = computed(() => ({
  width: typeof props.width === 'number' ? `${props.width}px` : props.width,
  height: typeof props.height === 'number' ? `${props.height}px` : props.height,
}))
const onError = () => (failed.value = true)
</script>

<template>
  <div class="s-document-preview" :style="frameStyle">
    <iframe v-if="previewUrl && !failed" :src="previewUrl" title="文档预览" frameborder="0" @error="onError" />
    <div v-else class="s-document-preview__fallback">
      <slot name="fallback">当前环境无法在线预览，请下载文件后查看。</slot>
      <a v-if="download" :href="src" target="_blank" rel="noopener noreferrer" download>下载文件</a>
    </div>
  </div>
</template>

<style scoped>
.s-document-preview {
  overflow: hidden;
  min-height: 120px;
}
.s-document-preview iframe {
  display: block;
  width: 100%;
  height: 100%;
  border: 0;
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
