import type { Component, VNode } from 'vue'
import type { InputPropsPublic } from 'element-plus/es/components/input/src/input'
import type { InputNumberPropsPublic } from 'element-plus/es/components/input-number'
import type { ButtonPropsPublic } from 'element-plus/es/components/button'
import type { CheckboxGroupPropsPublic } from 'element-plus/es/components/checkbox'
import type { SwitchPropsPublic } from 'element-plus/es/components/switch'
import type { DialogPropsPublic } from 'element-plus/es/components/dialog'
import type { DrawerPropsPublic } from 'element-plus/es/components/drawer'
import type { DatePickerPropsPublic } from 'element-plus/es/components/date-picker/src/props'
import type { DescriptionPropsPublic } from 'element-plus/es/components/descriptions/src/description'
import type { SelectPropsPublic } from 'element-plus/es/components/select'
import type { ElTooltipPropsPublic } from 'element-plus/es/components/tooltip'
import type { EmptyPropsPublic } from 'element-plus/es/components/empty'
import type { PopoverPropsPublic } from 'element-plus/es/components/popover'
import type { ProgressPropsPublic } from 'element-plus/es/components/progress'
import type { RadioGroupPropsPublic } from 'element-plus/es/components/radio'
import type { TabsPropsPublic } from 'element-plus/es/components/tabs'
import type { TagPropsPublic } from 'element-plus/es/components/tag'
import type { RowPropsPublic } from 'element-plus/es/components/row'

export type SybzComponentTheme = '' | 'chenghua'
export type SybzComponentSize = '' | 'small' | 'default' | 'large'
export type SybzRecord = Record<string, any>

export interface SHtmlStringProps {
  /** 是否按 HTML 字符串渲染，推荐使用 Element Plus 同名写法 */
  dangerouslyUseHTMLString?: boolean
  /** 是否按 HTML 字符串渲染，兼容旧写法 */
  dangerouslyUseHtmlString?: boolean
}

export interface SBuildTimeProps {
  componentsLabel?: string
  utilsLabel?: string
  emptyText?: string
  inline?: boolean
}

export interface SButtonSelfProps extends SHtmlStringProps {
  /** 点击后进入 loading 状态的毫秒数，0 表示不启用点击节流 loading */
  time?: number
  /** 按钮提示内容，设置后会用 s-tooltip 包裹按钮 */
  content?: string
  /** 透传给 s-tooltip 的属性 */
  tooltipAttrs?: SybzRecord
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

export interface SDatePickerSelfProps {
  title?: string
  width?: string | number
  height?: string | number
  theme?: SybzComponentTheme
  shortcuts?: DatePickerPropsPublic['shortcuts'] | false
  compTitleStyle?: SybzRecord
}

export type SDatePickerProps = SDatePickerSelfProps &
  Omit<Partial<DatePickerPropsPublic>, keyof SDatePickerSelfProps | 'shortcuts'>

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

export interface SDescriptionsOwnProps {
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
  subTitle?: string
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

export type SDialogPanelProps = Partial<Omit<DialogPropsPublic & DrawerPropsPublic, keyof SDialogSelfProps>>

export type SDialogProps = SDialogSelfProps & SDialogPanelProps

export interface SInputSelfProps extends SHtmlStringProps {
  modelValue: any
  compTitleStyle?: SybzRecord
  width?: string | number
  height?: string | number
  maxlength?: string | number
  hideMaxLengthError?: boolean
  maxLengthErrorText?: string
  size?: SybzComponentSize
  theme?: SybzComponentTheme
  showWordLimit?: boolean | string
  block?: boolean
  disPlaceholder?: string
  subAttrs?: SybzRecord
  tooltipAttrs?: SybzRecord
  iconAttrs?: SybzRecord
  hideTooltip?: boolean
  options?: any[]
  content?: string
}

export type SInputProps = SInputSelfProps & Partial<Omit<InputPropsPublic, keyof SInputSelfProps>>

export interface SInputNumberSelfProps {
  title?: string
  compTitleStyle?: SybzRecord
  width?: string | number
  height?: string | number
  theme?: SybzComponentTheme
  size?: SybzComponentSize
  subAttrs?: SybzRecord
}

export type SInputNumberProps = SInputNumberSelfProps &
  Partial<Omit<InputNumberPropsPublic, keyof SInputNumberSelfProps>>

export interface SCheckboxSelfProps {
  type?: '' | 'simple'
  options?: any[]
  showType?: 'check' | 'button'
  modelValue?: any[]
  label?: string
  value?: string
  showAll?: boolean
  attrs?: SybzRecord
  customDisabled?: (...args: any[]) => any
  customLabel?: string | ((item: any, index: number) => any)
  gap?: string | number
  theme?: SybzComponentTheme
}

export type SCheckboxProps = SCheckboxSelfProps & Partial<Omit<CheckboxGroupPropsPublic, keyof SCheckboxSelfProps>>

export interface SClickOutsideProps {
  options?: SybzRecord
}

export interface SCompTitleProps {
  title?: string
  compTitleStyle?: SybzRecord
  theme?: SybzComponentTheme
}

export interface SBasicLayoutProps {
  modelValue?: boolean
  size?: SybzComponentSize
  title?: string
  boxStyle?: SybzRecord
  headerStyle?: SybzRecord
  bodyStyle?: SybzRecord
  footerStyle?: SybzRecord
  border?: boolean
  scroll?: boolean
  square?: boolean
  collapsible?: boolean
  collapseTrigger?: 'icon' | 'header'
  theme?: SybzComponentTheme
}

export interface SChartProps {
  width?: string
  height?: string
  id?: string
  option: SybzRecord
  theme?: string
  isEmpty?: boolean | ((options: SybzRecord) => boolean)
  description?: string
}

export type SFlexDirection = 'row' | 'row-reverse' | 'column' | 'column-reverse'
export type SFlexWrap = 'nowrap' | 'wrap' | 'wrap-reverse'
export type SFlexJustify = 'start' | 'end' | 'center' | 'space-between' | 'space-around' | 'space-evenly' | 'normal'
export type SFlexAlign = 'start' | 'end' | 'center' | 'baseline' | 'stretch' | 'normal'

export interface SFlexProps {
  direction?: SFlexDirection
  wrap?: SFlexWrap
  justify?: SFlexJustify
  align?: SFlexAlign
  flex?: string
  gap?: SybzComponentSize | string | number
  component?: string | Component
}

export interface SEmptySelfProps {
  description?: string
  theme?: SybzComponentTheme
  width?: string | number
  height?: string | number
  imgAttrs?: SybzRecord
  src?: string
}

export type SEmptyProps = SEmptySelfProps & Partial<Omit<EmptyPropsPublic, keyof SEmptySelfProps>>

export interface SFormProps {
  fieldList: SybzRecord
  model: SybzRecord
  showFooter?: boolean
  column?: 1 | 2 | 3 | 4 | 5 | 6
  align?: 'center' | 'top' | 'flex-end'
}

export interface SFunctionSourceCodeProps {
  functionName?: string
}

export interface SIconProps extends SHtmlStringProps {
  name: string
  color?: string
  size?: string | number
  disabled?: boolean
  type?: string
  svgAttrs?: SybzRecord
}

export interface SItemProps {
  src?: string
  label: string | number
  value: string | number
  width?: string | number
  height?: string | number
  labelStyle?: SybzRecord
  valueStyle?: SybzRecord
  itemStyle?: SybzRecord
  imgStyle?: SybzRecord
  boxStyle?: SybzRecord
  type?: '' | 'value'
  attrs?: SybzRecord
}

export interface SItemWrapperProps {
  gap?: string | number
  columns?: number | null
  minWidth?: string | number
}

export interface SInputLabelProps {
  modelValue?: any[]
  isComplex?: boolean
  regexp?: RegExp
  message?: string
  inputAttrs?: SybzRecord
}

export interface SRadioItem {
  value: string | number | boolean
  label: string | number | boolean
  slot?: string
  disabled?: boolean
  [key: string]: any
}

export type SRadioOption = SRadioItem | string | number | boolean

export interface SRadioSelfProps {
  title?: string
  compTitleStyle?: SybzRecord
  theme?: SybzComponentTheme
  type?: '' | 'boolean' | 'simple'
  showType?: 'radio' | 'button'
  options?: SRadioOption[]
  border?: boolean
  value?: string | number | boolean
  label?: string | number | boolean
  itemDisabled?: (...args: any[]) => any
}

export type SRadioProps = SRadioSelfProps & Partial<Omit<RadioGroupPropsPublic, keyof SRadioSelfProps>>

export interface SSelectSelfProps extends SHtmlStringProps {
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
  compTitleStyle?: SybzRecord
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
}

export type SSelectProps = SSelectSelfProps & Partial<Omit<SelectPropsPublic, keyof SSelectSelfProps>>

export interface SSwitchSelfProps {
  theme?: SybzComponentTheme
  beforeChange?: (...args: any[]) => any
  width?: string | number
}

export type SSwitchProps = SSwitchSelfProps & Partial<Omit<SwitchPropsPublic, keyof SSwitchSelfProps>>

export interface SProgressSelfProps {
  percentage: number
  animationTime?: number
  isAnimation?: boolean
  customColor?: boolean
}

export type SProgressProps = SProgressSelfProps & Partial<Omit<ProgressPropsPublic, keyof SProgressSelfProps>>

export interface SPopoverConfirmSelfProps extends SHtmlStringProps {
  title?: string
  width?: string | number
  content?: string
  reConfirm?: boolean
  theme?: SybzComponentTheme
}

export type SPopconfirmProps = SPopoverConfirmSelfProps &
  Partial<Omit<PopoverPropsPublic, keyof SPopoverConfirmSelfProps>>

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

export interface SSvgProps {
  prefix?: string
  name: string
  color?: string
  customStyle?: SybzRecord
  size?: string | number
}

export interface STabsSelfProps {
  modelValue: string | number | boolean
  options?: any[]
  label?: string
  value?: string
  subAttrs?: SybzRecord
  trigger?: 'click' | 'hover'
  type?: '' | 'capsule' | TabsPropsPublic['type']
  theme?: '' | 'chenghua'
  size?: 'small' | 'default' | 'large'
}

export type STabsProps = STabsSelfProps & Partial<Omit<TabsPropsPublic, keyof STabsSelfProps>>

export interface STagSelfProps {
  options?: any[]
  value?: string | number
  width?: string | number
  height?: string | number
  primary?: string | number | boolean | any[]
  warning?: string | number | boolean | any[]
  danger?: string | number | boolean | any[]
  info?: string | number | boolean | any[]
  other?: string
  type?: TagPropsPublic['type']
  theme?: SybzComponentTheme
  size?: SybzComponentSize
  config?: SybzRecord
}

export type STagProps = STagSelfProps & Partial<Omit<TagPropsPublic, keyof STagSelfProps>>

export interface STestProps {
  label?: string
  prefix?: string
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

export interface STooltipSelfProps extends SHtmlStringProps {
  width?: string
  lineClamp?: string | number
  showSlot?: boolean
  effect?: string
}

export type STooltipProps = STooltipSelfProps & Partial<Omit<ElTooltipPropsPublic, keyof STooltipSelfProps>>

export interface SDrawerSelfProps {
  confirmText?: string
  cancelText?: string
  showFooter?: boolean
  showConfirm?: boolean
  showCancel?: boolean
  wrapperClosable?: boolean
  confirmAttrs?: SybzRecord
  cancelAttrs?: SybzRecord
  detailAttrs?: SybzRecord
  type?: '' | 'detail'
}

export type SDrawerProps = SDrawerSelfProps & Partial<Omit<DrawerPropsPublic, keyof SDrawerSelfProps>>

export type SDescriptionsProps = SDescriptionsOwnProps &
  Partial<Omit<DescriptionPropsPublic, keyof SDescriptionsOwnProps>>

export interface SRowSelfProps {
  col?: number | number[]
  gap?: string | number
  gutter?: string | number
  justify?: RowPropsPublic['justify']
  align?: RowPropsPublic['align']
  colAttrs?: SybzRecord
}

export type SRowProps = SRowSelfProps & Partial<Omit<RowPropsPublic, keyof SRowSelfProps>>

export type SWarningType = 'info' | 'simple' | 'warning' | 'error'
export type SWarningSize = 'small' | 'default'

export interface SWarningProps extends SHtmlStringProps {
  content: string
  title?: string
  theme?: SybzComponentTheme
  type?: SWarningType
  width?: string | number
  icon?: boolean
  size?: SWarningSize
  dotted?: boolean
  customStyle?: SybzRecord
  iconAttrs?: SybzRecord
  left?: boolean | string | number
}
