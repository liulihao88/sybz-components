import Table from './src/index.vue'
import { withInstall } from '@/components/utils/withInstall.ts'
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
} from './src/types.ts'

const STable = withInstall(Table)
export default STable
