import type { SChartProps, SybzRecord } from '../component-props'
import type { SybzDimensionProps, SybzThemeProps, SybzStyleProps } from '../component-props'

export type SChartComponent = {
  install: (app: import('vue').App) => void
  new (): {
    $props: {
      id?: string
      option: SybzRecord
      isEmpty?: boolean | ((options: SybzRecord) => boolean)
      description?: string
    } & SybzStyleProps &
      SybzDimensionProps<SChartProps> &
      SybzThemeProps<SChartProps>
    $slots: {
      default?: () => any
      empty?: () => any
    }
  }
}

declare const SChart: SChartComponent
export default SChart
