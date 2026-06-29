import type { App, EmitsOptions } from 'vue'

export type InstallableComponent<
  Props = Record<string, any>,
  Emits extends EmitsOptions = {},
  Slots extends Record<string, any> = {},
> = {
  install?: (app: App) => any
  new (...args: any[]): {
    $props: Props
    $emit: Emits extends Record<string, any> ? any : any
    $slots: Slots
  }
}
