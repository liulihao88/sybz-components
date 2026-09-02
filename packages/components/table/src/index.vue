<script setup lang="ts">
defineOptions({
  name: 'STable',
})

import { ref, watch, computed, useAttrs, nextTick, toRaw, getCurrentInstance } from 'vue'
import type { TableColumnCtx, TableInstance } from 'element-plus'
import RenderComp from './renderComp.vue'
import HeaderTooltip from './headerTooltip.vue'
import SPopconfirm from '@/components/popconfirm/src/index.vue'
import SIcon from '@/components/icon/src/index.vue'
import { getType } from '@sybz-components/utils'
import useGlobalComponentConfig from '@/hooks/useGlobalComponentConfig'
import { createRenderContext } from '@/components/common/render'

import type {
  STableButton,
  STableColumn,
  STableExpose,
  STableResolvedColumn,
  TableCallbackContext,
  TableColumnList,
  TableModelValue,
  TableRow,
  TableSelectionType,
  TableScope,
} from './types'

const attrs = useAttrs()
const instance = getCurrentInstance()
const PAGE_WRAP_HEIGHT = 50
const HEADER_MIN_WIDTH_PADDING = 32
const HEADER_SORTABLE_RESERVE_WIDTH = 28
const hasOwn = (target, key) => Object.prototype.hasOwnProperty.call(target, key)
const isTableRow = (value: unknown): value is TableRow => {
  return value !== null && typeof value === 'object' && !Array.isArray(value)
}

type ElementTableColumn = TableColumnCtx<TableRow> & {
  id?: string
  realWidth?: number | null
  width?: number | string
  minWidth?: number | string
  type?: string
  fixed?: string | boolean
  isColumnGroup?: boolean
}

type ElementTableLayout = {
  bodyWidth?: { value: number | null }
  getFlattenColumns?: () => ElementTableColumn[]
}

type ElementTableInstance = TableInstance & {
  $el?: HTMLElement
  layout?: ElementTableLayout
}

interface TableProps {
  data?: TableRow[]
  columns?: TableColumnList
  showPage?: boolean
  showIndex?: boolean
  size?: string
  theme?: 'default' | 'chenghua' | 'shijingshan'
  pageSize?: number
  pageNumber?: number
  pageSizes?: number[]
  total?: number
  columnEmptyText?: string
  loading?: boolean
  indexAttrs?: Record<string, any>
  asyncUpdate?: boolean
  pageAttrs?: Record<string, any>
  modelValue?: TableModelValue
  selectionType?: TableSelectionType
  selectionAttrs?: Record<string, any>
}

const props = withDefaults(defineProps<TableProps>(), {
  data: () => [],
  columns: () => [],
  showPage: true,
  showIndex: true,
  size: '',
  theme: 'default',
  pageSize: 30,
  pageNumber: 1,
  pageSizes: () => [10, 30, 50],
  total: 0,
  columnEmptyText: '-',
  loading: undefined,
  indexAttrs: () => ({}),
  asyncUpdate: false,
  pageAttrs: () => ({}),
  modelValue: undefined,
  selectionType: '',
  selectionAttrs: () => ({}),
})
const mergedProps = useGlobalComponentConfig('table', props)
const tableRef = ref<TableInstance | null>(null)
const tableTotal = computed(() => {
  return mergedProps.value.total ?? mergedProps.value.data.length
})
const sPageSize = ref(mergedProps.value.pageSize)
const sPageNumber = ref(mergedProps.value.pageNumber)
const emits = defineEmits<{
  'page-change': [payload: { pageNumber: number; pageSize: number }]
  'update:modelValue': [value: TableRow[] | TableRow | string | number | boolean | null | undefined]
}>()
const finalColumns = ref<STableResolvedColumn[]>([])
const syncingMultipleSelection = ref(false)
const syncingSingleSelection = ref(false)

const isSingleSelection = computed(() => mergedProps.value.selectionType === 'single')
const isMultipleSelection = computed(() => mergedProps.value.selectionType === 'multiple')
const shouldShowIndex = computed(
  () => mergedProps.value.showIndex && (mergedProps.value.columns.length > 0 || mergedProps.value.data.length > 0),
)
const normalizedSelectionAttrs = computed<Record<string, any>>(() => {
  const selectionAttrs = mergedProps.value.selectionAttrs as unknown as Record<string, any> | undefined
  if (selectionAttrs && typeof selectionAttrs === 'object') {
    return selectionAttrs
  }

  return {}
})
const selectionHeaderLabel = computed(() => normalizedSelectionAttrs.value.label || '')
const customHeaderCellStyle = computed<Record<string, any>>(() => {
  return (attrs['custom-header-cell-style'] as unknown as Record<string, any>) ?? {}
})
const tableHeaderCellStyle = computed<Record<string, any>>(() => {
  const themeHeaderBg = mergedProps.value.theme === 'shijingshan' ? 'var(--s-sjs-header-bg)' : 'var(--s-ch-header-bg)'
  const baseStyle =
    mergedProps.value.theme === 'chenghua' || mergedProps.value.theme === 'shijingshan'
      ? {
          background: themeHeaderBg,
          color: mergedProps.value.theme === 'shijingshan' ? 'var(--s-sjs-text)' : '#1d2b4f',
          fontWeight: 600,
          textAlign: 'center',
        }
      : {
          background: 'var(--el-fill-color-light)',
          color: 'var(--el-text-color-primary)',
          textAlign: 'center',
        }

  return {
    ...baseStyle,
    ...customHeaderCellStyle.value,
  }
})
const indexColumnAttrs = computed<Record<string, any>>(() => {
  return (mergedProps.value.indexAttrs as unknown as Record<string, any>) ?? {}
})
const paginationAttrs = computed<Record<string, any>>(() => {
  return (mergedProps.value.pageAttrs as unknown as Record<string, any>) ?? {}
})

const invokeAttrsListener = (listenerName: string, ...args: any[]) => {
  const listener = attrs[listenerName]
  if (Array.isArray(listener)) {
    listener.forEach((item) => {
      if (typeof item === 'function') {
        item(...args)
      }
    })
    return
  }

  if (typeof listener === 'function') {
    listener(...args)
  }
}

const getRowKey = (): string | ((row: TableRow) => any) | undefined => {
  return (attrs['row-key'] ?? attrs.rowKey) as string | ((row: TableRow) => any) | undefined
}

const getRowIdentity = (row: TableRow | null | undefined) => {
  if (!row) return row

  const rowKey = getRowKey()
  if (!rowKey) return row

  if (typeof rowKey === 'function') {
    return rowKey(row)
  }

  return row?.[rowKey]
}

const isSameRow = (sourceRow: TableRow | null | undefined, targetRow: TableRow | null | undefined) => {
  if (!sourceRow || !targetRow) {
    return sourceRow === targetRow
  }

  const rowKey = getRowKey()
  if (rowKey) {
    return getRowIdentity(sourceRow) === getRowIdentity(targetRow)
  }

  return toRaw(sourceRow) === toRaw(targetRow)
}

const singleSelectionColumnAttrs = computed(() => {
  return {
    width: 58,
    align: 'center',
    fixed: 'left',
    ...normalizedSelectionAttrs.value,
  }
})

const multipleSelectionColumnAttrs = computed(() => {
  return {
    type: 'selection',
    width: 58,
    align: 'center',
    reserveSelection: !!getRowKey(),
    ...normalizedSelectionAttrs.value,
  }
})

const normalizeSelectedRows = (): TableRow[] => {
  return Array.isArray(mergedProps.value.modelValue) ? mergedProps.value.modelValue : []
}

const syncMultipleSelection = async () => {
  if (!isMultipleSelection.value) return

  await nextTick()
  if (!tableRef.value?.clearSelection) return

  const selectedRows = normalizeSelectedRows()
  const currentRows = Array.isArray(mergedProps.value.data) ? mergedProps.value.data : []
  const rowKey = getRowKey()

  syncingMultipleSelection.value = true
  try {
    tableRef.value.clearSelection()

    if (!selectedRows.length || !currentRows.length) return

    if (rowKey) {
      const selectedKeySet = new Set(selectedRows.map((row) => getRowIdentity(row)))
      currentRows.forEach((row) => {
        if (selectedKeySet.has(getRowIdentity(row))) {
          tableRef.value.toggleRowSelection(row, true)
        }
      })
      return
    }

    currentRows.forEach((row) => {
      if (selectedRows.some((selectedRow) => isSameRow(row, selectedRow))) {
        tableRef.value.toggleRowSelection(row, true)
      }
    })
  } finally {
    await nextTick()
    syncingMultipleSelection.value = false
  }
}

const syncSingleSelection = async () => {
  if (!isSingleSelection.value) return

  await nextTick()
  if (!tableRef.value?.setCurrentRow) return

  const currentRows = Array.isArray(mergedProps.value.data) ? mergedProps.value.data : []
  const targetRow = isTableRow(mergedProps.value.modelValue) ? mergedProps.value.modelValue : null
  const matchedRow = currentRows.find((row) => isSameRow(row, targetRow)) ?? null

  syncingSingleSelection.value = true
  try {
    tableRef.value.setCurrentRow(matchedRow)
  } finally {
    await nextTick()
    syncingSingleSelection.value = false
  }
}

const handleTableSelectionChange = (rows: TableRow[]) => {
  if (isMultipleSelection.value && !syncingMultipleSelection.value) {
    const rowKey = getRowKey()

    if (!rowKey) {
      emits('update:modelValue', rows)
    } else {
      const selectedMap = new Map(normalizeSelectedRows().map((row) => [getRowIdentity(row), row]))
      const currentPageKeys = new Set((mergedProps.value.data ?? []).map((row) => getRowIdentity(row)))

      currentPageKeys.forEach((key) => {
        selectedMap.delete(key)
      })
      rows.forEach((row) => {
        selectedMap.set(getRowIdentity(row), row)
      })

      emits('update:modelValue', Array.from(selectedMap.values()))
    }
  }

  invokeAttrsListener('onSelectionChange', rows)
}

const handleTableCurrentChange = (currentRow: TableRow | null, oldCurrentRow: TableRow | null) => {
  if (isSingleSelection.value && !syncingSingleSelection.value) {
    emits('update:modelValue', currentRow ?? null)
  }

  invokeAttrsListener('onCurrentChange', currentRow, oldCurrentRow)
}

const handleTableRowClick = (row: TableRow, column: TableColumnCtx<TableRow>, event: Event) => {
  if (isSingleSelection.value) {
    tableRef.value?.setCurrentRow?.(row)
  }

  invokeAttrsListener('onRowClick', row, column, event)
}

const handleSingleSelectionChange = (row: TableRow) => {
  tableRef.value?.setCurrentRow?.(row)
}

const isSingleRowSelected = (row: TableRow) => {
  if (!isTableRow(mergedProps.value.modelValue)) return false
  return isSameRow(row, mergedProps.value.modelValue)
}

const createCallbackContext = ({
  row,
  scope,
  column,
  action,
  index,
  event,
  value,
}: {
  row?: TableRow
  scope?: TableScope
  column?: STableColumn
  action?: STableButton
  index?: number
  event?: Event
  value?: any
} = {}): TableCallbackContext => {
  return createRenderContext({
    row,
    scope,
    column,
    action,
    value,
    index,
    event,
  })
}

const invokeWithContext = (fn: any, context: TableCallbackContext, legacyArgs: any[] = []) => {
  if (typeof fn !== 'function') {
    return fn
  }

  if (fn.length > 1) {
    return fn(...legacyArgs)
  }

  return fn(context)
}

const normalizeMaxBtns = (value: number | string | undefined) => {
  const parsedValue = Number(value)

  if (!Number.isFinite(parsedValue)) {
    return 4
  }

  return Math.max(Math.floor(parsedValue), 1)
}

const normalizeColumnBtns = (btns: STableButton[] = [], maxBtns = 4) => {
  const normalizedMaxBtns = normalizeMaxBtns(maxBtns)
  const normalizedBtns = btns.map((btn) => {
    return {
      ...btn,
      isShow: btn.isShow ?? true,
    }
  })

  // maxBtns 表示操作栏最多显示的总数量，包含“更多”入口。
  // 例如 maxBtns = 4:
  // 1. 按钮数 <= 4 时全部展示
  // 2. 按钮数 > 4 时展示 3 个按钮 + 1 个“更多”
  if (normalizedBtns.length > normalizedMaxBtns) {
    const visibleBtnCount = Math.max(normalizedMaxBtns - 1, 0)
    return {
      btns: normalizedBtns,
      baseBtns: normalizedBtns.slice(0, visibleBtnCount),
      hideBtns: normalizedBtns.slice(visibleBtnCount),
      maxBtns: normalizedMaxBtns,
    }
  }

  return {
    btns: normalizedBtns,
    baseBtns: normalizedBtns,
    hideBtns: [],
    maxBtns: normalizedMaxBtns,
  }
}

const updateTable = () => {
  finalColumns.value = mergedProps.value.columns.map((item: STableColumn) => {
    const maxBtns = normalizeMaxBtns(item.maxBtns ?? 4)
    const { btns, baseBtns, hideBtns } = normalizeColumnBtns(item.btns ?? [], maxBtns)

    const defaultItems = {
      showOverflowTooltip: true,
      btns,
      baseBtns, // 显示的按钮
      hideBtns, // 隐藏在...中的按钮
      maxBtns, // 操作栏最多显示的总数量，包含“更多”入口
    }
    let res = Object.assign({}, defaultItems, item, {
      btns,
      baseBtns,
      hideBtns,
      maxBtns,
    })

    const labelMinWidth = getLabelMinWidth(res)
    if (res.width === undefined && labelMinWidth !== undefined) {
      if (res.minWidth === undefined) {
        res.minWidth = labelMinWidth
      } else {
        res.minWidth = Math.max(Number(res.minWidth) || 0, labelMinWidth)
      }
    }

    return res
  })
}
// isShow 或者 content支持 函数或字符串两种写法。
const operatorBtnFn = (cont: STableButton['content'], context: TableCallbackContext = {}) => {
  if (typeof cont === 'function') {
    if (!context?.row) {
      return true
    }
    return invokeWithContext(cont, context, [context.row, context.scope, context.action])
  } else {
    if (cont === undefined) {
      return true
    }
    return cont
  }
}
const parseDisabled = (disFn: STableButton['disabled'], context: TableCallbackContext = {}) => {
  if (typeof disFn === 'function') {
    if (!context?.row) {
      return false
    }
    return invokeWithContext(disFn, context, [context.row, context.scope, context.action])
  } else {
    if (disFn === undefined) {
      return false
    }
    return disFn
  }
}
const parseIsShow = (
  isFn: STableButton['isShow'] | STableColumn['isShow'],
  context: TableCallbackContext = {},
  legacyArgs: any[] = [],
) => {
  if (typeof isFn === 'function') {
    return invokeWithContext(isFn, context, legacyArgs)
  } else {
    if (isFn === undefined) {
      return true
    }
    return isFn
  }
}

const getFilterValueByName = (filter: string, context: TableCallbackContext = {}) => {
  const globalValue = instance?.proxy?.[filter]

  if (typeof globalValue === 'function') {
    return globalValue(context.value)
  }

  if (globalValue !== undefined) {
    return globalValue
  }

  return context.row?.[filter]
}

const parseFilter = (filter: STableColumn['filter'], context: TableCallbackContext = {}) => {
  if (filter === undefined) {
    return context.value
  }

  if (typeof filter === 'string') {
    return getFilterValueByName(filter, context)
  }

  if (typeof filter === 'function') {
    return filter(context)
  }

  return context.value
}

const parseSlot = (val: Pick<STableButton | STableColumn, 'useSlot' | 'prop'>) => {
  if (val.useSlot === true) {
    return val.prop
  } else {
    return val.useSlot
  }
}

const getActionButtonClass = (disabled?: boolean) => [
  's-table__clickable',
  'hide-btns-button',
  disabled && 'is-disabled',
]

const createActionContext = (
  row: TableRow,
  scope: TableScope,
  column: STableColumn,
  action: STableButton,
  event?: Event,
) => {
  return createCallbackContext({
    row,
    scope,
    column,
    action,
    index: scope.$index,
    event,
  })
}

const isActionDisabled = (action: STableButton, row: TableRow, scope: TableScope, column: STableColumn) => {
  return Boolean(parseDisabled(action.disabled, createActionContext(row, scope, column, action)))
}

const parseReConfirm = (isFn: STableButton['reConfirm'], row?: TableRow, scope?: TableScope) => {
  if (typeof isFn === 'function') {
    const context = createCallbackContext({ row, scope })
    return invokeWithContext(isFn, context, [row, scope])
  } else {
    if (isFn === undefined) {
      return false
    }
    return isFn
  }
}

const handleActionClick = (
  btnItem: STableButton,
  row: TableRow,
  scope: TableScope,
  column: STableColumn,
  event: Event,
) => {
  event.stopPropagation()

  const context = createActionContext(row, scope, column, btnItem, event)

  if (parseDisabled(btnItem.disabled, context)) {
    event.preventDefault()
    return
  }

  invokeWithContext(btnItem.handler, context, [row, scope, btnItem, event])
}

const handleActionConfirm = (btnItem: STableButton, row: TableRow, scope: TableScope, column: STableColumn) => {
  const context = createActionContext(row, scope, column, btnItem)

  if (parseDisabled(btnItem.disabled, context)) {
    return
  }

  invokeWithContext(btnItem.handler, context, [row, scope, btnItem])
}

const indexMethod = (index: number) => {
  // 如果当前页是最后一页（数据量不足 pageSize），则基于实际数据量计算
  return (sPageNumber.value - 1) * sPageSize.value + index + 1
}

const handleEmptyText = (scope: TableScope, v: STableResolvedColumn) => {
  // 判断'   '为空
  const trimIsEmpty = getType(scope.row[v.prop]) === 'string' && scope.row[v.prop].trim().length === 0
  if (scope.row[v.prop] === null || scope.row[v.prop] === undefined || scope.row[v.prop] === '' || trimIsEmpty) {
    return v.columnEmptyText || mergedProps.value.columnEmptyText
  }
  return scope.row[v.prop]
}

function handleSizeChange(val: number) {
  if (mergedProps.value.asyncUpdate) {
    updatePage(1, val)
  } else {
    sPageSize.value = val
    sPageNumber.value = 1
    updatePage(1, val)
  }
}
function handleCurrentChange(val: number) {
  if (mergedProps.value.asyncUpdate) {
    updatePage(val, sPageSize.value)
  } else {
    sPageNumber.value = val
    updatePage(val, sPageSize.value)
  }
}
function updatePage(number: number, size: number) {
  emits('page-change', {
    pageNumber: number,
    pageSize: size,
  })
}

let textMeasureEl: HTMLSpanElement | null = null

const getTextWidth = (text: string | number = '') => {
  const value = String(text).trim()
  if (!value) return 0

  if (typeof document === 'undefined') {
    return value.length * 14
  }

  if (!textMeasureEl) {
    textMeasureEl = document.createElement('span')
    textMeasureEl.style.position = 'fixed'
    textMeasureEl.style.left = '-9999px'
    textMeasureEl.style.top = '-9999px'
    textMeasureEl.style.visibility = 'hidden'
    textMeasureEl.style.pointerEvents = 'none'
    textMeasureEl.style.whiteSpace = 'nowrap'
    document.body.appendChild(textMeasureEl)
  }

  const buttonEl = document.querySelector('.s-table .hide-btns-button')
  if (buttonEl) {
    const style = window.getComputedStyle(buttonEl)
    textMeasureEl.style.font = style.font
    textMeasureEl.style.fontSize = style.fontSize
    textMeasureEl.style.fontWeight = style.fontWeight
    textMeasureEl.style.fontFamily = style.fontFamily
    textMeasureEl.style.letterSpacing = style.letterSpacing
  } else {
    textMeasureEl.style.font = '14px sans-serif'
  }

  textMeasureEl.textContent = value
  return Math.ceil(textMeasureEl.getBoundingClientRect().width)
}

const getLabelMinWidth = (column: STableColumn) => {
  if (!column?.label) return undefined
  const sortableReserve = column.sortable ? HEADER_SORTABLE_RESERVE_WIDTH : 0
  return getTextWidth(column.label) + HEADER_MIN_WIDTH_PADDING + sortableReserve
}

const getBtnWidth = (btn: STableButton) => {
  if (btn.width !== undefined) {
    return Number(btn.width)
  }

  if (typeof btn.content === 'function') {
    return getTextWidth('哈哈')
  }

  if (btn.render || btn.useSlot) {
    return getTextWidth('哈哈')
  }

  if (btn.comp) {
    return 16
  }

  return getTextWidth(btn.content || '')
}

const getNumericWidth = (value: number | string | undefined) => {
  if (value === undefined || value === '') return 0

  const width = typeof value === 'number' ? value : Number.parseFloat(value)
  return Number.isFinite(width) ? width : 0
}

const getActionColumnWidth = (btns: STableButton[], hBtns: STableButton[]) => {
  const btnsWidth = btns.reduce((sum, btn) => sum + getBtnWidth(btn), 0)
  const gapWidth = Math.max(btns.length - 1, 0) * 12
  const moreWidth = hBtns.length > 0 ? 24 : 0
  const paddingWidth = 40
  const minWidth = 60

  return Math.max(btnsWidth + gapWidth + moreWidth + paddingWidth, minWidth)
}

const getActionColumnAttrs = (column: STableResolvedColumn) => {
  const actionWidth = getActionColumnWidth(column.baseBtns, column.hideBtns)
  const normalizedMinWidth = Math.max(getNumericWidth(column.minWidth), actionWidth)
  const nextAttrs: Record<string, any> = {
    fixed: 'right',
    ...column,
    minWidth: normalizedMinWidth,
  }

  if (nextAttrs.width === undefined) {
    nextAttrs.width = normalizedMinWidth
  }

  return getTableColumnAttrs(nextAttrs as STableResolvedColumn)
}

const getTableColumnAttrs = (column: STableColumn | STableResolvedColumn) => {
  const nextAttrs: Record<string, any> = {
    ...column,
  }

  if (nextAttrs.label !== undefined) {
    nextAttrs.label = String(nextAttrs.label)
  }

  return nextAttrs
}

const getColumnRenderWidth = (column: ElementTableColumn) => {
  return getNumericWidth(column.realWidth ?? column.width ?? column.minWidth)
}

const isFlexibleDataColumn = (column: ElementTableColumn) => {
  if (column.fixed || column.isColumnGroup) return false

  return !['selection', 'index', 'expand'].includes(column.type || '')
}

const fillTableRemainingWidth = (resizedColumn?: TableColumnCtx<TableRow>) => {
  const table = tableRef.value as ElementTableInstance | null
  const columns = table?.layout?.getFlattenColumns?.() ?? []
  if (!table?.$el || columns.length === 0) return

  const tableWidth = table.$el.clientWidth
  if (!tableWidth) return

  const bodyWidth = columns.reduce((sum, column) => sum + getColumnRenderWidth(column), 0)
  const remainingWidth = tableWidth - bodyWidth
  if (remainingWidth <= 1) return

  const flexibleColumns = columns.filter(isFlexibleDataColumn)
  const targetColumn =
    [...flexibleColumns].reverse().find((column) => column !== resizedColumn) ??
    flexibleColumns[flexibleColumns.length - 1]
  if (!targetColumn) return

  const targetWidth = getColumnRenderWidth(targetColumn) + remainingWidth
  targetColumn.width = targetWidth
  targetColumn.realWidth = targetWidth

  if (table.layout?.bodyWidth) {
    table.layout.bodyWidth.value = tableWidth
  }

  table.doLayout()
}

const refreshTableLayout = (resizedColumn?: TableColumnCtx<TableRow>) => {
  nextTick(() => {
    tableRef.value?.doLayout()

    if (typeof requestAnimationFrame === 'function') {
      requestAnimationFrame(() => {
        fillTableRemainingWidth(resizedColumn)
      })
    } else {
      fillTableRemainingWidth(resizedColumn)
    }
  })
}

const handleHeaderDragend = (
  newWidth: number,
  oldWidth: number,
  column: TableColumnCtx<TableRow>,
  event: MouseEvent,
) => {
  invokeAttrsListener('onHeaderDragend', newWidth, oldWidth, column, event)
  refreshTableLayout(column)
}

watch(
  () => mergedProps.value.columns,
  () => {
    updateTable()
  },
  {
    immediate: true,
    deep: true,
  },
)
watch(
  () => mergedProps.value.pageSize,
  (val) => {
    sPageSize.value = val
  },
  {
    immediate: true,
  },
)
watch(
  () => mergedProps.value.pageNumber,
  (val) => {
    sPageNumber.value = val
  },
  {
    immediate: true,
  },
)
watch(
  [
    () => mergedProps.value.data,
    () => mergedProps.value.modelValue,
    () => mergedProps.value.selectionType,
    () => attrs['row-key'],
    () => attrs.rowKey,
  ],
  () => {
    if (isMultipleSelection.value) {
      syncMultipleSelection()
    } else if (isSingleSelection.value) {
      syncSingleSelection()
    }
  },
  {
    immediate: true,
    deep: true,
  },
)
const tableLoading = computed(() => {
  return mergedProps.value.loading ?? false
})
const parseEmptyText = computed(() => {
  if (tableLoading.value === true) {
    return ''
  }
  return '暂无数据'
})
const compEmptyText = computed(() => {
  if (hasOwn(attrs, 'empty-text')) {
    return String(attrs['empty-text'] ?? '')
  }
  if (hasOwn(attrs, 'emptyText')) {
    return String(attrs['emptyText'] ?? '')
  }
  return parseEmptyText.value
})

const fluidHeight = computed(() => {
  const height = attrs.height
  if (typeof height !== 'string') {
    return ''
  }

  if (height.includes('%') || height.includes('calc(') || height.includes('vh')) {
    return height
  }

  return ''
})

const wrapperStyle = computed(() => {
  if (!fluidHeight.value) {
    return {}
  }

  return {
    height: fluidHeight.value,
  }
})

const tableClass = computed(() => ({
  's-table--fluid-height': !!fluidHeight.value,
  's-table--chenghua': mergedProps.value.theme === 'chenghua',
  's-table--shijingshan': mergedProps.value.theme === 'shijingshan',
}))

const tableAttrs = computed(() => {
  const nextAttrs = {
    ...attrs,
  } as Record<string, any>

  if (mergedProps.value.size) {
    nextAttrs.size = mergedProps.value.size
  }

  delete nextAttrs.onSelectionChange
  delete nextAttrs.onCurrentChange
  delete nextAttrs.onRowClick
  delete nextAttrs.onHeaderDragend

  if (
    isSingleSelection.value &&
    !hasOwn(nextAttrs, 'highlight-current-row') &&
    !hasOwn(nextAttrs, 'highlightCurrentRow')
  ) {
    nextAttrs.highlightCurrentRow = true
  }

  if (!fluidHeight.value) {
    return nextAttrs
  }

  delete nextAttrs.height

  return {
    ...nextAttrs,
    height: mergedProps.value.showPage ? `calc(100% - ${PAGE_WRAP_HEIGHT}px)` : '100%',
  }
})

const paginationSize = computed(() => {
  const size = mergedProps.value.size
  return size === 'small' || size === 'default' || size === 'large' ? size : undefined
})

const getTableRef: STableExpose['getTableRef'] = () => {
  return tableRef.value
}

defineExpose({
  getTableRef,
})
</script>

<template>
  <div v-loading="tableLoading" class="s-table" :class="tableClass" :style="wrapperStyle">
    <el-table
      ref="tableRef"
      :data="mergedProps.data"
      :header-cell-style="tableHeaderCellStyle"
      :empty-text="compEmptyText"
      v-bind="{
        stripe: true,
        border: true,
        ...tableAttrs,
      }"
      @selection-change="handleTableSelectionChange"
      @current-change="handleTableCurrentChange"
      @row-click="handleTableRowClick"
      @header-dragend="handleHeaderDragend"
    >
      <el-table-column v-if="isMultipleSelection" v-bind="multipleSelectionColumnAttrs" />
      <el-table-column v-else-if="isSingleSelection" v-bind="singleSelectionColumnAttrs">
        <template v-if="selectionHeaderLabel" #header>
          <HeaderTooltip :label="selectionHeaderLabel" />
        </template>
        <template #default="scope">
          <div class="s-table__selection">
            <el-radio
              :model-value="isSingleRowSelected(scope.row)"
              :value="true"
              @click.stop
              @change="handleSingleSelectionChange(scope.row)"
            />
          </div>
        </template>
      </el-table-column>
      <el-table-column
        v-if="isSingleSelection && shouldShowIndex"
        type="index"
        :width="tableTotal >= 10000 || mergedProps.size === 'large' ? 70 : 60"
        align="center"
        :index="indexMethod"
        :fixed="true"
        v-bind="indexColumnAttrs"
      >
        <!-- 使用 #header 插槽自定义表头 -->
        <template #header="{ column }">
          <HeaderTooltip :label="column.label || '序号'" />
        </template>
      </el-table-column>
      <slot />
      <el-table-column
        v-if="!isSingleSelection && shouldShowIndex"
        type="index"
        :width="tableTotal >= 10000 || mergedProps.size === 'large' ? 70 : 60"
        align="center"
        :index="indexMethod"
        :fixed="true"
        v-bind="indexColumnAttrs"
      >
        <template #header="{ column }">
          <HeaderTooltip :label="column.label || '序号'" />
        </template>
      </el-table-column>
      <template v-for="(v, i) in finalColumns" :key="i">
        <template v-if="parseIsShow(v.isShow, createCallbackContext({ column: v, index: i }), [v, i])">
          <el-table-column v-if="v.type" :key="v.type" v-bind="{ align: 'center', ...getTableColumnAttrs(v) }">
            <template #header>
              <HeaderTooltip :label="v.label" />
            </template>
          </el-table-column>
          <el-table-column v-else-if="v.btns && v.btns.length > 0" v-bind="getActionColumnAttrs(v)">
            <template #header>
              <HeaderTooltip :label="v.label" />
            </template>
            <template #default="scope">
              <template v-if="scope.$index !== -1">
                <template
                  v-if="
                    parseIsShow(
                      v.isShow,
                      createCallbackContext({ row: scope.row, scope, column: v, index: scope.$index }),
                      [scope.row, scope, v, i],
                    )
                  "
                >
                  <template v-for="(val, idx) in v.baseBtns" :key="idx">
                    <template
                      v-if="
                        parseIsShow(
                          val.isShow,
                          createCallbackContext({
                            row: scope.row,
                            scope,
                            column: v,
                            action: val,
                            index: scope.$index,
                          }),
                          [scope.row, scope, v, i],
                        )
                      "
                    >
                      <slot
                        v-if="val.useSlot"
                        :name="parseSlot(val)"
                        :row="scope.row"
                        :scope="scope"
                        :index="scope.$index"
                        :value="scope.row[val.prop]"
                      />
                      <RenderComp
                        v-else-if="val.render"
                        :render="val.render"
                        :row="scope.row"
                        :scope="scope"
                        :value="scope.row[val.prop]"
                        :column="v"
                        :action="val"
                        :index="scope.$index"
                      />

                      <template v-else-if="parseReConfirm(val.reConfirm, scope.row, scope)">
                        <sPopconfirm
                          trigger="click"
                          :theme="val.theme ?? mergedProps.theme"
                          :disabled="isActionDisabled(val, scope.row, scope, v)"
                          :title="
                            getType(val.title) === 'function'
                              ? invokeWithContext(
                                  val.title,
                                  createCallbackContext({
                                    row: scope.row,
                                    scope,
                                    column: v,
                                    action: val,
                                    index: scope.$index,
                                  }),
                                  [scope.row, scope, val],
                                )
                              : (val.title ?? '确定删除吗?')
                          "
                          :dangerouslyUseHTMLString="val.dangerouslyUseHTMLString ?? true"
                          class="s-table__actions"
                          @confirm="handleActionConfirm(val, scope.row, scope, v)"
                        >
                          <component
                            :is="val.comp"
                            v-if="val.comp"
                            :class="getActionButtonClass(isActionDisabled(val, scope.row, scope, v))"
                            v-bind="val.attrs"
                            :disabled="isActionDisabled(val, scope.row, scope, v)"
                          />
                          <el-button
                            v-else
                            v-bind="{ ...val }"
                            link
                            class="hide-btns-button"
                            :disabled="isActionDisabled(val, scope.row, scope, v)"
                          >
                            {{
                              operatorBtnFn(
                                val.content,
                                createCallbackContext({
                                  row: scope.row,
                                  scope,
                                  column: v,
                                  action: val,
                                  index: scope.$index,
                                }),
                              )
                            }}
                          </el-button>
                        </sPopconfirm>
                      </template>
                      <component
                        :is="val.comp"
                        v-else-if="val.comp"
                        :class="getActionButtonClass(isActionDisabled(val, scope.row, scope, v))"
                        v-bind="val.attrs"
                        :disabled="isActionDisabled(val, scope.row, scope, v)"
                        @click="($event) => handleActionClick(val, scope.row, scope, v, $event)"
                      />
                      <template v-else>
                        <el-button
                          v-bind="{ ...val }"
                          link
                          :disabled="isActionDisabled(val, scope.row, scope, v)"
                          class="hide-btns-button"
                          @click="($event) => handleActionClick(val, scope.row, scope, v, $event)"
                        >
                          {{
                            operatorBtnFn(
                              val.content,
                              createCallbackContext({
                                row: scope.row,
                                scope,
                                column: v,
                                action: val,
                                index: scope.$index,
                              }),
                            )
                          }}
                        </el-button>
                      </template>
                    </template>
                  </template>

                  <template v-if="v.hideBtns.length > 0">
                    <el-dropdown class="" trigger="click">
                      <s-icon class="s-table__clickable hide-btns-button" icon="more" @click.stop />
                      <template #dropdown>
                        <el-dropdown-menu :hide-on-click="false">
                          <template v-for="(val, idx) in v.hideBtns" :key="idx">
                            <el-dropdown-item
                              v-if="
                                parseIsShow(
                                  val.isShow,
                                  createCallbackContext({
                                    row: scope.row,
                                    scope,
                                    column: v,
                                    action: val,
                                    index: scope.$index,
                                  }),
                                  [scope.row, scope, v, i],
                                )
                              "
                              :hide-on-click="false"
                              :disabled="isActionDisabled(val, scope.row, scope, v)"
                              @click="($event) => handleActionClick(val, scope.row, scope, v, $event)"
                            >
                              <slot
                                v-if="val.useSlot"
                                :name="parseSlot(val)"
                                :row="scope.row"
                                :scope="scope"
                                :index="scope.$index"
                                :value="scope.row[val.prop]"
                              />
                              <RenderComp
                                v-else-if="val.render"
                                :render="val.render"
                                :row="scope.row"
                                :scope="scope"
                                :value="scope.row[val.prop]"
                                :column="v"
                                :action="val"
                                :index="scope.$index"
                              />
                              <template v-else>
                                <component
                                  :is="val.comp"
                                  v-if="val.comp"
                                  :class="getActionButtonClass(isActionDisabled(val, scope.row, scope, v))"
                                  v-bind="val.attrs"
                                  :disabled="isActionDisabled(val, scope.row, scope, v)"
                                />
                                <el-button
                                  v-else
                                  v-bind="{ ...val }"
                                  link
                                  class="hide-btns-button"
                                  :disabled="isActionDisabled(val, scope.row, scope, v)"
                                >
                                  {{
                                    operatorBtnFn(
                                      val.content,
                                      createCallbackContext({
                                        row: scope.row,
                                        scope,
                                        column: v,
                                        action: val,
                                        index: scope.$index,
                                      }),
                                    )
                                  }}
                                </el-button>
                              </template>
                            </el-dropdown-item>
                          </template>
                        </el-dropdown-menu>
                      </template>
                    </el-dropdown>
                  </template>
                </template>
              </template>
            </template>
          </el-table-column>

          <el-table-column v-else v-bind="getTableColumnAttrs(v)">
            <template #header>
              <HeaderTooltip :label="v.label" />
            </template>
            <template #default="scope">
              <template v-if="scope.$index !== -1">
                <template v-if="v.useSlot">
                  <slot
                    :name="parseSlot(v)"
                    :row="scope.row"
                    :scope="scope"
                    :value="scope.row[v.prop]"
                    :index="scope.$index"
                  />
                </template>
                <RenderComp
                  v-else-if="v.render"
                  :render="v.render"
                  :row="scope.row"
                  :scope="scope"
                  :value="scope.row[v.prop]"
                  :column="v"
                  :index="scope.$index"
                />
                <span
                  v-else-if="v.handler"
                  class="hide-btns-button"
                  @click.stop="
                    invokeWithContext(
                      v.handler,
                      createCallbackContext({ row: scope.row, scope, column: v, index: scope.$index }),
                      [scope.row, scope, v],
                    )
                  "
                >
                  <span>
                    {{
                      v.filter
                        ? parseFilter(
                            v.filter,
                            createCallbackContext({ row: scope.row, scope, column: v, index: scope.$index }),
                          )
                        : handleEmptyText(scope, v)
                    }}
                  </span>
                </span>
                <span v-else-if="v.filter">
                  {{
                    parseFilter(
                      v.filter,
                      createCallbackContext({ row: scope.row, scope, column: v, index: scope.$index }),
                    )
                  }}
                </span>
                <span v-else>
                  {{ handleEmptyText(scope, v) }}
                </span>
              </template>
            </template>
          </el-table-column>
        </template>
      </template>
    </el-table>

    <div v-if="mergedProps.showPage" class="page-wrap">
      <div class="page-left">
        <span>共</span>
        <span class="s-table__total">{{ tableTotal }}</span>
        <span>条</span>
      </div>
      <div class="page-right">
        <div class="page-scroll">
          <el-pagination
            class="tab_pagination"
            background
            :current-page="sPageNumber"
            :page-size="sPageSize"
            :page-sizes="mergedProps.pageSizes"
            layout="prev, pager, next, jumper, sizes"
            :total="tableTotal"
            :size="paginationSize"
            v-bind="paginationAttrs"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.linked {
  color: var(--blue);
  cursor: pointer;
}

.s-table__selection {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
}

.s-table__actions {
  display: flex;
  align-items: center;
}

.s-table__clickable {
  cursor: pointer;
}

.hide-btns-button.is-disabled,
.hide-btns-button.is-disabled:hover,
.s-table__clickable.is-disabled,
.s-table__clickable.is-disabled:hover {
  cursor: not-allowed;
}

.s-table__total {
  margin: 0 16px;
  font-weight: 900;
}

.s-table {
  box-shadow: none !important;

  &.s-table--fluid-height {
    display: flex;
    flex-direction: column;
    min-height: 0;
  }

  .page-wrap {
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    padding: 4px 24px;
    height: 50px;
    background: var(--el-bg-color);
    border: 1px solid var(--el-border-color-light);
    border-top-style: none;
  }

  .page-wrap .page-left {
    flex-shrink: 0;
    color: var(--el-text-color-primary);
  }

  .page-wrap .page-right {
    flex: 1;
    min-width: 0;
    display: flex;
    overflow-x: auto;
    overflow-y: hidden;
  }

  .page-wrap .page-scroll {
    min-width: max-content;
    margin-left: auto;
  }

  .page-wrap .page-right :deep(.el-pagination) {
    display: inline-flex;
    flex: none;
    flex-wrap: nowrap;
    white-space: nowrap;
  }

  :deep(.el-table) {
    box-shadow: none !important;
  }

  :deep(.el-table__header),
  :deep(.el-table__body),
  :deep(.el-table__footer) {
    min-width: 100%;
  }

  &.s-table--fluid-height :deep(.el-table) {
    flex: 1;
    min-height: 0;
  }

  :deep(.el-table th) {
    box-sizing: border-box;
  }

  :deep(.el-table th .cell) {
    line-height: inherit;
    white-space: nowrap;
    overflow: hidden;
  }

  :deep(.el-table-fixed-column--right .cell.el-tooltip) {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    min-height: 23px;
    line-height: 23px;

    .s-icon + .s-icon {
      margin-left: 0;
    }
  }

  :deep(.el-table-fixed-column--right .cell.el-tooltip:has(> :only-child)) {
    justify-content: center;
  }

  :deep(
    .el-table__body-wrapper .el-table-column--selection > .cell,
    .el-table__header-wrapper .el-table-column--selection > .cell
  ) {
    justify-content: center;
    min-width: unset;
  }

  .hide-btns-button:not(.is-disabled) {
    color: var(--blue);
    cursor: pointer;
  }

  :deep(.el-dropdown-menu__item) {
    justify-content: center;
    min-width: 60px;
    height: 30px;
    line-height: 30px;
  }

  :deep(.el-table tr:not(:last-child) td.el-table__cell) {
    border-bottom: none !important;
  }

  :deep(.el-pagination .el-select) {
    width: 100px;
  }

  // 解决屏幕宽度改变, 可能导致操作那一列的左侧线条不显示的问题
  :deep(.el-table-fixed-column--right.is-last-column:before),
  :deep(.el-table-fixed-column--right.is-first-column:before) {
    box-shadow: 1px 0 0 0 var(--el-border-color-extra-light);
  }

  :deep(.el-button) {
    margin-left: 0 !important;
  }
}
</style>
