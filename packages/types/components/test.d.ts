import type { STestProps } from '../component-props'

export type STestComponent = {
  install: (app: import('vue').App) => void
  new (): {
    $props: {
      label?: string
      prefix?: string
    }
  }
}

declare const STest: STestComponent
export default STest
