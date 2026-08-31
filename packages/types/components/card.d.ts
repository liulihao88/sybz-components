import type { SCardProps, SybzComponentSize, SybzComponentTheme, SybzRecord } from '../component-props'

/**
 * s-card 卡片组件，支持区块合并、展开收起、阴影、透明背景和主题样式。
 *
 * 先提示 sybz 自身属性。
 */
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
      mergeSections?: boolean
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
