import { ElDescriptions } from 'element-plus'
import type {
  SDescriptionsItemOption,
  SDescriptionsOwnProps,
  SDescriptionsRow,
  SybzComponentTheme,
  SybzRecord,
} from '../component-props'

type ElDescriptionsInstance = InstanceType<typeof ElDescriptions>

export type SDescriptionsPublicProps = SDescriptionsOwnProps &
  Omit<ElDescriptionsInstance['$props'], keyof SDescriptionsOwnProps>

export type SDescriptionsComponent = {
  new (): {
    $props: {
      options: SDescriptionsItemOption[]
      theme?: SybzComponentTheme
      column?: number
      labelWidth?: string | number
      showAll?: boolean
      label?: string
      value?: string
      row?: SDescriptionsRow
    } & Omit<
      ElDescriptionsInstance['$props'],
      'options' | 'theme' | 'column' | 'labelWidth' | 'showAll' | 'label' | 'value' | 'row'
    >
    $emit: ElDescriptionsInstance['$emit']
    $slots: ElDescriptionsInstance['$slots'] & Record<string, (...args: any[]) => any>
  }
}

declare const SDescriptions: SDescriptionsComponent
export default SDescriptions
