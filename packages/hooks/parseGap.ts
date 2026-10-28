import { processWidth } from '@sybz-components/utils'

export type GapValue = boolean | string | number
export type Gap = GapValue | [GapValue, GapValue]

function parseGapValue(value: GapValue) {
  if (value === true || value === '' || value === 'small') return '8px'
  if (value === false) return '0px'
  if (value === 'default') return '16px'
  if (value === 'large') return '24px'
  return processWidth(value, true)
}

/** 数组依次表示水平、垂直间距；单值默认同时作用于两个方向。 */
export function parseGap(gap: Gap, singleRowGap?: GapValue) {
  const [x, y] = Array.isArray(gap) ? gap : [gap, singleRowGap ?? gap]
  return { x: parseGapValue(x), y: parseGapValue(y) }
}
