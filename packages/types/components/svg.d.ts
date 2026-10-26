import type { SSvgProps, SybzRecord } from '../component-props'
import type { SybzStyleProps } from '../component-props'

/**
 * {@link https://liulihao88.github.io/sybz-components/components/svg/home.html | 查看文档}
 *
 * 先提示 sybz 自身属性。
 */
export type SSvgComponent = {
  install: (app: import('vue').App) => void
  new <SSvg文档 = 'https://liulihao88.github.io/sybz-components/components/svg/home.html'>(): {
    $props: {
      prefix?: string
      icon: string
      color?: string
      customStyle?: SybzRecord
      size?: string | number
    } & SybzStyleProps
  }
}

/**
 * {@link https://liulihao88.github.io/sybz-components/components/svg/home.html | 查看文档}
 */
declare const SSvg: SSvgComponent
export default SSvg
