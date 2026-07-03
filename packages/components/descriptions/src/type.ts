import type { RenderFunction } from '@/components/common/render'

export interface DescItem {
  span?: number
  bind?: Record<string, any>
  label?: string
  labelRender?: RenderFunction
  slotName?: string
  tooltip?: string | ((item: any) => any)
  placement?: string
  filters?: {
    list: string
    key?: string
    label?: string
  }
  value?: string | number
  unit?: string
  iconSize?: number
  iconColor?: string
  fieldName?: string
}

export interface TDetailProps {
  descColumn?: number
  dataList?: Record<string, any>
  listTypeInfo?: Record<string, any>
  descData: DescItem[]
  isColon?: boolean
  isLabelBold?: boolean
}
