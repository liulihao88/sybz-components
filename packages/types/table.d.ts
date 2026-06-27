import type { Component, VNodeChild } from 'vue'
import type { PaginationPropsPublic, TableColumnCtx, TableInstance } from 'element-plus'

export type TableRow = Record<string, any>

export type TableSelectionType = '' | 'single' | 'multiple'

export interface TablePageChangePayload {
  pageNumber: number
  pageSize: number
}

export interface TableScope<Row extends TableRow = TableRow> {
  row: Row
  $index: number
  column?: TableColumnCtx<Row>
  [key: string]: any
}

export type TableCallbackContext<
  Row extends TableRow = TableRow,
  Column = STableColumn<Row>,
  Action = STableButton<Row>,
> = Partial<Row> & {
  row?: Row
  scope?: TableScope<Row>
  column?: Column | TableColumnCtx<Row>
  action?: Action
  value?: any
  index?: number
  event?: Event
}

export type TableContextHandler<TResult = any, Row extends TableRow = TableRow> = (
  context: TableCallbackContext<Row>,
) => TResult

export type TableCellContext<Row extends TableRow = TableRow, Column = STableColumn<Row>> = Partial<Row> & {
  row: Row
  scope: TableScope<Row>
  column?: Column | TableColumnCtx<Row>
  value?: any
  index?: number
  event?: Event
}

export type TableLegacyHandler<TResult = any> = (...args: any[]) => TResult

export type TableMaybeFn<TResult = any, Row extends TableRow = TableRow> =
  | TResult
  | TableContextHandler<TResult, Row>
  | TableLegacyHandler<TResult>

export type TableRender<Row extends TableRow = TableRow> = (context: TableCellContext<Row>) => VNodeChild

export type TableFilterContext<Row extends TableRow = TableRow> = TableCallbackContext<Row>

export type TableFilter<Row extends TableRow = TableRow> = string | ((context: TableFilterContext<Row>) => any)

export interface STablePageAttrs extends Partial<PaginationPropsPublic> {
  [key: string]: any
}

export interface STableButton<Row extends TableRow = TableRow> extends Record<string, any> {
  prop?: string
  content?: string | number | TableContextHandler<string | number, Row> | TableLegacyHandler<string | number>
  title?: string | number | TableContextHandler<string | number, Row> | TableLegacyHandler<string | number>
  handler?: TableContextHandler<any, Row> | TableLegacyHandler<any>
  isShow?: TableMaybeFn<boolean, Row>
  disabled?: TableMaybeFn<boolean, Row>
  reConfirm?: TableMaybeFn<boolean, Row>
  render?: TableRender<Row>
  useSlot?: boolean | string
  comp?: string | Component
  attrs?: Record<string, any>
  width?: number | string
}

export interface STableColumn<Row extends TableRow = TableRow> extends Record<string, any> {
  label?: string | number
  prop?: string
  property?: string
  type?: string
  className?: string
  labelClassName?: string
  width?: number | string
  minWidth?: number | string
  fixed?: string | boolean
  align?: string
  headerAlign?: string
  sortable?: string | boolean
  sortMethod?: TableColumnCtx<Row>['sortMethod']
  sortBy?: TableColumnCtx<Row>['sortBy']
  sortOrders?: TableColumnCtx<Row>['sortOrders']
  resizable?: boolean
  columnKey?: string
  renderHeader?: TableColumnCtx<Row>['renderHeader']
  showOverflowTooltip?: TableColumnCtx<Row>['showOverflowTooltip']
  tooltipFormatter?: TableColumnCtx<Row>['tooltipFormatter']
  formatter?: TableColumnCtx<Row>['formatter']
  selectable?: TableColumnCtx<Row>['selectable']
  reserveSelection?: boolean
  filterMethod?: TableColumnCtx<Row>['filterMethod']
  filteredValue?: TableColumnCtx<Row>['filteredValue']
  filters?: TableColumnCtx<Row>['filters']
  filterPlacement?: string
  filterMultiple?: boolean
  filterClassName?: string
  index?: TableColumnCtx<Row>['index']
  useSlot?: boolean | string
  render?: TableRender<Row>
  filter?: TableFilter<Row>
  handler?: TableContextHandler<any, Row> | TableLegacyHandler<any>
  isShow?: TableMaybeFn<boolean, Row>
  columnEmptyText?: string
  btns?: STableButton<Row>[]
  maxBtns?: number | string
}

export interface STableResolvedColumn<Row extends TableRow = TableRow> extends STableColumn<Row> {
  showOverflowTooltip?: boolean
  btns: STableButton<Row>[]
  baseBtns: STableButton<Row>[]
  hideBtns: STableButton<Row>[]
  maxBtns: number
}

export type TableColumnList<Row extends TableRow = TableRow> = STableColumn<Row>[]

export type TableModelValue<Row extends TableRow = TableRow> =
  | Row[]
  | Row
  | string
  | number
  | boolean
  | null
  | undefined

export interface STableProps<Row extends TableRow = TableRow> {
  data?: Row[]
  columns?: TableColumnList<Row>
  showPage?: boolean
  showIndex?: boolean
  pageSize?: number
  pageNumber?: number
  pageSizes?: number[]
  total?: number
  columnEmptyText?: string
  loading?: boolean
  indexAttrs?: Record<string, any>
  asyncUpdate?: boolean
  pageAttrs?: STablePageAttrs
  modelValue?: TableModelValue<Row>
  selectionType?: TableSelectionType
  selectionAttrs?: Record<string, any>
}

export type STableEmits<Row extends TableRow = TableRow> = {
  'page-change': [payload: TablePageChangePayload]
  'update:modelValue': [value: TableModelValue<Row>]
}

export interface STableExpose {
  getTableRef: () => TableInstance | null
}

export type { TableColumnCtx, TableInstance }
