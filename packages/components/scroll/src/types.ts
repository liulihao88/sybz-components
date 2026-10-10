export type SScrollType = 'hover' | 'scroll' | 'auto' | 'always' | 'never'
export type SScrollAxis = 'x' | 'y' | 'xy'
export type SScrollOffset = boolean | 'x' | 'y' | 'present'
export type SScrollPosition = { x: number; y: number }

/** s-scroll 自有属性。视口可通过组件实例的 viewport 获取。 */
export interface SScrollProps {
  /** 容器宽度；默认由父元素决定 */
  width?: string | number
  /** width 的别名 */
  w?: string | number
  /** 容器高度；默认由内容决定 */
  height?: string | number
  /** height 的别名 */
  h?: string | number
  /** 最大高度，配合 autosize 使用 */
  maxHeight?: string | number
  /** 内容撑开高度，达到 maxHeight 后开始滚动；默认 false */
  autosize?: boolean
  /** 滚动条显示策略；默认 hover */
  type?: SScrollType
  /** 可滚动方向；默认 xy */
  scrollbars?: SScrollAxis
  /** 滚动条是否占用内容空间；默认 false */
  offsetScrollbars?: SScrollOffset
  /** 滚动条宽度；0 时隐藏滚动条，默认 8px */
  scrollbarSize?: number
  /** hover / scroll 模式隐藏延时，单位毫秒；默认 1000 */
  scrollHideDelay?: number
  /** 视口的 overscroll-behavior；默认 auto */
  overscrollBehavior?: 'auto' | 'contain' | 'none'
  /** 纵向滚动条所在侧；默认跟随文本方向 */
  verticalScrollbarPosition?: 'left' | 'right'
  /** 初始滚动坐标；默认 { x: 0, y: 0 } */
  startScrollPosition?: Partial<SScrollPosition>
}

export interface SScrollEmits {
  (event: 'scroll-position-change', position: SScrollPosition): void
  (event: 'top-reached'): void
  (event: 'bottom-reached'): void
  (event: 'left-reached'): void
  (event: 'right-reached'): void
  (event: 'overflow-change', overflowing: boolean): void
}
