import type { SWrapperProps } from '../component-props'

export type SWrapperComponent = {
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

declare const SWrapper: SWrapperComponent
export default SWrapper
