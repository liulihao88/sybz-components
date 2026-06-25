import { ElSelect } from 'element-plus'
import type { SSelectProps } from '../component-props'

type ElSelectInstance = InstanceType<typeof ElSelect>

export type SSelectPublicProps = SSelectProps & Omit<ElSelectInstance['$props'], keyof SSelectProps>

export type SSelectComponent = typeof ElSelect & {
  new (): {
    $props: SSelectProps & Omit<ElSelectInstance['$props'], keyof SSelectProps>
    $emit: ElSelectInstance['$emit']
    $slots: ElSelectInstance['$slots']
  }
}

declare const SSelect: SSelectComponent
export default SSelect
