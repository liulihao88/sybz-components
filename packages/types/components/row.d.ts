import { ElRow } from 'element-plus'
import type { RowPropsPublic } from 'element-plus/es/components/row'
import type { SRowSelfProps, SybzRecord } from '../component-props'

type ElRowInstance = InstanceType<typeof ElRow>

export type SRowPublicProps = SRowSelfProps & Omit<ElRowInstance['$props'], keyof SRowSelfProps>

export type SRowComponent = {
  new (): {
    $props: {
      col?: number | number[]
      gap?: string | number
      gutter?: string | number
      justify?: RowPropsPublic['justify']
      align?: RowPropsPublic['align']
      colAttrs?: SybzRecord
    } & Omit<ElRowInstance['$props'], 'col' | 'gap' | 'gutter' | 'justify' | 'align' | 'colAttrs'>
    $emit: ElRowInstance['$emit']
    $slots: ElRowInstance['$slots'] & {
      default?: () => any
    }
  }
}

declare const SRow: SRowComponent
export default SRow
