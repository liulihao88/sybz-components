import { ElCheckboxGroup } from 'element-plus'
import type { SCheckboxOptionContext, SCheckboxSelfProps, SybzComponentTheme, SybzRecord } from '../component-props'

type ElCheckboxGroupInstance = InstanceType<typeof ElCheckboxGroup>

export type SCheckboxPublicProps = SCheckboxSelfProps &
  Omit<ElCheckboxGroupInstance['$props'], keyof SCheckboxSelfProps>

export type SCheckboxComponent = {
  new (): {
    $props: {
      type?: '' | 'simple'
      options?: any[]
      showType?: 'check' | 'button'
      modelValue?: any[]
      label?: string
      value?: string
      showAll?: boolean
      attrs?: SybzRecord
      customDisabled?: (context: SCheckboxOptionContext<SybzRecord>) => boolean
      customLabel?: (context: SCheckboxOptionContext<SybzRecord>) => any
      gap?: string | number
      theme?: SybzComponentTheme
    } & Omit<
      ElCheckboxGroupInstance['$props'],
      | 'type'
      | 'options'
      | 'showType'
      | 'modelValue'
      | 'label'
      | 'value'
      | 'showAll'
      | 'attrs'
      | 'customDisabled'
      | 'customLabel'
      | 'gap'
      | 'theme'
    >
    $emit: ElCheckboxGroupInstance['$emit']
    $slots: ElCheckboxGroupInstance['$slots'] & Record<string, (...args: any[]) => any>
  }
}

declare const SCheckbox: SCheckboxComponent
export default SCheckbox
