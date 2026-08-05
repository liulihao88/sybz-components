import { ElDialog } from 'element-plus'
import type { ElDrawer } from 'element-plus'
import type {
  SDialogHandler,
  SDialogMode,
  SDialogSelfProps,
  SDialogTheme,
  SDialogVariant,
  SybzRecord,
} from '../component-props'

type ElDialogInstance = InstanceType<typeof ElDialog>
type ElDrawerInstance = InstanceType<typeof ElDrawer>

/**
 * s-dialog 弹框组件，支持 Element Plus Dialog/Drawer 属性，以及 maximizeHeight 等 sybz 扩展属性。
 *
 * 先提示 sybz 自身属性，再提示 Element Plus Dialog/Drawer 的公开属性。
 */
export type SDialogPublicProps = SDialogSelfProps &
  Omit<ElDialogInstance['$props'], keyof SDialogSelfProps> &
  Omit<ElDrawerInstance['$props'], keyof SDialogSelfProps | keyof ElDialogInstance['$props']>

export type SDialogComponent = {
  new (): {
    $props: {
      mode?: SDialogMode
      variant?: SDialogVariant
      target?: string
      title?: string
      subTitle?: string
      width?: string | number
      theme?: SDialogTheme
      cancel?: SDialogHandler
      cancelText?: string
      confirmText?: string
      showFooter?: boolean
      showCancel?: boolean
      showConfirm?: boolean
      confirmAttrs?: SybzRecord
      cancelAttrs?: SybzRecord
      enableConfirm?: boolean
      confirm?: (...args: any[]) => any
      fillSlot?: boolean
      maximizeHeight?: boolean
      hideHeaderIcon?: boolean
    } & Omit<
      ElDialogInstance['$props'],
      | 'mode'
      | 'variant'
      | 'target'
      | 'title'
      | 'subTitle'
      | 'width'
      | 'theme'
      | 'cancel'
      | 'cancelText'
      | 'confirmText'
      | 'showFooter'
      | 'showCancel'
      | 'showConfirm'
      | 'confirmAttrs'
      | 'cancelAttrs'
      | 'enableConfirm'
      | 'confirm'
      | 'fillSlot'
      | 'maximizeHeight'
      | 'hideHeaderIcon'
    > &
      Omit<
        ElDrawerInstance['$props'],
        | 'mode'
        | 'variant'
        | 'target'
        | 'title'
        | 'subTitle'
        | 'width'
        | 'theme'
        | 'cancel'
        | 'cancelText'
        | 'confirmText'
        | 'showFooter'
        | 'showCancel'
        | 'showConfirm'
        | 'confirmAttrs'
        | 'cancelAttrs'
        | 'enableConfirm'
        | 'confirm'
        | 'fillSlot'
        | 'maximizeHeight'
        | 'hideHeaderIcon'
        | keyof ElDialogInstance['$props']
      >
    $emit: ElDialogInstance['$emit']
    $slots: ElDialogInstance['$slots'] & {
      default?: () => any
      header?: () => any
      headerIcon?: () => any
      footer?: () => any
      target?: () => any
    }
  }
}

declare const SDialog: SDialogComponent
export default SDialog
