import { ElForm } from 'element-plus'
import type {
  SFormContext,
  SFormFieldItem,
  SFormFieldList,
  SFormProps,
  SFormTitleItem,
  SybzRecord,
} from '../component-props'

type ElFormInstance = InstanceType<typeof ElForm>

export type SFormPublicProps = SFormProps & Omit<ElFormInstance['$props'], keyof SFormProps>

export type SFormComponent = {
  new (): {
    $props: {
      fieldList: SFormFieldList
      model: SybzRecord
      footer?: boolean
      showFooter?: boolean
      column?: 1 | 2 | 3 | 4 | 5 | 6
      /** 多列表单项左右间距，仅 column > 1 时生效，默认 16px */
      gap?: string | number
      align?: 'center' | 'top' | 'flex-end'
      autoSetDefaultValue?: boolean
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
    $slots: ElFormInstance['$slots'] & Record<string, (scope: SFormContext) => any>
    validate: (isResetFieldsOrParams?: boolean | SybzRecord, otherParams?: SybzRecord) => Promise<SybzRecord>
    validateField: ElFormInstance['validateField']
    resetFields: ElFormInstance['resetFields']
    clearValidate: ElFormInstance['clearValidate']
    scrollToField: ElFormInstance['scrollToField']
    submit: () => Promise<SybzRecord>
    getModel: () => SybzRecord
    getValue: (prop: string) => any
    setValue: (prop: string, value: any) => void
    getFields: () => Array<SFormFieldItem | SFormTitleItem>
    getField: (prop: string) => SFormFieldItem | SFormTitleItem | undefined
    getVisibleFields: () => Array<SFormFieldItem | SFormTitleItem>
    formRef: ElFormInstance
    sFormRef: ElFormInstance
  }
}

declare const SForm: SFormComponent
export default SForm
