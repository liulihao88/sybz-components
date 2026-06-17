<template>
  <div v-if="items.length" ref="rootRef" class="api-intro">
    <s-tooltip v-for="item in items" :key="item.key" placement="bottom" effect="light" showAfter="100">
      <code class="api-intro__tag" v-copy:click="item.displayName">
        <span class="api-intro__kind">{{ item.kind }}</span>
        <span>
          {{ item.displayName }}
        </span>
      </code>
      <template #content>
        <div class="api-intro__card">
          <strong>{{ item.displayName }}</strong>
          <span v-if="item.type">类型: {{ item.type }}</span>
          <span v-if="item.defaultValue">默认值: {{ item.defaultValue }}</span>
          <span v-if="item.values">可选值: {{ item.values }}</span>
          <span v-if="item.params">参数: {{ item.params }}</span>
          <span v-if="item.description">说明: {{ item.description }}</span>
          <span v-if="item.source">来源: {{ item.source }}</span>
        </div>
      </template>
    </s-tooltip>
  </div>
</template>

<script setup lang="ts">
import { nextTick, onMounted, ref } from 'vue'

type ApiIntroItem = {
  key: string
  kind: string
  name: string
  displayName: string
  source: string
  description: string
  type: string
  defaultValue: string
  values: string
  params: string
}

const props = withDefaults(
  defineProps<{
    max?: number
  }>(),
  {
    max: 80,
  },
)

const rootRef = ref<HTMLElement>()
const items = ref<ApiIntroItem[]>([])

const cleanText = (value = '') => {
  return value
    .replace(/\u200B/g, '')
    .replace(/\s+/g, ' ')
    .replace(/^`|`$/g, '')
    .trim()
}

const findHeading = (table: HTMLTableElement) => {
  let current = table.previousElementSibling
  while (current) {
    if (/^H[2-4]$/.test(current.tagName)) {
      return cleanText(current.textContent || '')
    }
    current = current.previousElementSibling
  }
  return ''
}

const getKind = (heading: string, firstHeader: string) => {
  const text = `${heading} ${firstHeader}`
  if (/事件|Events?|Emits?/i.test(text)) return '事件'
  if (/插槽|Slots?/i.test(text)) return '插槽'
  if (/方法|Exposes?|Expose/i.test(text)) return '方法'
  if (/透传/i.test(text)) return '透传'
  return '属性'
}

const formatDisplayName = (name: string, kind: string) => {
  if (kind === '事件' && !name.startsWith('@')) return `@${name}`
  if (kind === '插槽' && !name.startsWith('#')) return `#${name}`
  return name
}

const findColumn = (headers: string[], patterns: RegExp[]) => {
  return headers.findIndex((header) => patterns.some((pattern) => pattern.test(header)))
}

const isApiTable = (heading: string, headers: string[]) => {
  const headingMatched = /(属性|事件|方法|插槽|Slots?|Exposes?|Expose|透传|API)/i.test(heading)
  const headerMatched = headers.some((header) => /(属性名|事件名|插槽名|方法名|默认值|回调参数|插槽参数)/.test(header))
  return headingMatched || headerMatched
}

const collectItems = () => {
  const pageRoot = rootRef.value?.closest('.vp-doc') || document.querySelector('.vp-doc') || document
  const tables = Array.from(pageRoot.querySelectorAll('table')) as HTMLTableElement[]
  const seen = new Set<string>()
  const collected: ApiIntroItem[] = []

  tables.forEach((table) => {
    if (table.closest('.el-table')) return

    const headers = Array.from(table.querySelectorAll('thead th')).map((item) => cleanText(item.textContent || ''))
    if (!headers.length) return

    const heading = findHeading(table)
    if (!isApiTable(heading, headers)) return

    const kind = getKind(heading, headers[0] || '')
    const nameIndex = findColumn(headers, [/属性名/, /事件名/, /插槽名/, /方法名/, /名称/, /name/i])
    const descriptionIndex = findColumn(headers, [/说明/, /描述/])
    const typeIndex = findColumn(headers, [/类型/])
    const defaultIndex = findColumn(headers, [/默认值/])
    const valuesIndex = findColumn(headers, [/可选值/])
    const paramsIndex = findColumn(headers, [/回调参数/, /插槽参数/, /参数/])
    const finalNameIndex = nameIndex >= 0 ? nameIndex : 0

    Array.from(table.querySelectorAll('tbody tr')).forEach((row) => {
      const cells = Array.from(row.querySelectorAll('td')).map((item) => cleanText(item.textContent || ''))
      const name = cells[finalNameIndex]
      if (!name || /^[-—]+$/.test(name)) return

      const displayName = formatDisplayName(name, kind)
      const key = `${kind}:${displayName}:${heading}`
      if (seen.has(key)) return
      seen.add(key)

      collected.push({
        key,
        kind,
        name,
        displayName,
        source: heading,
        description: descriptionIndex >= 0 ? cells[descriptionIndex] || '' : '',
        type: typeIndex >= 0 ? cells[typeIndex] || '' : '',
        defaultValue: defaultIndex >= 0 ? cells[defaultIndex] || '' : '',
        values: valuesIndex >= 0 ? cells[valuesIndex] || '' : '',
        params: paramsIndex >= 0 ? cells[paramsIndex] || '' : '',
      })
    })
  })

  items.value = collected.slice(0, props.max)
}

onMounted(async () => {
  await nextTick()
  collectItems()
})
</script>

<style scoped>
.api-intro {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-items: center;
  padding: 10px 12px;
  margin: 10px 0 18px;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
}

.api-intro__tag {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  height: 26px;
  padding: 0 8px;
  color: var(--vp-c-brand-1);
  font-size: 13px;
  line-height: 24px;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  cursor: help;
}

.api-intro__kind {
  color: var(--vp-c-text-2);
  font-size: 12px;
}

.api-intro__card {
  display: grid;
  gap: 4px;
  max-width: 340px;
  color: var(--el-text-color-primary);
  font-size: 13px;
  line-height: 1.5;
}

.api-intro__card strong {
  font-size: 14px;
}
</style>
