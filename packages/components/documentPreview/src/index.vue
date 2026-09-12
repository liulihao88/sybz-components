<script setup lang="ts">
import { computed, nextTick, onMounted, ref, watch } from 'vue'
import { renderAsync } from 'docx-preview'

defineOptions({ name: 'SDocumentPreview' })

type DocumentPreviewType = 'auto' | 'pdf' | 'word' | 'excel'

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
const excelRef = ref<HTMLElement>()
let xlsxModule: typeof import('xlsx') | undefined
const pathname = computed(() => {
  try {
    return new URL(props.src, window.location.href).pathname
  } catch {
    return props.src.split('?')[0].split('#')[0]
  }
})
const ext = computed(() => pathname.value.split('.').pop()?.toLowerCase())
const activeType = ref<DocumentPreviewType>(
  props.type === 'pdf' && ['doc', 'docx'].includes(ext.value)
    ? 'word'
    : props.type === 'pdf' && ['xls', 'xlsx', 'xlsm'].includes(ext.value)
      ? 'excel'
      : props.type,
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
const isExcel = computed(
  () =>
    activeType.value === 'excel' ||
    (activeType.value === 'auto' &&
      (['xls', 'xlsx', 'xlsm'].includes(ext.value || '') || detectedType.value === 'excel')),
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
    else if (contentType.includes('spreadsheet') || contentType.includes('excel')) detectedType.value = 'excel'
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
const renderExcel = async () => {
  if (!isExcel.value || !excelRef.value) return
  try {
    failed.value = false
    excelRef.value.replaceChildren()
    if (!xlsxModule) {
      const loadedXlsx = await import('xlsx')
      xlsxModule = (loadedXlsx.default ?? loadedXlsx) as typeof import('xlsx')
    }
    const response = await fetch(props.src)
    if (!response.ok) throw new Error('Excel 文件加载失败')
    const workbook = xlsxModule.read(await response.arrayBuffer(), { type: 'array', cellStyles: true })
    workbook.SheetNames.forEach((sheetName) => {
      const section = document.createElement('section')
      section.className = 's-document-preview__sheet'
      const title = document.createElement('h3')
      title.textContent = sheetName
      section.append(title)
      const table = document.createElement('div')
      const sheet = workbook.Sheets[sheetName]
      if (sheet?.['!ref']) {
        table.innerHTML = xlsxModule.utils.sheet_to_html(sheet)
        const htmlTable = table.querySelector('table')
        if (htmlTable) {
          htmlTable.className = 's-document-preview__table'
          sheet['!cols']?.forEach((column, index) => {
            if (column?.wch)
              htmlTable.querySelectorAll(`tr > :nth-child(${index + 1})`).forEach((cell) => {
                ;(cell as HTMLElement).style.width = `${Math.max(column.wch! * 8, 60)}px`
              })
          })
          sheet['!rows']?.forEach((row, index) => {
            if (row?.hpt)
              htmlTable.querySelectorAll(`tr:nth-child(${index + 1})`).forEach((tr) => {
                ;(tr as HTMLElement).style.height = `${row.hpt}px`
              })
          })
          Object.keys(sheet).forEach((address) => {
            if (address.startsWith('!')) return
            const cell = sheet[address]
            const element = htmlTable.querySelector<HTMLElement>(`#sjs-${address}`)
            if (!element || !cell?.s) return
            const style = cell.s
            const fill = style.fgColor?.rgb || style.bgColor?.rgb
            if (fill) element.style.backgroundColor = `#${fill.slice(-6)}`
            if (style.font?.bold) element.style.fontWeight = '700'
            if (style.font?.italic) element.style.fontStyle = 'italic'
            if (style.font?.sz) element.style.fontSize = `${style.font.sz}pt`
            if (style.font?.color?.rgb) element.style.color = `#${style.font.color.rgb.slice(-6)}`
            if (style.alignment?.horizontal) element.style.textAlign = style.alignment.horizontal
            if (style.alignment?.vertical) element.style.verticalAlign = style.alignment.vertical
            if (style.alignment?.wrapText) element.style.whiteSpace = 'pre-wrap'
          })
        }
      } else {
        table.innerHTML = '<p>空白工作表</p>'
      }
      section.append(table)
      excelRef.value?.append(section)
    })
  } catch (error) {
    console.error('[s-document-preview] Excel 文件预览失败', error)
    failed.value = true
  }
}
onMounted(renderWord)
onMounted(renderExcel)
onMounted(detectType)
watch(
  () => props.src,
  () =>
    nextTick(() => {
      renderWord()
      renderExcel()
    }),
)
watch(() => props.src, detectType)
watch(detectedType, () => nextTick(renderWord))
watch(isWord, () => nextTick(renderWord))
watch(isExcel, () => nextTick(renderExcel))
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
    activeType.value =
      props.type === 'pdf' && ['doc', 'docx'].includes(ext.value)
        ? 'word'
        : props.type === 'pdf' && ['xls', 'xlsx', 'xlsm'].includes(ext.value)
          ? 'excel'
          : props.type
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
    <div v-else-if="isExcel && !failed" ref="excelRef" class="s-document-preview__excel" />
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
.s-document-preview__excel {
  min-height: 100%;
  padding: 16px;
  overflow: auto;
}
.s-document-preview__sheet + .s-document-preview__sheet {
  margin-top: 24px;
}
.s-document-preview__sheet h3 {
  margin: 0 0 8px;
  font-size: 14px;
}
.s-document-preview__excel :deep(table) {
  border-collapse: collapse;
  font-size: 13px;
  background: #fff;
}
.s-document-preview__excel :deep(td),
.s-document-preview__excel :deep(th) {
  min-width: 80px;
  padding: 6px 8px;
  border: 1px solid var(--el-border-color-light);
  white-space: pre-wrap;
}
.s-document-preview__excel :deep(td:empty),
.s-document-preview__excel :deep(th:empty) {
  min-width: 24px;
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
