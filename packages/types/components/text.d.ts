import type { Component } from 'vue'
import type { SybzComponentTheme } from '../component-props'
import type { SybzTextColor } from '../../hooks/useStyleProps'
import type { STextProps, STextType } from '../../components/text/src/types'
import type { SybzThemeProps, SybzStyleProps } from '../component-props'

/**
 * {@link https://liulihao88.github.io/sybz-components/components/text/home.html | 查看文档}
 *
 * s-text 文字组件，支持语义色、常用颜色、文字渐变、行数省略、根元素，以及 mark 高亮和 code 代码片段；disabled 禁止点击，link 使用链接文字样式，默认均为 false。dangerouslyUseHTMLString 默认 true，可解析插槽字符串中的白名单 HTML 和已全局注册的组件标签。可通过 fs/fw/td 等样式简写设置排版；span 等行内标签在使用纵向间距或宽高简写时会自动切换为 inline-block 显示。
 *
 * 先提示 sybz 自身属性。
 */
export type STextComponent = {
  install: (app: import('vue').App) => void
  new <SText文档 = 'https://liulihao88.github.io/sybz-components/components/text/home.html'>(): {
    $props: {
      /** 品牌或状态色；默认 default。color / c 优先于 type */
      type?: STextType
      /** 常用文字色或 CSS 颜色；main / default / secondary 对应 85 / 65 / 45；不传时使用 default */
      color?: SybzTextColor
      /** CSS 渐变值，如 linear-gradient(...) 或 var(--gradient)；默认不设置，优先于 type / color / c */
      gradient?: string
      /** 根元素标签或 Vue 组件；默认 span，code 开启且未指定时默认 code */
      component?: string | Component
      /** 最大显示行数，0 表示不限制；默认 0 */
      lineClamp?: number
      /** 斜体；默认 false */
      italic?: boolean
      /** 高亮标记；默认 false，开启后使用高亮底色并继承文字颜色 */
      mark?: boolean
      /** 代码片段；默认 false，开启后默认根元素为 code，并使用 code 的等宽字体与语义配色 */
      code?: boolean
      /** 禁止选择文字；默认 false */
      unselectable?: boolean
      /** 禁用点击及链接跳转；默认 false */
      disabled?: boolean
      /** 使用链接文字样式；默认 false，跳转仍由原生 href 和 component 控制 */
      link?: boolean
      /** 将默认插槽中的字符串按白名单解析，支持任意已全局注册的组件（如 s-text、s-tag、s-button、el-button）；默认 true */
      dangerouslyUseHTMLString?: boolean
    } & SybzStyleProps &
      SybzThemeProps<STextProps>
    $slots: {
      default?: () => any
    }
  }
}

/**
 * {@link https://liulihao88.github.io/sybz-components/components/text/home.html | 查看文档}
 */
declare const SText: STextComponent
export default SText
