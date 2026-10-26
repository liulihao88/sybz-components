import { ElTable } from 'element-plus'
import type {
  STablePageAttrs,
  STableProps,
  TableColumnList,
  TableModelValue,
  TableRow,
  TableSelectionType,
} from '../table'
import type { SybzThemeProps, SybzStyleProps } from '../component-props'

type ElTableInstance = InstanceType<typeof ElTable>

/**
 * {@link https://liulihao88.github.io/sybz-components/components/table/home.html | 查看文档}
 *
 * 先提示 sybz 自身属性，再提示 Element Plus Table；s-table 自有属性包括主题、背景色、border（表格及单元格边框）、disabled（禁用分页和操作按钮）、分页、选择和列配置。 的公开属性。
 */
export type STablePublicProps = STableProps & Omit<ElTableInstance['$props'], keyof STableProps>

/**
 * {@link https://liulihao88.github.io/sybz-components/components/table/home.html | 查看文档}
 */
export type STableComponent = {
  install: (app: import('vue').App) => void
  new <STable文档 = 'https://liulihao88.github.io/sybz-components/components/table/home.html'>(): {
    $props: {
      data?: TableRow[]
      columns?: TableColumnList<TableRow>
      /** 禁用分页和操作栏按钮 */
      disabled?: boolean
      showPage?: boolean
      showIndex?: boolean
      size?: string
      /** 表格自身及表体背景色，支持 CSS 颜色值 */
      background?: string
      /** 是否使用简洁表格样式，去除单元格左右边框 */
      simple?: boolean
      /** 是否显示表格及单元格边框 */
      border?: boolean
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
      | 'disabled'
      | 'showPage'
      | 'showIndex'
      | 'size'
      | 'theme'
      | 'background'
      | 'simple'
      | 'border'
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
    > &
      SybzStyleProps &
      SybzThemeProps<STableProps>
    $emit: ElTableInstance['$emit']
    $slots: ElTableInstance['$slots'] & {
      empty?: () => any
    } & Record<string, (...args: any[]) => any>
  }
}

/**
 * {@link https://liulihao88.github.io/sybz-components/components/table/home.html | 查看文档}
 */
declare const STable: STableComponent
export default STable
