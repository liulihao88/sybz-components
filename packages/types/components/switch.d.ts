import { ElSwitch } from 'element-plus'
import type { SSwitchSelfProps, SybzComponentTheme, SybzRecord } from '../component-props'
import type { SybzDimensionProps, SybzThemeProps, SybzStyleProps } from '../component-props'

type ElSwitchInstance = InstanceType<typeof ElSwitch>

/**
 * {@link https://liulihao88.github.io/sybz-components/components/switch/home.html | 查看文档}
 *
 * s-switch 开关组件，title 使用 s-comp-title 的 label 样式显示左侧标题，required 显示必填星号。
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
      /** 开关左侧标题，默认无标题 */
      title?: string
      /** 左侧标题前显示必填星号；默认 false */
      required?: boolean
      /** 标题文字的自定义样式 */
      compTitleStyle?: SybzRecord
      beforeChange?: (...args: any[]) => any
    } & Omit<
      ElSwitchInstance['$props'],
      'title' | 'required' | 'compTitleStyle' | 'theme' | 'beforeChange' | 'width' | 'w'
    > &
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
