import { ElRadioGroup } from 'element-plus'
import type {
  SRadioItem,
  SRadioOption,
  SRadioOptionContext,
  SRadioSelfProps,
  SFlexGapValue,
  SybzComponentTheme,
  SybzRecord,
} from '../component-props'
import type { SybzThemeProps, SybzStyleProps } from '../component-props'

type ElRadioGroupInstance = InstanceType<typeof ElRadioGroup>

/**
 * {@link https://liulihao88.github.io/sybz-components/components/radio/home.html | 查看文档}
 *
 * s-radio 单选组件，普通 radio 的 gap 默认 16px，支持单值或 [水平, 垂直] 数组；button 忽略 gap、保持连续单行，超出时横向滚动。
 *
 * 先提示 sybz 自身属性，再提示 Element Plus RadioGroup 的公开属性。
 */
export type SRadioPublicProps = SRadioSelfProps & Omit<ElRadioGroupInstance['$props'], keyof SRadioSelfProps>

/**
 * {@link https://liulihao88.github.io/sybz-components/components/radio/home.html | 查看文档}
 */
export type SRadioComponent = {
  install: (app: import('vue').App) => void
  new <SRadio文档 = 'https://liulihao88.github.io/sybz-components/components/radio/home.html'>(): {
    $props: {
      title?: string
      compTitleStyle?: SybzRecord
      type?: '' | 'boolean' | 'simple'
      variant?: 'radio' | 'button'
      options?: SRadioOption[]
      border?: boolean
      /** 普通 radio 单值设置双向间距、数组按 [水平, 垂直] 设置，默认 16px；button 忽略 gap 并横向滚动 */
      gap?: string | number | [SFlexGapValue, SFlexGapValue]
      value?: string | number | boolean
      label?: string | number | boolean
      customLabel?: (context: SRadioOptionContext<SRadioItem>) => any
      customDisabled?: (context: SRadioOptionContext<SRadioItem>) => boolean
    } & Omit<
      ElRadioGroupInstance['$props'],
      | 'title'
      | 'compTitleStyle'
      | 'theme'
      | 'type'
      | 'variant'
      | 'options'
      | 'border'
      | 'gap'
      | 'value'
      | 'label'
      | 'customLabel'
      | 'customDisabled'
    > &
      SybzStyleProps &
      SybzThemeProps<SRadioSelfProps>
    $emit: ElRadioGroupInstance['$emit']
    $slots: ElRadioGroupInstance['$slots'] & Record<string, (...args: any[]) => any>
  }
}

/**
 * {@link https://liulihao88.github.io/sybz-components/components/radio/home.html | 查看文档}
 */
declare const SRadio: SRadioComponent
export default SRadio
