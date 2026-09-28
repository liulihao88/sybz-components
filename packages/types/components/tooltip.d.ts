import { ElTooltip } from 'element-plus'
import type { STooltipSelfProps } from '../component-props'

type ElTooltipInstance = InstanceType<typeof ElTooltip>

/**
 * s-tooltip 文字提示组件，支持文本溢出提示与多行省略；class/style 应用在外层，设置外层样式时按内部内容的可见范围定位，排除外层 margin/padding。
 *
 * 先提示 sybz 自身属性，再提示 Element Plus Tooltip 的公开属性。
 */
export type STooltipPublicProps = STooltipSelfProps & Omit<ElTooltipInstance['$props'], keyof STooltipSelfProps>

export type STooltipComponent = {
  new (): {
    $props: {
      /** 是否按 HTML 字符串渲染，推荐使用 Element Plus 同名写法 */
      dangerouslyUseHTMLString?: boolean
      width?: string
      lineClamp?: string | number
      showSlot?: boolean
      effect?: string
      /** 鼠标移入后延迟显示 tooltip 的时间，单位毫秒，默认值：0 */
      showAfter?: number
    } & Omit<
      ElTooltipInstance['$props'],
      'dangerouslyUseHTMLString' | 'width' | 'lineClamp' | 'showSlot' | 'effect' | 'showAfter'
    >
    $emit: ElTooltipInstance['$emit']
    $slots: ElTooltipInstance['$slots'] & {
      default?: () => any
      trigger?: () => any
      content?: () => any
    }
  }
}

declare const STooltip: STooltipComponent
export default STooltip
