import { ElDrawer } from 'element-plus'
import type { SDrawerSelfProps, SybzRecord } from '../component-props'
import type { SybzStyleProps } from '../component-props'

type ElDrawerInstance = InstanceType<typeof ElDrawer>

export type SDrawerPublicProps = SDrawerSelfProps & Omit<ElDrawerInstance['$props'], keyof SDrawerSelfProps>

export type SDrawerComponent = {
  install: (app: import('vue').App) => void
  new (): {
    $props: {
      confirmText?: string
      cancelText?: string
      showFooter?: boolean
      showConfirm?: boolean
      showCancel?: boolean
      wrapperClosable?: boolean
      confirmAttrs?: SybzRecord
      cancelAttrs?: SybzRecord
      detailAttrs?: SybzRecord
      type?: '' | 'detail'
    } & Omit<
      ElDrawerInstance['$props'],
      | 'confirmText'
      | 'cancelText'
      | 'showFooter'
      | 'showConfirm'
      | 'showCancel'
      | 'wrapperClosable'
      | 'confirmAttrs'
      | 'cancelAttrs'
      | 'detailAttrs'
      | 'type'
    > &
      SybzStyleProps
    $emit: ElDrawerInstance['$emit']
    $slots: ElDrawerInstance['$slots'] & {
      default?: () => any
      header?: () => any
      footer?: () => any
    }
  }
}

declare const SDrawer: SDrawerComponent
export default SDrawer
