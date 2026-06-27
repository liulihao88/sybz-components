import { ElInput } from 'element-plus'
import type { SInputProps } from '../component-props'

type ElInputInstance = InstanceType<typeof ElInput>

export type SInputPublicProps = SInputProps & Omit<ElInputInstance['$props'], keyof SInputProps>

export type SInputComponent = typeof ElInput & {
  new (): {
    $props: SInputProps & Omit<ElInputInstance['$props'], keyof SInputProps>
    $emit: ElInputInstance['$emit']
    $slots: ElInputInstance['$slots']
  }
}

declare const SInput: SInputComponent
export default SInput
