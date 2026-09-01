import type { Component } from 'vue'
import type {
  SFlexAlign,
  SFlexDirection,
  SFlexJustify,
  SFlexProps,
  SFlexWrap,
  SybzComponentSize,
} from '../component-props'

/**
 * s-flex 弹性布局组件，支持方向、对齐、间距、伸缩规则以及容器 width 和 height。
 *
 * 先提示 sybz 自身属性。
 */
export type SFlexComponent = {
  new (): {
    $props: {
      direction?: SFlexDirection
      /** 是否换行；true 等价于 wrap，false 等价于 nowrap */
      wrap?: boolean | SFlexWrap
      justify?: SFlexJustify
      align?: SFlexAlign
      flex?: string
      gap?: SybzComponentSize | string | number
      width?: string | number
      height?: string | number
      component?: string | Component
    }
    $slots: {
      default?: () => any
    }
  }
}

declare const SFlex: SFlexComponent
export default SFlex
