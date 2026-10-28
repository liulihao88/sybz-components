import type { Component } from 'vue'
import type {
  SFlexAlign,
  SFlexAlignContent,
  SFlexDirection,
  SFlexGap,
  SFlexGapValue,
  SFlexJustify,
  SFlexProps,
  SFlexWrap,
} from '../component-props'
import type { SybzDimensionProps, SybzStyleProps } from '../component-props'

/**
 * {@link https://liulihao88.github.io/sybz-components/components/flex/home.html | 查看文档}
 *
 * s-flex 弹性布局组件，支持方向、换行、多行对齐、gap 单值或 [水平, 垂直] 数组、inline-flex 及容器伸缩和尺寸。
 *
 * 先提示 sybz 自身属性。
 */
export type SFlexComponent = {
  install: (app: import('vue').App) => void
  new <SFlex文档 = 'https://liulihao88.github.io/sybz-components/components/flex/home.html'>(): {
    $props: {
      direction?: SFlexDirection
      /** 是否换行；true 等价于 wrap，false 等价于 nowrap */
      wrap?: boolean | SFlexWrap
      justify?: SFlexJustify
      align?: SFlexAlign
      alignContent?: SFlexAlignContent
      inline?: boolean
      flex?: string
      /** 子元素间距；单值同时控制 x/y，数组 [x, y] 分别控制水平/垂直间距；裸写或 true 等价于 small */
      gap?: SFlexGap
      component?: string | Component
    } & SybzStyleProps &
      SybzDimensionProps<SFlexProps>
    $slots: {
      default?: () => any
    }
  }
}

/**
 * {@link https://liulihao88.github.io/sybz-components/components/flex/home.html | 查看文档}
 */
declare const SFlex: SFlexComponent
export default SFlex
