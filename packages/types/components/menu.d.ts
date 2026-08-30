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
 * s-menu 递归菜单组件，支持路由、图标、分组、默认展开、内置头尾区域以及 default / chenghua / shijingshan 主题。
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
      backgroundColor?: string
      textColor?: string
      activeTextColor?: string
      collapse?: boolean
      variant?: 'dark' | 'light'
      theme?: 'default' | 'chenghua' | 'shijingshan'
      header?: SMenuHeaderConfig
      /** @deprecated 请使用 header */
      headerConfig?: SMenuHeaderConfig
      actionConfig?: SMenuActionConfig
      footerConfig?: SMenuFooterConfig
    }
    $slots: {
      header?: () => any
      footer?: () => any
    }
    $emit: (event: 'update:modelValue' | 'select' | 'actionClick', ...args: any[]) => void
  }
}

declare const SMenu: SMenuComponent
export default SMenu
