import type { SChartProps, SybzRecord } from '../component-props'
import type { SybzDimensionProps, SybzThemeProps, SybzStyleProps } from '../component-props'

/**
 * {@link https://liulihao88.github.io/sybz-components/components/chart/home.html | 查看文档}
 *
 * 先提示 sybz 自身属性。
 */
export type SChartComponent = {
  install: (app: import('vue').App) => void
  new <SChart文档 = 'https://liulihao88.github.io/sybz-components/components/chart/home.html'>(): {
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

/**
 * {@link https://liulihao88.github.io/sybz-components/components/chart/home.html | 查看文档}
 */
declare const SChart: SChartComponent
export default SChart
