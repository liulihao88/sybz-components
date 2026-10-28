import type { ConfigProviderPropsPublic } from 'element-plus/es/components/config-provider/src/config-provider-props'
import type { SybzComponentTheme } from '../../../types/component-props'

export type SConfigProviderComponentDefaults = Record<string, unknown>

/** sybz 局部配置；同名 Element Plus 属性同时传给 el-config-provider。 */
export interface SConfigProviderSelfProps {
  theme?: SybzComponentTheme
  clearable?: boolean
  disabled?: boolean
  button?: SConfigProviderComponentDefaults
  card?: SConfigProviderComponentDefaults
  dialog?: SConfigProviderComponentDefaults
  table?: SConfigProviderComponentDefaults
  select?: SConfigProviderComponentDefaults
  input?: SConfigProviderComponentDefaults
  inputNumber?: SConfigProviderComponentDefaults
  checkbox?: SConfigProviderComponentDefaults
  radio?: SConfigProviderComponentDefaults
  switch?: SConfigProviderComponentDefaults
  datePicker?: SConfigProviderComponentDefaults
  form?: SConfigProviderComponentDefaults
  pagination?: SConfigProviderComponentDefaults
  descriptions?: SConfigProviderComponentDefaults
  empty?: SConfigProviderComponentDefaults
  icon?: SConfigProviderComponentDefaults
  image?: SConfigProviderComponentDefaults
  popconfirm?: SConfigProviderComponentDefaults
  tabs?: SConfigProviderComponentDefaults
  tag?: SConfigProviderComponentDefaults
  title?: SConfigProviderComponentDefaults
  tooltip?: SConfigProviderComponentDefaults
  warning?: SConfigProviderComponentDefaults
  menu?: SConfigProviderComponentDefaults
  tableSearch?: SConfigProviderComponentDefaults
}

export type SConfigProviderProps = SConfigProviderSelfProps &
  Omit<ConfigProviderPropsPublic, keyof SConfigProviderSelfProps>
