import type { SCompTitleProps, SybzComponentTheme, SybzRecord } from '../component-props'

export type SCompTitleComponent = {
  install: (app: import('vue').App) => void
  new (): {
    $props: {
      title?: string
      compTitleStyle?: SybzRecord
      theme?: SybzComponentTheme
    }
  }
}

declare const SCompTitle: SCompTitleComponent
export default SCompTitle
