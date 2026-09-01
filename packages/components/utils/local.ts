import { processWidth } from '@sybz-components/utils'
import type { CSSProperties } from 'vue'
import type { SWidthHeightProps } from '@/types/component-props'

export const handleWidthHeight = ({ width, height }: SWidthHeightProps): CSSProperties => {
  const style: CSSProperties = {}

  if (width !== undefined && width !== '') {
    style.width = processWidth(width, true)
  }
  if (height !== undefined && height !== '') {
    style.height = processWidth(height, true)
  }

  return style
}
