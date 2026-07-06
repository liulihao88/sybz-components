import type { SInputLabelProps, SybzRecord } from '../component-props'

export type SInputLabelComponent = {
  new (): {
    $props: {
      modelValue?: any[]
      isComplex?: boolean
      regexp?: RegExp
      message?: string
      inputAttrs?: SybzRecord
    }
  }
}

declare const SInputLabel: SInputLabelComponent
export default SInputLabel
