import type { InstallableComponent } from './_shared'
import type { STitleProps } from '../component-props'

declare const STitle: InstallableComponent<
  STitleProps,
  {},
  {
    default?: () => any
    title?: () => any
    icon?: () => any
    extra?: () => any
    right?: () => any
  }
>
export default STitle
