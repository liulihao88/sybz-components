import { ElForm } from 'element-plus'
import type { SFormFieldList, SFormProps, SybzRecord } from '../component-props'

type ElFormInstance = InstanceType<typeof ElForm>

export type SFormPublicProps = SFormProps & Omit<ElFormInstance['$props'], keyof SFormProps>

export type SFormComponent = {
  new (): {
    $props: {
      fieldList: SFormFieldList
      model: SybzRecord
      showFooter?: boolean
      column?: 1 | 2 | 3 | 4 | 5 | 6
      align?: 'center' | 'top' | 'flex-end'
    } & Omit<ElFormInstance['$props'], 'fieldList' | 'model' | 'showFooter' | 'column' | 'align'>
    $emit: ElFormInstance['$emit']
    $slots: ElFormInstance['$slots'] & Record<string, (...args: any[]) => any>
  }
}

declare const SForm: SFormComponent
export default SForm
