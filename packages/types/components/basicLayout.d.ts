import type { InstallableComponent } from './_shared'
import type { SBasicLayoutProps } from '../component-props'

declare const SBasicLayout: InstallableComponent<
  SBasicLayoutProps,
  {},
  {
    default?: () => any
    header?: () => any
    footer?: () => any
    icon?: () => any
  }
>
export default SBasicLayout
