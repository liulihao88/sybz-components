import type { SIconValue, SIconProps, SybzComponentTheme, SybzComponentSize, SybzRecord } from '../component-props'
import type { SybzDimensionProps, SybzThemeProps, SybzStyleProps } from '../component-props'

/**
 * {@link https://liulihao88.github.io/sybz-components/components/title/home.html | 查看文档}
 *
 * s-title 标题组件，title、append 和 subTitle 默认解析白名单 HTML（dangerouslyUseHTMLString 默认 true），支持任意已全局注册的组件标签（如 s-text、s-tag、s-button、el-button）和白名单 HTML（如 code、mark）；设为 false 时按纯文本渲染。支持通过 fs 设置标题字号和左侧竖线高度，icon 属性或插槽设置图标；标题可显示纯文本 tooltip。
 *
 * 先提示 sybz 自身属性。
 */
export type STitleComponent = {
  install: (app: import('vue').App) => void
  new <STitle文档 = 'https://liulihao88.github.io/sybz-components/components/title/home.html'>(): {
    $props: {
      /** 主标题文本；默认解析白名单 HTML 和任意已全局注册的组件（dangerouslyUseHTMLString 默认 true），title 插槽优先 */
      title?: string
      /** 左侧图标，写法与 s-icon 的 icon 属性一致；设置后自动隐藏左侧竖条 */
      icon?: SIconValue
      /** 透传给左侧 s-icon 的属性，可覆盖 icon、默认 size 和 cursor */
      iconAttrs?: SIconProps & SybzRecord
      extra?: string
      /** 主标题右侧追加内容，默认解析白名单 HTML 和任意已全局注册的组件（dangerouslyUseHTMLString 默认 true）；append 插槽优先，默认空字符串 */
      append?: string
      /** 追加内容的 DOM 属性；fontSize 支持数字或 CSS 长度，也支持 style */
      appendAttrs?: SybzRecord & { fontSize?: string | number }
      size?: SybzComponentSize
      fs?: number | SybzComponentSize | `${number}px`
      /** 副标题内容；默认解析白名单 HTML 和任意已全局注册的组件（dangerouslyUseHTMLString 默认 true） */
      subTitle?: string
      /** 副标题 DOM 属性；fontSize 可直接传数字或 CSS 长度，亦支持 style */
      subTitleAttrs?: SybzRecord & { fontSize?: string | number }
      showTooltip?: boolean
      tooltipAttrs?: SybzRecord
      /** 是否把 title / append / subTitle 中的字符串作为富文本渲染（含白名单 HTML 和任意已全局注册的组件）；默认 true，设为 false 时按纯文本输出 */
      dangerouslyUseHTMLString?: boolean
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
