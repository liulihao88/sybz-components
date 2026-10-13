import type { SIconValue, SIconProps, SybzComponentTheme, SybzComponentSize, SybzRecord } from '../component-props'

/**
 * s-title 标题组件，支持通过 fs 使用数字、px 字符串或 small/default/large 设置标题字号和左侧竖线高度，通过 width 设置宽度，通过 icon 属性或插槽设置图标，并用 iconAttrs 透传 s-icon 属性；标题溢出时自动显示 tooltip，并支持通过 extra 属性或插槽设置右侧内容。
 *
 * 先提示 sybz 自身属性。
 */
export type STitleComponent = {
  install: (app: import('vue').App) => void
  new (): {
    $props: {
      title?: string
      /** 左侧图标，写法与 s-icon 的 icon 属性一致；设置后自动隐藏左侧竖条 */
      icon?: SIconValue
      /** 透传给左侧 s-icon 的属性，可覆盖 icon、默认 size 和 cursor */
      iconAttrs?: SIconProps & SybzRecord
      extra?: string
      size?: SybzComponentSize
      fs?: number | SybzComponentSize | `${number}px`
      subTitle?: string
      subAttrs?: SybzRecord
      showTooltip?: boolean
      tooltipAttrs?: SybzRecord
      inner?: boolean
      margin?: string | number
      gap?: string | number
      width?: string | number
      w?: string | number
      t?: string | number
      b?: string | number
      l?: string | number
      tb?: string | number
      height?: string | number
      h?: string | number
      type?: '' | 'simple' | 'icon' | 'form'
      theme?: SybzComponentTheme
      tag?: 'div' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
      level?: 1 | 2 | 3 | 4 | 5 | 6
    }
    $slots: {
      default?: () => any
      title?: () => any
      icon?: () => any
      extra?: () => any
    }
  }
}

declare const STitle: STitleComponent
export default STitle
