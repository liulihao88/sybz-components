import { ElInput } from 'element-plus'
import type { SInputProps, SybzComponentTheme, SybzComponentSize, SybzRecord } from '../component-props'

type ElInputInstance = InstanceType<typeof ElInput>

export type SInputPublicProps = SInputProps & Omit<ElInputInstance['$props'], keyof SInputProps>

export type SInputComponent = typeof ElInput & {
  new (): {
    $props: {
      modelValue: any
      boxStyle?: SybzRecord
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
      dangerouslyUseHtmlString?: boolean
    } & Omit<ElInputInstance['$props'], keyof SInputProps>
    $emit: ElInputInstance['$emit']
    $slots: ElInputInstance['$slots']
  }
}

declare const SInput: SInputComponent
export default SInput
