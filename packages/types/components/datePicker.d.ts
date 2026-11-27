import { ElDatePicker } from 'element-plus'
import type { DatePickerPropsPublic } from 'element-plus/es/components/date-picker/src/props'
import type {
  SDatePickerSelfProps,
  SFieldErrorMode,
  SFormRule,
  SybzComponentTheme,
  SybzRecord,
} from '../component-props'
import type { SybzDimensionProps, SybzThemeProps, SybzStyleProps } from '../component-props'

type ElDatePickerInstance = InstanceType<typeof ElDatePicker>

/**
 * {@link https://liulihao88.github.io/sybz-components/components/datePicker/home.html | 查看文档}
 *
 * s-date-picker 日期选择组件，required 仅在左侧显示必填星号、不触发校验；支持标题、宽高、主题、内置快捷项，以及通过 futureOnly 限制只能选择当前日期或周期之后的值。
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
      /**
       * 校验规则，写法同 s-form / el-form-item 的 rules；规则带 required: true 时显示红色星号。
       * trigger 默认 ['blur', 'change']，传 [] 表示只在手动 validate() 时校验。
       */
      rules?: SFormRule | SFormRule[]
      /** 错误显示方式，默认 inline；toast 使用顶部 $toast，且只在手动 validate() 时提示 */
      errorMode?: SFieldErrorMode
      title?: string
      /** 仅在左侧显示必填星号；默认 false，不触发校验 */
      required?: boolean
      /** 嵌在日期选择框上边框的标题，与左侧标题 title 区分；默认空字符串 */
      topTitle?: string
      /** 是否仅允许选择当前日期或当前周期之后的值，并启用未来时间快捷项 */
      futureOnly?: boolean
      shortcuts?: DatePickerPropsPublic['shortcuts'] | false
      compTitleStyle?: SybzRecord
    } & Omit<
      ElDatePickerInstance['$props'],
      | 'rules'
      | 'errorMode'
      | 'title'
      | 'required'
      | 'topTitle'
      | 'width'
      | 'w'
      | 'height'
      | 'h'
      | 'futureOnly'
      | 'theme'
      | 'shortcuts'
      | 'compTitleStyle'
    > &
      SybzStyleProps &
      SybzDimensionProps<SDatePickerSelfProps> &
      SybzThemeProps<SDatePickerSelfProps>
    $emit: ElDatePickerInstance['$emit']
    $slots: ElDatePickerInstance['$slots'] & Record<string, (...args: any[]) => any>
    validate: (options?: { showMessage?: boolean }) => Promise<boolean>
    clearValidate: () => void
  }
}

/**
 * {@link https://liulihao88.github.io/sybz-components/components/datePicker/home.html | 查看文档}
 */
declare const SDatePicker: SDatePickerComponent
export default SDatePicker
