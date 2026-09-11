import type { SWrapperProps } from '../component-props'

/**
 * s-wrapper 布局容器，width 和 height 支持数字、px、百分比等，默认不设置宽高；百分比高度需要父容器具有明确高度。
 *
 * 先提示 sybz 自身属性。
 */
export type SWrapperComponent = {
  new (): {
    $props: {
      /** 容器宽度，支持数字、px、百分比等，默认空字符串 */
      width?: string | number
      /** 容器高度，支持数字、px、百分比等；百分比需要父容器具有明确高度，默认空字符串 */
      height?: string | number
      gap?: string | number
      columns?: number | null
      minWidth?: string | number
    }
    $slots: {
      default?: () => any
    }
  }
}

declare const SWrapper: SWrapperComponent
export default SWrapper
