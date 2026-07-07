import type { SIconProps, SybzRecord } from '../component-props'

export type SIconComponent = {
  new (): {
    $props: {
      /** 是否按 HTML 字符串渲染，推荐使用 Element Plus 同名写法 */
      dangerouslyUseHTMLString?: boolean
      name: string
      color?: string
      size?: string | number
      disabled?: boolean
      type?: string
      svgAttrs?: SybzRecord
    }
    $slots: {
      default?: () => any
    }
  }
}

declare const SIcon: SIconComponent
export default SIcon
