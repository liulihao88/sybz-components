import { ElProgress } from 'element-plus'
import type { SProgressSelfProps } from '../component-props'
import type { SybzStyleProps } from '../component-props'

type ElProgressInstance = InstanceType<typeof ElProgress>

/**
 * {@link https://liulihao88.github.io/sybz-components/components/progress/home.html | 查看文档}
 *
 * 先提示 sybz 自身属性，再提示 Element Plus Progress 的公开属性。
 */
export type SProgressPublicProps = SProgressSelfProps & Omit<ElProgressInstance['$props'], keyof SProgressSelfProps>

/**
 * {@link https://liulihao88.github.io/sybz-components/components/progress/home.html | 查看文档}
 */
export type SProgressComponent = {
  install: (app: import('vue').App) => void
  new <SProgress文档 = 'https://liulihao88.github.io/sybz-components/components/progress/home.html'>(): {
    $props: {
      percentage: number
      animationTime?: number
      isAnimation?: boolean
      customColor?: boolean
    } & Omit<ElProgressInstance['$props'], 'percentage' | 'animationTime' | 'isAnimation' | 'customColor'> &
      SybzStyleProps
    $emit: ElProgressInstance['$emit']
    $slots: ElProgressInstance['$slots'] & {
      default?: () => any
    }
  }
}

/**
 * {@link https://liulihao88.github.io/sybz-components/components/progress/home.html | 查看文档}
 */
declare const SProgress: SProgressComponent
export default SProgress
