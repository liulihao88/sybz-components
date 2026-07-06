import type { SItemWrapperProps } from '../component-props'

export type SItemWrapperComponent = {
  new (): {
    $props: {
      gap?: string | number
      columns?: number | null
      minWidth?: string | number
    }
    $slots: {
      default?: () => any
    }
  }
}

declare const SItemWrapper: SItemWrapperComponent
export default SItemWrapper
