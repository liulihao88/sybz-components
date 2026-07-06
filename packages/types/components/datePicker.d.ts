import { ElDatePicker } from 'element-plus'
import type { DatePickerPropsPublic } from 'element-plus/es/components/date-picker/src/props'
import type { SDatePickerSelfProps, SybzComponentTheme, SybzRecord } from '../component-props'

type ElDatePickerInstance = InstanceType<typeof ElDatePicker>

export type SDatePickerPublicProps = SDatePickerSelfProps &
  Omit<ElDatePickerInstance['$props'], keyof SDatePickerSelfProps>

export type SDatePickerComponent = {
  new (): {
    $props: {
      title?: string
      width?: string | number
      height?: string | number
      theme?: SybzComponentTheme
      shortcuts?: DatePickerPropsPublic['shortcuts'] | false
      compTitleStyle?: SybzRecord
    } & Omit<ElDatePickerInstance['$props'], 'title' | 'width' | 'height' | 'theme' | 'shortcuts' | 'compTitleStyle'>
    $emit: ElDatePickerInstance['$emit']
    $slots: ElDatePickerInstance['$slots'] & Record<string, (...args: any[]) => any>
  }
}

declare const SDatePicker: SDatePickerComponent
export default SDatePicker
