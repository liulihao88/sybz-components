import type { SClickOutsideProps, SybzRecord } from '../component-props'

export type SClickOutsideComponent = {
  new (): {
    $props: {
      options?: SybzRecord
    }
    $slots: {
      default?: () => any
    }
  }
}

declare const SClickOutside: SClickOutsideComponent
export default SClickOutside
