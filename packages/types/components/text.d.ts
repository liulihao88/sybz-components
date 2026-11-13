import type { Component } from 'vue'
import type { SybzComponentTheme } from '../component-props'
import type { SybzTextColor } from '../../hooks/useStyleProps'
import type { STextProps, STextType } from '../../components/text/src/types'
import type { SybzThemeProps, SybzStyleProps } from '../component-props'

/**
 * {@link https://liulihao88.github.io/sybz-components/components/text/home.html | 查看文档}
 *
 * s-text 文字组件，支持语义色、常用颜色、最高优先级的文字渐变、行数省略、根元素，并通过 fs/fw/td 等样式简写设置排版；cursor 可传 CSS 值，true 表示 pointer；span 等行内标签在使用纵向间距或宽高简写（m/mt/mb/p/pt/pb/w/h 等）时会自动切换为 inline-block 显示。
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
      /** 根元素标签或 Vue 组件；默认 span */
      component?: string | Component
      /** 最大显示行数，0 表示不限制；默认 0 */
      lineClamp?: number
      /** 斜体；默认 false */
      italic?: boolean
      /** 标记高亮；默认 false */
      mark?: boolean
      /** 禁止选择文字；默认 false */
      unselectable?: boolean
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
