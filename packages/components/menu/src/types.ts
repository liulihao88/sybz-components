import type { SybzComponentTheme } from '../../../types/component-props'
import type { Component } from 'vue'
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
}

export interface SMenuActionConfig {
  text: string
  icon?: SMenuIcon
}

export interface SMenuFooterConfig {
  title: string
  subtitle?: string
  avatar?: string
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

export type SMenuProps = SMenuSelfProps & Partial<Omit<MenuProps, keyof SMenuSelfProps>>
