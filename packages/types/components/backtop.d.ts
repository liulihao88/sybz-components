import type { SBacktopEmits, SBacktopProps } from '../../components/backtop/src/types'
import type { SybzStyleProps } from '../component-props'

/**
 * {@link https://liulihao88.github.io/sybz-components/components/backtop/home.html | 查看文档}
 *
 * s-backtop 原生回到顶部组件，支持目标容器、显示阈值、位置和滚动时长。
 *
 * 先提示 sybz 自身属性。
 */
export type SBacktopComponent = {
  install: (app: import('vue').App) => void
  new <SBacktop文档 = 'https://liulihao88.github.io/sybz-components/components/backtop/home.html'>(): {
    $props: {
      /** 触发滚动的元素选择器；默认滚动页面 */
      target?: string
      /** 滚动达到该高度时显示；默认 200px */
      visibilityHeight?: number
      /** 距离页面右侧的距离；默认 40px */
      right?: number
      /** 距离页面底部的距离；默认 40px */
      bottom?: number
      /** 回到顶部的动画时长，单位毫秒；默认 500ms，0 表示立即跳转 */
      duration?: number
    } & SybzStyleProps
    $slots: {
      default?: () => any
    }
    $emit: SBacktopEmits
  }
}

/**
 * {@link https://liulihao88.github.io/sybz-components/components/backtop/home.html | 查看文档}
 */
declare const SBacktop: SBacktopComponent
export default SBacktop
