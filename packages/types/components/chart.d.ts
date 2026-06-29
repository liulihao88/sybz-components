import type { InstallableComponent } from './_shared'
import type { SChartProps } from '../component-props'

declare const SChart: InstallableComponent<
  SChartProps,
  {},
  {
    default?: () => any
    empty?: () => any
  }
>
export default SChart
