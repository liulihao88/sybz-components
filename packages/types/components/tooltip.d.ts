import { ElTooltip } from 'element-plus'
import type { STooltipProps } from '../component-props'

type ElTooltipInstance = InstanceType<typeof ElTooltip>

export type STooltipPublicProps = STooltipProps &
  Omit<ElTooltipInstance['$props'], keyof STooltipProps>

export type STooltipComponent = typeof ElTooltip & {
  new (): {
    $props: STooltipProps & Omit<ElTooltipInstance['$props'], keyof STooltipProps>
    $emit: ElTooltipInstance['$emit']
    $slots: ElTooltipInstance['$slots']
  }
}

declare const STooltip: STooltipComponent
export default STooltip
