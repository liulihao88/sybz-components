import type { App } from 'vue'
import type { InstallableComponent } from './types/components/_shared'
import type { SybzComponentsInstallOptions } from './types/index'

export type * from './types/index'
export type * from './components'
export * from './types/hooks'

export interface SybzComponentsPlugin {
  install: (app: App, options?: SybzComponentsInstallOptions) => void
  [key: string]: any
}

export declare const components: Record<string, InstallableComponent>
export declare const SSvg: (typeof import('./types/components/svg'))['default']
export { addIcon as addIconifyIcon, addCollection as addIconifyCollection } from '@iconify/vue'
export type { IconifyIcon } from '@iconify/vue'
export declare function createSvg(iconDirs: string[]): Record<string, any>

declare const plugin: SybzComponentsPlugin
export default plugin
