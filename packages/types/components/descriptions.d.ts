import { ElDescriptions } from 'element-plus'
import type { VNodeChild } from 'vue'
import type {
  SDescriptionsItemOption,
  SDescriptionsOwnProps,
  SDescriptionsFilterContext,
  SDescriptionsRenderContext,
  SybzComponentTheme,
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
      width?: string | number
      labelWidth?: string | number
      showAll?: boolean
      label?: string
      value?: string
      customLabel?: (context: SDescriptionsRenderContext) => VNodeChild
      customValue?: (context: SDescriptionsRenderContext) => VNodeChild
    } & Omit<
      ElDescriptionsInstance['$props'],
      | 'options'
      | 'theme'
      | 'column'
      | 'width'
      | 'labelWidth'
      | 'showAll'
      | 'label'
      | 'value'
      | 'customLabel'
      | 'customValue'
    >
    $emit: ElDescriptionsInstance['$emit']
    $slots: ElDescriptionsInstance['$slots'] & Record<string, (...args: any[]) => any>
  }
}

declare const SDescriptions: SDescriptionsComponent
export default SDescriptions
