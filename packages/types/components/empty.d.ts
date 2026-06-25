import { ElEmpty } from 'element-plus'
import type { SEmptyProps } from '../component-props'

type ElEmptyInstance = InstanceType<typeof ElEmpty>

export type SEmptyPublicProps = SEmptyProps &
  Omit<ElEmptyInstance['$props'], keyof SEmptyProps>

export type SEmptyComponent = typeof ElEmpty & {
  new (): {
    $props: SEmptyProps & Omit<ElEmptyInstance['$props'], keyof SEmptyProps>
    $emit: ElEmptyInstance['$emit']
    $slots: ElEmptyInstance['$slots']
  }
}

declare const SEmpty: SEmptyComponent
export default SEmpty
