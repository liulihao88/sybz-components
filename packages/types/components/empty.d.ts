import { ElEmpty } from 'element-plus'
import type { SEmptySelfProps, SybzComponentTheme, SybzRecord } from '../component-props'

type ElEmptyInstance = InstanceType<typeof ElEmpty>

export type SEmptyPublicProps = SEmptySelfProps & Omit<ElEmptyInstance['$props'], keyof SEmptySelfProps>

export type SEmptyComponent = {
  new (): {
    $props: {
      description?: string
      theme?: SybzComponentTheme
      width?: string | number
      height?: string | number
      imgAttrs?: SybzRecord
      src?: string
    } & Omit<ElEmptyInstance['$props'], 'description' | 'theme' | 'width' | 'height' | 'imgAttrs' | 'src'>
    $emit: ElEmptyInstance['$emit']
    $slots: ElEmptyInstance['$slots'] & {
      default?: () => any
      image?: () => any
      description?: () => any
    }
  }
}

declare const SEmpty: SEmptyComponent
export default SEmpty
