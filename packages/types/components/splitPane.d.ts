import type { InstallableComponent } from './_shared'
import type { SSplitPaneProps } from '../component-props'

declare const SSplitPane: InstallableComponent<
  SSplitPaneProps,
  {},
  {
    paneL?: () => any
    left?: () => any
    paneR?: () => any
    extra?: () => any
  }
>
export default SSplitPane
