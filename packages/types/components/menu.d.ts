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
