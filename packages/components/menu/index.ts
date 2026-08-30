import Menu from './src/index.vue'
import { withInstall } from '@/components/utils/withInstall.ts'

const SMenu = withInstall(Menu)
export type {
  SMenuActionConfig,
  SMenuFieldNames,
  SMenuFooterConfig,
  SMenuHeaderConfig,
  SMenuIcon,
  SMenuItem,
  SMenuItemDetail,
  SMenuProps,
  SMenuSelfProps,
} from './src/types'
export default SMenu
