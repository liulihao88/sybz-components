import { ElRadioGroup } from 'element-plus'
import type { SRadioOption, SRadioSelfProps, SybzComponentTheme, SybzRecord } from '../component-props'

type ElRadioGroupInstance = InstanceType<typeof ElRadioGroup>

export type SRadioPublicProps = SRadioSelfProps & Omit<ElRadioGroupInstance['$props'], keyof SRadioSelfProps>

export type SRadioComponent = {
  new (): {
    $props: {
      title?: string
      compTitleStyle?: SybzRecord
      theme?: SybzComponentTheme
      type?: '' | 'boolean' | 'simple'
      showType?: 'radio' | 'button'
      options?: SRadioOption[]
      border?: boolean
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
      | 'showType'
      | 'options'
      | 'border'
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
