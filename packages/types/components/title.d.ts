import type { InstallableComponent } from './_shared'
import type { STitleProps } from '../component-props'

export interface STitleSlots {
  default?: () => any
  title?: () => any
  icon?: () => any
  extra?: () => any
}

declare const STitle: InstallableComponent<STitleProps, {}, STitleSlots>
export default STitle
