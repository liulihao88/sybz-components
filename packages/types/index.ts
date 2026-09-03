import type { SybzComponentTheme } from './component-props'

export type SybzComponentInstallConfig = Record<string, any>
export type SybzThemeName = Exclude<SybzComponentTheme, 'default'>

export interface SybzThemeColorConfig {
  primary?: string
  primaryHover?: string
  primaryActive?: string
  primaryRgb?: string
  primaryHoverRgb?: string
  accent?: string
  accentHover?: string
  accentActive?: string
  accentRgb?: string
  success?: string
  successRgb?: string
  warning?: string
  warningRgb?: string
  danger?: string
  dangerRgb?: string
  info?: string
  infoRgb?: string
  background?: string
  backgroundSoft?: string
  backgroundMobile?: string
  backgroundWeb?: string
  cardBackground?: string
  navigationBackground?: string
  fill?: string
  fillMobile?: string
  fillWeb?: string
  rowAlternate?: string
  rowHover?: string
  disabledBackground?: string
  text?: string
  textRegular?: string
  textRegularMobile?: string
  textRegularWeb?: string
  textMuted?: string
  textSecondary?: string
  divider?: string
  dividerMobile?: string
  dividerWeb?: string
  tagBackground?: string
  tagText?: string
  headerBackground?: string
  controlBackground?: string
  tableLine?: string
  tableLineSoft?: string
  tableHeaderBackground?: string
  tableRowBackground?: string
  tableRowAlternate?: string
  tablePaginationBackground?: string
}

export type SybzThemeColorsConfig = SybzThemeColorConfig | Partial<Record<SybzThemeName, SybzThemeColorConfig>>

export interface SybzComponentsInstallOptions {
  registerDirectives?: boolean
  registerElementPlusIcons?: boolean
  theme?: SybzComponentTheme
  themeColors?: SybzThemeColorsConfig
  size?: string
  dangerouslyUseHTMLString?: boolean
  button?: SybzComponentInstallConfig
  datePicker?: SybzComponentInstallConfig
  descriptions?: SybzComponentInstallConfig
  dialog?: SybzComponentInstallConfig
  empty?: SybzComponentInstallConfig
  icon?: SybzComponentInstallConfig
  input?: SybzComponentInstallConfig
  popconfirm?: SybzComponentInstallConfig
  radio?: SybzComponentInstallConfig
  select?: SybzComponentInstallConfig
  switch?: SybzComponentInstallConfig
  tabs?: SybzComponentInstallConfig
  tag?: SybzComponentInstallConfig
  table?: SybzComponentInstallConfig
  tableSearch?: SybzComponentInstallConfig
  title?: SybzComponentInstallConfig
  tooltip?: SybzComponentInstallConfig
  warning?: SybzComponentInstallConfig
  [key: string]: any
}

export type * from './table.ts'
export type * from './component-props'
