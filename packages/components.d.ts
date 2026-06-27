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

type ComponentInstance<T> = T extends new (...args: any[]) => infer R ? R : never

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
    SBaseHeader: (typeof import('./types/components/company/baseHeader'))['default']
    's-base-header': (typeof import('./types/components/company/baseHeader'))['default']
    SBasicLayout: (typeof import('./types/components/basicLayout'))['default']
    's-basic-layout': (typeof import('./types/components/basicLayout'))['default']
    SBuildTime: (typeof import('./types/components/buildTime'))['default']
    's-build-time': (typeof import('./types/components/buildTime'))['default']
    /** s-button 按钮组件，支持 Element Plus Button 属性和 sybz 扩展属性。 */
    SButton: (typeof import('./types/components/button'))['default']
    /** s-button 按钮组件，支持 Element Plus Button 属性和 sybz 扩展属性。 */
    's-button': (typeof import('./types/components/button'))['default']
    SCapacityProgress: (typeof import('./types/components/company/capacityProgress'))['default']
    's-capacity-progress': (typeof import('./types/components/company/capacityProgress'))['default']
    SChart: (typeof import('./types/components/chart'))['default']
    's-chart': (typeof import('./types/components/chart'))['default']
    SCheckbox: (typeof import('./types/components/checkbox'))['default']
    's-checkbox': (typeof import('./types/components/checkbox'))['default']
    SChooseArea: (typeof import('./types/components/chooseArea'))['default']
    's-choose-area': (typeof import('./types/components/chooseArea'))['default']
    SClickOutside: (typeof import('./types/components/clickOutside'))['default']
    's-click-outside': (typeof import('./types/components/clickOutside'))['default']
    SCompTitle: (typeof import('./types/components/compTitle'))['default']
    's-comp-title': (typeof import('./types/components/compTitle'))['default']
    SCountBar: (typeof import('./types/components/company/countBar'))['default']
    's-count-bar': (typeof import('./types/components/company/countBar'))['default']
    SCountBarOld: (typeof import('./types/components/company/countBarOld'))['default']
    's-count-bar-old': (typeof import('./types/components/company/countBarOld'))['default']
    SDatePicker: (typeof import('./types/components/datePicker'))['default']
    's-date-picker': (typeof import('./types/components/datePicker'))['default']
    SDescriptions: (typeof import('./types/components/descriptions'))['default']
    's-descriptions': (typeof import('./types/components/descriptions'))['default']
    /** s-dialog 弹框组件，支持 Element Plus Dialog/Drawer 属性和 sybz 扩展属性。 */
    SDialog: (typeof import('./types/components/dialog'))['default']
    /** s-dialog 弹框组件，支持 Element Plus Dialog/Drawer 属性和 sybz 扩展属性。 */
    's-dialog': (typeof import('./types/components/dialog'))['default']
    SDrawer: (typeof import('./types/components/drawer'))['default']
    's-drawer': (typeof import('./types/components/drawer'))['default']
    SEmpty: (typeof import('./types/components/empty'))['default']
    's-empty': (typeof import('./types/components/empty'))['default']
    SFlex: (typeof import('./types/components/flex'))['default']
    's-flex': (typeof import('./types/components/flex'))['default']
    SForm: (typeof import('./types/components/form'))['default']
    's-form': (typeof import('./types/components/form'))['default']
    SFunctionSourceCode: (typeof import('./types/components/functionSourceCode'))['default']
    's-function-source-code': (typeof import('./types/components/functionSourceCode'))['default']
    SIcon: (typeof import('./types/components/icon'))['default']
    's-icon': (typeof import('./types/components/icon'))['default']
    SInput: (typeof import('./types/components/input'))['default']
    's-input': (typeof import('./types/components/input'))['default']
    SInputLabel: (typeof import('./types/components/inputLabel'))['default']
    's-input-label': (typeof import('./types/components/inputLabel'))['default']
    SInputNumber: (typeof import('./types/components/inputNumber'))['default']
    's-input-number': (typeof import('./types/components/inputNumber'))['default']
    SItem: (typeof import('./types/components/item'))['default']
    's-item': (typeof import('./types/components/item'))['default']
    SItemWrapper: (typeof import('./types/components/itemWrapper'))['default']
    's-item-wrapper': (typeof import('./types/components/itemWrapper'))['default']
    SObjectLine: (typeof import('./types/components/company/objectLine'))['default']
    's-object-line': (typeof import('./types/components/company/objectLine'))['default']
    SPopconfirm: (typeof import('./types/components/popconfirm'))['default']
    's-popconfirm': (typeof import('./types/components/popconfirm'))['default']
    SProgress: (typeof import('./types/components/progress'))['default']
    's-progress': (typeof import('./types/components/progress'))['default']
    SQuotaPie: (typeof import('./types/components/company/quotaPie'))['default']
    's-quota-pie': (typeof import('./types/components/company/quotaPie'))['default']
    SRadio: (typeof import('./types/components/radio'))['default']
    's-radio': (typeof import('./types/components/radio'))['default']
    SRow: (typeof import('./types/components/row'))['default']
    's-row': (typeof import('./types/components/row'))['default']
    SSelect: (typeof import('./types/components/select'))['default']
    's-select': (typeof import('./types/components/select'))['default']
    SSplitPane: (typeof import('./types/components/splitPane'))['default']
    's-split-pane': (typeof import('./types/components/splitPane'))['default']
    SSvg: (typeof import('./types/components/svg'))['default']
    's-svg': (typeof import('./types/components/svg'))['default']
    SSwitch: (typeof import('./types/components/switch'))['default']
    's-switch': (typeof import('./types/components/switch'))['default']
    STable: (typeof import('./types/components/table'))['default']
    's-table': (typeof import('./types/components/table'))['default']
    STabs: (typeof import('./types/components/tabs'))['default']
    's-tabs': (typeof import('./types/components/tabs'))['default']
    STag: (typeof import('./types/components/tag'))['default']
    's-tag': (typeof import('./types/components/tag'))['default']
    STest: (typeof import('./types/components/test'))['default']
    's-test': (typeof import('./types/components/test'))['default']
    STitle: (typeof import('./types/components/title'))['default']
    's-title': (typeof import('./types/components/title'))['default']
    STooltip: (typeof import('./types/components/tooltip'))['default']
    's-tooltip': (typeof import('./types/components/tooltip'))['default']
    SWarning: (typeof import('./types/components/warning'))['default']
    's-warning': (typeof import('./types/components/warning'))['default']
  }
}

export type SBaseHeaderComponent = (typeof import('./types/components/company/baseHeader'))['default']
export type SBaseHeaderInstance = ComponentInstance<SBaseHeaderComponent>
export type SBaseHeaderPublicProps = SBaseHeaderInstance['$props']

export type SBasicLayoutComponent = (typeof import('./types/components/basicLayout'))['default']
export type SBasicLayoutInstance = ComponentInstance<SBasicLayoutComponent>
export type SBasicLayoutPublicProps = SBasicLayoutInstance['$props']

export type SBuildTimeComponent = (typeof import('./types/components/buildTime'))['default']
export type SBuildTimeInstance = ComponentInstance<SBuildTimeComponent>
export type SBuildTimePublicProps = SBuildTimeInstance['$props']

export type SButtonComponent = import('./types/components/button').SButtonComponent
export type SButtonInstance = ComponentInstance<SButtonComponent>
export type SButtonPublicProps = import('./types/components/button').SButtonPublicProps

export type SCapacityProgressComponent = (typeof import('./types/components/company/capacityProgress'))['default']
export type SCapacityProgressInstance = ComponentInstance<SCapacityProgressComponent>
export type SCapacityProgressPublicProps = SCapacityProgressInstance['$props']

export type SChartComponent = (typeof import('./types/components/chart'))['default']
export type SChartInstance = ComponentInstance<SChartComponent>
export type SChartPublicProps = SChartInstance['$props']

export type SCheckboxComponent = import('./types/components/checkbox').SCheckboxComponent
export type SCheckboxInstance = ComponentInstance<SCheckboxComponent>
export type SCheckboxPublicProps = import('./types/components/checkbox').SCheckboxPublicProps

export type SChooseAreaComponent = import('./types/components/chooseArea').SChooseAreaComponent
export type SChooseAreaInstance = ComponentInstance<SChooseAreaComponent>
export type SChooseAreaPublicProps = import('./types/components/chooseArea').SChooseAreaPublicProps

export type SClickOutsideComponent = (typeof import('./types/components/clickOutside'))['default']
export type SClickOutsideInstance = ComponentInstance<SClickOutsideComponent>
export type SClickOutsidePublicProps = SClickOutsideInstance['$props']

export type SCompTitleComponent = (typeof import('./types/components/compTitle'))['default']
export type SCompTitleInstance = ComponentInstance<SCompTitleComponent>
export type SCompTitlePublicProps = SCompTitleInstance['$props']

export type SCountBarComponent = (typeof import('./types/components/company/countBar'))['default']
export type SCountBarInstance = ComponentInstance<SCountBarComponent>
export type SCountBarPublicProps = SCountBarInstance['$props']

export type SCountBarOldComponent = (typeof import('./types/components/company/countBarOld'))['default']
export type SCountBarOldInstance = ComponentInstance<SCountBarOldComponent>
export type SCountBarOldPublicProps = SCountBarOldInstance['$props']

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

export type SItemWrapperComponent = (typeof import('./types/components/itemWrapper'))['default']
export type SItemWrapperInstance = ComponentInstance<SItemWrapperComponent>
export type SItemWrapperPublicProps = SItemWrapperInstance['$props']

export type SObjectLineComponent = (typeof import('./types/components/company/objectLine'))['default']
export type SObjectLineInstance = ComponentInstance<SObjectLineComponent>
export type SObjectLinePublicProps = SObjectLineInstance['$props']

export type SPopconfirmComponent = import('./types/components/popconfirm').SPopconfirmComponent
export type SPopconfirmInstance = ComponentInstance<SPopconfirmComponent>
export type SPopconfirmPublicProps = import('./types/components/popconfirm').SPopconfirmPublicProps

export type SProgressComponent = import('./types/components/progress').SProgressComponent
export type SProgressInstance = ComponentInstance<SProgressComponent>
export type SProgressPublicProps = import('./types/components/progress').SProgressPublicProps

export type SQuotaPieComponent = (typeof import('./types/components/company/quotaPie'))['default']
export type SQuotaPieInstance = ComponentInstance<SQuotaPieComponent>
export type SQuotaPiePublicProps = SQuotaPieInstance['$props']

export type SRadioComponent = import('./types/components/radio').SRadioComponent
export type SRadioInstance = ComponentInstance<SRadioComponent>
export type SRadioPublicProps = import('./types/components/radio').SRadioPublicProps

export type SRowComponent = import('./types/components/row').SRowComponent
export type SRowInstance = ComponentInstance<SRowComponent>
export type SRowPublicProps = import('./types/components/row').SRowPublicProps

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

export type STableComponent = (typeof import('./types/components/table'))['default']
export type STableInstance = ComponentInstance<STableComponent>
export type STablePublicProps = STableInstance['$props']

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

export type SWarningComponent = (typeof import('./types/components/warning'))['default']
export type SWarningInstance = ComponentInstance<SWarningComponent>
export type SWarningPublicProps = SWarningInstance['$props']

export {}
