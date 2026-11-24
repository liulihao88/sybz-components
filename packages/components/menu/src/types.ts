import type { SybzComponentSize, SybzComponentTheme } from '../../../types/component-props'
import type { Component, CSSProperties } from 'vue'
import type { MenuProps } from 'element-plus'

export type SMenuIcon = string | Component

export interface SMenuSizeConfig {
  /** 菜单项字号，深色/浅色统一，默认 16px */
  fontSize?: string | number
  /** 菜单项高度，深色/浅色统一，默认 56px */
  height?: string | number
  /** 菜单项宽度，默认 100% */
  width?: string | number
  /** 菜单项行高，默认与 height 一致 */
  lineHeight?: string | number
  /** 菜单项左右内边距，默认 20px；可传数字、12px 或 0 12px */
  padding?: string | number
  /** 子级菜单每层缩进，默认与 padding 一致 */
  levelPadding?: string | number
  /** 菜单项上下外边距，深色/浅色统一，默认 4px */
  margin?: string | number
  /** 菜单项图标尺寸，默认 16px */
  iconSize?: string | number
  /** 菜单列表四周内边距，默认 16px；收起时固定 4px，autoHeight 时按可用高度计算 */
  listPadding?: string | number
}

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
  width?: string | number | boolean
  w?: string | number | boolean
  height?: string | number | boolean
  h?: string | number | boolean
  /** 菜单尺寸：预设 small / default / large；也可传对象精细控制字号、宽高、行高、内边距和图标 */
  size?: SybzComponentSize | SMenuSizeConfig
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
  footer?: SMenuFooterConfig
}

export type SMenuProps = SMenuSelfProps & Partial<Omit<MenuProps, keyof SMenuSelfProps>>
