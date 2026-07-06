import { ElProgress } from 'element-plus'
import type { SProgressSelfProps } from '../component-props'

type ElProgressInstance = InstanceType<typeof ElProgress>

export type SProgressPublicProps = SProgressSelfProps & Omit<ElProgressInstance['$props'], keyof SProgressSelfProps>

export type SProgressComponent = {
  new (): {
    $props: {
      percentage: number
      animationTime?: number
      isAnimation?: boolean
      customColor?: boolean
    } & Omit<ElProgressInstance['$props'], 'percentage' | 'animationTime' | 'isAnimation' | 'customColor'>
    $emit: ElProgressInstance['$emit']
    $slots: ElProgressInstance['$slots'] & {
      default?: () => any
    }
  }
}

declare const SProgress: SProgressComponent
export default SProgress
