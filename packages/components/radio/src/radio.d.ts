export type RadioOptionValue = string | number | boolean

export interface OptionsProps {
  disabled: string
}

export interface RadioItem {
  value?: RadioOptionValue
  label?: RadioOptionValue
  slot?: string
  disabled?: boolean
  /** button 模式下当前项选中时的背景色 */
  color?: string
  [key: string]: any
}

export type RadioOption = RadioItem | RadioOptionValue
