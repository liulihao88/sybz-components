export type SybzComponentInstallConfig = Record<string, any>

export interface SybzComponentsInstallOptions {
  theme?: string
  size?: string
  dangerouslyUseHTMLString?: boolean
  button?: SybzComponentInstallConfig
  dialog?: SybzComponentInstallConfig
  icon?: SybzComponentInstallConfig
  input?: SybzComponentInstallConfig
  popconfirm?: SybzComponentInstallConfig
  select?: SybzComponentInstallConfig
  tag?: SybzComponentInstallConfig
  table?: SybzComponentInstallConfig
  title?: SybzComponentInstallConfig
  tooltip?: SybzComponentInstallConfig
  warning?: SybzComponentInstallConfig
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
