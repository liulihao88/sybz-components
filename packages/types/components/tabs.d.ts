import { ElTabs } from 'element-plus'
import type { TabsPropsPublic } from 'element-plus/es/components/tabs'
import type { STabsSelfProps, SybzRecord } from '../component-props'

type ElTabsInstance = InstanceType<typeof ElTabs>

/**
 * s-tabs 标签页组件，支持 capsule 类型、主题、尺寸、宽度以及通过 headerMargin 自定义头部外边距。
 *
 * 先提示 sybz 自身属性，再提示 Element Plus Tabs 的公开属性。
 */
export type STabsPublicProps = STabsSelfProps & Omit<ElTabsInstance['$props'], keyof STabsSelfProps>

export type STabsComponent = {
  new (): {
    $props: {
      modelValue: string | number | boolean
      options?: any[]
      label?: string
      value?: string
      subAttrs?: SybzRecord
      trigger?: 'click' | 'hover'
      type?: '' | 'capsule' | TabsPropsPublic['type']
      theme?: SybzComponentTheme
      size?: 'small' | 'default' | 'large'
      width?: string | number
      headerMargin?: string | number
    } & Omit<
      ElTabsInstance['$props'],
      | 'modelValue'
      | 'options'
      | 'label'
      | 'value'
      | 'subAttrs'
      | 'trigger'
      | 'type'
      | 'theme'
      | 'size'
      | 'width'
      | 'headerMargin'
    >
    $emit: ElTabsInstance['$emit']
    $slots: ElTabsInstance['$slots'] & Record<string, (...args: any[]) => any>
  }
}

declare const STabs: STabsComponent
export default STabs
