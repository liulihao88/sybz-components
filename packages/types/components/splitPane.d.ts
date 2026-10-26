import type { SplitPaneDirection, SplitPaneSetting, SSplitPaneProps } from '../component-props'
import type { SybzStyleProps } from '../component-props'

/**
 * {@link https://liulihao88.github.io/sybz-components/components/splitPane/home.html | 查看文档}
 *
 * 先提示 sybz 自身属性。
 */
export type SSplitPaneComponent = {
  install: (app: import('vue').App) => void
  new <SSplitPane文档 = 'https://liulihao88.github.io/sybz-components/components/splitPane/home.html'>(): {
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

/**
 * {@link https://liulihao88.github.io/sybz-components/components/splitPane/home.html | 查看文档}
 */
declare const SSplitPane: SSplitPaneComponent
export default SSplitPane
