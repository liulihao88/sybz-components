import type { SybzComponentTheme } from '../component-props'
import type {
  SMenuFieldNames,
  SMenuActionConfig,
  SMenuFooterConfig,
  SMenuHeaderConfig,
  SMenuIcon,
  SMenuItem,
  SMenuItemDetail,
  SMenuProps,
  SMenuSelfProps,
} from '../../components/menu/src/types'

/**
 * s-menu 递归菜单组件，支持路由、图标、分组、默认展开、header/footer 头尾配置以及公共组件主题。autoHeight 从顶部排列菜单，仅空间不足时压缩菜单项尺寸。
 *
 * 先提示 sybz 自身属性。
 */
export type SMenuComponent = {
  new (): {
    $props: {
      modelValue?: string
      options?: SMenuItem[]
      fieldNames?: SMenuFieldNames
      router?: boolean
      defaultOpenAll?: boolean
      defaultOpeneds?: string[]
      width?: string | number
      height?: string | number
      /** 是否自适应菜单项尺寸：空间充足时从顶部正常排列，仅空间不足时压缩，上下 padding 最多各 8px */
      autoHeight?: boolean
      backgroundColor?: string
      textColor?: string
      activeTextColor?: string
      collapse?: boolean
      variant?: 'dark' | 'light'
      theme?: SybzComponentTheme
      header?: SMenuHeaderConfig
      /** @deprecated 请使用 header */
      headerConfig?: SMenuHeaderConfig
      actionConfig?: SMenuActionConfig
      footer?: SMenuFooterConfig
    }
    $slots: {
      header?: () => any
      footer?: () => any
    }
    $emit: (event: 'update:modelValue' | 'update:collapse' | 'select' | 'actionClick', ...args: any[]) => void
  }
}

declare const SMenu: SMenuComponent
export default SMenu
