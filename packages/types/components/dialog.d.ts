import { ElDialog } from 'element-plus'
import type { ElDrawer } from 'element-plus'
import type { SDialogProps } from '../component-props'

type ElDialogInstance = InstanceType<typeof ElDialog>
type ElDrawerInstance = InstanceType<typeof ElDrawer>

/**
 * s-dialog 弹框组件，支持 Element Plus Dialog/Drawer 属性和 sybz 扩展属性。
 *
 * 支持 Element Plus Dialog/Drawer 的公开属性，并扩展 sybz 自身属性。
 */
export type SDialogPublicProps = SDialogProps &
  Omit<ElDialogInstance['$props'], keyof SDialogProps> &
  Omit<ElDrawerInstance['$props'], keyof SDialogProps | keyof ElDialogInstance['$props']>

export type SDialogComponent = typeof ElDialog & {
  new (): {
    $props: SDialogProps &
      Omit<ElDialogInstance['$props'], keyof SDialogProps> &
      Omit<ElDrawerInstance['$props'], keyof SDialogProps | keyof ElDialogInstance['$props']>
    $emit: ElDialogInstance['$emit']
    $slots: ElDialogInstance['$slots'] & {
      default?: () => any
      header?: () => any
      headerIcon?: () => any
      footer?: () => any
    }
  }
}

declare const SDialog: SDialogComponent
export default SDialog
