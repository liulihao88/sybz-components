import type { SWarningProps, SWarningSize, SWarningType, SybzComponentTheme, SybzRecord } from '../component-props'
import type { SybzDimensionProps, SybzThemeProps, SybzStyleProps } from '../component-props'

/**
 * {@link https://liulihao88.github.io/sybz-components/components/warning/home.html | 查看文档}
 *
 * s-warning 警告组件，支持设置 width 和 height；设置 height 后内容会垂直居中。
 *
 * 先提示 sybz 自身属性。
 */
export type SWarningComponent = {
  install: (app: import('vue').App) => void
  new <SWarning文档 = 'https://liulihao88.github.io/sybz-components/components/warning/home.html'>(): {
    $props: {
      /** 是否按 HTML 字符串渲染，推荐使用 Element Plus 同名写法 */
      dangerouslyUseHTMLString?: boolean
      content: string
      title?: string
      type?: SWarningType
      icon?: boolean
      size?: SWarningSize
      dotted?: boolean
      customStyle?: SybzRecord
      iconAttrs?: SybzRecord
      left?: boolean | string | number
    } & SybzStyleProps &
      SybzDimensionProps<SWarningProps> &
      SybzThemeProps<SWarningProps>
    $slots: {
      title?: () => any
      content?: () => any
    }
  }
}

/**
 * {@link https://liulihao88.github.io/sybz-components/components/warning/home.html | 查看文档}
 */
declare const SWarning: SWarningComponent
export default SWarning
