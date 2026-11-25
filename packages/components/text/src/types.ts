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
  /** 文字色：文字层级（main / default / secondary 对应 85 / 65 / 45）、primary / success / warning / danger / info 主题语义色，或 CSS 颜色；不传时使用 default */
  color?: SybzTextColor
  /** CSS 渐变值，如 linear-gradient(...) 或 var(--gradient)；默认不设置，优先于 type / color / c */
  gradient?: string
  /** 根元素标签或 Vue 组件；默认 span，code 开启且未指定时默认 code */
  component?: string | Component
  /** 最大显示行数，0 表示不限制；默认 0 */
  lineClamp?: number
  /** 斜体；默认 false */
  italic?: boolean
  /** 高亮标记；默认 false，开启后使用高亮底色并继承文字颜色 */
  mark?: boolean
  /** 代码片段；默认 false，开启后默认根元素为 code，并使用 code 的等宽字体与语义配色 */
  code?: boolean
  /** 禁止选择文字；默认 false */
  unselectable?: boolean
  /** 禁用点击及链接跳转；默认 false */
  disabled?: boolean
  /** 使用链接文字样式；默认 false，跳转仍由原生 href 和 component 控制 */
  link?: boolean
  /** 将默认插槽中的字符串按白名单解析，支持任意已全局注册的组件（如 s-text、s-tag、s-button、el-button）；默认 true */
  dangerouslyUseHTMLString?: boolean
}
