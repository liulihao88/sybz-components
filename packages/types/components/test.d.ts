import type { STestProps } from '../component-props'
import type { SybzStyleProps } from '../component-props'

/**
 * {@link https://liulihao88.github.io/sybz-components/components/test/home.html | 查看文档}
 *
 * 先提示 sybz 自身属性。
 */
export type STestComponent = {
  install: (app: import('vue').App) => void
  new <STest文档 = 'https://liulihao88.github.io/sybz-components/components/test/home.html'>(): {
    $props: {
      label?: string
      prefix?: string
    } & SybzStyleProps
  }
}

/**
 * {@link https://liulihao88.github.io/sybz-components/components/test/home.html | 查看文档}
 */
declare const STest: STestComponent
export default STest
