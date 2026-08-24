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

type ElFormInstance = InstanceType<typeof ElForm>

/**
 * s-form 表单组件，支持 schema 字段编排、动态配置、字段标签 tooltip 提示及 dangerouslyUseHTMLString。
 *
 * 先提示 sybz 自身属性，再提示 Element Plus Form 的公开属性。
 */
export type SFormPublicProps = SFormProps & Omit<ElFormInstance['$props'], keyof SFormProps>

export type SFormComponent = {
  new (): {
    $props: {
      fieldList: SFormFieldList
      model: SybzRecord
      theme?: SybzComponentTheme
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
    >
    $emit: ElFormInstance['$emit']
    $slots: ElFormInstance['$slots'] & Record<string, (...args: any[]) => any>
  }
}

declare const SForm: SFormComponent
export default SForm
