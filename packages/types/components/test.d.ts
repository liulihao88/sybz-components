import type { STestProps } from '../component-props'
import type { SybzStyleProps } from '../component-props'

export type STestComponent = {
  install: (app: import('vue').App) => void
  new (): {
    $props: {
      label?: string
      prefix?: string
    } & SybzStyleProps
  }
}

declare const STest: STestComponent
export default STest
