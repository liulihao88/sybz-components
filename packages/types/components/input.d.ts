import { ElInput } from 'element-plus'
import type {
  SInputEmits,
  SInputSelfProps,
  SybzComponentSize,
  SybzComponentTheme,
  SybzRecord,
} from '../component-props'

type ElInputInstance = InstanceType<typeof ElInput>

/**
 * s-input 输入框组件，支持一键清空、溢出提示、自动补全和位于清空图标右侧的快捷搜索按钮。
 *
 * 先提示 sybz 自身属性，再提示 Element Plus Input 的公开属性。
 */
export type SInputPublicProps = SInputSelfProps & Omit<ElInputInstance['$props'], keyof SInputSelfProps>

export type SInputComponent = {
  new (): {
    $props: {
      /** 是否按 HTML 字符串渲染，推荐使用 Element Plus 同名写法 */
      dangerouslyUseHTMLString?: boolean
      modelValue: any
      compTitleStyle?: SybzRecord
      width?: string | number
      height?: string | number
      maxlength?: string | number
      hideMaxLengthError?: boolean
      maxLengthErrorText?: string
      size?: SybzComponentSize
      theme?: SybzComponentTheme
      showWordLimit?: boolean | string
      block?: boolean
      disPlaceholder?: string
      subAttrs?: SybzRecord
      tooltipAttrs?: SybzRecord
      iconAttrs?: SybzRecord
      hideTooltip?: boolean
      options?: any[]
      content?: string
      /** 是否在清空图标右侧显示搜索按钮；点击或按 Enter 时触发 search 事件，默认 false */
      search?: boolean
    } & Omit<
      ElInputInstance['$props'],
      | 'dangerouslyUseHTMLString'
      | 'modelValue'
      | 'compTitleStyle'
      | 'width'
      | 'height'
      | 'maxlength'
      | 'hideMaxLengthError'
      | 'maxLengthErrorText'
      | 'size'
      | 'theme'
      | 'showWordLimit'
      | 'block'
      | 'disPlaceholder'
      | 'subAttrs'
      | 'tooltipAttrs'
      | 'iconAttrs'
      | 'hideTooltip'
      | 'options'
      | 'content'
      | 'search'
    >
    $emit: ElInputInstance['$emit'] &
      (<Event extends keyof SInputEmits>(event: Event, ...args: SInputEmits[Event]) => void)
    $slots: ElInputInstance['$slots'] & {
      default?: () => any
      prepend?: () => any
      prefix?: () => any
      suffix?: () => any
      append?: () => any
    }
  }
}

declare const SInput: SInputComponent
export default SInput
