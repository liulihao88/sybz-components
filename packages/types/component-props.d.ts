import type { VNode } from 'vue'
import type { ButtonPropsPublic } from 'element-plus/es/components/button'
import type { DialogPropsPublic } from 'element-plus/es/components/dialog'
import type { DrawerPropsPublic } from 'element-plus/es/components/drawer'
import type { DatePickerPropsPublic } from 'element-plus/es/components/date-picker/src/props'

export type SybzComponentTheme = '' | 'chenghua'
export type SybzComponentSize = '' | 'small' | 'default' | 'large'
export type SybzRecord = Record<string, any>

export interface SBuildTimeProps {
  componentsLabel?: string
  utilsLabel?: string
  emptyText?: string
  inline?: boolean
}

export interface SButtonSelfProps {
  /** 点击后进入 loading 状态的毫秒数，0 表示不启用点击节流 loading */
  time?: number
  /** 按钮提示内容，设置后会用 s-tooltip 包裹按钮 */
  content?: string
  /** 透传给 s-tooltip 的属性 */
  tooltipAttrs?: SybzRecord
  /** 是否允许 tooltip 内容作为 HTML 片段渲染 */
  dangerouslyUseHTMLString?: boolean
  /** 组件主题 */
  theme?: SybzComponentTheme
  /** chenghua 主题下的按钮变体 */
  variant?: '' | 'outline' | 'gradient'
  /** 按钮尺寸 */
  size?: SybzComponentSize
  /** 按钮宽度，数字会按工具方法补单位 */
  width?: string | number
  /** 按钮高度，数字会按工具方法补单位 */
  height?: string | number
  /** 是否开启 hover 动效 */
  hoverAnimation?: boolean
}

export type SButtonProps = SButtonSelfProps & Partial<Omit<ButtonPropsPublic, keyof SButtonSelfProps>>

export type SButtonEmits = {
  click: (evt: MouseEvent) => boolean
}

export interface SDatePickerProps extends Omit<Partial<DatePickerPropsPublic>, 'shortcuts'> {
  title?: string
  width?: string | number
  height?: string | number
  theme?: SybzComponentTheme
  shortcuts?: DatePickerPropsPublic['shortcuts'] | false
  boxStyle?: SybzRecord
}

export interface SDescriptionsItemOption {
  label: string
  value: any
  labelSlot?: string
  valueSlot?: string
  labelRender?: (item: SDescriptionsItemOption) => VNode | string
  render?: (item: SDescriptionsItemOption) => VNode | string
  filter?: (value: any) => any
  attrs?: SybzRecord
  labelAttrs?: SybzRecord
  valueAttrs?: SybzRecord
}

export interface SDescriptionsProps {
  options: SDescriptionsItemOption[]
  theme?: SybzComponentTheme
  column?: number
  labelWidth?: string | number
  showAll?: boolean
}

export type SDialogType = '' | 'drawer'
export type SDialogTheme = '' | 'norm' | 'chenghua'
export type SDialogHandler = string | ((...args: any[]) => any)

export interface SDialogSelfProps {
  type?: SDialogType
  title?: string
  width?: string | number
  theme?: SDialogTheme
  cancel?: SDialogHandler
  cancelText?: string
  confirmText?: string
  showFooter?: boolean
  showCancel?: boolean
  showConfirm?: boolean
  confirmAttrs?: SybzRecord
  cancelAttrs?: SybzRecord
  enableConfirm?: boolean
  confirm?: (...args: any[]) => any
  fillSlot?: boolean
  hideHeaderIcon?: boolean
}

export type SDialogPanelProps = Partial<
  Omit<DialogPropsPublic & DrawerPropsPublic, keyof SDialogSelfProps>
>

export type SDialogProps = SDialogSelfProps & SDialogPanelProps

export interface SEmptyProps {
  description?: string
  theme?: SybzComponentTheme
  width?: string | number
  height?: string | number
  imgAttrs?: SybzRecord
  src?: string
}

export interface SFormProps {
  fieldList: SybzRecord
  model: SybzRecord
  showFooter?: boolean
  column?: 1 | 2 | 3 | 4 | 5 | 6
  align?: 'center' | 'top' | 'flex-end'
}

export interface SRadioItem {
  value: string | number | boolean
  label: string | number | boolean
  slot?: string
  disabled?: boolean
  [key: string]: any
}

export interface SRadioProps {
  title?: string
  boxStyle?: SybzRecord
  theme?: SybzComponentTheme
  type?: '' | 'boolean' | 'simple'
  showType?: 'radio' | 'button'
  options?: SRadioItem[]
  border?: boolean
  value?: string | number | boolean
  label?: string | number | boolean
  itemDisabled?: (...args: any[]) => any
}

export interface SSelectProps {
  modelValue?: any[] | string | number
  value?: string
  label?: string | string[]
  options?: any[]
  type?: '' | 'simple'
  multiple?: boolean
  showAll?: boolean
  showPrefix?: boolean
  showQuick?: boolean
  size?: SybzComponentSize
  theme?: SybzComponentTheme
  title?: string
  boxStyle?: SybzRecord
  connect?: string
  customLabel?: string | ((item: any) => any)
  width?: string | number
  height?: string | number
  disPlaceholder?: string
  itemDisabled?: (...args: any[]) => any
  url?: string | ((...args: any[]) => any)
  urlParams?: SybzRecord
  optionsExpression?: string
  emptyColor?: boolean
  showTooltip?: boolean
  tooltipAttrs?: SybzRecord
  dangerouslyUseHTMLString?: boolean
}

export type SplitPaneDirection = 'vertical' | 'horizontal'

export interface SplitPaneSetting {
  minPercent?: number
  defaultPercent?: number
  split?: SplitPaneDirection
}

export interface SSplitPaneProps {
  splitSet?: SplitPaneSetting
  split?: SplitPaneDirection
  minPercent?: number
  defaultPercent?: number
  resizerSize?: string | number
  resetOnClick?: boolean
  modelValue?: number
}

export interface STitleProps {
  title?: string
  size?: string
  subTitle?: string
  subAttrs?: SybzRecord
  inner?: boolean
  t?: string | number
  b?: string | number
  l?: string | number
  tb?: string | number
  height?: string | number
  type?: 'simple' | 'icon' | 'form' | string
  theme?: SybzComponentTheme
}

export interface STooltipProps {
  width?: string
  lineClamp?: string | number
  showSlot?: boolean
  effect?: string
  dangerouslyUseHTMLString?: boolean
}

export type SWarningType = 'info' | 'simple' | 'warning' | 'error'
export type SWarningSize = 'small' | 'default'

export interface SWarningProps {
  content: string
  title?: string
  theme?: SybzComponentTheme
  type?: SWarningType
  width?: string | number
  dangerouslyUseHTMLString?: boolean
  icon?: boolean
  size?: SWarningSize
  dotted?: boolean
  customStyle?: SybzRecord
  iconAttrs?: SybzRecord
  left?: boolean | string | number
}
