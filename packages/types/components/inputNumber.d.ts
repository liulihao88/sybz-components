import { ElInputNumber } from 'element-plus'
import type { SInputNumberSelfProps, SybzComponentSize, SybzComponentTheme, SybzRecord } from '../component-props'

type ElInputNumberInstance = InstanceType<typeof ElInputNumber>

export type SInputNumberPublicProps = SInputNumberSelfProps &
  Omit<ElInputNumberInstance['$props'], keyof SInputNumberSelfProps>

export type SInputNumberComponent = {
  new (): {
    $props: {
      title?: string
      compTitleStyle?: SybzRecord
      width?: string | number
      height?: string | number
      theme?: SybzComponentTheme
      size?: SybzComponentSize
      subAttrs?: SybzRecord
    } & Omit<
      ElInputNumberInstance['$props'],
      'title' | 'compTitleStyle' | 'width' | 'height' | 'theme' | 'size' | 'subAttrs'
    >
    $emit: ElInputNumberInstance['$emit']
    $slots: ElInputNumberInstance['$slots'] & Record<string, (...args: any[]) => any>
  }
}

declare const SInputNumber: SInputNumberComponent
export default SInputNumber
