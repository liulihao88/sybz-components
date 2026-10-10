import type {
  SScrollAxis,
  SScrollEmits,
  SScrollOffset,
  SScrollPosition,
  SScrollProps,
  SScrollType,
} from '../../components/scroll/src/types'

/**
 * s-scroll 自定义滚动区域，支持滚动条策略、方向、位置、初始坐标、边界事件及自动高度；scrollbarSize 为 0 时隐藏滚动条。
 *
 * 先提示 sybz 自身属性。
 */
export type SScrollComponent = {
  new (): {
    $props: {
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
    $slots: {
      default?: () => any
    }
    viewport: HTMLElement | undefined
    scrollTo: (options: ScrollToOptions) => void
    $emit: SScrollEmits
  }
}

declare const SScroll: SScrollComponent
export default SScroll
