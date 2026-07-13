import type { CSSProperties } from 'vue'

export type RadioOptionValue = string | number | boolean
export type RadioItemType = 'primary' | 'success' | 'warning' | 'danger' | 'info'

export interface OptionsProps {
  disabled: string
}

export interface RadioItem {
  value?: RadioOptionValue
  label?: RadioOptionValue
  slot?: string
  disabled?: boolean
  class?: string | string[] | Record<string, boolean>
  style?: CSSProperties
  /** button 模式下当前项的语义类型 */
  type?: RadioItemType
  /** button 模式下当前项选中时的背景色 */
  color?: string
  [key: string]: any
}

export type RadioOption = RadioItem | RadioOptionValue
