import { ElInputNumber } from 'element-plus'
import type { SInputNumberProps } from '../component-props'

type ElInputNumberInstance = InstanceType<typeof ElInputNumber>

export type SInputNumberPublicProps = SInputNumberProps & Omit<ElInputNumberInstance['$props'], keyof SInputNumberProps>

export type SInputNumberComponent = typeof ElInputNumber & {
  new (): {
    $props: SInputNumberProps & Omit<ElInputNumberInstance['$props'], keyof SInputNumberProps>
    $emit: ElInputNumberInstance['$emit']
    $slots: ElInputNumberInstance['$slots'] & Record<string, (...args: any[]) => any>
  }
}

declare const SInputNumber: SInputNumberComponent
export default SInputNumber
