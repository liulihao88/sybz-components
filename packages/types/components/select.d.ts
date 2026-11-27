import { ElSelect } from 'element-plus'
import type {
  SFieldErrorMode,
  SFormRule,
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
 * s-select 下拉选择组件，required 仅在左侧显示必填星号、不触发校验；loading 仅接受 boolean，显示选择框旋转图标和下拉层加载提示，并禁用右侧快速选择按钮，默认 false；支持上边框嵌入标题；全局 select 配置中的 Element Plus 属性自动透传给内部选择器，局部属性优先；空选项时占位文案默认为“暂无数据”，支持 emptyPlaceholder 自定义；height 支持数字、px 和百分比，百分比需要父容器具有可计算的高度；支持 options 配置和默认插槽直接传入 el-option，两种模式均支持快速切换，按钮仅由 showQuick 控制，空选项时仍显示；options 模式额外支持全选、反选和完整选项上下文，点击全选栏中除反选按钮外的任意位置可切换全选状态。
 *
 * 先提示 sybz 自身属性，再提示 Element Plus Select，支持 simple 布尔简写与 multiple 组合，直接使用基础类型选项数组。 的公开属性。
 */
export type SSelectPublicProps = SSelectSelfProps & Omit<ElSelectInstance['$props'], keyof SSelectSelfProps>

/**
 * {@link https://liulihao88.github.io/sybz-components/components/select/home.html | 查看文档}
 */
export type SSelectComponent = {
  install: (app: import('vue').App) => void
  new <SSelect文档 = 'https://liulihao88.github.io/sybz-components/components/select/home.html'>(): {
    $props: {
      /** 是否按 HTML 字符串渲染，默认 true，推荐使用 Element Plus 同名写法 */
      dangerouslyUseHTMLString?: boolean
      /**
       * 校验规则，写法同 s-form / el-form-item 的 rules；规则带 required: true 时显示红色星号。
       * trigger 默认 ['blur', 'change']，传 [] 表示只在手动 validate() 时校验。
       */
      rules?: SFormRule | SFormRule[]
      /** 错误显示方式，默认 inline；toast 使用顶部 $toast，且只在手动 validate() 时提示 */
      errorMode?: SFieldErrorMode
      modelValue?: any[] | string | number
      /** 仅在左侧显示必填星号；默认 false，不触发校验 */
      required?: boolean
      value?: string
      label?: string | string[]
      options?: any[]
      type?: '' | 'simple'
      /** 基础类型选项简写，等价于 type="simple"；可与 multiple 同时使用 */
      simple?: boolean
      multiple?: boolean
      /** 是否显示选择框加载图标及下拉层加载提示，并禁用快速选择；默认 false */
      loading?: boolean
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
      | 'rules'
      | 'errorMode'
      | 'modelValue'
      | 'required'
      | 'value'
      | 'label'
      | 'options'
      | 'type'
      | 'simple'
      | 'multiple'
      | 'loading'
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
    validate: (options?: { showMessage?: boolean }) => Promise<boolean>
    clearValidate: () => void
  }
}

/**
 * {@link https://liulihao88.github.io/sybz-components/components/select/home.html | 查看文档}
 */
declare const SSelect: SSelectComponent
export default SSelect
