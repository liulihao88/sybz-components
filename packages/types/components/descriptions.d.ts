import { ElDescriptions } from 'element-plus'
import type { SDescriptionsProps } from '../component-props'

type ElDescriptionsInstance = InstanceType<typeof ElDescriptions>

export type SDescriptionsPublicProps = SDescriptionsProps &
  Omit<ElDescriptionsInstance['$props'], keyof SDescriptionsProps>

export type SDescriptionsComponent = typeof ElDescriptions & {
  new (): {
    $props: SDescriptionsProps & Omit<ElDescriptionsInstance['$props'], keyof SDescriptionsProps>
    $emit: ElDescriptionsInstance['$emit']
    $slots: ElDescriptionsInstance['$slots']
  }
}

declare const SDescriptions: SDescriptionsComponent
export default SDescriptions
