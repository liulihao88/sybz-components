import type { InstallableComponent } from './_shared'
import type { SItemProps } from '../component-props'

declare const SItem: InstallableComponent<
  SItemProps,
  {},
  {
    img?: () => any
    label?: () => any
    value?: () => any
  }
>
export default SItem
