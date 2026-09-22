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
 * s-menu 递归菜单组件，支持路由、图标、分组、默认展开、collapsible 控制是否允许收起、header/footer 头尾配置及 header 内的 append 插槽（支持响应式对象、handler 点击回调、class/style 和折叠悬浮文案），以及由 variant 控制的明暗外观和由 theme 控制的强调色（light 始终为白色背景）。头部和底部 padding 保持 16px，列表展开时为 16px、收起时为 4px；autoHeight 从顶部排列菜单，仅空间不足时压缩菜单项尺寸。
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
      /** 是否自适应菜单项尺寸：展开时四边保持 16px padding，收起时为 4px，仅空间不足时压缩菜单项 */
      autoHeight?: boolean
      /** 深色模式背景色；浅色模式始终为白色 */
      backgroundColor?: string
      /** 深色模式文字颜色 */
      textColor?: string
      /** 深色模式激活文字颜色 */
      activeTextColor?: string
      /** 是否收起菜单；收起时仅菜单列表 padding 为 4px，头部和底部保持 16px */
      collapse?: boolean
      /** 是否允许收起；设为 false 时保持展开并隐藏收缩按钮 */
      collapsible?: boolean
      /** 明暗外观：light 为白色背景，dark 为深色背景 */
      variant?: 'dark' | 'light'
      /** 主题强调色，不改变明暗外观 */
      theme?: SybzComponentTheme
      header?: SMenuHeaderConfig
      /** @deprecated 请使用 header */
      headerConfig?: SMenuHeaderConfig
      actionConfig?: SMenuActionConfig
      footer?: SMenuFooterConfig
    }
    $slots: {
      header?: () => any
      append?: () => any
      footer?: () => any
    }
    $emit: (event: 'update:modelValue' | 'update:collapse' | 'select' | 'actionClick', ...args: any[]) => void
  }
}

declare const SMenu: SMenuComponent
export default SMenu
