import type { Component } from 'vue'
import type { SybzComponentTheme } from '../../../types/component-props'

export type STableSearchEvent = 'change' | 'clear'
export type STableSearchModel = Record<string, unknown>
export type STableSearchTheme = SybzComponentTheme

export interface STableSearchField {
  /** 表单字段名 */
  prop: string
  /** 字段标题，用于生成 placeholder 和鼠标移入提示 */
  label: string
  /** 字段组件，默认使用 s-input */
  comp?: string | Component
  /** 透传给字段组件的属性 */
  attrs?: Record<string, unknown>
  /** 自定义字段渲染组件 */
  render?: Component
  /** 使用字段插槽；true 使用 prop 作为插槽名，字符串使用指定插槽名 */
  useSlot?: boolean | string
  /** 触发搜索的字段事件，false 表示关闭自动搜索 */
  searchOn?: STableSearchEvent[] | false
  /** 字段事件回调 */
  on?: Partial<Record<STableSearchEvent, (value: unknown, model: STableSearchModel) => void>>
}

export interface STableSearchProps {
  /** 统一应用于内部字段组件和操作按钮的主题 */
  theme?: STableSearchTheme
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

export type STableSearchEmits = {
  search: [form: STableSearchModel]
  reset: [form: STableSearchModel]
  'update:modelValue': [form: STableSearchModel]
}
