import type { Component } from 'vue'
import type { SybzComponentTheme } from '@/types/component-props'
import type { SybzTextColor } from '@/hooks/useStyleProps'

export type STextType = 'primary' | 'success' | 'warning' | 'danger' | 'error' | 'info' | 'default'
/** s-text 自有属性；原生 HTML 属性会透传到根元素。 */
export interface STextProps {
  /** 主题；默认 default，支持全局主题配置 */
  theme?: SybzComponentTheme
  /** 品牌或状态色；默认 default。color / c 优先于 type */
  type?: STextType
  /** 常用文字色或 CSS 颜色；main / default / secondary 对应 85 / 65 / 45；不传时使用 default */
  color?: SybzTextColor
  /** CSS 渐变值，如 linear-gradient(...) 或 var(--gradient)；默认不设置，优先于 type / color / c */
  gradient?: string
  /** 根元素标签或 Vue 组件；默认 span */
  component?: string | Component
  /** 最大显示行数，0 表示不限制；默认 0 */
  lineClamp?: number
  /** 斜体；默认 false */
  italic?: boolean
  /** 标记高亮；默认 false */
  mark?: boolean
  /** 禁止选择文字；默认 false */
  unselectable?: boolean
}
