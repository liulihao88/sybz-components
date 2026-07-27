import type { SIconProps, SybzRecord } from '../component-props'

/**
 * s-icon 图标组件，支持尺寸、颜色、旋转角度、tooltip 和自定义图标内容。
 *
 * 先提示 sybz 自身属性。
 */
export type SIconComponent = {
  new (): {
    $props: {
      /** 是否按 HTML 字符串渲染，推荐使用 Element Plus 同名写法 */
      dangerouslyUseHTMLString?: boolean
      name: string
      color?: string
      size?: string | number
      /** 图标旋转角度，数字及数字字符串按 deg 处理 */
      rotate?: string | number
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
