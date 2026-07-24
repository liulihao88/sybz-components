import type { Component, CSSProperties, VNodeChild } from 'vue'
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
import type {
  UploadPropsPublic,
  UploadRawFile,
  UploadRequestOptions,
  UploadUserFile,
} from 'element-plus/es/components/upload'

export type SybzComponentTheme = 'default' | 'chenghua' | 'shijingshan'
export type SybzComponentSize = 'small' | 'default' | 'large'
export type SybzRecord = Record<string, any>

export type SUploadRequestContext = Omit<UploadRequestOptions, 'file'>
export type SUploadRequest = (file: UploadRawFile, context: SUploadRequestContext) => XMLHttpRequest | Promise<unknown>
export type SUploadCancel = (file: UploadRawFile, context: SUploadRequestContext) => void | Promise<void>
export type SUploadValidationReason = 'type' | 'size' | 'before-upload'

export interface SUploadSelfProps {
  /** 双向绑定的文件列表 */
  modelValue?: UploadUserFile[]
  /** 单个文件最大字节数，Infinity 表示不限制 */
  maxFileSizeBytes?: number
  /** 自定义上传接口 */
  request?: SUploadRequest
  /** 取消上传时调用，可用于取消业务请求或分片任务 */
  cancel?: SUploadCancel
  /** 校验失败时是否显示消息提示 */
  showValidationMessage?: boolean
  /** 空状态主文案 */
  placeholder?: string
  /** 空状态辅助文案 */
  tip?: string
}

export type SUploadProps = SUploadSelfProps &
  Partial<Omit<UploadPropsPublic, keyof SUploadSelfProps | 'fileList' | 'httpRequest' | 'beforeUpload'>>

export interface SRenderScope<Row extends SybzRecord = SybzRecord> {
  row: Row
  $index: number
  [key: string]: any
}

export type SRenderContext<
  Row extends SybzRecord = SybzRecord,
  Column = SybzRecord,
  Action = SybzRecord,
> = Partial<Row> & {
  row?: Row
  scope?: SRenderScope<Row>
  value?: any
  column?: Column
  action?: Action
  index?: number
  event?: Event
  item?: any
  label?: any
  [key: string]: any
}

export type SRenderFunction<Row extends SybzRecord = SybzRecord, Column = SybzRecord, Action = SybzRecord> = (
  context: SRenderContext<Row, Column, Action>,
) => VNodeChild

export interface SHtmlStringProps {
  /** 是否按 HTML 字符串渲染，推荐使用 Element Plus 同名写法 */
  dangerouslyUseHTMLString?: boolean
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
  /** 主题按钮变体 */
  variant?: '' | 'outline' | 'gradient'
  /** 按钮尺寸 */
  size?: SybzComponentSize
  /** 按钮宽度，数字会按工具方法补单位 */
  width?: string | number
  /** 按钮高度，数字会按工具方法补单位 */
  height?: string | number
  /** 是否开启 hover 动效 */
  hoverAnimation?: boolean
  /** 幽灵按钮，使背景透明并反转文字和边框颜色 */
  ghost?: boolean
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
  [key: string]: any
  label?: string
  value?: any
  labelSlot?: string
  valueSlot?: string
  labelRender?: (context: SDescriptionsRenderContext) => VNodeChild
  render?: (context: SDescriptionsRenderContext) => VNodeChild
  filter?: (context: SDescriptionsFilterContext) => any
  attrs?: SybzRecord
  labelAttrs?: SybzRecord
  valueAttrs?: SybzRecord
}

export interface SDescriptionsFilterContext {
  option: SDescriptionsItemOption
  index: number
  value: any
  label: any
}

export type SDescriptionsRenderContext = SDescriptionsFilterContext

export interface SDescriptionsOwnProps {
  options: SDescriptionsItemOption[]
  theme?: SybzComponentTheme
  column?: number
  labelWidth?: string | number
  showAll?: boolean
  label?: string
  value?: string
}

export type SDialogType = '' | 'drawer'
export type SDialogTheme = SybzComponentTheme | 'norm' | 'norm16' | 'simple'
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
  maximizeHeight?: boolean
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

export interface SCheckboxOptionContext<Option = SybzRecord> {
  option: Option
  index: number
  value: unknown
}

export interface SCheckboxSelfProps<Option = SybzRecord> {
  type?: '' | 'simple'
  options?: any[]
  showType?: 'check' | 'button'
  modelValue?: any[]
  label?: string
  value?: string
  showAll?: boolean
  attrs?: SybzRecord
  customDisabled?: (context: SCheckboxOptionContext<Option>) => boolean
  customLabel?: (context: SCheckboxOptionContext<Option>) => any
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

export interface SCardProps {
  modelValue?: boolean
  size?: SybzComponentSize | string | number
  title?: string
  hoverAnimation?: boolean
  shadow?: 'always' | 'never' | 'hover'
  boxStyle?: SybzRecord
  headerStyle?: SybzRecord
  bodyStyle?: SybzRecord
  footerStyle?: SybzRecord
  transparent?: boolean
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

export interface SFormContext {
  option: SFormFieldItem | SFormTitleItem
  model: SybzRecord
  value: any
  prop?: string
  index: number
  formRef?: any
  getValue: (prop: string) => any
  setValue: (prop: string, value: any) => void
  setFieldValue: (value: any) => void
}

export type SFormDynamic<T> = T | ((context: SFormContext) => T)

export type SFormEventHandler = (value: any, context: SFormContext, ...args: any[]) => void

export type SFormRender = (context: SFormContext) => VNodeChild

export interface SFormRule {
  [key: string]: any
  message?: string
  trigger?: string | string[]
  validator?: any
}

export interface SFormFieldItem {
  [key: string]: any
  /** 透传给表单控件的属性，支持函数动态返回 */
  attrs?: SFormDynamic<SybzRecord>
  /** attrs 的兼容别名，优先级低于 attrs */
  bind?: SFormDynamic<SybzRecord>
  /** attrs 的语义化别名，优先级介于 bind 和 attrs 之间 */
  componentProps?: SFormDynamic<SybzRecord>
  column?: SFormProps['column']
  comp?: string | Component
  /** 默认值别名，只有 model 对应路径不存在时才写入 */
  default?: any
  /** 默认值，只有 model 对应路径不存在时才写入 */
  defaultValue?: any
  directives?: SybzRecord
  /** formItemAttrs 的兼容别名 */
  formAttrs?: SFormDynamic<SybzRecord>
  /** 透传给 el-form-item 的属性，支持函数动态返回 */
  formItemAttrs?: SFormDynamic<SybzRecord>
  /** 展示到控件前的值格式化 */
  formatValue?: (value: any, context: SFormContext) => any
  imgAttrs?: SybzRecord
  isShow?: SFormDynamic<boolean>
  label?: string
  labelRender?: SFormRender
  labelSlotName?: string
  modelEvent?: string
  modelProp?: string
  /** 写入 model 前的值转换 */
  normalize?: (value: any, context: SFormContext) => any
  onChange?: SFormEventHandler
  onUpdate?: SFormEventHandler
  placeholder?: string
  prop?: string
  /** 自定义事件，key 可以是 change / blur / update:modelValue / onChange */
  events?: Record<string, SFormEventHandler>
  render?: SFormRender
  required?: boolean | string
  rules?: SFormDynamic<SFormRule | SFormRule[]>
  slotName?: string
  /** normalize 的兼容别名 */
  transform?: (value: any, context: SFormContext) => any
  useSlot?: boolean
  /** 自定义控件的值属性名，等价于 modelProp */
  valueProp?: string
}

export interface SFormTitleItem extends Omit<
  SFormFieldItem,
  'attrs' | 'comp' | 'column' | 'formItemAttrs' | 'placeholder' | 'rules'
> {
  type: 'title'
  title?: string
  subTitle?: string
  attrs?: SFormDynamic<Partial<STitleProps> & SybzRecord>
  titleSlotName?: string
}

export type SFormFieldList = Array<SFormFieldItem | SFormTitleItem> | Record<string, SFormFieldItem | SFormTitleItem>

export interface SFormProps {
  fieldList: SFormFieldList
  model: SybzRecord
  theme?: SybzComponentTheme
  /** showFooter 的别名，设置后优先级更高 */
  footer?: boolean
  showFooter?: boolean
  column?: 1 | 2 | 3 | 4 | 5 | 6
  /** 多列表单项左右间距，仅 column > 1 时生效，默认 16px */
  gap?: string | number
  align?: 'center' | 'top' | 'flex-end'
  /** 是否自动把 defaultValue/default 初始化到 model 中 */
  autoSetDefaultValue?: boolean
  /** 所有 schema 控件的默认透传属性 */
  componentDefaults?: SybzRecord
}

export interface SFunctionSourceCodeProps {
  functionName?: string
}

export interface SMarkdownProps {
  /** Markdown 源文本，默认值：'' */
  source?: string
  /** 是否允许渲染源文本中的原始 HTML，默认值：false */
  allowHtml?: boolean
  /** 是否使用 DOMPurify 过滤渲染后的 HTML，默认值：true */
  sanitize?: boolean
  /** 是否将源文本中的换行转换为 `<br>`，默认值：false */
  breaks?: boolean
  /** 是否自动识别文本中的链接，默认值：true */
  linkify?: boolean
  /** 是否启用语言中立的排版替换，默认值：true */
  typographer?: boolean
  /** 是否对带语言标识的代码块进行语法高亮，默认值：true */
  highlight?: boolean
  /** 是否在代码块中显示复制按钮，默认值：true */
  copyCode?: boolean
  /** 是否渲染 mermaid 代码块，默认值：true */
  mermaid?: boolean
  /** 是否渲染数学公式，默认值：true */
  math?: boolean
  /** 是否为标题生成锚点并收集标题目录，默认值：true */
  headingAnchors?: boolean
  /** 是否在新窗口打开 HTTP(S) 链接，默认值：true */
  externalLinks?: boolean
  /** 相对链接和图片地址的解析基准地址，默认值：'' */
  baseUrl?: string
  /** 是否对图片启用原生懒加载，默认值：true */
  imageLazy?: boolean
  /** 是否允许点击图片打开全屏预览，默认值：true */
  imagePreview?: boolean
  /** Markdown 内容为空时显示的文本，默认值：'' */
  emptyText?: string
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

export interface SWrapperProps {
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

export type SRadioItemType = 'primary' | 'success' | 'warning' | 'danger' | 'info'

export interface SRadioItem {
  value: string | number | boolean
  label: string | number | boolean
  slot?: string
  disabled?: boolean
  class?: string | string[] | Record<string, boolean>
  style?: CSSProperties
  /** button 模式下当前项的语义类型 */
  type?: SRadioItemType
  /** button 模式下当前项选中时的背景色 */
  color?: string
  [key: string]: any
}

export type SRadioOption = SRadioItem | string | number | boolean

export interface SRadioOptionContext<Option = SRadioItem> {
  option: Option
  index: number
  value: unknown
}

export interface SRadioSelfProps<Option = SRadioItem> {
  title?: string
  compTitleStyle?: SybzRecord
  theme?: SybzComponentTheme
  type?: '' | 'boolean' | 'simple'
  showType?: 'radio' | 'button'
  options?: SRadioOption[]
  border?: boolean
  value?: string | number | boolean
  label?: string | number | boolean
  customLabel?: (context: SRadioOptionContext<Option>) => any
  customDisabled?: (context: SRadioOptionContext<Option>) => boolean
}

export type SRadioProps = SRadioSelfProps & Partial<Omit<RadioGroupPropsPublic, keyof SRadioSelfProps>>

export interface SSelectOptionContext<Option = SybzRecord> {
  option: Option
  index: number
  value: unknown
}

export interface SSelectChangeContext<Option = SybzRecord, Value = unknown, Label = unknown> {
  value: Value | Value[] | undefined
  label: Label | Label[] | undefined
  option: Option | Option[] | undefined
  index: number | number[] | undefined
}

export interface SSelectSelfProps<Option = SybzRecord> extends SHtmlStringProps {
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
  customLabel?: (context: SSelectOptionContext<Option>) => any
  width?: string | number
  height?: string | number
  disPlaceholder?: string
  customDisabled?: (context: SSelectOptionContext<Option>) => boolean
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
  disabled?: boolean
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
  theme?: SybzComponentTheme
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
  size?: SybzComponentSize
  subTitle?: string
  subAttrs?: SybzRecord
  inner?: boolean
  margin?: string | number
  gap?: string | number
  t?: string | number
  b?: string | number
  l?: string | number
  tb?: string | number
  height?: string | number
  type?: '' | 'simple' | 'icon' | 'form'
  theme?: SybzComponentTheme
  tag?: 'div' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  level?: 1 | 2 | 3 | 4 | 5 | 6
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
