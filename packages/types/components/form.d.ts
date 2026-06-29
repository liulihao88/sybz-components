import { ElForm } from 'element-plus'
import type { SFormProps } from '../component-props'

type ElFormInstance = InstanceType<typeof ElForm>

export type SFormPublicProps = SFormProps & Omit<ElFormInstance['$props'], keyof SFormProps>

export type SFormComponent = typeof ElForm & {
  new (): {
    $props: SFormProps & Omit<ElFormInstance['$props'], keyof SFormProps>
    $emit: ElFormInstance['$emit']
    $slots: ElFormInstance['$slots'] & Record<string, (...args: any[]) => any>
  }
}

declare const SForm: SFormComponent
export default SForm
