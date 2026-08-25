import { ElDatePicker } from 'element-plus'
import type { DatePickerPropsPublic } from 'element-plus/es/components/date-picker/src/props'
import type { SDatePickerSelfProps, SybzComponentTheme, SybzRecord } from '../component-props'

type ElDatePickerInstance = InstanceType<typeof ElDatePicker>

/**
 * s-date-picker 日期选择组件，支持标题、宽高、主题、内置快捷项，以及通过 futureOnly 限制只能选择当前日期或周期之后的值。
 *
 * 先提示 sybz 自身属性，再提示 Element Plus DatePicker 的公开属性。
 */
export type SDatePickerPublicProps = SDatePickerSelfProps &
  Omit<ElDatePickerInstance['$props'], keyof SDatePickerSelfProps>

export type SDatePickerComponent = {
  new (): {
    $props: {
      title?: string
      width?: string | number
      height?: string | number
      /** 是否仅允许选择当前日期或当前周期之后的值，并启用未来时间快捷项 */
      futureOnly?: boolean
      theme?: SybzComponentTheme
      shortcuts?: DatePickerPropsPublic['shortcuts'] | false
      compTitleStyle?: SybzRecord
    } & Omit<
      ElDatePickerInstance['$props'],
      'title' | 'width' | 'height' | 'futureOnly' | 'theme' | 'shortcuts' | 'compTitleStyle'
    >
    $emit: ElDatePickerInstance['$emit']
    $slots: ElDatePickerInstance['$slots'] & Record<string, (...args: any[]) => any>
  }
}

declare const SDatePicker: SDatePickerComponent
export default SDatePicker
