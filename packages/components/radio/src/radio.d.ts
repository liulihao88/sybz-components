import type { CSSProperties } from 'vue'

export type RadioOptionValue = string | number | boolean

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
  /** button 模式下当前项选中时的背景色 */
  color?: string
  [key: string]: any
}

export type RadioOption = RadioItem | RadioOptionValue
