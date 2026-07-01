import { ElTabs } from 'element-plus'
import type { STabsProps } from '../component-props'

type ElTabsInstance = InstanceType<typeof ElTabs>

export type STabsPublicProps = STabsProps & Omit<ElTabsInstance['$props'], keyof STabsProps>

export type STabsComponent = {
  new (): {
    $props: STabsPublicProps
    $emit: ElTabsInstance['$emit']
    $slots: ElTabsInstance['$slots'] & Record<string, (...args: any[]) => any>
  }
}

declare const STabs: STabsComponent
export default STabs
