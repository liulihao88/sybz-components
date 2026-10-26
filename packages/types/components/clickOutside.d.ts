import type { SClickOutsideProps, SybzRecord } from '../component-props'
import type { SybzStyleProps } from '../component-props'

/**
 * {@link https://liulihao88.github.io/sybz-components/components/clickOutside/home.html | 查看文档}
 *
 * 先提示 sybz 自身属性。
 */
export type SClickOutsideComponent = {
  install: (app: import('vue').App) => void
  new <SClickOutside文档 = 'https://liulihao88.github.io/sybz-components/components/clickOutside/home.html'>(): {
    $props: {
      options?: SybzRecord
    } & SybzStyleProps
    $slots: {
      default?: () => any
    }
  }
}

/**
 * {@link https://liulihao88.github.io/sybz-components/components/clickOutside/home.html | 查看文档}
 */
declare const SClickOutside: SClickOutsideComponent
export default SClickOutside
