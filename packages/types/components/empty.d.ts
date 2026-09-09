import { ElEmpty } from 'element-plus'
import type { SEmptySelfProps, SybzComponentTheme, SybzRecord } from '../component-props'

type ElEmptyInstance = InstanceType<typeof ElEmpty>

export type SEmptyPublicProps = SEmptySelfProps & Omit<ElEmptyInstance['$props'], keyof SEmptySelfProps | 'description'>

export type SEmptyComponent = {
  new (): {
    $props: {
      title?: string
      subTitle?: string
      theme?: SybzComponentTheme
      width?: string | number
      height?: string | number
      imgAttrs?: SybzRecord
      src?: string
    } & Omit<
      ElEmptyInstance['$props'],
      'title' | 'subTitle' | 'theme' | 'width' | 'height' | 'imgAttrs' | 'src' | 'description'
    >
    $emit: ElEmptyInstance['$emit']
    $slots: ElEmptyInstance['$slots'] & {
      default?: () => any
      image?: () => any
      title?: () => any
      'sub-title'?: () => any
    }
  }
}

declare const SEmpty: SEmptyComponent
export default SEmpty
