import { ElDrawer } from 'element-plus'
import type { SDrawerSelfProps, SybzRecord } from '../component-props'
import type { SybzStyleProps } from '../component-props'

type ElDrawerInstance = InstanceType<typeof ElDrawer>

/**
 * {@link https://liulihao88.github.io/sybz-components/components/drawer/home.html | 查看文档}
 *
 * 先提示 sybz 自身属性，再提示 Element Plus Drawer 的公开属性。
 */
export type SDrawerPublicProps = SDrawerSelfProps & Omit<ElDrawerInstance['$props'], keyof SDrawerSelfProps>

/**
 * {@link https://liulihao88.github.io/sybz-components/components/drawer/home.html | 查看文档}
 */
export type SDrawerComponent = {
  install: (app: import('vue').App) => void
  new <SDrawer文档 = 'https://liulihao88.github.io/sybz-components/components/drawer/home.html'>(): {
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

/**
 * {@link https://liulihao88.github.io/sybz-components/components/drawer/home.html | 查看文档}
 */
declare const SDrawer: SDrawerComponent
export default SDrawer
