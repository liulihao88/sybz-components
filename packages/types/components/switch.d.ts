import { ElSwitch } from 'element-plus'
import type { SSwitchSelfProps, SybzComponentTheme } from '../component-props'
import type { SybzDimensionProps, SybzThemeProps, SybzStyleProps } from '../component-props'

type ElSwitchInstance = InstanceType<typeof ElSwitch>

/**
 * {@link https://liulihao88.github.io/sybz-components/components/switch/home.html | 查看文档}
 *
 * 先提示 sybz 自身属性，再提示 Element Plus Switch 的公开属性。
 */
export type SSwitchPublicProps = SSwitchSelfProps & Omit<ElSwitchInstance['$props'], keyof SSwitchSelfProps>

/**
 * {@link https://liulihao88.github.io/sybz-components/components/switch/home.html | 查看文档}
 */
export type SSwitchComponent = {
  install: (app: import('vue').App) => void
  new <SSwitch文档 = 'https://liulihao88.github.io/sybz-components/components/switch/home.html'>(): {
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

/**
 * {@link https://liulihao88.github.io/sybz-components/components/switch/home.html | 查看文档}
 */
declare const SSwitch: SSwitchComponent
export default SSwitch
