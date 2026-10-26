import { ElEmpty } from 'element-plus'
import type { SEmptySelfProps, SybzComponentTheme, SybzRecord } from '../component-props'
import type { SybzDimensionProps, SybzThemeProps, SybzStyleProps } from '../component-props'

type ElEmptyInstance = InstanceType<typeof ElEmpty>

export type SEmptyPublicProps = SEmptySelfProps & Omit<ElEmptyInstance['$props'], keyof SEmptySelfProps | 'description'>

export type SEmptyComponent = {
  install: (app: import('vue').App) => void
  new (): {
    $props: {
      title?: string
      subTitle?: string
      imgAttrs?: SybzRecord
      src?: string
    } & Omit<
      ElEmptyInstance['$props'],
      'title' | 'subTitle' | 'theme' | 'width' | 'w' | 'height' | 'h' | 'imgAttrs' | 'src' | 'description'
    > &
      SybzStyleProps &
      SybzDimensionProps<SEmptySelfProps> &
      SybzThemeProps<SEmptySelfProps>
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
