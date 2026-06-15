export type SybzComponentInstallConfig = Record<string, any>

export interface SybzComponentsInstallOptions {
  theme?: string
  size?: string
  button?: SybzComponentInstallConfig
  dialog?: SybzComponentInstallConfig
  select?: SybzComponentInstallConfig
  table?: SybzComponentInstallConfig
  title?: SybzComponentInstallConfig
  tooltip?: SybzComponentInstallConfig
  [key: string]: any
}

export type {
  STableButton,
  STableColumn,
  STableEmits,
  STableExpose,
  STableProps,
  STableResolvedColumn,
  TableCallbackContext,
  TableColumnList,
  TableFilter,
  TableModelValue,
  TablePageChangePayload,
  TableRender,
  TableRow,
  TableScope,
  TableSelectionType,
} from '../components/table/index.ts'
