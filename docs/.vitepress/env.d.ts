/// <reference path="../../packages/components.d.ts" />
/// <reference types="vite/client" />

declare module '~dist/sybz-components-es.js' {
  const SybzComponents: import('vue').Plugin
  function createSvg(iconDirs: string[]): Record<string, any>

  export { createSvg }
  export default SybzComponents
}
