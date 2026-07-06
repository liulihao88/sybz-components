import type { SplitPaneDirection, SplitPaneSetting, SSplitPaneProps } from '../component-props'

export type SSplitPaneComponent = {
  new (): {
    $props: {
      splitSet?: SplitPaneSetting
      split?: SplitPaneDirection
      minPercent?: number
      defaultPercent?: number
      resizerSize?: string | number
      resetOnClick?: boolean
      modelValue?: number
    }
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
