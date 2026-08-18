import type { SItemProps, SybzComponentSize, SybzComponentTheme, SybzRecord } from '../component-props'

export type SItemComponent = {
  new (): {
    $props: {
      title?: string | number
      subTitle?: string | number
      extra?: string | number
      src?: string
      width?: string | number
      height?: string | number
      size?: SybzComponentSize | string | number
      padding?: string | number
      clickable?: boolean
      disabled?: boolean
      theme?: SybzComponentTheme
      shadow?: 'always' | 'never' | 'hover'
      hoverAnimation?: boolean
    }
    $slots: {
      prefix?: () => any
      img?: () => any
      title?: () => any
      subTitle?: () => any
      extra?: () => any
      actions?: () => any
      default?: () => any
    }
  }
}

declare const SItem: SItemComponent
export default SItem
