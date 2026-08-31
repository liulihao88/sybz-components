import type {
  SPaginationEmits,
  SPaginationProps,
  SPaginationSelfProps,
  SybzComponentSize,
  SybzComponentTheme,
} from '../component-props'

/**
 * s-pagination 分页组件，支持主题、页码切换、回车跳页、总数展示以及内容超宽时横向滚动。
 *
 * 先提示 sybz 自身属性。
 */
export type SPaginationPublicProps = SPaginationProps

export type SPaginationComponent = {
  new (): {
    $props: {
      /** 当前页码；默认值：1 */
      currentPage?: number
      /** 数据总条数；默认值：0 */
      total?: number
      /** 每页条数，用于根据 total 计算总页数；默认值：10 */
      pageSize?: number
      /** 页码按钮数量；默认值：7 */
      pagerCount?: number
      /** 主题；默认值：default */
      theme?: SybzComponentTheme
      /** 是否使用带背景色的分页按钮；默认值：true */
      background?: boolean
      /** 是否禁用；默认值：false */
      disabled?: boolean
      /** 是否显示总条数；默认值：true */
      showTotal?: boolean
      /** 是否显示手动跳页；默认值：true */
      showJumper?: boolean
      /** 只有一页时是否仍然显示；默认值：false */
      showOnSinglePage?: boolean
      /** 总数前缀文本；默认值：共 */
      totalText?: string
      /** 跳页前缀文本；默认值：跳至 */
      jumpText?: string
      /** 跳页后缀文本；默认值：页 */
      pageText?: string
      /** 分页尺寸；默认值：default */
      size?: SybzComponentSize
    }
    $emit: <Event extends keyof SPaginationEmits>(event: Event, ...args: SPaginationEmits[Event]) => void
  }
}

declare const SPagination: SPaginationComponent
export default SPagination
