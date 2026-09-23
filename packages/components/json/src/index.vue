<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { DocumentCopy, MagicStick, Minus } from '@element-plus/icons-vue'
import { basicSetup } from 'codemirror'
import { json, jsonParseLinter } from '@codemirror/lang-json'
import { indentUnit } from '@codemirror/language'
import { linter } from '@codemirror/lint'
import { EditorState } from '@codemirror/state'
import { EditorView, placeholder as editorPlaceholder } from '@codemirror/view'
import { processWidth } from '@sybz-components/utils'
import type { JsonChangePayload, JsonData, JsonEmits, JsonExposed, JsonProps } from './types'

defineOptions({ name: 'SJson', inheritAttrs: false })

const props = withDefaults(defineProps<JsonProps>(), {
  data: null,
  disabled: false,
  indent: 2,
  lineNumbers: true,
  toolbar: true,
  showStatus: true,
  placeholder: '请输入 JSON',
  width: '100%',
  height: '',
  minHeight: 200,
  theme: 'light',
})

const emit = defineEmits<JsonEmits>()
const editorElement = ref<HTMLElement>()
const source = ref('')
const errorMessage = ref('')
const copied = ref(false)
let editor: EditorView | undefined
let lastValid: boolean | undefined
let copyTimer: ReturnType<typeof setTimeout> | undefined
let suppressEditorChange = false
let suppressNextModelWatch = false
let suppressNextDataWatch = false

const rootStyle = computed(() => [
  {
    width: processWidth(props.width, true),
    height: processWidth(props.height, true),
    minHeight: processWidth(props.minHeight, true),
  },
  props.style,
])
const statusText = computed(() => `${props.disabled ? '已禁用 · ' : ''}${errorMessage.value || 'JSON 格式正确'}`)

const serialize = (value: JsonData) => JSON.stringify(value, null, props.indent)
const initialSource = () => serialize(props.modelValue !== undefined ? props.modelValue : props.data)

const translateJsonError = (message: string) => {
  const location = message.match(/ at position \d+(?: \(line (\d+) column (\d+)\))?$/)
  const position = message.match(/ at position (\d+)/)?.[1]
  const locationText = location?.[1]
    ? `（第 ${location[1]} 行，第 ${location[2]} 列）`
    : position
      ? `（位置 ${position}）`
      : ''
  const detail = message.replace(/ at position \d+(?: \(line \d+ column \d+\))?$/, '')

  const rules: Array<[RegExp, string]> = [
    [/^Expected ',' or '}' after property value in JSON$/, 'JSON 属性值后应为“,”或“}”'],
    [/^Expected ',' or ']' after array element in JSON$/, 'JSON 数组元素后应为“,”或“]”'],
    [/^Expected ':' after property name in JSON$/, 'JSON 属性名后应为“:”'],
    [/^Expected property name or '}' in JSON$/, 'JSON 此处应为属性名或“}”'],
    [/^Expected double-quoted property name in JSON$/, 'JSON 属性名必须使用双引号'],
    [/^Unexpected end of JSON input$/, 'JSON 内容不完整'],
    [/^Unterminated string in JSON$/, 'JSON 字符串缺少结束双引号'],
    [/^Unexpected non-whitespace character after JSON data$/, 'JSON 结束后存在多余字符'],
  ]
  const matched = rules.find(([pattern]) => pattern.test(detail))
  if (matched) return `${matched[1]}${locationText}`

  const unexpectedToken = detail.match(/^Unexpected token '?(.+?)'?(?:, .* is not valid JSON)?$/)
  if (unexpectedToken) return `JSON 中存在意外字符“${unexpectedToken[1]}”${locationText}`
  if (/is not valid JSON$/.test(detail)) return `JSON 格式无效${locationText}`
  return `JSON 格式无效${locationText}`
}

const parse = (text: string): JsonChangePayload => {
  try {
    return { text, data: JSON.parse(text) as JsonData, valid: true, error: '' }
  } catch (error) {
    return {
      text,
      valid: false,
      error: error instanceof Error ? translateJsonError(error.message) : 'JSON 格式无效',
    }
  }
}

const updateValidity = (payload: JsonChangePayload) => {
  errorMessage.value = payload.error
  if (lastValid !== payload.valid) {
    lastValid = payload.valid
    emit('validChange', payload.valid, payload.error)
  }
}

const handleTextChange = (text: string) => {
  source.value = text
  const payload = parse(text)
  updateValidity(payload)
  if (payload.valid) {
    suppressNextModelWatch = true
    suppressNextDataWatch = true
    emit('update:modelValue', payload.data as JsonData)
    emit('update:data', payload.data as JsonData)
    void nextTick(() => {
      suppressNextModelWatch = false
      suppressNextDataWatch = false
    })
  }
  emit('change', payload)
}

const replaceText = (text: string, notify = true) => {
  source.value = text
  if (editor && editor.state.doc.toString() !== text) {
    suppressEditorChange = !notify
    editor.dispatch({ changes: { from: 0, to: editor.state.doc.length, insert: text } })
    suppressEditorChange = false
    if (!notify) updateValidity(parse(text))
    return
  }
  if (notify) handleTextChange(text)
  else updateValidity(parse(text))
}

const editorTheme = () =>
  EditorView.theme(
    {
      '&': {
        height: '100%',
        color: props.theme === 'dark' ? '#e5e7eb' : '#303133',
        backgroundColor: props.theme === 'dark' ? '#17191f' : '#ffffff',
      },
      '.cm-content': { minHeight: '100%', padding: '12px 0', caretColor: 'var(--el-color-primary)' },
      '.cm-line': { padding: '0 14px' },
      '.cm-gutters': {
        color: props.theme === 'dark' ? '#7f8796' : '#909399',
        backgroundColor: props.theme === 'dark' ? '#20232b' : '#f7f8fa',
        borderRight: `1px solid ${props.theme === 'dark' ? '#343842' : '#e4e7ed'}`,
      },
      '.cm-activeLine, .cm-activeLineGutter': {
        backgroundColor: props.theme === 'dark' ? '#252a35' : '#f2f6fc',
      },
      '&.cm-focused': { outline: 'none' },
      '.cm-scroller': { fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace' },
    },
    { dark: props.theme === 'dark' },
  )

const createEditor = () => {
  if (!editorElement.value) return
  editor?.destroy()
  editorElement.value.replaceChildren()
  editor = new EditorView({
    parent: editorElement.value,
    state: EditorState.create({
      doc: source.value,
      extensions: [
        basicSetup,
        json(),
        linter(jsonParseLinter()),
        indentUnit.of(' '.repeat(Math.max(1, props.indent))),
        EditorState.readOnly.of(props.disabled),
        EditorView.editable.of(!props.disabled),
        editorPlaceholder(props.placeholder),
        editorTheme(),
        EditorView.updateListener.of((update) => {
          if (!update.docChanged || suppressEditorChange) return
          handleTextChange(update.state.doc.toString())
        }),
      ],
    }),
  })
}

const applyJsonTransform = (indent?: number) => {
  const payload = parse(source.value)
  updateValidity(payload)
  if (!payload.valid) return false
  replaceText(JSON.stringify(payload.data, null, indent))
  return true
}

const format = () => {
  const success = applyJsonTransform(props.indent)
  if (success) emit('format', source.value)
  return success
}

const compact = () => {
  const success = applyJsonTransform()
  if (success) emit('compact', source.value)
  return success
}

const copy = async () => {
  try {
    await navigator.clipboard.writeText(source.value)
    copied.value = true
    if (copyTimer) clearTimeout(copyTimer)
    copyTimer = setTimeout(() => (copied.value = false), 1200)
    emit('copy', source.value)
    return true
  } catch {
    return false
  }
}

const focus = () => editor?.focus()
const getText = () => source.value
const getData = () => {
  const payload = parse(source.value)
  return payload.valid ? payload.data : undefined
}

watch(
  () => props.modelValue,
  (value) => {
    if (suppressNextModelWatch) {
      suppressNextModelWatch = false
      return
    }
    if (value !== undefined) {
      const text = serialize(value)
      if (text !== source.value) replaceText(text, false)
    }
  },
  { deep: true },
)

watch(
  () => props.data,
  (value) => {
    if (suppressNextDataWatch) {
      suppressNextDataWatch = false
      return
    }
    if (props.modelValue === undefined) replaceText(serialize(value), false)
  },
  { deep: true },
)

watch(
  () => [props.disabled, props.indent, props.placeholder, props.theme],
  async () => {
    await nextTick()
    createEditor()
  },
)

onMounted(() => {
  source.value = initialSource()
  updateValidity(parse(source.value))
  createEditor()
})

onBeforeUnmount(() => {
  editor?.destroy()
  if (copyTimer) clearTimeout(copyTimer)
})

defineExpose<JsonExposed>({ format, compact, copy, focus, getText, getData })
</script>

<template>
  <div
    v-bind="$attrs"
    class="s-json"
    :class="[`is-${theme}`, { 'is-disabled': disabled, 'is-line-numbers': lineNumbers }]"
    :style="rootStyle"
    :aria-disabled="disabled"
  >
    <div v-if="toolbar" class="s-json__toolbar">
      <div class="s-json__status">
        <span v-if="showStatus" :class="errorMessage ? 'is-error' : 'is-valid'">
          {{ statusText }}
        </span>
      </div>
      <div class="s-json__actions">
        <template v-if="!disabled">
          <s-button
            :icon="MagicStick"
            text
            content="格式化 JSON"
            :tooltip-attrs="{ showAfter: 1000 }"
            @click="format"
          />
          <s-button :icon="Minus" :tooltip-attrs="{ showAfter: 1000 }" text content="压缩 JSON" @click="compact" />
        </template>
        <s-button text :content="copied ? '已复制' : '复制 JSON'" :tooltip-attrs="{ showAfter: 1000 }" @click="copy">
          <s-icon><DocumentCopy /></s-icon>
        </s-button>
      </div>
    </div>
    <div ref="editorElement" class="s-json__editor"></div>
    <div v-if="!toolbar && showStatus" class="s-json__footer" :class="errorMessage ? 'is-error' : 'is-valid'">
      {{ statusText }}
    </div>
  </div>
</template>

<style scoped>
.s-json {
  display: flex;
  width: 100%;
  min-width: 0;
  overflow: hidden;
  flex-direction: column;
  border: 1px solid var(--el-border-color);
  border-radius: 4px;
  background: var(--el-bg-color);
  transition: border-color 0.2s;
}

.s-json:focus-within {
  border-color: var(--el-color-primary);
}

.s-json__toolbar {
  display: flex;
  min-height: 38px;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 0 8px 0 12px;
  border-bottom: 1px solid var(--el-border-color-lighter);
  background: var(--el-fill-color-lighter);
}

.s-json__status,
.s-json__footer {
  min-width: 0;
  overflow: hidden;
  font-size: 12px;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.s-json__status .is-valid,
.s-json__footer.is-valid {
  color: var(--el-color-success);
}

.s-json__status .is-error,
.s-json__footer.is-error {
  color: var(--el-color-danger);
}

.s-json__actions {
  display: flex;
  flex: none;
  align-items: center;
}

.s-json__actions :deep(.el-button) {
  position: relative;
  width: 32px;
  height: 32px;
  margin-left: 0;
  padding: 0;
}

.s-json__editor {
  min-height: 0;
  flex: 1;
  overflow: hidden;
}

.s-json__editor :deep(.cm-editor) {
  min-height: 100%;
  font-size: 13px;
}

.s-json__editor :deep(.cm-scroller) {
  overflow: auto;
}

.s-json:not(.is-line-numbers) .s-json__editor :deep(.cm-gutters) {
  display: none;
}

.s-json__footer {
  min-height: 30px;
  padding: 6px 12px;
  border-top: 1px solid var(--el-border-color-lighter);
  background: var(--el-fill-color-lighter);
}

.s-json.is-dark {
  border-color: #343842;
  background: #17191f;
}

.s-json.is-dark .s-json__toolbar,
.s-json.is-dark .s-json__footer {
  border-color: #343842;
  background: #20232b;
}

.s-json.is-disabled {
  border-color: var(--el-disabled-border-color);
}

.s-json.is-disabled:focus-within {
  border-color: var(--el-disabled-border-color);
}

.s-json.is-disabled .s-json__toolbar,
.s-json.is-disabled .s-json__footer,
.s-json.is-disabled .s-json__editor :deep(.cm-editor),
.s-json.is-disabled .s-json__editor :deep(.cm-gutters) {
  background: var(--el-disabled-bg-color);
}

.s-json.is-disabled .s-json__toolbar,
.s-json.is-disabled .s-json__footer,
.s-json.is-disabled .s-json__editor :deep(.cm-gutters) {
  border-color: var(--el-disabled-border-color);
}

.s-json.is-disabled .s-json__editor :deep(.cm-content) {
  cursor: default;
}

.s-json.is-dark.is-disabled,
.s-json.is-dark.is-disabled .s-json__editor :deep(.cm-editor) {
  background: #24272f;
}

.s-json.is-dark.is-disabled .s-json__toolbar,
.s-json.is-dark.is-disabled .s-json__footer,
.s-json.is-dark.is-disabled .s-json__editor :deep(.cm-gutters) {
  background: #292d36;
}
</style>
