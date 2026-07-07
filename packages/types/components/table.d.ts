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
      theme?: '' | 'chenghua' | 'shijingshan'
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
