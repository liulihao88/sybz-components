import { ElSwitch } from 'element-plus'
import type { SSwitchSelfProps, SybzComponentTheme } from '../component-props'

type ElSwitchInstance = InstanceType<typeof ElSwitch>

export type SSwitchPublicProps = SSwitchSelfProps & Omit<ElSwitchInstance['$props'], keyof SSwitchSelfProps>

export type SSwitchComponent = {
  new (): {
    $props: {
      theme?: SybzComponentTheme
      beforeChange?: (...args: any[]) => any
      width?: string | number
    } & Omit<ElSwitchInstance['$props'], 'theme' | 'beforeChange' | 'width'>
    $emit: ElSwitchInstance['$emit']
    $slots: ElSwitchInstance['$slots']
  }
}

declare const SSwitch: SSwitchComponent
export default SSwitch
