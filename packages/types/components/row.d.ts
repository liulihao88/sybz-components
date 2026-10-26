import { ElRow } from 'element-plus'
import type { RowPropsPublic } from 'element-plus/es/components/row'
import type { SRowSelfProps, SybzRecord } from '../component-props'
import type { SybzStyleProps } from '../component-props'

type ElRowInstance = InstanceType<typeof ElRow>

/**
 * {@link https://liulihao88.github.io/sybz-components/components/row/home.html | 查看文档}
 *
 * 先提示 sybz 自身属性，再提示 Element Plus Row 的公开属性。
 */
export type SRowPublicProps = SRowSelfProps & Omit<ElRowInstance['$props'], keyof SRowSelfProps>

/**
 * {@link https://liulihao88.github.io/sybz-components/components/row/home.html | 查看文档}
 */
export type SRowComponent = {
  install: (app: import('vue').App) => void
  new <SRow文档 = 'https://liulihao88.github.io/sybz-components/components/row/home.html'>(): {
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

/**
 * {@link https://liulihao88.github.io/sybz-components/components/row/home.html | 查看文档}
 */
declare const SRow: SRowComponent
export default SRow
