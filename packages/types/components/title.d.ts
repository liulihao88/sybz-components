import type { SIconValue, SIconProps, SybzComponentTheme, SybzComponentSize, SybzRecord } from '../component-props'
import type { SybzDimensionProps, SybzThemeProps, SybzStyleProps } from '../component-props'

/**
 * {@link https://liulihao88.github.io/sybz-components/components/title/home.html | 查看文档}
 *
 * s-title 标题组件，支持通过 fs 使用数字、px 字符串或 small/default/large 设置标题字号和左侧竖线高度，通过 mt/mb/ml/my 等样式属性设置外边距，通过 width 设置宽度，通过 icon 属性或插槽设置图标，并用 iconAttrs 透传 s-icon 属性；subTitle 固定显示在主标题下方，append 属性或插槽显示在主标题右侧且插槽优先，appendAttrs 可配置追加内容属性和字号；标题溢出时自动显示 tooltip，并支持通过 extra 属性或插槽设置最右侧内容。
 *
 * 先提示 sybz 自身属性。
 */
export type STitleComponent = {
  install: (app: import('vue').App) => void
  new <STitle文档 = 'https://liulihao88.github.io/sybz-components/components/title/home.html'>(): {
    $props: {
      title?: string
      /** 左侧图标，写法与 s-icon 的 icon 属性一致；设置后自动隐藏左侧竖条 */
      icon?: SIconValue
      /** 透传给左侧 s-icon 的属性，可覆盖 icon、默认 size 和 cursor */
      iconAttrs?: SIconProps & SybzRecord
      extra?: string
      /** 主标题右侧追加文本；append 插槽优先，默认空字符串 */
      append?: string
      /** 追加内容的 DOM 属性；fontSize 支持数字或 CSS 长度，也支持 style */
      appendAttrs?: SybzRecord & { fontSize?: string | number }
      size?: SybzComponentSize
      fs?: number | SybzComponentSize | `${number}px`
      subTitle?: string
      /** 副标题 DOM 属性；fontSize 可直接传数字或 CSS 长度，亦支持 style */
      subTitleAttrs?: SybzRecord & { fontSize?: string | number }
      showTooltip?: boolean
      tooltipAttrs?: SybzRecord
      inner?: boolean
      gap?: string | number
      type?: '' | 'simple' | 'icon' | 'form'
      tag?: 'div' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
      level?: 1 | 2 | 3 | 4 | 5 | 6
    } & SybzStyleProps &
      SybzDimensionProps<STitleProps> &
      SybzThemeProps<STitleProps>
    $slots: {
      default?: () => any
      title?: () => any
      icon?: () => any
      append?: () => any
      extra?: () => any
    }
  }
}

/**
 * {@link https://liulihao88.github.io/sybz-components/components/title/home.html | 查看文档}
 */
declare const STitle: STitleComponent
export default STitle
