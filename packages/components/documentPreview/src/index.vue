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
  { type: 'auto', height: '600px', width: '100%', download: true },
)

const failed = ref(false)
const rotation = ref(0)
const wordRef = ref<HTMLElement>()
const ext = computed(() => props.src.split('?')[0].split('#')[0].split('.').pop()?.toLowerCase())
const isPdf = computed(() => props.type === 'pdf' || (props.type === 'auto' && ext.value === 'pdf'))
const isWord = computed(
  () => props.type === 'word' || (props.type === 'auto' && ['doc', 'docx'].includes(ext.value || '')),
)
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
watch(
  () => props.src,
  () => nextTick(renderWord),
)
const frameStyle = computed(() => ({
  width: typeof props.width === 'number' ? `${props.width}px` : props.width,
  height: typeof props.height === 'number' ? `${props.height}px` : props.height,
}))
const onError = () => (failed.value = true)
</script>

<template>
  <div class="s-document-preview" :style="frameStyle">
    <div v-if="(isPdf || isWord) && !failed" class="s-document-preview__toolbar">
      <button type="button" @click="rotation = (rotation + 90) % 360">旋转</button>
      <a v-if="download" :href="src" target="_blank" rel="noopener noreferrer" download>下载</a>
    </div>
    <div v-if="isPdf && !failed" class="s-document-preview__canvas" :style="{ transform: `rotate(${rotation}deg)` }">
      <iframe :src="src" title="PDF 预览" frameborder="0" @error="onError" />
    </div>
    <div
      v-else-if="isWord && !failed"
      ref="wordRef"
      class="s-document-preview__word"
      :style="{ transform: `rotate(${rotation}deg)` }"
    />
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
.s-document-preview__toolbar {
  position: sticky;
  z-index: 2;
  top: 0;
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  padding: 8px;
  background: var(--el-bg-color);
}
.s-document-preview__toolbar button,
.s-document-preview__toolbar a {
  padding: 4px 10px;
  color: var(--el-color-primary);
  border: 1px solid var(--el-border-color);
  background: var(--el-bg-color);
  cursor: pointer;
  text-decoration: none;
}
.s-document-preview__canvas {
  height: calc(100% - 42px);
  transform-origin: center;
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
