import type {
  STableButton as STableButtonType,
  STableColumn as STableColumnType,
  STablePageAttrs as STablePageAttrsType,
  STableProps as STablePropsType,
  TableCellContext as TableCellContextType,
  TableCallbackContext as TableCallbackContextType,
  TableColumnList as TableColumnListType,
  TableFilterContext as TableFilterContextType,
  TableFilter as TableFilterType,
  TableModelValue as TableModelValueType,
  TablePageChangePayload as TablePageChangePayloadType,
  TableSelectionType as TableSelectionTypeType,
} from './types/table'
import type { AllowedComponentProps, ComponentCustomProps, VNodeProps } from 'vue'

type ComponentInstance<T> = T extends new (...args: any[]) => infer R ? R : never
type JSXComponentProps<Props> = Props & VNodeProps & AllowedComponentProps & ComponentCustomProps & { children?: any }

declare global {
  type TableBtnItem = STableButtonType
  type TableColumnItem = STableColumnType
  type TableColumnList = TableColumnListType
  type TableCellContext = TableCellContextType
  type TableCallbackContext = TableCallbackContextType
  type TableFilter = TableFilterType
  type TableFilterContext = TableFilterContextType
  type TableModelValue = TableModelValueType
  type TablePageChangePayload = TablePageChangePayloadType
  type STablePageAttrs = STablePageAttrsType
  type TableSelectionType = TableSelectionTypeType
  type STableProps = STablePropsType
}

declare module 'vue' {
  export interface GlobalComponents {
    /**
     * 在线文档：https://liulihao88.github.io/sybz-components/components/company/baseHeader/home.html
     */
    SBaseHeader: (typeof import('./types/components/company/baseHeader'))['default']
    /**
     * 在线文档：https://liulihao88.github.io/sybz-components/components/company/baseHeader/home.html
     */
    's-base-header': (typeof import('./types/components/company/baseHeader'))['default']
    /**
     * 在线文档：https://liulihao88.github.io/sybz-components/components/buildTime/home.html
     */
    SBuildTime: (typeof import('./types/components/buildTime'))['default']
    /**
     * 在线文档：https://liulihao88.github.io/sybz-components/components/buildTime/home.html
     */
    's-build-time': (typeof import('./types/components/buildTime'))['default']
    /**
     * 在线文档：https://liulihao88.github.io/sybz-components/components/button/home.html
     *
     * s-button 按钮组件，支持链接地址和打开目标、图标位置、ghost 幽灵按钮、Element Plus Button 属性和 sybz 扩展属性。
     */
    SButton: (typeof import('./types/components/button'))['default']
    /**
     * 在线文档：https://liulihao88.github.io/sybz-components/components/button/home.html
     *
     * s-button 按钮组件，支持链接地址和打开目标、图标位置、ghost 幽灵按钮、Element Plus Button 属性和 sybz 扩展属性。
     */
    's-button': (typeof import('./types/components/button'))['default']
    /**
     * 在线文档：https://liulihao88.github.io/sybz-components/components/company/capacityProgress/home.html
     */
    SCapacityProgress: (typeof import('./types/components/company/capacityProgress'))['default']
    /**
     * 在线文档：https://liulihao88.github.io/sybz-components/components/company/capacityProgress/home.html
     */
    's-capacity-progress': (typeof import('./types/components/company/capacityProgress'))['default']
    /**
     * 在线文档：https://liulihao88.github.io/sybz-components/components/card/home.html
     */
    SCard: (typeof import('./types/components/card'))['default']
    /**
     * 在线文档：https://liulihao88.github.io/sybz-components/components/card/home.html
     */
    's-card': (typeof import('./types/components/card'))['default']
    /**
     * 在线文档：https://liulihao88.github.io/sybz-components/components/checkbox/home.html
     */
    SCheckbox: (typeof import('./types/components/checkbox'))['default']
    /**
     * 在线文档：https://liulihao88.github.io/sybz-components/components/checkbox/home.html
     */
    's-checkbox': (typeof import('./types/components/checkbox'))['default']
    /**
     * 在线文档：https://liulihao88.github.io/sybz-components/components/clickOutside/home.html
     */
    SClickOutside: (typeof import('./types/components/clickOutside'))['default']
    /**
     * 在线文档：https://liulihao88.github.io/sybz-components/components/clickOutside/home.html
     */
    's-click-outside': (typeof import('./types/components/clickOutside'))['default']
    /**
     * 在线文档：https://liulihao88.github.io/sybz-components/components/compTitle/home.html
     */
    SCompTitle: (typeof import('./types/components/compTitle'))['default']
    /**
     * 在线文档：https://liulihao88.github.io/sybz-components/components/compTitle/home.html
     */
    's-comp-title': (typeof import('./types/components/compTitle'))['default']
    /**
     * 在线文档：https://liulihao88.github.io/sybz-components/components/datePicker/home.html
     *
     * s-date-picker 日期选择组件，支持标题、宽高、主题、内置快捷项，以及通过 futureOnly 限制只能选择当前日期或周期之后的值。
     */
    SDatePicker: (typeof import('./types/components/datePicker'))['default']
    /**
     * 在线文档：https://liulihao88.github.io/sybz-components/components/datePicker/home.html
     *
     * s-date-picker 日期选择组件，支持标题、宽高、主题、内置快捷项，以及通过 futureOnly 限制只能选择当前日期或周期之后的值。
     */
    's-date-picker': (typeof import('./types/components/datePicker'))['default']
    /**
     * 在线文档：https://liulihao88.github.io/sybz-components/components/descriptions/home.html
     */
    SDescriptions: (typeof import('./types/components/descriptions'))['default']
    /**
     * 在线文档：https://liulihao88.github.io/sybz-components/components/descriptions/home.html
     */
    's-descriptions': (typeof import('./types/components/descriptions'))['default']
    /**
     * 在线文档：https://liulihao88.github.io/sybz-components/components/dialog/home.html
     *
     * s-dialog 弹框组件，支持 Element Plus Dialog/Drawer 属性，以及 maximizeHeight 等 sybz 扩展属性。
     */
    SDialog: (typeof import('./types/components/dialog'))['default']
    /**
     * 在线文档：https://liulihao88.github.io/sybz-components/components/dialog/home.html
     *
     * s-dialog 弹框组件，支持 Element Plus Dialog/Drawer 属性，以及 maximizeHeight 等 sybz 扩展属性。
     */
    's-dialog': (typeof import('./types/components/dialog'))['default']
    /**
     * 在线文档：https://liulihao88.github.io/sybz-components/components/drawer/home.html
     */
    SDrawer: (typeof import('./types/components/drawer'))['default']
    /**
     * 在线文档：https://liulihao88.github.io/sybz-components/components/drawer/home.html
     */
    's-drawer': (typeof import('./types/components/drawer'))['default']
    /**
     * 在线文档：https://liulihao88.github.io/sybz-components/components/empty/home.html
     */
    SEmpty: (typeof import('./types/components/empty'))['default']
    /**
     * 在线文档：https://liulihao88.github.io/sybz-components/components/empty/home.html
     */
    's-empty': (typeof import('./types/components/empty'))['default']
    /**
     * 在线文档：https://liulihao88.github.io/sybz-components/components/flex/home.html
     *
     * s-flex 弹性布局组件，支持方向、对齐、间距、伸缩规则以及容器 width 和 height。
     */
    SFlex: (typeof import('./types/components/flex'))['default']
    /**
     * 在线文档：https://liulihao88.github.io/sybz-components/components/flex/home.html
     *
     * s-flex 弹性布局组件，支持方向、对齐、间距、伸缩规则以及容器 width 和 height。
     */
    's-flex': (typeof import('./types/components/flex'))['default']
    /**
     * 在线文档：https://liulihao88.github.io/sybz-components/components/form/home.html
     *
     * s-form 表单组件，支持 schema 字段编排、动态配置、字段标签 tooltip 提示及 dangerouslyUseHTMLString。
     */
    SForm: (typeof import('./types/components/form'))['default']
    /**
     * 在线文档：https://liulihao88.github.io/sybz-components/components/form/home.html
     *
     * s-form 表单组件，支持 schema 字段编排、动态配置、字段标签 tooltip 提示及 dangerouslyUseHTMLString。
     */
    's-form': (typeof import('./types/components/form'))['default']
    /**
     * 在线文档：https://liulihao88.github.io/sybz-components/components/functionSourceCode/home.html
     */
    SFunctionSourceCode: (typeof import('./types/components/functionSourceCode'))['default']
    /**
     * 在线文档：https://liulihao88.github.io/sybz-components/components/functionSourceCode/home.html
     */
    's-function-source-code': (typeof import('./types/components/functionSourceCode'))['default']
    /**
     * 在线文档：https://liulihao88.github.io/sybz-components/components/icon/home.html
     *
     * s-icon 图标组件，支持 Iconify、Element Plus、本地 SVG、尺寸、颜色、旋转角度和 tooltip。
     */
    SIcon: (typeof import('./types/components/icon'))['default']
    /**
     * 在线文档：https://liulihao88.github.io/sybz-components/components/icon/home.html
     *
     * s-icon 图标组件，支持 Iconify、Element Plus、本地 SVG、尺寸、颜色、旋转角度和 tooltip。
     */
    's-icon': (typeof import('./types/components/icon'))['default']
    /**
     * 在线文档：https://liulihao88.github.io/sybz-components/components/image/home.html
     *
     * s-image 图片组件，完整兼容 Element Plus Image，并支持宽高、公共基础路径和源码资源解析。
     */
    SImage: (typeof import('./types/components/image'))['default']
    /**
     * 在线文档：https://liulihao88.github.io/sybz-components/components/image/home.html
     *
     * s-image 图片组件，完整兼容 Element Plus Image，并支持宽高、公共基础路径和源码资源解析。
     */
    's-image': (typeof import('./types/components/image'))['default']
    /**
     * 在线文档：https://liulihao88.github.io/sybz-components/components/input/home.html
     */
    SInput: (typeof import('./types/components/input'))['default']
    /**
     * 在线文档：https://liulihao88.github.io/sybz-components/components/input/home.html
     */
    's-input': (typeof import('./types/components/input'))['default']
    /**
     * 在线文档：https://liulihao88.github.io/sybz-components/components/inputLabel/home.html
     */
    SInputLabel: (typeof import('./types/components/inputLabel'))['default']
    /**
     * 在线文档：https://liulihao88.github.io/sybz-components/components/inputLabel/home.html
     */
    's-input-label': (typeof import('./types/components/inputLabel'))['default']
    /**
     * 在线文档：https://liulihao88.github.io/sybz-components/components/inputNumber/home.html
     */
    SInputNumber: (typeof import('./types/components/inputNumber'))['default']
    /**
     * 在线文档：https://liulihao88.github.io/sybz-components/components/inputNumber/home.html
     */
    's-input-number': (typeof import('./types/components/inputNumber'))['default']
    /**
     * 在线文档：https://liulihao88.github.io/sybz-components/components/item/home.html
     */
    SItem: (typeof import('./types/components/item'))['default']
    /**
     * 在线文档：https://liulihao88.github.io/sybz-components/components/item/home.html
     */
    's-item': (typeof import('./types/components/item'))['default']
    /**
     * 在线文档：https://liulihao88.github.io/sybz-components/components/markdown/home.html
     *
     * s-markdown Markdown 渲染组件，支持图片全屏预览、缩放、旋转、多图切换和下载。
     */
    SMarkdown: (typeof import('./types/components/markdown'))['default']
    /**
     * 在线文档：https://liulihao88.github.io/sybz-components/components/markdown/home.html
     *
     * s-markdown Markdown 渲染组件，支持图片全屏预览、缩放、旋转、多图切换和下载。
     */
    's-markdown': (typeof import('./types/components/markdown'))['default']
    /**
     * 在线文档：https://liulihao88.github.io/sybz-components/components/popconfirm/home.html
     */
    SPopconfirm: (typeof import('./types/components/popconfirm'))['default']
    /**
     * 在线文档：https://liulihao88.github.io/sybz-components/components/popconfirm/home.html
     */
    's-popconfirm': (typeof import('./types/components/popconfirm'))['default']
    /**
     * 在线文档：https://liulihao88.github.io/sybz-components/components/progress/home.html
     */
    SProgress: (typeof import('./types/components/progress'))['default']
    /**
     * 在线文档：https://liulihao88.github.io/sybz-components/components/progress/home.html
     */
    's-progress': (typeof import('./types/components/progress'))['default']
    /**
     * 在线文档：https://liulihao88.github.io/sybz-components/components/radio/home.html
     */
    SRadio: (typeof import('./types/components/radio'))['default']
    /**
     * 在线文档：https://liulihao88.github.io/sybz-components/components/radio/home.html
     */
    's-radio': (typeof import('./types/components/radio'))['default']
    /**
     * 在线文档：https://liulihao88.github.io/sybz-components/components/row/home.html
     */
    SRow: (typeof import('./types/components/row'))['default']
    /**
     * 在线文档：https://liulihao88.github.io/sybz-components/components/row/home.html
     */
    's-row': (typeof import('./types/components/row'))['default']
    /**
     * 在线文档：https://liulihao88.github.io/sybz-components/components/company/scheduleCalendar/home.html
     */
    SScheduleCalendar: (typeof import('./types/components/company/scheduleCalendar'))['default']
    /**
     * 在线文档：https://liulihao88.github.io/sybz-components/components/company/scheduleCalendar/home.html
     */
    's-schedule-calendar': (typeof import('./types/components/company/scheduleCalendar'))['default']
    /**
     * 在线文档：https://liulihao88.github.io/sybz-components/components/select/home.html
     */
    SSelect: (typeof import('./types/components/select'))['default']
    /**
     * 在线文档：https://liulihao88.github.io/sybz-components/components/select/home.html
     */
    's-select': (typeof import('./types/components/select'))['default']
    /**
     * 在线文档：https://liulihao88.github.io/sybz-components/components/splitPane/home.html
     */
    SSplitPane: (typeof import('./types/components/splitPane'))['default']
    /**
     * 在线文档：https://liulihao88.github.io/sybz-components/components/splitPane/home.html
     */
    's-split-pane': (typeof import('./types/components/splitPane'))['default']
    /**
     * 在线文档：https://liulihao88.github.io/sybz-components/components/svg/home.html
     */
    SSvg: (typeof import('./types/components/svg'))['default']
    /**
     * 在线文档：https://liulihao88.github.io/sybz-components/components/svg/home.html
     */
    's-svg': (typeof import('./types/components/svg'))['default']
    /**
     * 在线文档：https://liulihao88.github.io/sybz-components/components/switch/home.html
     */
    SSwitch: (typeof import('./types/components/switch'))['default']
    /**
     * 在线文档：https://liulihao88.github.io/sybz-components/components/switch/home.html
     */
    's-switch': (typeof import('./types/components/switch'))['default']
    /**
     * 在线文档：https://liulihao88.github.io/sybz-components/components/table/home.html
     */
    STable: (typeof import('./types/components/table'))['default']
    /**
     * 在线文档：https://liulihao88.github.io/sybz-components/components/table/home.html
     */
    's-table': (typeof import('./types/components/table'))['default']
    /**
     * 在线文档：https://liulihao88.github.io/sybz-components/components/tableSearch/home.html
     */
    STableSearch: (typeof import('./types/components/tableSearch'))['default']
    /**
     * 在线文档：https://liulihao88.github.io/sybz-components/components/tableSearch/home.html
     */
    's-table-search': (typeof import('./types/components/tableSearch'))['default']
    /**
     * 在线文档：https://liulihao88.github.io/sybz-components/components/tabs/home.html
     *
     * s-tabs 标签页组件，modelValue 支持 string / number / boolean / null / undefined，并支持 capsule 类型、主题、尺寸、宽高以及通过 headerMargin 自定义头部外边距。
     */
    STabs: (typeof import('./types/components/tabs'))['default']
    /**
     * 在线文档：https://liulihao88.github.io/sybz-components/components/tabs/home.html
     *
     * s-tabs 标签页组件，modelValue 支持 string / number / boolean / null / undefined，并支持 capsule 类型、主题、尺寸、宽高以及通过 headerMargin 自定义头部外边距。
     */
    's-tabs': (typeof import('./types/components/tabs'))['default']
    /**
     * 在线文档：https://liulihao88.github.io/sybz-components/components/tag/home.html
     */
    STag: (typeof import('./types/components/tag'))['default']
    /**
     * 在线文档：https://liulihao88.github.io/sybz-components/components/tag/home.html
     */
    's-tag': (typeof import('./types/components/tag'))['default']
    /**
     * 在线文档：https://liulihao88.github.io/sybz-components/components/test/home.html
     */
    STest: (typeof import('./types/components/test'))['default']
    /**
     * 在线文档：https://liulihao88.github.io/sybz-components/components/test/home.html
     */
    's-test': (typeof import('./types/components/test'))['default']
    /**
     * 在线文档：https://liulihao88.github.io/sybz-components/components/title/home.html
     *
     * s-title 标题组件，支持通过 icon 属性或插槽设置图标，标题溢出时自动显示 tooltip，并支持通过 extra 属性或插槽设置右侧内容。
     */
    STitle: (typeof import('./types/components/title'))['default']
    /**
     * 在线文档：https://liulihao88.github.io/sybz-components/components/title/home.html
     *
     * s-title 标题组件，支持通过 icon 属性或插槽设置图标，标题溢出时自动显示 tooltip，并支持通过 extra 属性或插槽设置右侧内容。
     */
    's-title': (typeof import('./types/components/title'))['default']
    /**
     * 在线文档：https://liulihao88.github.io/sybz-components/components/tooltip/home.html
     */
    STooltip: (typeof import('./types/components/tooltip'))['default']
    /**
     * 在线文档：https://liulihao88.github.io/sybz-components/components/tooltip/home.html
     */
    's-tooltip': (typeof import('./types/components/tooltip'))['default']
    /**
     * 在线文档：https://liulihao88.github.io/sybz-components/components/upload/home.html
     */
    SUpload: (typeof import('./types/components/upload'))['default']
    /**
     * 在线文档：https://liulihao88.github.io/sybz-components/components/upload/home.html
     */
    's-upload': (typeof import('./types/components/upload'))['default']
    /**
     * 在线文档：https://liulihao88.github.io/sybz-components/components/warning/home.html
     *
     * s-warning 警告组件，支持设置 width 和 height；设置 height 后内容会垂直居中。
     */
    SWarning: (typeof import('./types/components/warning'))['default']
    /**
     * 在线文档：https://liulihao88.github.io/sybz-components/components/warning/home.html
     *
     * s-warning 警告组件，支持设置 width 和 height；设置 height 后内容会垂直居中。
     */
    's-warning': (typeof import('./types/components/warning'))['default']
    /**
     * 在线文档：https://liulihao88.github.io/sybz-components/components/wrapper/home.html
     */
    SWrapper: (typeof import('./types/components/wrapper'))['default']
    /**
     * 在线文档：https://liulihao88.github.io/sybz-components/components/wrapper/home.html
     */
    's-wrapper': (typeof import('./types/components/wrapper'))['default']
  }
}

export type SBaseHeaderComponent = (typeof import('./types/components/company/baseHeader'))['default']
export type SBaseHeaderInstance = ComponentInstance<SBaseHeaderComponent>
export type SBaseHeaderPublicProps = SBaseHeaderInstance['$props']

export type SBuildTimeComponent = (typeof import('./types/components/buildTime'))['default']
export type SBuildTimeInstance = ComponentInstance<SBuildTimeComponent>
export type SBuildTimePublicProps = SBuildTimeInstance['$props']

export type SButtonComponent = import('./types/components/button').SButtonComponent
export type SButtonInstance = ComponentInstance<SButtonComponent>
export type SButtonPublicProps = import('./types/components/button').SButtonPublicProps

export type SCapacityProgressComponent = (typeof import('./types/components/company/capacityProgress'))['default']
export type SCapacityProgressInstance = ComponentInstance<SCapacityProgressComponent>
export type SCapacityProgressPublicProps = SCapacityProgressInstance['$props']

export type SCardComponent = (typeof import('./types/components/card'))['default']
export type SCardInstance = ComponentInstance<SCardComponent>
export type SCardPublicProps = SCardInstance['$props']

export type SCheckboxComponent = import('./types/components/checkbox').SCheckboxComponent
export type SCheckboxInstance = ComponentInstance<SCheckboxComponent>
export type SCheckboxPublicProps = import('./types/components/checkbox').SCheckboxPublicProps

export type SClickOutsideComponent = (typeof import('./types/components/clickOutside'))['default']
export type SClickOutsideInstance = ComponentInstance<SClickOutsideComponent>
export type SClickOutsidePublicProps = SClickOutsideInstance['$props']

export type SCompTitleComponent = (typeof import('./types/components/compTitle'))['default']
export type SCompTitleInstance = ComponentInstance<SCompTitleComponent>
export type SCompTitlePublicProps = SCompTitleInstance['$props']

export type SDatePickerComponent = import('./types/components/datePicker').SDatePickerComponent
export type SDatePickerInstance = ComponentInstance<SDatePickerComponent>
export type SDatePickerPublicProps = import('./types/components/datePicker').SDatePickerPublicProps

export type SDescriptionsComponent = import('./types/components/descriptions').SDescriptionsComponent
export type SDescriptionsInstance = ComponentInstance<SDescriptionsComponent>
export type SDescriptionsPublicProps = import('./types/components/descriptions').SDescriptionsPublicProps

export type SDialogComponent = import('./types/components/dialog').SDialogComponent
export type SDialogInstance = ComponentInstance<SDialogComponent>
export type SDialogPublicProps = import('./types/components/dialog').SDialogPublicProps

export type SDrawerComponent = import('./types/components/drawer').SDrawerComponent
export type SDrawerInstance = ComponentInstance<SDrawerComponent>
export type SDrawerPublicProps = import('./types/components/drawer').SDrawerPublicProps

export type SEmptyComponent = import('./types/components/empty').SEmptyComponent
export type SEmptyInstance = ComponentInstance<SEmptyComponent>
export type SEmptyPublicProps = import('./types/components/empty').SEmptyPublicProps

export type SFlexComponent = (typeof import('./types/components/flex'))['default']
export type SFlexInstance = ComponentInstance<SFlexComponent>
export type SFlexPublicProps = SFlexInstance['$props']

export type SFormComponent = import('./types/components/form').SFormComponent
export type SFormInstance = ComponentInstance<SFormComponent>
export type SFormPublicProps = import('./types/components/form').SFormPublicProps

export type SFunctionSourceCodeComponent = (typeof import('./types/components/functionSourceCode'))['default']
export type SFunctionSourceCodeInstance = ComponentInstance<SFunctionSourceCodeComponent>
export type SFunctionSourceCodePublicProps = SFunctionSourceCodeInstance['$props']

export type SIconComponent = (typeof import('./types/components/icon'))['default']
export type SIconInstance = ComponentInstance<SIconComponent>
export type SIconPublicProps = SIconInstance['$props']

export type SImageComponent = import('./types/components/image').SImageComponent
export type SImageInstance = ComponentInstance<SImageComponent>
export type SImagePublicProps = import('./types/components/image').SImagePublicProps

export type SInputComponent = import('./types/components/input').SInputComponent
export type SInputInstance = ComponentInstance<SInputComponent>
export type SInputPublicProps = import('./types/components/input').SInputPublicProps

export type SInputLabelComponent = (typeof import('./types/components/inputLabel'))['default']
export type SInputLabelInstance = ComponentInstance<SInputLabelComponent>
export type SInputLabelPublicProps = SInputLabelInstance['$props']

export type SInputNumberComponent = import('./types/components/inputNumber').SInputNumberComponent
export type SInputNumberInstance = ComponentInstance<SInputNumberComponent>
export type SInputNumberPublicProps = import('./types/components/inputNumber').SInputNumberPublicProps

export type SItemComponent = (typeof import('./types/components/item'))['default']
export type SItemInstance = ComponentInstance<SItemComponent>
export type SItemPublicProps = SItemInstance['$props']

export type SMarkdownComponent = import('./types/components/markdown').SMarkdownComponent
export type SMarkdownInstance = ComponentInstance<SMarkdownComponent>
export type SMarkdownPublicProps = import('./types/components/markdown').SMarkdownPublicProps

export type SPopconfirmComponent = import('./types/components/popconfirm').SPopconfirmComponent
export type SPopconfirmInstance = ComponentInstance<SPopconfirmComponent>
export type SPopconfirmPublicProps = import('./types/components/popconfirm').SPopconfirmPublicProps

export type SProgressComponent = import('./types/components/progress').SProgressComponent
export type SProgressInstance = ComponentInstance<SProgressComponent>
export type SProgressPublicProps = import('./types/components/progress').SProgressPublicProps

export type SRadioComponent = import('./types/components/radio').SRadioComponent
export type SRadioInstance = ComponentInstance<SRadioComponent>
export type SRadioPublicProps = import('./types/components/radio').SRadioPublicProps

export type SRowComponent = import('./types/components/row').SRowComponent
export type SRowInstance = ComponentInstance<SRowComponent>
export type SRowPublicProps = import('./types/components/row').SRowPublicProps

export type SScheduleCalendarComponent = (typeof import('./types/components/company/scheduleCalendar'))['default']
export type SScheduleCalendarInstance = ComponentInstance<SScheduleCalendarComponent>
export type SScheduleCalendarPublicProps = SScheduleCalendarInstance['$props']

export type SSelectComponent = import('./types/components/select').SSelectComponent
export type SSelectInstance = ComponentInstance<SSelectComponent>
export type SSelectPublicProps = import('./types/components/select').SSelectPublicProps

export type SSplitPaneComponent = (typeof import('./types/components/splitPane'))['default']
export type SSplitPaneInstance = ComponentInstance<SSplitPaneComponent>
export type SSplitPanePublicProps = SSplitPaneInstance['$props']

export type SSvgComponent = (typeof import('./types/components/svg'))['default']
export type SSvgInstance = ComponentInstance<SSvgComponent>
export type SSvgPublicProps = SSvgInstance['$props']

export type SSwitchComponent = import('./types/components/switch').SSwitchComponent
export type SSwitchInstance = ComponentInstance<SSwitchComponent>
export type SSwitchPublicProps = import('./types/components/switch').SSwitchPublicProps

export type STableComponent = import('./types/components/table').STableComponent
export type STableInstance = ComponentInstance<STableComponent>
export type STablePublicProps = import('./types/components/table').STablePublicProps

export type STableSearchComponent = (typeof import('./types/components/tableSearch'))['default']
export type STableSearchInstance = ComponentInstance<STableSearchComponent>
export type STableSearchPublicProps = STableSearchInstance['$props']

export type STabsComponent = import('./types/components/tabs').STabsComponent
export type STabsInstance = ComponentInstance<STabsComponent>
export type STabsPublicProps = import('./types/components/tabs').STabsPublicProps

export type STagComponent = import('./types/components/tag').STagComponent
export type STagInstance = ComponentInstance<STagComponent>
export type STagPublicProps = import('./types/components/tag').STagPublicProps

export type STestComponent = (typeof import('./types/components/test'))['default']
export type STestInstance = ComponentInstance<STestComponent>
export type STestPublicProps = STestInstance['$props']

export type STitleComponent = (typeof import('./types/components/title'))['default']
export type STitleInstance = ComponentInstance<STitleComponent>
export type STitlePublicProps = STitleInstance['$props']

export type STooltipComponent = import('./types/components/tooltip').STooltipComponent
export type STooltipInstance = ComponentInstance<STooltipComponent>
export type STooltipPublicProps = import('./types/components/tooltip').STooltipPublicProps

export type SUploadComponent = import('./types/components/upload').SUploadComponent
export type SUploadInstance = ComponentInstance<SUploadComponent>
export type SUploadPublicProps = import('./types/components/upload').SUploadPublicProps

export type SWarningComponent = (typeof import('./types/components/warning'))['default']
export type SWarningInstance = ComponentInstance<SWarningComponent>
export type SWarningPublicProps = SWarningInstance['$props']

export type SWrapperComponent = (typeof import('./types/components/wrapper'))['default']
export type SWrapperInstance = ComponentInstance<SWrapperComponent>
export type SWrapperPublicProps = SWrapperInstance['$props']

declare global {
  namespace JSX {
    export interface IntrinsicElements {
      's-base-header': JSXComponentProps<SBaseHeaderPublicProps>
      's-build-time': JSXComponentProps<SBuildTimePublicProps>
      's-button': JSXComponentProps<SButtonPublicProps>
      's-capacity-progress': JSXComponentProps<SCapacityProgressPublicProps>
      's-card': JSXComponentProps<SCardPublicProps>
      's-checkbox': JSXComponentProps<SCheckboxPublicProps>
      's-click-outside': JSXComponentProps<SClickOutsidePublicProps>
      's-comp-title': JSXComponentProps<SCompTitlePublicProps>
      's-date-picker': JSXComponentProps<SDatePickerPublicProps>
      's-descriptions': JSXComponentProps<SDescriptionsPublicProps>
      's-dialog': JSXComponentProps<SDialogPublicProps>
      's-drawer': JSXComponentProps<SDrawerPublicProps>
      's-empty': JSXComponentProps<SEmptyPublicProps>
      's-flex': JSXComponentProps<SFlexPublicProps>
      's-form': JSXComponentProps<SFormPublicProps>
      's-function-source-code': JSXComponentProps<SFunctionSourceCodePublicProps>
      's-icon': JSXComponentProps<SIconPublicProps>
      's-image': JSXComponentProps<SImagePublicProps>
      's-input': JSXComponentProps<SInputPublicProps>
      's-input-label': JSXComponentProps<SInputLabelPublicProps>
      's-input-number': JSXComponentProps<SInputNumberPublicProps>
      's-item': JSXComponentProps<SItemPublicProps>
      's-markdown': JSXComponentProps<SMarkdownPublicProps>
      's-popconfirm': JSXComponentProps<SPopconfirmPublicProps>
      's-progress': JSXComponentProps<SProgressPublicProps>
      's-radio': JSXComponentProps<SRadioPublicProps>
      's-row': JSXComponentProps<SRowPublicProps>
      's-schedule-calendar': JSXComponentProps<SScheduleCalendarPublicProps>
      's-select': JSXComponentProps<SSelectPublicProps>
      's-split-pane': JSXComponentProps<SSplitPanePublicProps>
      's-svg': JSXComponentProps<SSvgPublicProps>
      's-switch': JSXComponentProps<SSwitchPublicProps>
      's-table': JSXComponentProps<STablePublicProps>
      's-table-search': JSXComponentProps<STableSearchPublicProps>
      's-tabs': JSXComponentProps<STabsPublicProps>
      's-tag': JSXComponentProps<STagPublicProps>
      's-test': JSXComponentProps<STestPublicProps>
      's-title': JSXComponentProps<STitlePublicProps>
      's-tooltip': JSXComponentProps<STooltipPublicProps>
      's-upload': JSXComponentProps<SUploadPublicProps>
      's-warning': JSXComponentProps<SWarningPublicProps>
      's-wrapper': JSXComponentProps<SWrapperPublicProps>
    }
  }
}

export {}
