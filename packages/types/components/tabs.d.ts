import { ElTabs } from 'element-plus'
import type { TabsPropsPublic } from 'element-plus/es/components/tabs'
import type { STabsSelfProps, SybzRecord } from '../component-props'

type ElTabsInstance = InstanceType<typeof ElTabs>

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
    } & Omit<
      ElTabsInstance['$props'],
      'modelValue' | 'options' | 'label' | 'value' | 'subAttrs' | 'trigger' | 'type' | 'theme' | 'size'
    >
    $emit: ElTabsInstance['$emit']
    $slots: ElTabsInstance['$slots'] & Record<string, (...args: any[]) => any>
  }
}

declare const STabs: STabsComponent
export default STabs
