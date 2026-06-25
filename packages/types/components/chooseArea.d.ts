import { ElCascader } from 'element-plus'
import type { SChooseAreaProps } from '../component-props'

type ElCascaderInstance = InstanceType<typeof ElCascader>

export type SChooseAreaPublicProps = SChooseAreaProps &
  Omit<ElCascaderInstance['$props'], keyof SChooseAreaProps>

export type SChooseAreaComponent = typeof ElCascader & {
  new (): {
    $props: SChooseAreaProps & Omit<ElCascaderInstance['$props'], keyof SChooseAreaProps>
    $emit: ElCascaderInstance['$emit']
    $slots: ElCascaderInstance['$slots']
  }
}

declare const SChooseArea: SChooseAreaComponent
export default SChooseArea
