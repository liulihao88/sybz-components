import { ElDrawer } from 'element-plus'
import type { SDrawerProps } from '../component-props'

type ElDrawerInstance = InstanceType<typeof ElDrawer>

export type SDrawerPublicProps = SDrawerProps & Omit<ElDrawerInstance['$props'], keyof SDrawerProps>

export type SDrawerComponent = typeof ElDrawer & {
  new (): {
    $props: SDrawerProps & Omit<ElDrawerInstance['$props'], keyof SDrawerProps>
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
