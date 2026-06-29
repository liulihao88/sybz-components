import type { InstallableComponent } from '../_shared'

declare const SBaseHeader: InstallableComponent<
  Record<string, any>,
  {},
  {
    default?: () => any
    extra?: () => any
  }
>
export default SBaseHeader
