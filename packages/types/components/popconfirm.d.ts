import { ElPopover } from 'element-plus'
import type { SPopoverConfirmSelfProps, SybzComponentTheme } from '../component-props'

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
    } & Omit<
      ElPopoverInstance['$props'],
      'dangerouslyUseHTMLString' | 'title' | 'width' | 'content' | 'reConfirm' | 'theme' | 'disabled'
    >
    $emit: ElPopoverInstance['$emit']
    $slots: ElPopoverInstance['$slots'] & {
      default?: () => any
      content?: () => any
      footer?: () => any
    }
  }
}

declare const SPopconfirm: SPopconfirmComponent
export default SPopconfirm
