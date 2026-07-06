import type { SChartProps, SybzRecord } from '../component-props'

export type SChartComponent = {
  new (): {
    $props: {
      width?: string
      height?: string
      id?: string
      option: SybzRecord
      theme?: string
      isEmpty?: boolean | ((options: SybzRecord) => boolean)
      description?: string
    }
    $slots: {
      default?: () => any
      empty?: () => any
    }
  }
}

declare const SChart: SChartComponent
export default SChart
