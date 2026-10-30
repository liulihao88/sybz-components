import { ElForm } from 'element-plus'
import type {
  SFormContext,
  SFormDynamic,
  SFormFieldItem,
  SFormFieldList,
  SFormProps,
  SFormRender,
  SFormTitleItem,
  SybzRecord,
} from '../component-props'
import type { SybzThemeProps, SybzStyleProps } from '../component-props'

type ElFormInstance = InstanceType<typeof ElForm>

/**
 * {@link https://liulihao88.github.io/sybz-components/components/form/home.html | 查看文档}
 *
 * s-form 表单组件，支持 schema 字段编排、字段控件 slots 配置、动态配置、标签主副文本、字段标签 tooltip 提示、可选的 tooltip 文本复制（copy 默认 false）及 dangerouslyUseHTMLString，tooltip 可与 labelRender 或标签插槽同时使用。
 *
 * 先提示 sybz 自身属性，再提示 Element Plus Form 的公开属性。
 */
export type SFormPublicProps = SFormProps & Omit<ElFormInstance['$props'], keyof SFormProps>

/**
 * {@link https://liulihao88.github.io/sybz-components/components/form/home.html | 查看文档}
 */
export type SFormComponent = {
  install: (app: import('vue').App) => void
  new <SForm文档 = 'https://liulihao88.github.io/sybz-components/components/form/home.html'>(): {
    $props: {
      fieldList: SFormFieldList
      model: SybzRecord
      /** showFooter 的别名，设置后优先级更高 */
      footer?: boolean
      showFooter?: boolean
      column?: 1 | 2 | 3 | 4 | 5 | 6
      /** 多列表单项左右间距，仅 column > 1 时生效，默认 16px */
      gap?: string | number
      align?: 'center' | 'top' | 'flex-end'
      /** 是否自动把 defaultValue/default 初始化到 model 中 */
      autoSetDefaultValue?: boolean
      /** 是否自动去除字符串字段值的前后空格，字段 normalize/transform 优先级更高 */
      trim?: boolean
      /** 所有 schema 控件的默认透传属性 */
      componentDefaults?: SybzRecord
    } & Omit<
      ElFormInstance['$props'],
      | 'fieldList'
      | 'model'
      | 'theme'
      | 'footer'
      | 'showFooter'
      | 'column'
      | 'gap'
      | 'align'
      | 'autoSetDefaultValue'
      | 'trim'
      | 'componentDefaults'
    > &
      SybzStyleProps &
      SybzThemeProps<SFormProps>
    $emit: ElFormInstance['$emit']
    $slots: ElFormInstance['$slots'] & Record<string, (...args: any[]) => any>
  }
}

/**
 * {@link https://liulihao88.github.io/sybz-components/components/form/home.html | 查看文档}
 */
declare const SForm: SFormComponent
export default SForm
