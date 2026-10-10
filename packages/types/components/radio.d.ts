import { ElRadioGroup } from 'element-plus'
import type {
  SRadioItem,
  SRadioOption,
  SRadioOptionContext,
  SRadioSelfProps,
  SybzComponentTheme,
  SybzRecord,
} from '../component-props'

type ElRadioGroupInstance = InstanceType<typeof ElRadioGroup>

/**
 * s-radio 单选组件，支持 variant="radio|button" 展示方式。
 *
 * 先提示 sybz 自身属性，再提示 Element Plus RadioGroup 的公开属性。
 */
export type SRadioPublicProps = SRadioSelfProps & Omit<ElRadioGroupInstance['$props'], keyof SRadioSelfProps>

export type SRadioComponent = {
  new (): {
    $props: {
      title?: string
      compTitleStyle?: SybzRecord
      theme?: SybzComponentTheme
      type?: '' | 'boolean' | 'simple'
      variant?: 'radio' | 'button'
      options?: SRadioOption[]
      border?: boolean
      /** 单选项之间的间距，数字按 px 处理 */
      gap?: string | number
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
    >
    $emit: ElRadioGroupInstance['$emit']
    $slots: ElRadioGroupInstance['$slots'] & Record<string, (...args: any[]) => any>
  }
}

declare const SRadio: SRadioComponent
export default SRadio
