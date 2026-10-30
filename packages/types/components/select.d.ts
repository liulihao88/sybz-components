import { ElSelect } from 'element-plus'
import type {
  SSelectChangeContext,
  SSelectOptionContext,
  SSelectSelfProps,
  SybzComponentSize,
  SybzComponentTheme,
  SybzRecord,
} from '../component-props'
import type { SybzDimensionProps, SybzThemeProps, SybzStyleProps } from '../component-props'

type ElSelectInstance = InstanceType<typeof ElSelect>

/**
 * {@link https://liulihao88.github.io/sybz-components/components/select/home.html | 查看文档}
 *
 * s-select 下拉选择组件，支持上边框嵌入标题；透传 Element Plus 的 value-on-clear，清空时保留该属性指定的值；空选项时占位文案默认为“暂无数据”，支持 emptyPlaceholder 自定义；height 支持数字、px 和百分比，百分比需要父容器具有可计算的高度；支持 options 配置和默认插槽直接传入 el-option，两种模式均支持快速切换，按钮仅由 showQuick 控制，空选项时仍显示；options 模式额外支持全选、反选和完整选项上下文，点击全选栏中除反选按钮外的任意位置可切换全选状态。
 *
 * 先提示 sybz 自身属性，再提示 Element Plus Select 的公开属性。
 */
export type SSelectPublicProps = SSelectSelfProps & Omit<ElSelectInstance['$props'], keyof SSelectSelfProps>

/**
 * {@link https://liulihao88.github.io/sybz-components/components/select/home.html | 查看文档}
 */
export type SSelectComponent = {
  install: (app: import('vue').App) => void
  new <SSelect文档 = 'https://liulihao88.github.io/sybz-components/components/select/home.html'>(): {
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
      /** 是否显示上下快速切换按钮，默认 true；空选项时仍显示 */
      showQuick?: boolean
      size?: SybzComponentSize
      title?: string
      /** 嵌在选择框上边框的标题，与左侧前缀 title 区分；默认空字符串 */
      topTitle?: string
      compTitleStyle?: SybzRecord
      connect?: string
      customLabel?: (context: SSelectOptionContext<SybzRecord>) => any
      /** 选项为空时的占位文案，默认 暂无数据 */
      emptyPlaceholder?: string
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
      | 'topTitle'
      | 'compTitleStyle'
      | 'connect'
      | 'customLabel'
      | 'width'
      | 'w'
      | 'height'
      | 'h'
      | 'emptyPlaceholder'
      | 'disPlaceholder'
      | 'customDisabled'
      | 'url'
      | 'urlParams'
      | 'optionsExpression'
      | 'emptyColor'
      | 'showTooltip'
      | 'tooltipAttrs'
    > &
      SybzStyleProps &
      SybzDimensionProps<SSelectSelfProps> &
      SybzThemeProps<SSelectSelfProps>
    $emit: ElSelectInstance['$emit']
    $slots: ElSelectInstance['$slots'] & Record<string, (...args: any[]) => any>
  }
}

/**
 * {@link https://liulihao88.github.io/sybz-components/components/select/home.html | 查看文档}
 */
declare const SSelect: SSelectComponent
export default SSelect
