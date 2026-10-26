import type { SCardProps, SybzComponentSize, SybzComponentTheme, SybzRecord } from '../component-props'
import type { SybzDimensionProps, SybzThemeProps, SybzStyleProps } from '../component-props'

/**
 * {@link https://liulihao88.github.io/sybz-components/components/card/home.html | 查看文档}
 *
 * s-card 卡片组件，title、subTitle 和 extra 支持直接传入字符串，并支持区块合并、展开收起、阴影、透明背景和主题样式。
 *
 * 先提示 sybz 自身属性。
 */
export type SCardComponent = {
  install: (app: import('vue').App) => void
  new <SCard文档 = 'https://liulihao88.github.io/sybz-components/components/card/home.html'>(): {
    $props: {
      modelValue?: boolean
      size?: SybzComponentSize | string | number
      title?: string
      subTitle?: string
      extra?: string
      hoverAnimation?: boolean
      shadow?: 'always' | 'never' | 'hover'
      boxStyle?: SybzRecord
      headerStyle?: SybzRecord
      bodyStyle?: SybzRecord
      footerStyle?: SybzRecord
      transparent?: boolean
      border?: boolean
      mergeSections?: boolean
      scroll?: boolean
      square?: boolean
      collapsible?: boolean
      collapseTrigger?: 'icon' | 'header'
    } & SybzStyleProps &
      SybzDimensionProps<SCardProps> &
      SybzThemeProps<SCardProps>
    $slots: {
      default?: () => any
      header?: () => any
      footer?: () => any
      icon?: () => any
    }
  }
}

/**
 * {@link https://liulihao88.github.io/sybz-components/components/card/home.html | 查看文档}
 */
declare const SCard: SCardComponent
export default SCard
