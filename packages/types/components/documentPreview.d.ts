import type { SDocumentPreviewSelfProps } from '../component-props'
import type { SybzDimensionProps, SybzStyleProps } from '../component-props'

/**
 * {@link https://liulihao88.github.io/sybz-components/components/documentPreview/home.html | 查看文档}
 *
 * 文档预览组件，支持 PDF 原生预览和浏览器端 Word 预览，并提供下载兜底。
 *
 * 先提示 sybz 自身属性。
 */
export type SDocumentPreviewPublicProps = SDocumentPreviewProps

export type SDocumentPreviewComponent = {
  install: (app: import('vue').App) => void
  new <SDocumentPreview文档 = 'https://liulihao88.github.io/sybz-components/components/documentPreview/home.html'>(): {
    $props: {
      src: string
      type?: 'auto' | 'pdf' | 'word' | 'excel'
      download?: boolean
    } & SybzStyleProps &
      SybzDimensionProps<SDocumentPreviewSelfProps>
  }
}

/**
 * {@link https://liulihao88.github.io/sybz-components/components/documentPreview/home.html | 查看文档}
 */
declare const SDocumentPreview: SDocumentPreviewComponent
export default SDocumentPreview
