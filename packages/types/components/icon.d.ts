import type {
  SIconValue,
  SIconProps,
  SIconCursor,
  SIconSource,
  SIconType,
  SIconVariant,
  SybzComponentTheme,
  SybzRecord,
} from '../component-props'

/**
 * s-icon 图标组件，支持 Element Plus、Iconify、SVG、在线图片等图标来源，以及语义类型、背景样式、尺寸、颜色、圆角、阴影、Hover 动画、鼠标指针、旋转角度和 tooltip。
 *
 * 先提示 sybz 自身属性。
 */
export type SIconComponent = {
  new (): {
    $props: {
      /** 是否按 HTML 字符串渲染，推荐使用 Element Plus 同名写法 */
      dangerouslyUseHTMLString?: boolean
      /** 图标；支持 Vue 组件、Element Plus 图标名、Iconify 名称和在线图片 URL，业务图标推荐使用 Tabler，例如 `tabler:home` */
      icon?: SIconValue
      color?: string
      size?: string | number
      /** 背景圆角，数字自动补 px；默认由 variant 和 theme 决定 */
      borderRadius?: string | number
      /** 鼠标指针样式，支持任意 CSS cursor 值；默认值：pointer */
      cursor?: SIconCursor
      /** 鼠标移入时是否启用轻微上浮动画；默认值：false */
      hoverAnimation?: boolean
      /** 阴影显示时机，语义同 s-card；默认值：never */
      shadow?: 'always' | 'never' | 'hover'
      /** 图标旋转角度，数字及数字字符串按 deg 处理 */
      rotate?: string | number
      disabled?: boolean
      theme?: SybzComponentTheme
      /** 图标来源；默认值：auto，可自动识别在线图片 URL 和 Iconify 名称 */
      source?: SIconSource
      /** 图标语义类型；默认值：undefined */
      type?: SIconType
      /** 图标视觉样式；默认值：plain */
      variant?: SIconVariant
      svgAttrs?: SybzRecord
      /** 透传给 Iconify Icon 的属性，如 flip、onLoad */
      iconifyAttrs?: SybzRecord
      /** 透传给在线图片 img 元素的属性，如 alt、crossorigin、referrerpolicy */
      imageAttrs?: SybzRecord
    }
    $slots: {
      default?: () => any
    }
  }
}

declare const SIcon: SIconComponent
export default SIcon
