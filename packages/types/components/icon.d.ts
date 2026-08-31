import type { SIconName, SIconProps, SIconSource, SIconType, SIconVariant, SybzRecord } from '../component-props'

/**
 * s-icon 图标组件，支持多种图标来源、语义类型、背景样式、尺寸、颜色、旋转角度和 tooltip。
 *
 * 先提示 sybz 自身属性。
 */
export type SIconComponent = {
  new (): {
    $props: {
      /** 是否按 HTML 字符串渲染，推荐使用 Element Plus 同名写法 */
      dangerouslyUseHTMLString?: boolean
      /** 图标名称；支持 Element Plus 图标名提示，包含 `:` 时自动使用 Iconify，业务图标推荐使用 Tabler，例如 `tabler:home` */
      name?: SIconName
      color?: string
      size?: string | number
      /** 图标旋转角度，数字及数字字符串按 deg 处理 */
      rotate?: string | number
      disabled?: boolean
      theme?: SybzComponentTheme
      /** 图标来源；默认值：auto，根据 name 自动识别 Iconify，否则使用 Element Plus */
      source?: SIconSource
      /** 图标语义类型；默认值：undefined */
      type?: SIconType
      /** 图标视觉样式；默认值：plain */
      variant?: SIconVariant
      svgAttrs?: SybzRecord
      /** 透传给 Iconify Icon 的属性，如 flip、onLoad */
      iconifyAttrs?: SybzRecord
    }
    $slots: {
      default?: () => any
    }
  }
}

declare const SIcon: SIconComponent
export default SIcon
