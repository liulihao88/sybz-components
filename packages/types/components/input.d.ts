import { ElInput } from 'element-plus'
import type {
  SInputEmits,
  SInputSelfProps,
  SybzComponentSize,
  SybzComponentTheme,
  SybzRecord,
} from '../component-props'
import type { SybzDimensionProps, SybzThemeProps, SybzStyleProps } from '../component-props'

type ElInputInstance = InstanceType<typeof ElInput>

/**
 * {@link https://liulihao88.github.io/sybz-components/components/input/home.html | 查看文档}
 *
 * s-input 输入框组件，支持上边框嵌入标题、一键清空、溢出提示、自动补全和快捷搜索按钮；开启 search 后清空默认触发空值搜索，@clear 可覆盖。
 *
 * 先提示 sybz 自身属性，再提示 Element Plus Input 的公开属性。
 */
export type SInputPublicProps = SInputSelfProps & Omit<ElInputInstance['$props'], keyof SInputSelfProps>

/**
 * {@link https://liulihao88.github.io/sybz-components/components/input/home.html | 查看文档}
 */
export type SInputComponent = {
  install: (app: import('vue').App) => void
  new <SInput文档 = 'https://liulihao88.github.io/sybz-components/components/input/home.html'>(): {
    $props: {
      /** 是否按 HTML 字符串渲染，推荐使用 Element Plus 同名写法 */
      dangerouslyUseHTMLString?: boolean
      modelValue: any
      compTitleStyle?: SybzRecord
      /** 嵌在输入框上边框的标题，与左侧前缀 title 区分；默认空字符串 */
      topTitle?: string
      maxlength?: string | number
      hideMaxLengthError?: boolean
      maxLengthErrorText?: string
      size?: SybzComponentSize
      showWordLimit?: boolean | string
      block?: boolean
      disPlaceholder?: string
      subAttrs?: SybzRecord
      tooltipAttrs?: SybzRecord
      iconAttrs?: SybzRecord
      hideTooltip?: boolean
      options?: any[]
      content?: string
      /** 是否在清空图标右侧显示搜索按钮；点击或按 Enter 时触发 search 事件，默认 false */
      search?: boolean
    } & Omit<
      ElInputInstance['$props'],
      | 'dangerouslyUseHTMLString'
      | 'modelValue'
      | 'compTitleStyle'
      | 'topTitle'
      | 'width'
      | 'w'
      | 'height'
      | 'h'
      | 'maxlength'
      | 'hideMaxLengthError'
      | 'maxLengthErrorText'
      | 'size'
      | 'theme'
      | 'showWordLimit'
      | 'block'
      | 'disPlaceholder'
      | 'subAttrs'
      | 'tooltipAttrs'
      | 'iconAttrs'
      | 'hideTooltip'
      | 'options'
      | 'content'
      | 'search'
    > &
      SybzStyleProps &
      SybzDimensionProps<SInputSelfProps> &
      SybzThemeProps<SInputSelfProps>
    $emit: ElInputInstance['$emit'] &
      (<Event extends keyof SInputEmits>(event: Event, ...args: SInputEmits[Event]) => void)
    $slots: ElInputInstance['$slots'] & {
      default?: () => any
      prepend?: () => any
      prefix?: () => any
      suffix?: () => any
      append?: () => any
    }
  }
}

/**
 * {@link https://liulihao88.github.io/sybz-components/components/input/home.html | 查看文档}
 */
declare const SInput: SInputComponent
export default SInput
