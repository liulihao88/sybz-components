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
  backgroundColor?: string
  textColor?: string
  activeTextColor?: string
  collapse?: boolean
  variant?: 'dark' | 'light'
  headerConfig?: SMenuHeaderConfig
  actionConfig?: SMenuActionConfig
  footerConfig?: SMenuFooterConfig
}

export type SMenuProps = SMenuSelfProps & Partial<Omit<MenuProps, keyof SMenuSelfProps>>
