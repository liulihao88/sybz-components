import type {
  SItemAlign,
  SItemExtraPlacement,
  SItemProps,
  SItemStyleKey,
  SItemStyles,
  SybzComponentSize,
  SybzComponentTheme,
  SybzRecord,
} from '../component-props'

export type SItemComponent = {
  new (): {
    $props: {
      /** 主标题 */
      title?: string | number
      /** 副标题 */
      subTitle?: string | number
      /** 扩展区域的简单文本 */
      extra?: string | number
      /** 左侧图片地址 */
      src?: string
      width?: string | number
      height?: string | number
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
      /** 根节点背景色 */
      background?: string
      /** clickable 状态下的悬停背景色 */
      hoverBackground?: string
      /** 是否显示默认边框，或直接传入完整 CSS border；默认 true */
      border?: boolean | string
      borderRadius?: string | number
      /** 是否显示底部分割线 */
      divider?: boolean
      /** 标题最大行数，0 表示不限制 */
      titleLines?: number
      /** 副标题最大行数，0 表示不限制 */
      subTitleLines?: number
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
      hoverAnimation?: boolean
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
