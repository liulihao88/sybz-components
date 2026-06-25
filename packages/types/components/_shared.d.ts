import type { ComponentOptionsMixin, DefineComponent, EmitsOptions, Plugin } from 'vue'

type BaseInstallableComponent<Props = Record<string, any>, Emits extends EmitsOptions = {}> = DefineComponent<
  Props,
  {},
  any,
  {},
  {},
  ComponentOptionsMixin,
  ComponentOptionsMixin,
  Emits
> &
  Plugin

export type InstallableComponent<
  Props = Record<string, any>,
  Emits extends EmitsOptions = {},
> = BaseInstallableComponent<Props, Emits> & {
  new (): {
    $props: Props
    $emit: Emits extends Record<string, any> ? any : any
  }
}
