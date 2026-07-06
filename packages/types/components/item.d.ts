import type { SItemProps, SybzRecord } from '../component-props'

export type SItemComponent = {
  new (): {
    $props: {
      src?: string
      label: string | number
      value: string | number
      width?: string | number
      height?: string | number
      labelStyle?: SybzRecord
      valueStyle?: SybzRecord
      itemStyle?: SybzRecord
      imgStyle?: SybzRecord
      boxStyle?: SybzRecord
      type?: '' | 'value'
      attrs?: SybzRecord
    }
    $slots: {
      img?: () => any
      label?: () => any
      value?: () => any
    }
  }
}

declare const SItem: SItemComponent
export default SItem
