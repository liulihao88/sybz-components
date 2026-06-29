export type RadioOptionValue = string | number | boolean

export interface OptionsProps {
  disabled: string
}

export interface RadioItem {
  value?: RadioOptionValue
  label?: RadioOptionValue
  slot?: string
  disabled?: boolean
  [key: string]: any
}

export type RadioOption = RadioItem | RadioOptionValue
