import { ElDatePicker } from 'element-plus'
import type { SDatePickerProps } from '../component-props'

type ElDatePickerInstance = InstanceType<typeof ElDatePicker>

export type SDatePickerPublicProps = SDatePickerProps &
  Omit<ElDatePickerInstance['$props'], keyof SDatePickerProps>

export type SDatePickerComponent = typeof ElDatePicker & {
  new (): {
    $props: SDatePickerProps & Omit<ElDatePickerInstance['$props'], keyof SDatePickerProps>
    $emit: ElDatePickerInstance['$emit']
    $slots: ElDatePickerInstance['$slots']
  }
}

declare const SDatePicker: SDatePickerComponent
export default SDatePicker
