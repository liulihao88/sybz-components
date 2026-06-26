<template>
  <div v-if="items.length" ref="rootRef" class="api-intro">
    <s-tooltip v-for="item in items" :key="item.key" placement="bottom" effect="light" :show-after="100">
      <code v-copy:click="item.displayName" class="api-intro__tag">
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
          <div v-for="detail in item.details" :key="detail.title" class="api-intro__detail">
            <strong class="api-intro__detail-title">{{ detail.title }}</strong>
            <div class="api-intro__detail-list">
              <div v-for="detailItem in detail.items" :key="detailItem.name" class="api-intro__detail-item">
                <code>{{ detailItem.displayName }}</code>
                <span v-if="detailItem.type">类型: {{ detailItem.type }}</span>
                <span v-if="detailItem.defaultValue">默认值: {{ detailItem.defaultValue }}</span>
                <span v-if="detailItem.values">可选值: {{ detailItem.values }}</span>
                <span v-if="detailItem.description">{{ detailItem.description }}</span>
              </div>
            </div>
          </div>
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
  details: ApiIntroDetail[]
}

type ApiIntroDetailItem = Omit<ApiIntroItem, 'key' | 'kind' | 'source' | 'details'>

type ApiIntroDetail = {
  title: string
  items: ApiIntroDetailItem[]
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

const getDetailHeading = (heading: string) => {
  const match = heading.match(/^(.+?)\s*内部属性$/)
  if (!match) return null

  const detailName = cleanText(match[1])
  return {
    parentName: detailName.split('.')[0],
    title: heading,
  }
}

const parseTableRows = (table: HTMLTableElement, headers: string[], kind: string) => {
  const nameIndex = findColumn(headers, [/属性名/, /事件名/, /插槽名/, /方法名/, /字段名/, /名称/, /name/i])
  const descriptionIndex = findColumn(headers, [/说明/, /描述/])
  const typeIndex = findColumn(headers, [/类型/])
  const defaultIndex = findColumn(headers, [/默认值/])
  const valuesIndex = findColumn(headers, [/可选值/])
  const paramsIndex = findColumn(headers, [/回调参数/, /插槽参数/, /参数/])
  const finalNameIndex = nameIndex >= 0 ? nameIndex : 0

  return Array.from(table.querySelectorAll('tbody tr')).reduce<ApiIntroDetailItem[]>((rows, row) => {
    const cells = Array.from(row.querySelectorAll('td')).map((item) => cleanText(item.textContent || ''))
    const name = cells[finalNameIndex]
    if (!name || /^[-—]+$/.test(name)) return rows

    rows.push({
      name,
      displayName: formatDisplayName(name, kind),
      description: descriptionIndex >= 0 ? cells[descriptionIndex] || '' : '',
      type: typeIndex >= 0 ? cells[typeIndex] || '' : '',
      defaultValue: defaultIndex >= 0 ? cells[defaultIndex] || '' : '',
      values: valuesIndex >= 0 ? cells[valuesIndex] || '' : '',
      params: paramsIndex >= 0 ? cells[paramsIndex] || '' : '',
    })

    return rows
  }, [])
}

const collectItems = () => {
  const pageRoot = rootRef.value?.closest('.vp-doc') || document.querySelector('.vp-doc') || document
  const tables = Array.from(pageRoot.querySelectorAll('table')) as HTMLTableElement[]
  const seen = new Set<string>()
  const detailMap = new Map<string, ApiIntroDetail[]>()
  const collected: ApiIntroItem[] = []

  tables.forEach((table) => {
    if (table.closest('.el-table')) return

    const headers = Array.from(table.querySelectorAll('thead th')).map((item) => cleanText(item.textContent || ''))
    if (!headers.length) return

    const heading = findHeading(table)
    if (!isApiTable(heading, headers)) return

    const kind = getKind(heading, headers[0] || '')
    const detailHeading = getDetailHeading(heading)
    if (detailHeading) {
      const detailItems = parseTableRows(table, headers, kind)
      if (detailItems.length) {
        const details = detailMap.get(detailHeading.parentName) || []
        details.push({
          title: detailHeading.title,
          items: detailItems,
        })
        detailMap.set(detailHeading.parentName, details)
      }
      return
    }

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
        details: [],
      })
    })
  })

  collected.forEach((item) => {
    item.details = detailMap.get(item.displayName) || []
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
  max-width: min(720px, calc(100vw - 48px));
  max-height: min(70vh, 640px);
  overflow: auto;
  color: var(--el-text-color-primary);
  font-size: 13px;
  line-height: 1.5;
}

.api-intro__card strong {
  font-size: 14px;
}

.api-intro__detail {
  display: grid;
  gap: 8px;
  padding-top: 10px;
  margin-top: 6px;
  border-top: 1px solid var(--el-border-color-lighter);
}

.api-intro__detail-title {
  color: var(--vp-c-brand-1);
}

.api-intro__detail-list {
  display: grid;
  gap: 6px;
}

.api-intro__detail-item {
  display: grid;
  grid-template-columns: minmax(92px, max-content) minmax(80px, max-content) minmax(80px, max-content) minmax(
      180px,
      1fr
    );
  gap: 4px 10px;
  align-items: baseline;
  padding: 6px 8px;
  border: 1px solid var(--el-border-color-lighter);
  border-radius: 6px;
  background: var(--el-fill-color-extra-light);
}

.api-intro__detail-item code {
  color: var(--vp-c-brand-1);
  font-weight: 600;
}

@media (max-width: 640px) {
  .api-intro__detail-item {
    grid-template-columns: 1fr;
  }
}
</style>
