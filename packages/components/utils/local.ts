import { processWidth } from '@sybz-components/utils'
export const handleWidthHeight = (width, height) => {
  if (!width && !height) {
    return {}
  }
  const widthHeightobj: Record<string, string> = {}
  if (width) {
    widthHeightobj.width = processWidth(width, true)
  }
  if (height) {
    widthHeightobj.height = processWidth(height, true)
  }
  return widthHeightobj
}
