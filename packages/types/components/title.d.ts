import type { STitleProps, SybzComponentTheme, SybzComponentSize, SybzRecord } from '../component-props'

export type STitleComponent = {
  new (): {
    $props: {
      title?: string
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
