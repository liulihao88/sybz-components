/// <reference path="../../packages/components.d.ts" />
/// <reference path="../../packages/types/components/company/chart/components.d.ts" />
/// <reference types="vite/client" />

declare module '~dist/sybz-components-es.js' {
  const SybzComponents: import('vue').Plugin
  function createSvg(iconDirs: string[]): Record<string, any>

  export { createSvg }
  export default SybzComponents
}

declare module '~dist/charts.js' {
  const SybzChartComponents: import('vue').Plugin

  export default SybzChartComponents
}

declare module 'virtual:svg-icons-register'
