import type { SIconProps, SybzRecord } from '../component-props'

/**
 * s-icon 图标组件，支持 Iconify、Element Plus、本地 SVG、尺寸、颜色、旋转角度和 tooltip。
 *
 * 先提示 sybz 自身属性。
 */
export type SIconComponent = {
  new (): {
    $props: {
      /** 是否按 HTML 字符串渲染，推荐使用 Element Plus 同名写法 */
      dangerouslyUseHTMLString?: boolean
      /** 图标名称；包含 `:` 时自动使用 Iconify，例如 `mdi:home` */
      name?: string
      color?: string
      size?: string | number
      /** 图标旋转角度，数字及数字字符串按 deg 处理 */
      rotate?: string | number
      disabled?: boolean
      theme?: SybzComponentTheme
      /** 图标来源；默认根据 name 自动识别 Iconify，否则使用 Element Plus */
      type?: 'element-plus' | 'iconify' | 'svg' | ''
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
