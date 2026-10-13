import type { SSvgProps, SybzRecord } from '../component-props'

export type SSvgComponent = {
  install: (app: import('vue').App) => void
  new (): {
    $props: {
      prefix?: string
      icon: string
      color?: string
      customStyle?: SybzRecord
      size?: string | number
    }
  }
}

declare const SSvg: SSvgComponent
export default SSvg
