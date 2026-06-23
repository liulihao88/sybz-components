import type { ButtonProps } from 'element-plus'
import type { Mutable } from 'element-plus/es/utils'

export interface SButtonSelfProps {
  time?: number
  tip?: string
  placement?: string
  tipProps?: Record<string, any>
  isDebounce?: boolean
  theme?: '' | 'chenghua'
  variant?: '' | 'outline' | 'gradient'
  width?: string | number
  height?: string | number
  hoverAnimation?: boolean
}
export type SButtonProps = SButtonSelfProps
