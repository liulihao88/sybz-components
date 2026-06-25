import { ElTag } from 'element-plus'
import type { STagProps } from '../component-props'

type ElTagInstance = InstanceType<typeof ElTag>

export type STagPublicProps = STagProps &
  Omit<ElTagInstance['$props'], keyof STagProps>

export type STagComponent = typeof ElTag & {
  new (): {
    $props: STagProps & Omit<ElTagInstance['$props'], keyof STagProps>
    $emit: ElTagInstance['$emit']
    $slots: ElTagInstance['$slots']
  }
}

declare const STag: STagComponent
export default STag
