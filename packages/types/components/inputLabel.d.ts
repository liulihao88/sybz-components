import type { SInputLabelProps, SybzRecord } from '../component-props'

export type SInputLabelComponent = {
  install: (app: import('vue').App) => void
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
