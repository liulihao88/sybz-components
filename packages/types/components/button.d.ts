import { ElButton } from 'element-plus'
import type { SButtonProps } from '../component-props'

type ElButtonInstance = InstanceType<typeof ElButton>

/**
 * s-button 按钮组件，支持 Element Plus Button 属性和 sybz 扩展属性。
 *
 * 支持 Element Plus Button 的公开属性，并扩展 sybz 自身属性。
 */
export type SButtonPublicProps = SButtonProps & Omit<ElButtonInstance['$props'], keyof SButtonProps>

export type SButtonComponent = typeof ElButton & {
  new (): {
    $props: SButtonProps & Omit<ElButtonInstance['$props'], keyof SButtonProps>
    $emit: ElButtonInstance['$emit']
    $slots: ElButtonInstance['$slots']
  }
}

declare const SButton: SButtonComponent
export default SButton
