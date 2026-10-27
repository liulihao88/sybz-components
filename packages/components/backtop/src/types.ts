/** s-backtop 自有属性。 */
export interface SBacktopProps {
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
}

export interface SBacktopEmits {
  (event: 'click', mouseEvent: MouseEvent): void
}
