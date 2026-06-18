import type {
  STableButton as STableButtonType,
  STableColumn as STableColumnType,
  STablePageAttrs as STablePageAttrsType,
  STableProps as STablePropsType,
  TableCallbackContext as TableCallbackContextType,
  TableColumnList as TableColumnListType,
  TableModelValue as TableModelValueType,
  TablePageChangePayload as TablePageChangePayloadType,
  TableSelectionType as TableSelectionTypeType,
} from './types/index.ts'

declare global {
  type TableBtnItem = STableButtonType
  type TableColumnItem = STableColumnType
  type TableColumnList = TableColumnListType
  type TableCallbackContext = TableCallbackContextType
  type TableModelValue = TableModelValueType
  type TablePageChangePayload = TablePageChangePayloadType
  type STablePageAttrs = STablePageAttrsType
  type TableSelectionType = TableSelectionTypeType
  type STableProps = STablePropsType
}

declare module 'vue' {
  export interface GlobalComponents {
    SBuildTime: (typeof import('./components/buildTime/index.ts'))['default']
    SInputNumber: (typeof import('./components/inputNumber/index.ts'))['default']
    SSplitPane: (typeof import('./components/splitPane/index.ts'))['default']
    STable: (typeof import('./components/table/index.ts'))['default']
  }
}

export {}
