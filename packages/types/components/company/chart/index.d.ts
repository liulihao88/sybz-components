import type { App } from 'vue'
import type { InstallableComponent } from '../../_shared'
import type { SybzComponentsInstallOptions } from '../../../index'

export type * from '../../../index'
export type * from './components'

export { default as SChart } from '../../chart'
export { default as SCountBar } from '../countBar'
export { default as SCountBarOld } from '../countBarOld'
export { default as SObjectLine } from '../objectLine'
export { default as SQuotaPie } from '../quotaPie'

export interface SybzChartComponentsPlugin {
  install: (app: App, options?: SybzComponentsInstallOptions) => void
  [key: string]: any
}

export declare const chartComponents: Record<string, InstallableComponent>

declare const plugin: SybzChartComponentsPlugin
export default plugin
