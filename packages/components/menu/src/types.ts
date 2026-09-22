import type { SybzComponentTheme } from '../../../types/component-props'
import type { Component, CSSProperties } from 'vue'
import type { MenuProps } from 'element-plus'

export type SMenuIcon = string | Component

export interface SMenuItemDetail {
  tag?: string
  title?: string
  description?: string
}

export interface SMenuHeaderConfig {
  title: string
  subtitle?: string
  icon?: SMenuIcon
  /** 折叠时悬浮显示的内容，默认使用 title */
  collapsedTooltip?: string
  class?: string
  style?: CSSProperties
  handler?: (event: MouseEvent) => void
}

export interface SMenuActionConfig {
  text: string
  icon?: SMenuIcon
}

export interface SMenuFooterConfig {
  title: string
  subtitle?: string
  avatar?: string
  class?: string
  style?: CSSProperties
  handler?: (event: MouseEvent) => void
}

export interface SMenuItem {
  index?: string
  path?: string
  title?: string
  icon?: SMenuIcon
  type?: 'item' | 'group'
  tag?: string
  tagColor?: string
  suffixIcon?: SMenuIcon
  detail?: SMenuItemDetail
  children?: SMenuItem[]
  disabled?: boolean
  route?: Record<string, any>
  [key: string]: any
}

export interface SMenuFieldNames {
  index?: string
  path?: string
  title?: string
  icon?: string
  children?: string
  disabled?: string
  route?: string
}

export interface SMenuSelfProps {
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

export type SMenuProps = SMenuSelfProps & Partial<Omit<MenuProps, keyof SMenuSelfProps>>
