import { ElTable } from 'element-plus'
import type {
  STablePageAttrs,
  STableProps,
  TableColumnList,
  TableModelValue,
  TableRow,
  TableSelectionType,
} from '../table'

type ElTableInstance = InstanceType<typeof ElTable>

export type STablePublicProps = STableProps & Omit<ElTableInstance['$props'], keyof STableProps>

export type STableComponent = {
  new (): {
    $props: {
      data?: TableRow[]
      columns?: TableColumnList<TableRow>
      showPage?: boolean
      showIndex?: boolean
      size?: string
      theme?: SybzComponentTheme
      /** 表格自身及表体背景色，支持 CSS 颜色值和 transparent */
      background?: string
      /** 是否去除表格自身背景，融入外层容器 */
      transparent?: boolean
      pageSize?: number
      pageNumber?: number
      pageSizes?: number[]
      total?: number
      columnEmptyText?: string
      loading?: boolean
      indexAttrs?: Record<string, any>
      asyncUpdate?: boolean
      pageAttrs?: STablePageAttrs
      modelValue?: TableModelValue<TableRow>
      selectionType?: TableSelectionType
      selectionAttrs?: Record<string, any>
    } & Omit<
      ElTableInstance['$props'],
      | 'data'
      | 'columns'
      | 'showPage'
      | 'showIndex'
      | 'size'
      | 'theme'
      | 'background'
      | 'transparent'
      | 'pageSize'
      | 'pageNumber'
      | 'pageSizes'
      | 'total'
      | 'columnEmptyText'
      | 'loading'
      | 'indexAttrs'
      | 'asyncUpdate'
      | 'pageAttrs'
      | 'modelValue'
      | 'selectionType'
      | 'selectionAttrs'
    >
    $emit: ElTableInstance['$emit']
    $slots: ElTableInstance['$slots'] & Record<string, (...args: any[]) => any>
  }
}

declare const STable: STableComponent
export default STable
