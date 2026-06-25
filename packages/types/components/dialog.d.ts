import { ElDialog } from 'element-plus'
import type { ElDrawer } from 'element-plus'
import type { SDialogProps, SDialogTheme, SDialogType, SybzRecord } from '../component-props'

type ElDialogInstance = InstanceType<typeof ElDialog>
type ElDrawerInstance = InstanceType<typeof ElDrawer>

/**
 * s-dialog 弹框组件，支持 Element Plus Dialog/Drawer 属性和 sybz 扩展属性。
 *
 * 支持 Element Plus Dialog 的公开属性，并补充 Drawer 相关属性与 title、theme、confirmAttrs、cancelAttrs、fillSlot 等扩展属性。
 */
export type SDialogPublicProps = SDialogProps &
  Omit<ElDialogInstance['$props'], keyof SDialogProps> &
  Omit<ElDrawerInstance['$props'], keyof SDialogProps | keyof ElDialogInstance['$props']>

export type SDialogComponent = typeof ElDialog & {
  new (): {
    $props: {
      type?: SDialogType
      title?: string
      width?: string | number
      theme?: SDialogTheme
      cancel?: string | ((...args: any[]) => any)
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
      hideHeaderIcon?: boolean
    } & Omit<ElDialogInstance['$props'], 'type' | 'title' | 'width'> &
      Omit<ElDrawerInstance['$props'], 'type' | 'title' | 'width' | keyof ElDialogInstance['$props']>
    $emit: ElDialogInstance['$emit']
    $slots: ElDialogInstance['$slots']
  }
}

declare const SDialog: SDialogComponent
export default SDialog
