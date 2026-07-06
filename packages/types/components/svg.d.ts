import type { SSvgProps, SybzRecord } from '../component-props'

export type SSvgComponent = {
  new (): {
    $props: {
      prefix?: string
      name: string
      color?: string
      customStyle?: SybzRecord
      size?: string | number
    }
  }
}

declare const SSvg: SSvgComponent
export default SSvg
