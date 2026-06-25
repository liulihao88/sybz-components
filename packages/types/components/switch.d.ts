import { ElSwitch } from 'element-plus'
import type { SSwitchProps } from '../component-props'

type ElSwitchInstance = InstanceType<typeof ElSwitch>

export type SSwitchPublicProps = SSwitchProps & Omit<ElSwitchInstance['$props'], keyof SSwitchProps>

export type SSwitchComponent = typeof ElSwitch & {
  new (): {
    $props: SSwitchProps & Omit<ElSwitchInstance['$props'], keyof SSwitchProps>
    $emit: ElSwitchInstance['$emit']
    $slots: ElSwitchInstance['$slots']
  }
}

declare const SSwitch: SSwitchComponent
export default SSwitch
