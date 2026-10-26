import type { SClickOutsideProps, SybzRecord } from '../component-props'
import type { SybzStyleProps } from '../component-props'

export type SClickOutsideComponent = {
  install: (app: import('vue').App) => void
  new (): {
    $props: {
      options?: SybzRecord
    } & SybzStyleProps
    $slots: {
      default?: () => any
    }
  }
}

declare const SClickOutside: SClickOutsideComponent
export default SClickOutside
