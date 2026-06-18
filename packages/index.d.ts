import type { App } from 'vue'
import type { SybzComponentsInstallOptions } from './types/index'

export type * from './types/index'

export interface SybzComponentsPlugin {
  install: (app: App, options?: SybzComponentsInstallOptions) => void
  [key: string]: any
}

export declare const components: Record<string, any>
export declare const SSvg: any
export declare function createSvg(iconDirs: string[]): Record<string, any>

declare const plugin: SybzComponentsPlugin
export default plugin
