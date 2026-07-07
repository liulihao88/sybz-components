import { ElSelect } from 'element-plus'
import type { SSelectSelfProps, SybzComponentSize, SybzComponentTheme, SybzRecord } from '../component-props'

type ElSelectInstance = InstanceType<typeof ElSelect>

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
      customLabel?: string | ((item: any) => any)
      width?: string | number
      height?: string | number
      disPlaceholder?: string
      itemDisabled?: (...args: any[]) => any
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
      | 'itemDisabled'
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
