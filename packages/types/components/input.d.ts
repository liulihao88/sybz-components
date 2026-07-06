import { ElInput } from 'element-plus'
import type { SInputSelfProps, SybzComponentSize, SybzComponentTheme, SybzRecord } from '../component-props'

type ElInputInstance = InstanceType<typeof ElInput>

export type SInputPublicProps = SInputSelfProps & Omit<ElInputInstance['$props'], keyof SInputSelfProps>

export type SInputComponent = {
  new (): {
    $props: {
      /** 是否按 HTML 字符串渲染，推荐使用 Element Plus 同名写法 */
      dangerouslyUseHTMLString?: boolean
      /** 是否按 HTML 字符串渲染，兼容旧写法 */
      dangerouslyUseHtmlString?: boolean
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
    } & Omit<
      ElInputInstance['$props'],
      | 'dangerouslyUseHTMLString'
      | 'dangerouslyUseHtmlString'
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
    >
    $emit: ElInputInstance['$emit']
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
