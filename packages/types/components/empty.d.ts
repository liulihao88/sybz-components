import { ElEmpty } from 'element-plus'
import type { SEmptySelfProps, SybzComponentTheme, SybzRecord } from '../component-props'
import type { SybzDimensionProps, SybzThemeProps, SybzStyleProps } from '../component-props'

type ElEmptyInstance = InstanceType<typeof ElEmpty>

/**
 * {@link https://liulihao88.github.io/sybz-components/components/empty/home.html | 查看文档}
 *
 * 先提示 sybz 自身属性，再提示 Element Plus Empty 的公开属性。
 */
export type SEmptyPublicProps = SEmptySelfProps & Omit<ElEmptyInstance['$props'], keyof SEmptySelfProps | 'description'>

/**
 * {@link https://liulihao88.github.io/sybz-components/components/empty/home.html | 查看文档}
 */
export type SEmptyComponent = {
  install: (app: import('vue').App) => void
  new <SEmpty文档 = 'https://liulihao88.github.io/sybz-components/components/empty/home.html'>(): {
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

/**
 * {@link https://liulihao88.github.io/sybz-components/components/empty/home.html | 查看文档}
 */
declare const SEmpty: SEmptyComponent
export default SEmpty
