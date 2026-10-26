import type { SWrapperProps } from '../component-props'
import type { SybzDimensionProps, SybzStyleProps } from '../component-props'

/**
 * s-wrapper 布局容器，column 设置每行列数；width 和 height 支持数字、px、百分比等，默认不设置宽高；百分比高度需要父容器具有明确高度。
 *
 * 先提示 sybz 自身属性。
 */
export type SWrapperComponent = {
  install: (app: import('vue').App) => void
  new (): {
    $props: {
      gap?: string | number
      column?: number | null
      minWidth?: string | number
    } & SybzStyleProps &
      SybzDimensionProps<SWrapperProps>
    $slots: {
      default?: () => any
    }
  }
}

declare const SWrapper: SWrapperComponent
export default SWrapper
