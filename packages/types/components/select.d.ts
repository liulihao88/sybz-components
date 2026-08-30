import { ElSelect } from 'element-plus'
import type {
  SSelectChangeContext,
  SSelectOptionContext,
  SSelectSelfProps,
  SybzComponentSize,
  SybzComponentTheme,
  SybzRecord,
} from '../component-props'

type ElSelectInstance = InstanceType<typeof ElSelect>

/**
 * s-select 下拉选择组件，支持 options 配置和默认插槽直接传入 el-option，两种模式均支持快速切换；options 模式额外支持全选、反选和完整选项上下文。
 *
 * 先提示 sybz 自身属性，再提示 Element Plus Select 的公开属性。
 */
export type SSelectPublicProps = SSelectSelfProps & Omit<ElSelectInstance['$props'], keyof SSelectSelfProps>

export type SSelectComponent = {
  new (): {
    $props: {
      /** 是否按 HTML 字符串渲染，推荐使用 Element Plus 同名写法 */
      dangerouslyUseHTMLString?: boolean
      modelValue?: any[] | string | number
      value?: string
      label?: string | string[]
      options?: any[]
      type?: '' | 'simple'
      multiple?: boolean
      showAll?: boolean
      showPrefix?: boolean
      showQuick?: boolean
      size?: SybzComponentSize
      theme?: SybzComponentTheme
      title?: string
      compTitleStyle?: SybzRecord
      connect?: string
      customLabel?: (context: SSelectOptionContext<SybzRecord>) => any
      width?: string | number
      height?: string | number
      disPlaceholder?: string
      customDisabled?: (context: SSelectOptionContext<SybzRecord>) => boolean
      url?: string | ((...args: any[]) => any)
      urlParams?: SybzRecord
      optionsExpression?: string
      emptyColor?: boolean
      showTooltip?: boolean
      tooltipAttrs?: SybzRecord
    } & Omit<
      ElSelectInstance['$props'],
      | 'dangerouslyUseHTMLString'
      | 'modelValue'
      | 'value'
      | 'label'
      | 'options'
      | 'type'
      | 'multiple'
      | 'showAll'
      | 'showPrefix'
      | 'showQuick'
      | 'size'
      | 'theme'
      | 'title'
      | 'compTitleStyle'
      | 'connect'
      | 'customLabel'
      | 'width'
      | 'height'
      | 'disPlaceholder'
      | 'customDisabled'
      | 'url'
      | 'urlParams'
      | 'optionsExpression'
      | 'emptyColor'
      | 'showTooltip'
      | 'tooltipAttrs'
    >
    $emit: ElSelectInstance['$emit']
    $slots: ElSelectInstance['$slots'] & Record<string, (...args: any[]) => any>
  }
}

declare const SSelect: SSelectComponent
export default SSelect
