import type { SBasicLayoutProps, SybzComponentSize, SybzComponentTheme, SybzRecord } from '../component-props'

export type SBasicLayoutComponent = {
  new (): {
    $props: {
      modelValue?: boolean
      size?: SybzComponentSize | string | number
      title?: string
      hoverAnimation?: boolean
      shadow?: 'always' | 'never' | 'hover'
      boxStyle?: SybzRecord
      headerStyle?: SybzRecord
      bodyStyle?: SybzRecord
      footerStyle?: SybzRecord
      transparent?: boolean
      border?: boolean
      scroll?: boolean
      square?: boolean
      collapsible?: boolean
      collapseTrigger?: 'icon' | 'header'
      theme?: SybzComponentTheme
    }
    $slots: {
      default?: () => any
      header?: () => any
      footer?: () => any
      icon?: () => any
    }
  }
}

declare const SBasicLayout: SBasicLayoutComponent
export default SBasicLayout
