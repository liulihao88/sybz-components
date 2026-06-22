import type { DefineComponent, Plugin } from 'vue'

export type InstallableComponent<Props = Record<string, any>> = DefineComponent<Props, {}, any> & Plugin
