import type { SCompTitleProps, SybzComponentTheme, SybzRecord } from '../component-props'
import type { SybzThemeProps, SybzStyleProps } from '../component-props'

/**
 * {@link https://liulihao88.github.io/sybz-components/components/compTitle/home.html | 查看文档}
 *
 * 先提示 sybz 自身属性。
 */
export type SCompTitleComponent = {
  install: (app: import('vue').App) => void
  new <SCompTitle文档 = 'https://liulihao88.github.io/sybz-components/components/compTitle/home.html'>(): {
    $props: {
      title?: string
      compTitleStyle?: SybzRecord
    } & SybzStyleProps &
      SybzThemeProps<SCompTitleProps>
  }
}

/**
 * {@link https://liulihao88.github.io/sybz-components/components/compTitle/home.html | 查看文档}
 */
declare const SCompTitle: SCompTitleComponent
export default SCompTitle
