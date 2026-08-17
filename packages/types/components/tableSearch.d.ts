import type { Component } from 'vue'
import type {
  STableSearchEmits,
  STableSearchEvent,
  STableSearchField,
  STableSearchModel,
  STableSearchProps,
} from '../../components/tableSearch/src/types'

export type STableSearchComponent = {
  new (): {
    $props: {
      /** 搜索字段配置 */
      options?: STableSearchField[]
      /** 搜索字段配置，优先级高于 options */
      items?: STableSearchField[]
      /** 每行字段数 */
      column?: number
      /** 搜索表单值 */
      modelValue?: STableSearchModel
      /** 初始值，也是重置后的值 */
      initialValue?: STableSearchModel
      /** 全局自动搜索事件，false 表示关闭 */
      searchOn?: STableSearchEvent[] | false
      /** 是否显示重置按钮 */
      showReset?: boolean
    }
    $slots: Record<string, (...args: any[]) => any>
    $emit: <Event extends keyof STableSearchEmits>(event: Event, ...args: STableSearchEmits[Event]) => void
  }
}

declare const STableSearch: STableSearchComponent
export default STableSearch
