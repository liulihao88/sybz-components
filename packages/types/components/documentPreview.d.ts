import type { SDocumentPreviewSelfProps } from '../component-props'

/**
 * 文档预览组件，支持 PDF 原生预览和浏览器端 Word 预览，并提供下载兜底。
 *
 * 先提示 sybz 自身属性。
 */
export type SDocumentPreviewPublicProps = SDocumentPreviewProps

export type SDocumentPreviewComponent = {
  new (): {
    $props: {
      src: string
      type?: 'auto' | 'pdf' | 'word'
      height?: string | number
      width?: string | number
      download?: boolean
    }
  }
}

declare const SDocumentPreview: SDocumentPreviewComponent
export default SDocumentPreview
