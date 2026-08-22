import type { SybzComponentTheme } from './component-props'

export type SybzComponentInstallConfig = Record<string, any>

export interface SybzComponentsInstallOptions {
  registerDirectives?: boolean
  registerElementPlusIcons?: boolean
  theme?: SybzComponentTheme
  size?: string
  dangerouslyUseHTMLString?: boolean
  button?: SybzComponentInstallConfig
  descriptions?: SybzComponentInstallConfig
  dialog?: SybzComponentInstallConfig
  empty?: SybzComponentInstallConfig
  icon?: SybzComponentInstallConfig
  image?: SybzComponentInstallConfig
  input?: SybzComponentInstallConfig
  popconfirm?: SybzComponentInstallConfig
  radio?: SybzComponentInstallConfig
  select?: SybzComponentInstallConfig
  switch?: SybzComponentInstallConfig
  tabs?: SybzComponentInstallConfig
  tag?: SybzComponentInstallConfig
  table?: SybzComponentInstallConfig
  title?: SybzComponentInstallConfig
  tooltip?: SybzComponentInstallConfig
  warning?: SybzComponentInstallConfig
  [key: string]: any
}

export type * from './table'
export type * from './component-props'
