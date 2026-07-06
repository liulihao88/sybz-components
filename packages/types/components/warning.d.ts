import type { SWarningProps, SWarningSize, SWarningType, SybzComponentTheme, SybzRecord } from '../component-props'

export type SWarningComponent = {
  new (): {
    $props: {
      /** 是否按 HTML 字符串渲染，推荐使用 Element Plus 同名写法 */
      dangerouslyUseHTMLString?: boolean
      /** 是否按 HTML 字符串渲染，兼容旧写法 */
      dangerouslyUseHtmlString?: boolean
      content: string
      title?: string
      theme?: SybzComponentTheme
      type?: SWarningType
      width?: string | number
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
