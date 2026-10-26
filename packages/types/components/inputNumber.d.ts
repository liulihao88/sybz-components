import { ElInputNumber } from 'element-plus'
import type { SInputNumberSelfProps, SybzComponentSize, SybzComponentTheme, SybzRecord } from '../component-props'
import type { SybzDimensionProps, SybzThemeProps, SybzStyleProps } from '../component-props'

type ElInputNumberInstance = InstanceType<typeof ElInputNumber>

/**
 * {@link https://liulihao88.github.io/sybz-components/components/inputNumber/home.html | 查看文档}
 *
 * s-input-number 数字输入框组件，支持上边框嵌入标题。
 *
 * 先提示 sybz 自身属性，再提示 Element Plus InputNumber 的公开属性。
 */
export type SInputNumberPublicProps = SInputNumberSelfProps &
  Omit<ElInputNumberInstance['$props'], keyof SInputNumberSelfProps>

/**
 * {@link https://liulihao88.github.io/sybz-components/components/inputNumber/home.html | 查看文档}
 */
export type SInputNumberComponent = {
  install: (app: import('vue').App) => void
  new <SInputNumber文档 = 'https://liulihao88.github.io/sybz-components/components/inputNumber/home.html'>(): {
    $props: {
      title?: string
      /** 嵌在输入框上边框的标题，与左侧前缀 title 区分；默认空字符串 */
      topTitle?: string
      compTitleStyle?: SybzRecord
      size?: SybzComponentSize
      subAttrs?: SybzRecord
    } & Omit<
      ElInputNumberInstance['$props'],
      'title' | 'topTitle' | 'compTitleStyle' | 'width' | 'w' | 'height' | 'h' | 'theme' | 'size' | 'subAttrs'
    > &
      SybzStyleProps &
      SybzDimensionProps<SInputNumberSelfProps> &
      SybzThemeProps<SInputNumberSelfProps>
    $emit: ElInputNumberInstance['$emit']
    $slots: ElInputNumberInstance['$slots'] & Record<string, (...args: any[]) => any>
  }
}

/**
 * {@link https://liulihao88.github.io/sybz-components/components/inputNumber/home.html | 查看文档}
 */
declare const SInputNumber: SInputNumberComponent
export default SInputNumber
