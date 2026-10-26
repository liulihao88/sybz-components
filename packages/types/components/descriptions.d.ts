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
import type { SybzDimensionProps, SybzThemeProps, SybzStyleProps } from '../component-props'

type ElDescriptionsInstance = InstanceType<typeof ElDescriptions>

/**
 * s-descriptions 描述列表，支持每项配置 column、showAll 和 tooltipAttrs，单项 showAll/tooltipAttrs 优先于组件级配置。
 *
 * 先提示 sybz 自身属性，再提示 Element Plus Descriptions, supports custom width 的公开属性。
 */
export type SDescriptionsPublicProps = SDescriptionsOwnProps &
  Omit<ElDescriptionsInstance['$props'], keyof SDescriptionsOwnProps>

export type SDescriptionsComponent = {
  install: (app: import('vue').App) => void
  new (): {
    $props: {
      options: SDescriptionsItemOption[]
      /** 尺寸，控制描述项单元格内边距与字体大小 */
      size?: SybzComponentSize
      column?: number
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
      | 'size'
      | 'column'
      | 'width'
      | 'w'
      | 'labelWidth'
      | 'showAll'
      | 'label'
      | 'value'
      | 'customLabel'
      | 'customValue'
      | 'tooltipAttrs'
    > &
      SybzStyleProps &
      SybzDimensionProps<SDescriptionsOwnProps> &
      SybzThemeProps<SDescriptionsOwnProps>
    $emit: ElDescriptionsInstance['$emit']
    $slots: ElDescriptionsInstance['$slots'] & Record<string, (...args: any[]) => any>
  }
}

declare const SDescriptions: SDescriptionsComponent
export default SDescriptions
