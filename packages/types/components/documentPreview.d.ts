import type { SDocumentPreviewSelfProps } from '../component-props'
import type { SybzDimensionProps, SybzStyleProps } from '../component-props'

/**
 * 文档预览组件，支持 PDF 原生预览和浏览器端 Word 预览，并提供下载兜底。
 *
 * 先提示 sybz 自身属性。
 */
export type SDocumentPreviewPublicProps = SDocumentPreviewProps

export type SDocumentPreviewComponent = {
  install: (app: import('vue').App) => void
  new (): {
    $props: {
      src: string
      type?: 'auto' | 'pdf' | 'word' | 'excel'
      download?: boolean
    } & SybzStyleProps &
      SybzDimensionProps<SDocumentPreviewSelfProps>
  }
}

declare const SDocumentPreview: SDocumentPreviewComponent
export default SDocumentPreview
