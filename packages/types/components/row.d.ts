import { ElRow } from 'element-plus'
import type { RowPropsPublic } from 'element-plus/es/components/row'
import type { SRowSelfProps, SybzRecord } from '../component-props'
import type { SybzStyleProps } from '../component-props'

type ElRowInstance = InstanceType<typeof ElRow>

export type SRowPublicProps = SRowSelfProps & Omit<ElRowInstance['$props'], keyof SRowSelfProps>

export type SRowComponent = {
  install: (app: import('vue').App) => void
  new (): {
    $props: {
      col?: number | number[]
      gap?: string | number
      gutter?: string | number
      justify?: RowPropsPublic['justify']
      align?: RowPropsPublic['align']
      colAttrs?: SybzRecord
    } & Omit<ElRowInstance['$props'], 'col' | 'gap' | 'gutter' | 'justify' | 'align' | 'colAttrs'> &
      SybzStyleProps
    $emit: ElRowInstance['$emit']
    $slots: ElRowInstance['$slots'] & {
      default?: () => any
    }
  }
}

declare const SRow: SRowComponent
export default SRow
