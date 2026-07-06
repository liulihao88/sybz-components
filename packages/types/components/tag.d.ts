import { ElTag } from 'element-plus'
import type { TagPropsPublic } from 'element-plus/es/components/tag'
import type { STagSelfProps, SybzComponentSize, SybzComponentTheme, SybzRecord } from '../component-props'

type ElTagInstance = InstanceType<typeof ElTag>

export type STagPublicProps = STagSelfProps & Omit<ElTagInstance['$props'], keyof STagSelfProps>

export type STagComponent = {
  new (): {
    $props: {
      options?: any[]
      value?: string | number
      width?: string | number
      height?: string | number
      primary?: string | number | boolean | any[]
      warning?: string | number | boolean | any[]
      danger?: string | number | boolean | any[]
      info?: string | number | boolean | any[]
      other?: string
      type?: TagPropsPublic['type']
      theme?: SybzComponentTheme
      size?: SybzComponentSize
      config?: SybzRecord
    } & Omit<
      ElTagInstance['$props'],
      | 'options'
      | 'value'
      | 'width'
      | 'height'
      | 'primary'
      | 'warning'
      | 'danger'
      | 'info'
      | 'other'
      | 'type'
      | 'theme'
      | 'size'
      | 'config'
    >
    $emit: ElTagInstance['$emit']
    $slots: ElTagInstance['$slots'] & {
      default?: () => any
    }
  }
}

declare const STag: STagComponent
export default STag
