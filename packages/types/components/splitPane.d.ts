import type { SplitPaneDirection, SplitPaneSetting, SSplitPaneProps } from '../component-props'
import type { SybzStyleProps } from '../component-props'

export type SSplitPaneComponent = {
  install: (app: import('vue').App) => void
  new (): {
    $props: {
      splitSet?: SplitPaneSetting
      split?: SplitPaneDirection
      minPercent?: number
      defaultPercent?: number
      resizerSize?: string | number
      resetOnClick?: boolean
      modelValue?: number
    } & SybzStyleProps
    $slots: {
      paneL?: () => any
      left?: () => any
      paneR?: () => any
      extra?: () => any
    }
  }
}

declare const SSplitPane: SSplitPaneComponent
export default SSplitPane
