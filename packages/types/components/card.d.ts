import type { SCardProps, SybzComponentSize, SybzComponentTheme, SybzRecord } from '../component-props'

export type SCardComponent = {
  new (): {
    $props: {
      modelValue?: boolean
      size?: SybzComponentSize | string | number
      height?: string | number
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

declare const SCard: SCardComponent
export default SCard
