import { ElSwitch } from 'element-plus'
import type { SSwitchSelfProps, SybzComponentTheme } from '../component-props'
import type { SybzDimensionProps, SybzThemeProps, SybzStyleProps } from '../component-props'

type ElSwitchInstance = InstanceType<typeof ElSwitch>

export type SSwitchPublicProps = SSwitchSelfProps & Omit<ElSwitchInstance['$props'], keyof SSwitchSelfProps>

export type SSwitchComponent = {
  install: (app: import('vue').App) => void
  new (): {
    $props: {
      beforeChange?: (...args: any[]) => any
    } & Omit<ElSwitchInstance['$props'], 'theme' | 'beforeChange' | 'width' | 'w'> &
      SybzStyleProps &
      SybzDimensionProps<SSwitchSelfProps> &
      SybzThemeProps<SSwitchSelfProps>
    $emit: ElSwitchInstance['$emit']
    $slots: ElSwitchInstance['$slots']
  }
}

declare const SSwitch: SSwitchComponent
export default SSwitch
