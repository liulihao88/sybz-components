import type { SChartProps, SybzRecord } from '../component-props'
import type { SybzStyleProps } from '../component-props'

export type SChartComponent = {
  install: (app: import('vue').App) => void
  new (): {
    $props: {
      width?: string
      w?: string
      height?: string
      h?: string
      id?: string
      option: SybzRecord
      theme?: string
      isEmpty?: boolean | ((options: SybzRecord) => boolean)
      description?: string
    } & SybzStyleProps
    $slots: {
      default?: () => any
      empty?: () => any
    }
  }
}

declare const SChart: SChartComponent
export default SChart
