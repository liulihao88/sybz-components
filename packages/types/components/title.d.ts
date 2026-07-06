import type { STitleProps, SybzComponentTheme, SybzRecord } from '../component-props'

export type STitleComponent = {
  new (): {
    $props: {
      title?: string
      size?: string
      subTitle?: string
      subAttrs?: SybzRecord
      inner?: boolean
      t?: string | number
      b?: string | number
      l?: string | number
      tb?: string | number
      height?: string | number
      type?: 'simple' | 'icon' | 'form' | string
      theme?: SybzComponentTheme
    }
    $slots: {
      default?: () => any
      title?: () => any
      icon?: () => any
      extra?: () => any
      right?: () => any
    }
  }
}

declare const STitle: STitleComponent
export default STitle
