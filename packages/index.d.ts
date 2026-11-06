import type { App } from 'vue'
import type { InstallableComponent } from './types/components/_shared'
import type { SybzComponentsInstallOptions, SybzThemeColorConfig, SybzThemeName } from './types/index'
import type { SImageSrcResolver } from './types/component-props'

export type * from './types/index'
export type * from './components'
export * from './types/hooks'

export interface SybzComponentsPlugin {
  install: (app: App, options?: SybzComponentsInstallOptions) => void
  [key: string]: any
}

export declare function setSybzThemeColors(
  theme: SybzThemeName,
  colors: SybzThemeColorConfig,
  target?: HTMLElement | null,
): void
export declare function resetSybzThemeColors(theme: SybzThemeName, target?: HTMLElement | null): void

export declare const components: Record<string, InstallableComponent>
// @generated named-component-exports:start
export { default as SBacktop } from './types/components/backtop'
export { default as SBaseHeader } from './types/components/company/baseHeader'
export { default as SBuildTime } from './types/components/buildTime'
export { default as SButton } from './types/components/button'
export { default as SCapacityProgress } from './types/components/company/capacityProgress'
export { default as SCard } from './types/components/card'
export { default as SCheckbox } from './types/components/checkbox'
export { default as SClickOutside } from './types/components/clickOutside'
export { default as SCompTitle } from './types/components/compTitle'
export { default as SConfigProvider } from './types/components/configProvider'
export { default as SDatePicker } from './types/components/datePicker'
export { default as SDescriptions } from './types/components/descriptions'
export { default as SDialog } from './types/components/dialog'
export { default as SDocumentPreview } from './types/components/documentPreview'
export { default as SDrawer } from './types/components/drawer'
export { default as SEmpty } from './types/components/empty'
export { default as SFlex } from './types/components/flex'
export { default as SForm } from './types/components/form'
export { default as SFunctionSourceCode } from './types/components/functionSourceCode'
export { default as SIcon } from './types/components/icon'
export { default as SImage } from './types/components/image'
export { default as SInput } from './types/components/input'
export { default as SInputLabel } from './types/components/inputLabel'
export { default as SInputNumber } from './types/components/inputNumber'
export { default as SItem } from './types/components/item'
export { default as SJson } from './types/components/json'
export { default as SMarkdown } from './types/components/markdown'
export { default as SMenu } from './types/components/menu'
export { default as SPagination } from './types/components/pagination'
export { default as SPopconfirm } from './types/components/popconfirm'
export { default as SProgress } from './types/components/progress'
export { default as SRadio } from './types/components/radio'
export { default as SRow } from './types/components/row'
export { default as SScheduleCalendar } from './types/components/company/scheduleCalendar'
export { default as SScroll } from './types/components/scroll'
export { default as SSelect } from './types/components/select'
export { default as SSplitPane } from './types/components/splitPane'
export { default as SSwitch } from './types/components/switch'
export { default as STable } from './types/components/table'
export { default as STableSearch } from './types/components/tableSearch'
export { default as STabs } from './types/components/tabs'
export { default as STag } from './types/components/tag'
export { default as STest } from './types/components/test'
export { default as SText } from './types/components/text'
export { default as STitle } from './types/components/title'
export { default as STooltip } from './types/components/tooltip'
export { default as SUpload } from './types/components/upload'
export { default as SWarning } from './types/components/warning'
export { default as SWrapper } from './types/components/wrapper'
// @generated named-component-exports:end
export declare const SSvg: (typeof import('./types/components/svg'))['default']
export declare function createImageResolver(modules: Record<string, unknown>, basePath?: string): SImageSrcResolver
export { addIcon as addIconifyIcon, addCollection as addIconifyCollection } from '@iconify/vue'
export type { IconifyIcon } from '@iconify/vue'
export declare function createSvg(iconDirs: string[]): Record<string, any>

declare const plugin: SybzComponentsPlugin
export default plugin
