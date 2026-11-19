<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import MarkdownIt from 'markdown-it'
import { Download } from '@element-plus/icons-vue'
import { processWidth } from '@sybz-components/utils'
import { useStyleProps } from '@/hooks/useStyleProps'
import useSizeAliases from '@/hooks/useSizeAliases'
import SDialog from '@/components/dialog/src/index.vue'
import SDocumentPreview from '@/components/documentPreview/src/index.vue'
import SafeHtml from '@/components/utils/SafeHtml.vue'
import type { PreviewProps, PreviewType } from './types'

const props = withDefaults(defineProps<PreviewProps>(), {
  type: 'auto',
  mode: 'inline',
  download: true,
  disabled: false,
  width: '100%',
  height: '600',
})
defineOptions({ name: 'SPreview' })
const { style } = useStyleProps()
const sizeProps = useSizeAliases(props)
const visible = ref(false)
const loading = ref(false)
const error = ref('')
const content = ref('')
const contentType = ref('')
let controller: AbortController | undefined
const textLimit = 2 * 1024 * 1024
const markdown = new MarkdownIt({ html: false, linkify: true, breaks: true })
const tableRowLimit = 1000
function parseDelimited(text: string, separator: string) {
  const rows: string[][] = []
  let row: string[] = []
  let cell = ''
  let quoted = false
  let truncated = false
  const source = text.replace(/^\uFEFF/, '')
  for (let index = 0; index < source.length; index++) {
    const char = source[index]
    if (char === '"') {
      if (quoted && source[index + 1] === '"') {
        cell += '"'
        index++
      } else if (quoted || !cell) {
        quoted = !quoted
      } else {
        cell += char
      }
    } else if (!quoted && char === separator) {
      row.push(cell)
      cell = ''
    } else if (!quoted && (char === '\n' || char === '\r')) {
      row.push(cell)
      rows.push(row)
      if (rows.length >= tableRowLimit) {
        truncated = index < source.length - 1
        break
      }
      row = []
      cell = ''
      if (char === '\r' && source[index + 1] === '\n') index++
    } else {
      cell += char
    }
  }
  if (!truncated && (cell || row.length || (source && !/[\r\n]$/.test(source)))) {
    if (rows.length >= tableRowLimit) truncated = true
    else {
      row.push(cell)
      rows.push(row)
    }
  }
  return { rows, truncated }
}
const delimitedTable = computed(() => parseDelimited(content.value, resolvedType.value === 'tsv' ? '\t' : ','))
const extension = computed(() => {
  for (const value of [props.name, props.src]) {
    const path = (value || '').split('?')[0].split('#')[0]
    const ext = path
      .slice(path.lastIndexOf('/') + 1)
      .split('.')
      .pop()
      ?.toLowerCase()
    if (ext && ['txt', 'csv', 'tsv', 'md', 'markdown', 'pdf', 'doc', 'docx', 'xls', 'xlsx', 'xlsm'].includes(ext))
      return ext
  }
  return ''
})
const displayName = computed(() => {
  if (props.name) return props.name
  const filename = props.src.split('?')[0].split('#')[0].split('/').pop() || '文件预览'
  try {
    return decodeURIComponent(filename)
  } catch {
    return filename
  }
})
const resolvedType = computed<PreviewType>(() => {
  if (props.type !== 'auto') return props.type
  if (extension.value === 'txt') return 'txt'
  if (extension.value === 'csv') return 'csv'
  if (extension.value === 'tsv') return 'tsv'
  if (['md', 'markdown'].includes(extension.value)) return 'md'
  if (extension.value === 'pdf') return 'pdf'
  if (['doc', 'docx'].includes(extension.value)) return 'word'
  if (['xls', 'xlsx', 'xlsm'].includes(extension.value)) return 'excel'
  const type = contentType.value
  if (type.includes('pdf')) return 'pdf'
  if (type.includes('markdown')) return 'md'
  if (type.includes('tab-separated-values')) return 'tsv'
  if (type.includes('csv')) return 'csv'
  if (type.startsWith('text/')) return 'txt'
  if (type.includes('spreadsheet') || type.includes('excel')) return 'excel'
  if (type.includes('word') || type.includes('officedocument.wordprocessingml')) return 'word'
  return 'auto'
})
const frameStyle = computed(() => ({
  width: processWidth(sizeProps.value.width, true),
  height: processWidth(sizeProps.value.height, true),
}))
const dialogFrameStyle = computed(() => ({ width: '100%', height: '100%', minHeight: '0' }))
const renderedMarkdown = computed(() => markdown.render(content.value))

async function load() {
  controller?.abort()
  controller = new AbortController()
  const signal = controller.signal
  loading.value = true
  error.value = ''
  content.value = ''
  contentType.value = ''
  try {
    if (props.type === 'auto' && !extension.value) {
      try {
        const response = await fetch(props.src, { method: 'HEAD', signal })
        if (response.ok) contentType.value = (response.headers.get('content-type') || '').toLowerCase()
      } catch (caught) {
        if (signal.aborted) return
      }
    }
    if (['txt', 'md', 'csv', 'tsv'].includes(resolvedType.value)) {
      const response = await fetch(props.src, { signal })
      if (!response.ok) throw new Error(`文件加载失败（${response.status}）`)
      if (Number(response.headers.get('content-length')) > textLimit) throw new Error('文件较大，请下载后查看')
      const text = await response.text()
      if (text.length > textLimit) throw new Error('文件较大，请下载后查看')
      if (!signal.aborted) content.value = text
    }
  } catch (caught) {
    if (!signal.aborted) error.value = caught instanceof Error ? caught.message : '文件预览失败'
  } finally {
    if (!signal.aborted) loading.value = false
  }
}
function open() {
  if (!props.src || props.disabled) return
  visible.value = true
  load()
}
watch([() => props.src, () => props.name, () => props.type], () => {
  if (props.mode === 'inline' || visible.value) load()
})
watch(
  () => props.mode,
  (mode) => {
    if (mode === 'inline') load()
    else controller?.abort()
  },
)
watch(visible, (value) => {
  if (!value) controller?.abort()
})
onMounted(() => {
  if (props.mode === 'inline' && props.src) load()
})
onBeforeUnmount(() => controller?.abort())
</script>

<template>
  <span v-if="mode === 'dialog'" class="s-preview__trigger">
    <slot name="trigger" :open="open" :disabled="disabled || !src">
      <s-button link :disabled="disabled || !src" @click="open">{{ name || '查看文件' }}</s-button>
    </slot>
  </span>
  <s-dialog
    v-if="mode === 'dialog'"
    v-model="visible"
    :title="displayName"
    w="1200"
    h="min(800px, calc(100dvh - 32px))"
    :show-footer="false"
    :body-style="{
      padding: 0,
    }"
    append-to-body
    fill-slot
  >
    <template v-if="download" #append>
      <s-button icon="download" :href="src" download type="primary" size="small">下载文件</s-button>
    </template>
    <div class="s-preview s-preview--dialog" :style="[dialogFrameStyle, style]">
      <div v-if="loading" class="s-preview__status">正在加载预览…</div>
      <template v-else>
        <div v-if="error || resolvedType === 'auto'" class="s-preview__status">
          <slot name="fallback" :error="error">{{ error || '当前文件暂不支持在线预览，请下载后查看。' }}</slot>
        </div>
        <pre v-else-if="resolvedType === 'txt'" class="s-preview__text">{{ content }}</pre>
        <div v-else-if="resolvedType === 'csv' || resolvedType === 'tsv'" class="s-preview__table-wrap">
          <table class="s-preview__table">
            <tbody>
              <tr v-for="(row, rowIndex) in delimitedTable.rows" :key="rowIndex">
                <td v-for="(cell, cellIndex) in row" :key="cellIndex">{{ cell }}</td>
              </tr>
            </tbody>
          </table>
          <p v-if="delimitedTable.truncated" class="s-preview__table-notice">
            仅显示前 {{ tableRowLimit }} 行，请下载查看完整文件。
          </p>
        </div>
        <SafeHtml v-else-if="resolvedType === 'md'" tag="div" class="s-preview__markdown" :html="renderedMarkdown" />
        <s-document-preview v-else :src="src" :type="resolvedType" h="100%" :download="false">
          <template v-if="resolvedType !== 'word'" #fallback>当前环境无法在线预览，请下载文件后查看。</template>
        </s-document-preview>
      </template>
    </div>
  </s-dialog>
  <div v-else class="s-preview" :style="[frameStyle, style]">
    <div v-if="loading" class="s-preview__status">正在加载预览…</div>
    <template v-else>
      <div v-if="error || resolvedType === 'auto'" class="s-preview__status">
        <slot name="fallback" :error="error">{{ error || '当前文件暂不支持在线预览，请下载后查看。' }}</slot>
      </div>
      <pre v-else-if="resolvedType === 'txt'" class="s-preview__text">{{ content }}</pre>
      <div v-else-if="resolvedType === 'csv' || resolvedType === 'tsv'" class="s-preview__table-wrap">
        <table class="s-preview__table">
          <tbody>
            <tr v-for="(row, rowIndex) in delimitedTable.rows" :key="rowIndex">
              <td v-for="(cell, cellIndex) in row" :key="cellIndex">{{ cell }}</td>
            </tr>
          </tbody>
        </table>
        <p v-if="delimitedTable.truncated" class="s-preview__table-notice">
          仅显示前 {{ tableRowLimit }} 行，请下载查看完整文件。
        </p>
      </div>
      <SafeHtml v-else-if="resolvedType === 'md'" tag="div" class="s-preview__markdown" :html="renderedMarkdown" />
      <s-document-preview v-else :src="src" :type="resolvedType" h="100%" :download="false">
        <template v-if="resolvedType !== 'word'" #fallback>当前环境无法在线预览，请下载文件后查看。</template>
      </s-document-preview>
    </template>
  </div>
</template>

<style scoped>
.s-preview {
  position: relative;
  min-height: 120px;
  overflow: auto;
}
.s-preview--dialog {
  min-height: 0;
}
.s-preview__trigger {
  display: inline-block;
  max-width: 100%;
  vertical-align: middle;
}
.s-preview__status {
  display: grid;
  min-height: 120px;
  place-items: center;
  color: var(--el-text-color-secondary);
  text-align: center;
}
.s-preview__text {
  margin: 0;
  padding: 16px;
  white-space: pre-wrap;
  overflow-wrap: anywhere;
  font: inherit;
}
.s-preview__table-wrap {
  padding: 16px;
  overflow: auto;
}
.s-preview__table {
  border-collapse: collapse;
  background: #fff;
  font-size: 13px;
}
.s-preview__table td {
  min-width: 80px;
  padding: 6px 8px;
  border: 1px solid var(--el-border-color-light);
  white-space: pre-wrap;
}
.s-preview__table-notice {
  color: var(--el-text-color-secondary);
  font-size: 12px;
}
.s-preview__markdown {
  padding: 16px;
  overflow-wrap: anywhere;
}
.s-preview__markdown :deep(img) {
  max-width: 100%;
}
.s-preview__download {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 15px;
  border-radius: var(--el-border-radius-base);
  background: var(--el-color-primary);
  color: #fff;
  text-decoration: none;
  font-size: 14px;
}
.s-preview__download:hover,
.s-preview__download:focus-visible {
  background: var(--el-color-primary-light-3);
  color: #fff;
}
</style>
