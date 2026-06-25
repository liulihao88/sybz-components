import { ElRadioGroup } from 'element-plus'
import type { SRadioProps } from '../component-props'

type ElRadioGroupInstance = InstanceType<typeof ElRadioGroup>

export type SRadioPublicProps = SRadioProps &
  Omit<ElRadioGroupInstance['$props'], keyof SRadioProps>

export type SRadioComponent = typeof ElRadioGroup & {
  new (): {
    $props: SRadioProps & Omit<ElRadioGroupInstance['$props'], keyof SRadioProps>
    $emit: ElRadioGroupInstance['$emit']
    $slots: ElRadioGroupInstance['$slots']
  }
}

declare const SRadio: SRadioComponent
export default SRadio
