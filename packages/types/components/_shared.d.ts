import type { ComponentOptionsMixin, DefineComponent, EmitsOptions, Plugin, SlotsType } from 'vue'

type BaseInstallableComponent<
  Props = Record<string, any>,
  Emits extends EmitsOptions = {},
  Slots extends Record<string, any> = {},
> = DefineComponent<
  Props,
  {},
  any,
  {},
  {},
  ComponentOptionsMixin,
  ComponentOptionsMixin,
  Emits,
  string,
  {},
  any,
  Props,
  {},
  SlotsType<Slots>
> &
  Plugin

export type InstallableComponent<
  Props = Record<string, any>,
  Emits extends EmitsOptions = {},
  Slots extends Record<string, (...args: any[]) => any> = {},
> = BaseInstallableComponent<Props, Emits, Slots> & {
  new (): {
    $props: Props
    $emit: Emits extends Record<string, any> ? any : any
    $slots: Slots
  }
}
