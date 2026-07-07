export type SybzComponentInstallConfig = Record<string, any>

export interface SybzComponentsInstallOptions {
  registerDirectives?: boolean
  registerElementPlusIcons?: boolean
  theme?: string
  size?: string
  dangerouslyUseHTMLString?: boolean
  button?: SybzComponentInstallConfig
  descriptions?: SybzComponentInstallConfig
  dialog?: SybzComponentInstallConfig
  empty?: SybzComponentInstallConfig
  icon?: SybzComponentInstallConfig
  input?: SybzComponentInstallConfig
  popconfirm?: SybzComponentInstallConfig
  radio?: SybzComponentInstallConfig
  select?: SybzComponentInstallConfig
  switch?: SybzComponentInstallConfig
  tag?: SybzComponentInstallConfig
  table?: SybzComponentInstallConfig
  title?: SybzComponentInstallConfig
  tooltip?: SybzComponentInstallConfig
  warning?: SybzComponentInstallConfig
  [key: string]: any
}

export type * from './table'
export type * from './component-props'
