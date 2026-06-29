import { ElCheckboxGroup } from 'element-plus'
import type { SCheckboxProps } from '../component-props'

type ElCheckboxGroupInstance = InstanceType<typeof ElCheckboxGroup>

export type SCheckboxPublicProps = SCheckboxProps & Omit<ElCheckboxGroupInstance['$props'], keyof SCheckboxProps>

export type SCheckboxComponent = {
  new (): {
    $props: SCheckboxPublicProps
    $emit: ElCheckboxGroupInstance['$emit']
    $slots: ElCheckboxGroupInstance['$slots'] & Record<string, (...args: any[]) => any>
  }
}

declare const SCheckbox: SCheckboxComponent
export default SCheckbox
