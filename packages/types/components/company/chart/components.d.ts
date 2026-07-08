import type { AllowedComponentProps, ComponentCustomProps, VNodeProps } from 'vue'

type ComponentInstance<T> = T extends new (...args: any[]) => infer R ? R : never
type JSXComponentProps<Props> = Props & VNodeProps & AllowedComponentProps & ComponentCustomProps & { children?: any }

declare module 'vue' {
  export interface GlobalComponents {
    /**
     * 在线文档：https://liulihao88.github.io/sybz-components/components/chart/home.html
     */
    SChart: (typeof import('../../chart'))['default']
    /**
     * 在线文档：https://liulihao88.github.io/sybz-components/components/chart/home.html
     */
    's-chart': (typeof import('../../chart'))['default']
    /**
     * 在线文档：https://liulihao88.github.io/sybz-components/components/company/countBar/home.html
     */
    SCountBar: (typeof import('../countBar'))['default']
    /**
     * 在线文档：https://liulihao88.github.io/sybz-components/components/company/countBar/home.html
     */
    's-count-bar': (typeof import('../countBar'))['default']
    /**
     * 在线文档：https://liulihao88.github.io/sybz-components/components/company/countBarOld/home.html
     */
    SCountBarOld: (typeof import('../countBarOld'))['default']
    /**
     * 在线文档：https://liulihao88.github.io/sybz-components/components/company/countBarOld/home.html
     */
    's-count-bar-old': (typeof import('../countBarOld'))['default']
    /**
     * 在线文档：https://liulihao88.github.io/sybz-components/components/company/objectLine/home.html
     */
    SObjectLine: (typeof import('../objectLine'))['default']
    /**
     * 在线文档：https://liulihao88.github.io/sybz-components/components/company/objectLine/home.html
     */
    's-object-line': (typeof import('../objectLine'))['default']
    /**
     * 在线文档：https://liulihao88.github.io/sybz-components/components/company/quotaPie/home.html
     */
    SQuotaPie: (typeof import('../quotaPie'))['default']
    /**
     * 在线文档：https://liulihao88.github.io/sybz-components/components/company/quotaPie/home.html
     */
    's-quota-pie': (typeof import('../quotaPie'))['default']
  }
}

export type SChartComponent = (typeof import('../../chart'))['default']
export type SChartInstance = ComponentInstance<SChartComponent>
export type SChartPublicProps = SChartInstance['$props']

export type SCountBarComponent = (typeof import('../countBar'))['default']
export type SCountBarInstance = ComponentInstance<SCountBarComponent>
export type SCountBarPublicProps = SCountBarInstance['$props']

export type SCountBarOldComponent = (typeof import('../countBarOld'))['default']
export type SCountBarOldInstance = ComponentInstance<SCountBarOldComponent>
export type SCountBarOldPublicProps = SCountBarOldInstance['$props']

export type SObjectLineComponent = (typeof import('../objectLine'))['default']
export type SObjectLineInstance = ComponentInstance<SObjectLineComponent>
export type SObjectLinePublicProps = SObjectLineInstance['$props']

export type SQuotaPieComponent = (typeof import('../quotaPie'))['default']
export type SQuotaPieInstance = ComponentInstance<SQuotaPieComponent>
export type SQuotaPiePublicProps = SQuotaPieInstance['$props']

declare global {
  namespace JSX {
    export interface IntrinsicElements {
      's-chart': JSXComponentProps<SChartPublicProps>
      's-count-bar': JSXComponentProps<SCountBarPublicProps>
      's-count-bar-old': JSXComponentProps<SCountBarOldPublicProps>
      's-object-line': JSXComponentProps<SObjectLinePublicProps>
      's-quota-pie': JSXComponentProps<SQuotaPiePublicProps>
    }
  }
}

export {}
