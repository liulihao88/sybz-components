import type { SCompTitleProps, SybzComponentTheme, SybzRecord } from '../component-props'
import type { SybzThemeProps, SybzStyleProps } from '../component-props'

/**
 * {@link https://liulihao88.github.io/sybz-components/components/compTitle/home.html | 查看文档}
 *
 * s-comp-title 标题，type="input" 为输入框前缀，type="label" 为单选、多选和开关旁的简洁标签。
 *
 * 先提示 sybz 自身属性。
 */
export type SCompTitleComponent = {
  install: (app: import('vue').App) => void
  new <SCompTitle文档 = 'https://liulihao88.github.io/sybz-components/components/compTitle/home.html'>(): {
    $props: {
      title?: string
      /** 标题样式：input 为输入框前缀，label 为普通控件标签；默认 input */
      type?: 'input' | 'label'
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
