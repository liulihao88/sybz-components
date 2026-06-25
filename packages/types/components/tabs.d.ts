import { ElTabs } from 'element-plus'
import type { STabsProps } from '../component-props'

type ElTabsInstance = InstanceType<typeof ElTabs>

export type STabsPublicProps = STabsProps &
  Omit<ElTabsInstance['$props'], keyof STabsProps>

export type STabsComponent = typeof ElTabs & {
  new (): {
    $props: STabsProps & Omit<ElTabsInstance['$props'], keyof STabsProps>
    $emit: ElTabsInstance['$emit']
    $slots: ElTabsInstance['$slots']
  }
}

declare const STabs: STabsComponent
export default STabs
