import type { SybzComponentTheme, SybzComponentSize, SybzRecord } from '../component-props'

/**
 * s-title 标题组件，支持通过 extra 属性或 extra 插槽设置右侧内容。
 *
 * 先提示 sybz 自身属性。
 */
export type STitleComponent = {
  new (): {
    $props: {
      title?: string
      extra?: string
      size?: SybzComponentSize
      subTitle?: string
      subAttrs?: SybzRecord
      inner?: boolean
      margin?: string | number
      gap?: string | number
      t?: string | number
      b?: string | number
      l?: string | number
      tb?: string | number
      height?: string | number
      type?: '' | 'simple' | 'icon' | 'form'
      theme?: SybzComponentTheme
      tag?: 'div' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
      level?: 1 | 2 | 3 | 4 | 5 | 6
    }
    $slots: {
      default?: () => any
      title?: () => any
      icon?: () => any
      append?: () => any
      extra?: () => any
    }
  }
}

declare const STitle: STitleComponent
export default STitle
