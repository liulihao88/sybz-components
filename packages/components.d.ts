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
    SBasicLayout: (typeof import('./types/components/basicLayout'))['default']
    SBuildTime: (typeof import('./types/components/buildTime'))['default']
    SButton: (typeof import('./types/components/button'))['default']
    SCapacityProgress: (typeof import('./types/components/company/capacityProgress'))['default']
    SChart: (typeof import('./types/components/chart'))['default']
    SCheckbox: (typeof import('./types/components/checkbox'))['default']
    SChooseArea: (typeof import('./types/components/chooseArea'))['default']
    SClickOutside: (typeof import('./types/components/clickOutside'))['default']
    SCompTitle: (typeof import('./types/components/compTitle'))['default']
    SCountBar: (typeof import('./types/components/company/countBar'))['default']
    SCountBarOld: (typeof import('./types/components/company/countBarOld'))['default']
    SDatePicker: (typeof import('./types/components/datePicker'))['default']
    SDescriptions: (typeof import('./types/components/descriptions'))['default']
    SDialog: (typeof import('./types/components/dialog'))['default']
    SDrawer: (typeof import('./types/components/drawer'))['default']
    SEmpty: (typeof import('./types/components/empty'))['default']
    SFlex: (typeof import('./types/components/flex'))['default']
    SForm: (typeof import('./types/components/form'))['default']
    SFunctionSourceCode: (typeof import('./types/components/functionSourceCode'))['default']
    SIcon: (typeof import('./types/components/icon'))['default']
    SInput: (typeof import('./types/components/input'))['default']
    SInputLabel: (typeof import('./types/components/inputLabel'))['default']
    SInputNumber: (typeof import('./types/components/inputNumber'))['default']
    SItem: (typeof import('./types/components/item'))['default']
    SItemWrapper: (typeof import('./types/components/itemWrapper'))['default']
    SObjectLine: (typeof import('./types/components/company/objectLine'))['default']
    SPopconfirm: (typeof import('./types/components/popconfirm'))['default']
    SProgress: (typeof import('./types/components/progress'))['default']
    SQuotaPie: (typeof import('./types/components/company/quotaPie'))['default']
    SRadio: (typeof import('./types/components/radio'))['default']
    SRow: (typeof import('./types/components/row'))['default']
    SSelect: (typeof import('./types/components/select'))['default']
    SSplitPane: (typeof import('./types/components/splitPane'))['default']
    SSvg: (typeof import('./types/components/svg'))['default']
    SSwitch: (typeof import('./types/components/switch'))['default']
    STable: (typeof import('./types/components/table'))['default']
    STabs: (typeof import('./types/components/tabs'))['default']
    STag: (typeof import('./types/components/tag'))['default']
    STest: (typeof import('./types/components/test'))['default']
    SText: (typeof import('./types/components/text'))['default']
    STitle: (typeof import('./types/components/title'))['default']
    STooltip: (typeof import('./types/components/tooltip'))['default']
    SWarning: (typeof import('./types/components/warning'))['default']
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

export type SButtonComponent = (typeof import('./types/components/button'))['default']
export type SButtonInstance = ComponentInstance<SButtonComponent>
export type SButtonPublicProps = SButtonInstance['$props']

export type SCapacityProgressComponent = (typeof import('./types/components/company/capacityProgress'))['default']
export type SCapacityProgressInstance = ComponentInstance<SCapacityProgressComponent>
export type SCapacityProgressPublicProps = SCapacityProgressInstance['$props']

export type SChartComponent = (typeof import('./types/components/chart'))['default']
export type SChartInstance = ComponentInstance<SChartComponent>
export type SChartPublicProps = SChartInstance['$props']

export type SCheckboxComponent = (typeof import('./types/components/checkbox'))['default']
export type SCheckboxInstance = ComponentInstance<SCheckboxComponent>
export type SCheckboxPublicProps = SCheckboxInstance['$props']

export type SChooseAreaComponent = (typeof import('./types/components/chooseArea'))['default']
export type SChooseAreaInstance = ComponentInstance<SChooseAreaComponent>
export type SChooseAreaPublicProps = SChooseAreaInstance['$props']

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

export type SDatePickerComponent = (typeof import('./types/components/datePicker'))['default']
export type SDatePickerInstance = ComponentInstance<SDatePickerComponent>
export type SDatePickerPublicProps = SDatePickerInstance['$props']

export type SDescriptionsComponent = (typeof import('./types/components/descriptions'))['default']
export type SDescriptionsInstance = ComponentInstance<SDescriptionsComponent>
export type SDescriptionsPublicProps = SDescriptionsInstance['$props']

export type SDialogComponent = (typeof import('./types/components/dialog'))['default']
export type SDialogInstance = ComponentInstance<SDialogComponent>
export type SDialogPublicProps = SDialogInstance['$props']

export type SDrawerComponent = (typeof import('./types/components/drawer'))['default']
export type SDrawerInstance = ComponentInstance<SDrawerComponent>
export type SDrawerPublicProps = SDrawerInstance['$props']

export type SEmptyComponent = (typeof import('./types/components/empty'))['default']
export type SEmptyInstance = ComponentInstance<SEmptyComponent>
export type SEmptyPublicProps = SEmptyInstance['$props']

export type SFlexComponent = (typeof import('./types/components/flex'))['default']
export type SFlexInstance = ComponentInstance<SFlexComponent>
export type SFlexPublicProps = SFlexInstance['$props']

export type SFormComponent = (typeof import('./types/components/form'))['default']
export type SFormInstance = ComponentInstance<SFormComponent>
export type SFormPublicProps = SFormInstance['$props']

export type SFunctionSourceCodeComponent = (typeof import('./types/components/functionSourceCode'))['default']
export type SFunctionSourceCodeInstance = ComponentInstance<SFunctionSourceCodeComponent>
export type SFunctionSourceCodePublicProps = SFunctionSourceCodeInstance['$props']

export type SIconComponent = (typeof import('./types/components/icon'))['default']
export type SIconInstance = ComponentInstance<SIconComponent>
export type SIconPublicProps = SIconInstance['$props']

export type SInputComponent = (typeof import('./types/components/input'))['default']
export type SInputInstance = ComponentInstance<SInputComponent>
export type SInputPublicProps = SInputInstance['$props']

export type SInputLabelComponent = (typeof import('./types/components/inputLabel'))['default']
export type SInputLabelInstance = ComponentInstance<SInputLabelComponent>
export type SInputLabelPublicProps = SInputLabelInstance['$props']

export type SInputNumberComponent = (typeof import('./types/components/inputNumber'))['default']
export type SInputNumberInstance = ComponentInstance<SInputNumberComponent>
export type SInputNumberPublicProps = SInputNumberInstance['$props']

export type SItemComponent = (typeof import('./types/components/item'))['default']
export type SItemInstance = ComponentInstance<SItemComponent>
export type SItemPublicProps = SItemInstance['$props']

export type SItemWrapperComponent = (typeof import('./types/components/itemWrapper'))['default']
export type SItemWrapperInstance = ComponentInstance<SItemWrapperComponent>
export type SItemWrapperPublicProps = SItemWrapperInstance['$props']

export type SObjectLineComponent = (typeof import('./types/components/company/objectLine'))['default']
export type SObjectLineInstance = ComponentInstance<SObjectLineComponent>
export type SObjectLinePublicProps = SObjectLineInstance['$props']

export type SPopconfirmComponent = (typeof import('./types/components/popconfirm'))['default']
export type SPopconfirmInstance = ComponentInstance<SPopconfirmComponent>
export type SPopconfirmPublicProps = SPopconfirmInstance['$props']

export type SProgressComponent = (typeof import('./types/components/progress'))['default']
export type SProgressInstance = ComponentInstance<SProgressComponent>
export type SProgressPublicProps = SProgressInstance['$props']

export type SQuotaPieComponent = (typeof import('./types/components/company/quotaPie'))['default']
export type SQuotaPieInstance = ComponentInstance<SQuotaPieComponent>
export type SQuotaPiePublicProps = SQuotaPieInstance['$props']

export type SRadioComponent = (typeof import('./types/components/radio'))['default']
export type SRadioInstance = ComponentInstance<SRadioComponent>
export type SRadioPublicProps = SRadioInstance['$props']

export type SRowComponent = (typeof import('./types/components/row'))['default']
export type SRowInstance = ComponentInstance<SRowComponent>
export type SRowPublicProps = SRowInstance['$props']

export type SSelectComponent = (typeof import('./types/components/select'))['default']
export type SSelectInstance = ComponentInstance<SSelectComponent>
export type SSelectPublicProps = SSelectInstance['$props']

export type SSplitPaneComponent = (typeof import('./types/components/splitPane'))['default']
export type SSplitPaneInstance = ComponentInstance<SSplitPaneComponent>
export type SSplitPanePublicProps = SSplitPaneInstance['$props']

export type SSvgComponent = (typeof import('./types/components/svg'))['default']
export type SSvgInstance = ComponentInstance<SSvgComponent>
export type SSvgPublicProps = SSvgInstance['$props']

export type SSwitchComponent = (typeof import('./types/components/switch'))['default']
export type SSwitchInstance = ComponentInstance<SSwitchComponent>
export type SSwitchPublicProps = SSwitchInstance['$props']

export type STableComponent = (typeof import('./types/components/table'))['default']
export type STableInstance = ComponentInstance<STableComponent>
export type STablePublicProps = STableInstance['$props']

export type STabsComponent = (typeof import('./types/components/tabs'))['default']
export type STabsInstance = ComponentInstance<STabsComponent>
export type STabsPublicProps = STabsInstance['$props']

export type STagComponent = (typeof import('./types/components/tag'))['default']
export type STagInstance = ComponentInstance<STagComponent>
export type STagPublicProps = STagInstance['$props']

export type STestComponent = (typeof import('./types/components/test'))['default']
export type STestInstance = ComponentInstance<STestComponent>
export type STestPublicProps = STestInstance['$props']

export type STextComponent = (typeof import('./types/components/text'))['default']
export type STextInstance = ComponentInstance<STextComponent>
export type STextPublicProps = STextInstance['$props']

export type STitleComponent = (typeof import('./types/components/title'))['default']
export type STitleInstance = ComponentInstance<STitleComponent>
export type STitlePublicProps = STitleInstance['$props']

export type STooltipComponent = (typeof import('./types/components/tooltip'))['default']
export type STooltipInstance = ComponentInstance<STooltipComponent>
export type STooltipPublicProps = STooltipInstance['$props']

export type SWarningComponent = (typeof import('./types/components/warning'))['default']
export type SWarningInstance = ComponentInstance<SWarningComponent>
export type SWarningPublicProps = SWarningInstance['$props']

export {}
