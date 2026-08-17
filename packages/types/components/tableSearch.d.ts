import type { Component } from 'vue'
import type {
  GTableSearchEmits,
  GTableSearchEvent,
  GTableSearchField,
  GTableSearchModel,
  GTableSearchProps,
} from '../../components/tableSearch/src/types'

export type GTableSearchComponent = {
  new (): {
    $props: {
      /** 搜索字段配置 */
      options?: GTableSearchField[]
      /** 搜索字段配置，优先级高于 options */
      items?: GTableSearchField[]
      /** 每行字段数 */
      column?: number
      /** 搜索表单值 */
      modelValue?: GTableSearchModel
      /** 初始值，也是重置后的值 */
      initialValue?: GTableSearchModel
      /** 全局自动搜索事件，false 表示关闭 */
      searchOn?: GTableSearchEvent[] | false
      /** 是否显示重置按钮 */
      showReset?: boolean
    }
    $slots: Record<string, (...args: any[]) => any>
    $emit: <Event extends keyof GTableSearchEmits>(event: Event, ...args: GTableSearchEmits[Event]) => void
  }
}

declare const GTableSearch: GTableSearchComponent
export default GTableSearch
