import { ElPopover } from 'element-plus'
import type { SPopconfirmProps } from '../component-props'

type ElPopoverInstance = InstanceType<typeof ElPopover>

export type SPopconfirmPublicProps = SPopconfirmProps &
  Omit<ElPopoverInstance['$props'], keyof SPopconfirmProps>

export type SPopconfirmComponent = typeof ElPopover & {
  new (): {
    $props: SPopconfirmProps & Omit<ElPopoverInstance['$props'], keyof SPopconfirmProps>
    $emit: ElPopoverInstance['$emit']
    $slots: ElPopoverInstance['$slots']
  }
}

declare const SPopconfirm: SPopconfirmComponent
export default SPopconfirm
