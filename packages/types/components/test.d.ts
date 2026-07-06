import type { STestProps } from '../component-props'

export type STestComponent = {
  new (): {
    $props: {
      label?: string
      prefix?: string
    }
  }
}

declare const STest: STestComponent
export default STest
