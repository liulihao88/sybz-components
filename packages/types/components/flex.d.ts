import type { Component } from 'vue'
import type {
  SFlexAlign,
  SFlexDirection,
  SFlexJustify,
  SFlexProps,
  SFlexWrap,
  SybzComponentSize,
} from '../component-props'

export type SFlexComponent = {
  new (): {
    $props: {
      direction?: SFlexDirection
      wrap?: SFlexWrap
      justify?: SFlexJustify
      align?: SFlexAlign
      flex?: string
      gap?: SybzComponentSize | string | number
      component?: string | Component
    }
    $slots: {
      default?: () => any
    }
  }
}

declare const SFlex: SFlexComponent
export default SFlex
