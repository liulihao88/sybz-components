import type {
  SCommonProps,
  SItemAlign,
  SItemExtraPlacement,
  SItemProps,
  SItemStyleKey,
  SItemStyles,
  SItemTooltipAttrs,
  SybzComponentSize,
  SybzComponentTheme,
  SybzRecord,
} from '../component-props'

/**
 * 信息项，标题与副标题默认显示 1 行，通过 titleAttrs/subTitleAttrs 的 lineClamp 配置行数及 Tooltip 属性。
 *
 * 先提示 sybz 自身属性。
 */
export type SItemComponent = {
  new (): {
    $props: {
      width?: string | number
      w?: string | number
      height?: string | number
      h?: string | number
      color?: string
      /** CSS background，支持纯色、渐变及其他合法背景值 */
      background?: string
      hoverAnimation?: boolean
      /** 主标题 */
      title?: string | number
      /** 副标题 */
      subTitle?: string | number
      /** 扩展区域的简单文本 */
      extra?: string | number
      /** 左侧图片地址 */
      src?: string
      /** 预设内边距尺寸，也可直接传 CSS 尺寸 */
      size?: SybzComponentSize | string | number
      /** 内容内边距，优先级高于 size */
      padding?: string | number
      /** 前缀、主内容和标题右侧区域之间的间距 */
      gap?: string | number
      /** 标题、副标题、正文及操作项之间的间距 */
      contentGap?: string | number
      /** 前缀与主内容在交叉轴上的对齐方式 */
      align?: SItemAlign
      /** clickable 状态下的悬停背景色 */
      hoverBackground?: string
      /** 是否显示默认边框，或直接传入完整 CSS border；默认 true */
      border?: boolean | string
      borderRadius?: string | number
      /** 是否显示底部分割线 */
      divider?: boolean
      /** 标题的 s-tooltip 属性；lineClamp 默认 1，0 表示自然展开；标题插槽仅使用 lineClamp */
      titleAttrs?: SItemTooltipAttrs
      /** 副标题的 s-tooltip 属性；lineClamp 默认 1，0 表示自然展开；副标题插槽仅使用 lineClamp */
      subTitleAttrs?: SItemTooltipAttrs
      /** extra/actions 区域的位置 */
      extraPlacement?: SItemExtraPlacement
      /** side 模式下 extra/actions 的垂直对齐方式 */
      extraAlign?: SItemAlign
      /** 各语义区域的内联样式 */
      styles?: SItemStyles
      clickable?: boolean
      disabled?: boolean
      theme?: SybzComponentTheme
      shadow?: 'always' | 'never' | 'hover'
    }
    $slots: {
      prefix?: () => any
      img?: () => any
      title?: () => any
      subTitle?: () => any
      extra?: () => any
      actions?: () => any
      default?: () => any
    }
  }
}

declare const SItem: SItemComponent
export default SItem
