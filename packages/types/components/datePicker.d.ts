import { ElDatePicker } from 'element-plus'
import type { DatePickerPropsPublic } from 'element-plus/es/components/date-picker/src/props'
import type { SDatePickerSelfProps, SybzComponentTheme, SybzRecord } from '../component-props'
import type { SybzDimensionProps, SybzThemeProps, SybzStyleProps } from '../component-props'

type ElDatePickerInstance = InstanceType<typeof ElDatePicker>

/**
 * {@link https://liulihao88.github.io/sybz-components/components/datePicker/home.html | 查看文档}
 *
 * s-date-picker 日期选择组件，支持标题、宽高、主题、内置快捷项，以及通过 futureOnly 限制只能选择当前日期或周期之后的值。
 *
 * 先提示 sybz 自身属性，再提示 Element Plus DatePicker 的公开属性。
 */
export type SDatePickerPublicProps = SDatePickerSelfProps &
  Omit<ElDatePickerInstance['$props'], keyof SDatePickerSelfProps>

/**
 * {@link https://liulihao88.github.io/sybz-components/components/datePicker/home.html | 查看文档}
 */
export type SDatePickerComponent = {
  install: (app: import('vue').App) => void
  new <SDatePicker文档 = 'https://liulihao88.github.io/sybz-components/components/datePicker/home.html'>(): {
    $props: {
      title?: string
      /** 是否仅允许选择当前日期或当前周期之后的值，并启用未来时间快捷项 */
      futureOnly?: boolean
      shortcuts?: DatePickerPropsPublic['shortcuts'] | false
      compTitleStyle?: SybzRecord
    } & Omit<
      ElDatePickerInstance['$props'],
      'title' | 'width' | 'w' | 'height' | 'h' | 'futureOnly' | 'theme' | 'shortcuts' | 'compTitleStyle'
    > &
      SybzStyleProps &
      SybzDimensionProps<SDatePickerSelfProps> &
      SybzThemeProps<SDatePickerSelfProps>
    $emit: ElDatePickerInstance['$emit']
    $slots: ElDatePickerInstance['$slots'] & Record<string, (...args: any[]) => any>
  }
}

/**
 * {@link https://liulihao88.github.io/sybz-components/components/datePicker/home.html | 查看文档}
 */
declare const SDatePicker: SDatePickerComponent
export default SDatePicker
