import type { InstallableComponent } from './_shared'
import type { SWarningProps } from '../component-props'

declare const SWarning: InstallableComponent<
  SWarningProps,
  {},
  {
    title?: () => any
    content?: () => any
  }
>
export default SWarning
