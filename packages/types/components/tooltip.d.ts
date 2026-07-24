import { ElTooltip } from 'element-plus'
import type { STooltipSelfProps } from '../component-props'

type ElTooltipInstance = InstanceType<typeof ElTooltip>

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
    } & Omit<ElTooltipInstance['$props'], 'dangerouslyUseHTMLString' | 'width' | 'lineClamp' | 'showSlot' | 'effect'>
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
