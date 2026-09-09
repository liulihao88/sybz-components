import type { SWarningProps, SWarningSize, SWarningType, SybzComponentTheme, SybzRecord } from '../component-props'

/**
 * s-warning 警告组件，支持设置 width 和 height；设置 height 后内容会垂直居中。
 *
 * 先提示 sybz 自身属性。
 */
export type SWarningComponent = {
  new (): {
    $props: {
      /** 是否按 HTML 字符串渲染，推荐使用 Element Plus 同名写法 */
      dangerouslyUseHTMLString?: boolean
      content: string
      title?: string
      theme?: SybzComponentTheme
      type?: SWarningType
      width?: string | number
      height?: string | number
      icon?: boolean
      size?: SWarningSize
      dotted?: boolean
      customStyle?: SybzRecord
      iconAttrs?: SybzRecord
      left?: boolean | string | number
    }
    $slots: {
      title?: () => any
      content?: () => any
    }
  }
}

declare const SWarning: SWarningComponent
export default SWarning
