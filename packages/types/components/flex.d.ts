import type { Component } from 'vue'
import type {
  SFlexAlign,
  SFlexDirection,
  SFlexJustify,
  SFlexProps,
  SFlexWrap,
  SybzComponentSize,
} from '../component-props'
import type { SybzStyleProps } from '../component-props'

/**
 * s-flex 弹性布局组件，支持方向、对齐、间距、伸缩规则以及容器 width 和 height。
 *
 * 先提示 sybz 自身属性。
 */
export type SFlexComponent = {
  install: (app: import('vue').App) => void
  new (): {
    $props: {
      direction?: SFlexDirection
      /** 是否换行；true 等价于 wrap，false 等价于 nowrap */
      wrap?: boolean | SFlexWrap
      justify?: SFlexJustify
      align?: SFlexAlign
      flex?: string
      /** 子元素间距；裸写 gap 或传 true 等价于 small，传 false 等价于不设间距 */
      gap?: boolean | SybzComponentSize | string | number
      width?: string | number
      w?: string | number
      height?: string | number
      h?: string | number
      component?: string | Component
    } & SybzStyleProps
    $slots: {
      default?: () => any
    }
  }
}

declare const SFlex: SFlexComponent
export default SFlex
