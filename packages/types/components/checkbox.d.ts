import { ElCheckboxGroup } from 'element-plus'
import type { SCheckboxOptionContext, SCheckboxSelfProps, SybzComponentTheme, SybzRecord } from '../component-props'

type ElCheckboxGroupInstance = InstanceType<typeof ElCheckboxGroup>

/**
 * s-checkbox 多选组件，支持左侧 title、全选和 check/button 展示方式。
 *
 * 先提示 sybz 自身属性，再提示 Element Plus CheckboxGroup 的公开属性。
 */
export type SCheckboxPublicProps = SCheckboxSelfProps &
  Omit<ElCheckboxGroupInstance['$props'], keyof SCheckboxSelfProps>

export type SCheckboxComponent = {
  new (): {
    $props: {
      /** 左侧标题；button 模式显示为紧凑文字标签 */
      title?: string
      /** 标题样式 */
      compTitleStyle?: SybzRecord
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
      | 'title'
      | 'compTitleStyle'
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
