import type { ComponentOptionsMixin, DefineComponent, EmitsOptions, Plugin } from 'vue'

export type InstallableComponent<Props = Record<string, any>, Emits extends EmitsOptions = {}> = DefineComponent<
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
