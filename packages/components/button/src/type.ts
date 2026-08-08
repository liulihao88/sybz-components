import type { ButtonPropsPublic } from 'element-plus/es/components/button'

export interface SButtonSelfProps {
  /** 链接地址，设置后按钮会渲染为可直接打开 URL 的链接 */
  href?: string
  /** 链接打开目标 */
  target?: '_blank' | '_parent' | '_self' | '_top'
  /** 点击后进入 loading 状态的毫秒数，0 表示不启用点击节流 loading */
  time?: number
  /** 按钮提示内容，设置后会用 s-tooltip 包裹按钮 */
  content?: string
  /** 透传给 s-tooltip 的属性 */
  tooltipAttrs?: Record<string, any>
  /** 是否允许 tooltip 内容作为 HTML 片段渲染，推荐使用 Element Plus 同名写法 */
  dangerouslyUseHTMLString?: boolean
  /** 组件主题 */
  theme?: 'default' | 'chenghua' | 'shijingshan'
  /** 主题按钮变体 */
  variant?: '' | 'outline' | 'gradient'
  /** 按钮尺寸 */
  size?: 'small' | 'default' | 'large'
  /** 按钮宽度，数字会按工具方法补单位 */
  width?: string | number
  /** 按钮高度，数字会按工具方法补单位 */
  height?: string | number
  /** 是否开启 hover 动效 */
  hoverAnimation?: boolean
  /** 幽灵按钮，使背景透明并反转文字和边框颜色 */
  ghost?: boolean
  /** 按钮图标的位置 */
  iconPlacement?: 'start' | 'end'
}

export type SButtonProps = SButtonSelfProps & Partial<Omit<ButtonPropsPublic, keyof SButtonSelfProps>>

export type SButtonEmits = {
  click: (evt: MouseEvent) => boolean
}
