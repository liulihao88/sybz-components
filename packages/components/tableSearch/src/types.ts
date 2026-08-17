import type { Component } from 'vue'

export type GTableSearchEvent = 'change' | 'clear'
export type GTableSearchModel = Record<string, unknown>

export interface GTableSearchField {
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
  /** 触发搜索的字段事件，false 表示关闭自动搜索 */
  searchOn?: GTableSearchEvent[] | false
  /** 字段事件回调 */
  on?: Partial<Record<GTableSearchEvent, (value: unknown, model: GTableSearchModel) => void>>
}

export interface GTableSearchProps {
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

export type GTableSearchEmits = {
  search: [form: GTableSearchModel]
  reset: [form: GTableSearchModel]
  'update:modelValue': [form: GTableSearchModel]
}
