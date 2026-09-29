import { ElDescriptions } from 'element-plus'
import type { VNodeChild } from 'vue'
import type {
  SDescriptionsItemOption,
  SDescriptionsOwnProps,
  SDescriptionsFilterContext,
  SDescriptionsRenderContext,
  SybzComponentTheme,
  SybzRecord,
} from '../component-props'

type ElDescriptionsInstance = InstanceType<typeof ElDescriptions>

/**
 * s-descriptions 描述列表，支持每项配置 column、showAll 和 tooltipAttrs，单项 showAll/tooltipAttrs 优先于组件级配置。
 *
 * 先提示 sybz 自身属性，再提示 Element Plus Descriptions, supports custom width 的公开属性。
 */
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
      /** 所有标签和值的 s-tooltip 默认属性，可由单项 tooltipAttrs 覆盖 */
      tooltipAttrs?: SybzRecord
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
      | 'tooltipAttrs'
    >
    $emit: ElDescriptionsInstance['$emit']
    $slots: ElDescriptionsInstance['$slots'] & Record<string, (...args: any[]) => any>
  }
}

declare const SDescriptions: SDescriptionsComponent
export default SDescriptions
