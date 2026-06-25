import { ElProgress } from 'element-plus'
import type { SProgressProps } from '../component-props'

type ElProgressInstance = InstanceType<typeof ElProgress>

export type SProgressPublicProps = SProgressProps &
  Omit<ElProgressInstance['$props'], keyof SProgressProps>

export type SProgressComponent = typeof ElProgress & {
  new (): {
    $props: SProgressProps & Omit<ElProgressInstance['$props'], keyof SProgressProps>
    $emit: ElProgressInstance['$emit']
    $slots: ElProgressInstance['$slots']
  }
}

declare const SProgress: SProgressComponent
export default SProgress
