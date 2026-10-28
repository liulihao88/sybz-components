import { ElConfigProvider } from 'element-plus'
import type { SybzComponentTheme } from '../component-props'
import type {
  SConfigProviderSelfProps,
  SConfigProviderProps,
  SConfigProviderComponentDefaults,
} from '../../components/configProvider/src/types'
import type { SybzThemeProps, SybzStyleProps } from '../component-props'

type ElConfigProviderInstance = InstanceType<typeof ElConfigProvider>

/**
 * {@link https://liulihao88.github.io/sybz-components/components/configProvider/home.html | 查看文档}
 *
 * s-config-provider 为子树提供 Element Plus 配置及 sybz 组件默认值，并支持在自身容器使用样式简写属性。
 *
 * 先提示 sybz 自身属性，再提示 Element Plus ConfigProvider 的公开属性。
 */
export type SConfigProviderPublicProps = SConfigProviderSelfProps &
  Omit<ElConfigProviderInstance['$props'], keyof SConfigProviderSelfProps>

/**
 * {@link https://liulihao88.github.io/sybz-components/components/configProvider/home.html | 查看文档}
 */
export type SConfigProviderComponent = {
  install: (app: import('vue').App) => void
  new <SConfigProvider文档 = 'https://liulihao88.github.io/sybz-components/components/configProvider/home.html'>(): {
    $props: {
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
    } & Omit<
      ElConfigProviderInstance['$props'],
      | 'theme'
      | 'clearable'
      | 'disabled'
      | 'button'
      | 'card'
      | 'dialog'
      | 'table'
      | 'select'
      | 'input'
      | 'inputNumber'
      | 'checkbox'
      | 'radio'
      | 'switch'
      | 'datePicker'
      | 'form'
      | 'pagination'
      | 'descriptions'
      | 'empty'
      | 'icon'
      | 'image'
      | 'popconfirm'
      | 'tabs'
      | 'tag'
      | 'title'
      | 'tooltip'
      | 'warning'
      | 'menu'
      | 'tableSearch'
    > &
      SybzStyleProps &
      SybzThemeProps<SConfigProviderSelfProps>
    $emit: ElConfigProviderInstance['$emit']
    $slots: ElConfigProviderInstance['$slots'] & {
      default?: () => any
    }
  }
}

/**
 * {@link https://liulihao88.github.io/sybz-components/components/configProvider/home.html | 查看文档}
 */
declare const SConfigProvider: SConfigProviderComponent
export default SConfigProvider
