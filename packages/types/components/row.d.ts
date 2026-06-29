import { ElRow } from 'element-plus'
import type { SRowProps } from '../component-props'

type ElRowInstance = InstanceType<typeof ElRow>

export type SRowPublicProps = SRowProps & Omit<ElRowInstance['$props'], keyof SRowProps>

export type SRowComponent = typeof ElRow & {
  new (): {
    $props: SRowProps & Omit<ElRowInstance['$props'], keyof SRowProps>
    $emit: ElRowInstance['$emit']
    $slots: ElRowInstance['$slots'] & {
      default?: () => any
    }
  }
}

declare const SRow: SRowComponent
export default SRow
