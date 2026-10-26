import { ElTabs } from 'element-plus'
import type { TabsPropsPublic } from 'element-plus/es/components/tabs'
import type { STabsSelfProps, SybzRecord } from '../component-props'
import type { SybzDimensionProps, SybzThemeProps, SybzStyleProps } from '../component-props'

type ElTabsInstance = InstanceType<typeof ElTabs>

/**
 * {@link https://liulihao88.github.io/sybz-components/components/tabs/home.html | 查看文档}
 *
 * s-tabs 标签页组件，modelValue 支持 string / number / boolean / null / undefined，并支持 capsule、capsule-theme 类型、主题、尺寸、width/height 及其 w/h 缩写，以及通过 headerMargin 自定义头部外边距。
 *
 * 先提示 sybz 自身属性，再提示 Element Plus Tabs 的公开属性。
 */
export type STabsPublicProps = STabsSelfProps & Omit<ElTabsInstance['$props'], keyof STabsSelfProps>

/**
 * {@link https://liulihao88.github.io/sybz-components/components/tabs/home.html | 查看文档}
 */
export type STabsComponent = {
  install: (app: import('vue').App) => void
  new <STabs文档 = 'https://liulihao88.github.io/sybz-components/components/tabs/home.html'>(): {
    $props: {
      modelValue?: string | number | boolean | null
      options?: any[]
      label?: string
      value?: string
      subAttrs?: SybzRecord
      trigger?: 'click' | 'hover'
      type?: '' | 'capsule' | 'capsule-theme' | TabsPropsPublic['type']
      size?: 'small' | 'default' | 'large'
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
      | 'w'
      | 'height'
      | 'h'
      | 'headerMargin'
    > &
      SybzStyleProps &
      SybzDimensionProps<STabsSelfProps> &
      SybzThemeProps<STabsSelfProps>
    $emit: ElTabsInstance['$emit']
    $slots: ElTabsInstance['$slots'] & Record<string, (...args: any[]) => any>
  }
}

/**
 * {@link https://liulihao88.github.io/sybz-components/components/tabs/home.html | 查看文档}
 */
declare const STabs: STabsComponent
export default STabs
