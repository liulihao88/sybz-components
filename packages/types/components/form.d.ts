import { ElForm } from 'element-plus'
import type {
  SFormContext,
  SFormDynamic,
  SFormFieldItem,
  SFormFieldList,
  SFormProps,
  SFormRender,
  SFormTitleItem,
  SybzRecord,
} from '../component-props'

export type {
  SFormContext,
  SFormDynamic,
  SFormFieldItem,
  SFormFieldList,
  SFormRender,
  SFormTitleItem,
} from '../component-props'

type ElFormInstance = InstanceType<typeof ElForm>

export type SFormPublicProps = SFormProps & Omit<ElFormInstance['$props'], keyof SFormProps>

export type SFormComponent = {
  new (): {
    $props: {
      fieldList: SFormFieldList
      model: SybzRecord
      /** showFooter 的别名，设置后优先级更高 */
      footer?: boolean
      showFooter?: boolean
      column?: 1 | 2 | 3 | 4 | 5 | 6
      /** 多列表单项左右间距，仅 column > 1 时生效，默认 16px */
      gap?: string | number
      align?: 'center' | 'top' | 'flex-end'
      /** 是否自动把 defaultValue/default 初始化到 model 中 */
      autoSetDefaultValue?: boolean
      /** 所有 schema 控件的默认透传属性 */
      componentDefaults?: SybzRecord
    } & Omit<
      ElFormInstance['$props'],
      | 'fieldList'
      | 'model'
      | 'footer'
      | 'showFooter'
      | 'column'
      | 'gap'
      | 'align'
      | 'autoSetDefaultValue'
      | 'componentDefaults'
    >
    $emit: ElFormInstance['$emit']
    $slots: ElFormInstance['$slots'] & Record<string, (...args: any[]) => any>
  }
}

declare const SForm: SFormComponent
export default SForm
