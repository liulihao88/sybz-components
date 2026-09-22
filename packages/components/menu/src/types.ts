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
  /** 是否自适应菜单项尺寸：容器四边保持 16px padding，仅空间不足时压缩菜单项 */
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

export type SMenuProps = SMenuSelfProps & Partial<Omit<MenuProps, keyof SMenuSelfProps>>
