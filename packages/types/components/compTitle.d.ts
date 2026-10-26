import type { SCompTitleProps, SybzComponentTheme, SybzRecord } from '../component-props'
import type { SybzThemeProps, SybzStyleProps } from '../component-props'

export type SCompTitleComponent = {
  install: (app: import('vue').App) => void
  new (): {
    $props: {
      title?: string
      compTitleStyle?: SybzRecord
    } & SybzStyleProps &
      SybzThemeProps<SCompTitleProps>
  }
}

declare const SCompTitle: SCompTitleComponent
export default SCompTitle
