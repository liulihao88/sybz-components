import type { SInputLabelProps, SybzRecord } from '../component-props'
import type { SybzStyleProps } from '../component-props'

/**
 * {@link https://liulihao88.github.io/sybz-components/components/inputLabel/home.html | 查看文档}
 *
 * 先提示 sybz 自身属性。
 */
export type SInputLabelComponent = {
  install: (app: import('vue').App) => void
  new <SInputLabel文档 = 'https://liulihao88.github.io/sybz-components/components/inputLabel/home.html'>(): {
    $props: {
      modelValue?: any[]
      isComplex?: boolean
      regexp?: RegExp
      message?: string
      inputAttrs?: SybzRecord
    } & SybzStyleProps
  }
}

/**
 * {@link https://liulihao88.github.io/sybz-components/components/inputLabel/home.html | 查看文档}
 */
declare const SInputLabel: SInputLabelComponent
export default SInputLabel
