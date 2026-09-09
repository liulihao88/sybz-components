import { ElPopover } from 'element-plus'
import type {
  SDialogVariant,
  SPopconfirmButtonType,
  SPopoverConfirmSelfProps,
  SybzComponentTheme,
} from '../component-props'

type ElPopoverInstance = InstanceType<typeof ElPopover>

export type SPopconfirmPublicProps = SPopoverConfirmSelfProps &
  Omit<ElPopoverInstance['$props'], keyof SPopoverConfirmSelfProps>

export type SPopconfirmComponent = {
  new (): {
    $props: {
      /** 是否按 HTML 字符串渲染，推荐使用 Element Plus 同名写法 */
      dangerouslyUseHTMLString?: boolean
      title?: string
      width?: string | number
      content?: string
      reConfirm?: boolean
      theme?: SybzComponentTheme
      disabled?: boolean
      /** 语义样式；默认值：default */
      variant?: SDialogVariant
      /** 删除场景中要操作的目标名称 */
      target?: string | number
      /** 确认按钮文字；默认值：确定 */
      confirmButtonText?: string
      /** 取消按钮文字；默认值：取消 */
      cancelButtonText?: string
      /** 确认按钮类型；默认值：primary */
      confirmButtonType?: SPopconfirmButtonType
      /** 取消按钮类型；默认值：info */
      cancelButtonType?: SPopconfirmButtonType
    } & Omit<
      ElPopoverInstance['$props'],
      | 'dangerouslyUseHTMLString'
      | 'title'
      | 'width'
      | 'content'
      | 'reConfirm'
      | 'theme'
      | 'disabled'
      | 'variant'
      | 'target'
      | 'confirmButtonText'
      | 'cancelButtonText'
      | 'confirmButtonType'
      | 'cancelButtonType'
    >
    $emit: ElPopoverInstance['$emit']
    $slots: ElPopoverInstance['$slots'] & {
      default?: () => any
      content?: () => any
      footer?: () => any
      target?: () => any
    }
  }
}

declare const SPopconfirm: SPopconfirmComponent
export default SPopconfirm
