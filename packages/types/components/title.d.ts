import type { Component } from 'vue'
import type { SybzComponentTheme, SybzComponentSize, SybzRecord } from '../component-props'

/**
 * s-title 标题组件，支持通过 icon 属性或插槽设置图标，标题溢出时自动显示 tooltip，并支持通过 extra 属性或插槽设置右侧内容。
 *
 * 先提示 sybz 自身属性。
 */
export type STitleComponent = {
  new (): {
    $props: {
      title?: string
      icon?: string | Component
      extra?: string
      size?: SybzComponentSize
      subTitle?: string
      subAttrs?: SybzRecord
      showTooltip?: boolean
      tooltipAttrs?: SybzRecord
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
      extra?: () => any
    }
  }
}

declare const STitle: STitleComponent
export default STitle
