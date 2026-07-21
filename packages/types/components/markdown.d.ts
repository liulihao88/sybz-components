import type { SMarkdownProps } from '../component-props'

/**
 * s-markdown Markdown 渲染组件，支持图片全屏预览、缩放、旋转和多图切换。
 *
 * 先提示 sybz 自身属性。
 */
export type SMarkdownComponent = {
  new (): {
    $props: {
      source?: string
      allowHtml?: boolean
      sanitize?: boolean
      breaks?: boolean
      linkify?: boolean
      typographer?: boolean
      highlight?: boolean
      copyCode?: boolean
      mermaid?: boolean
      math?: boolean
      headingAnchors?: boolean
      externalLinks?: boolean
      baseUrl?: string
      imageLazy?: boolean
      imagePreview?: boolean
      emptyText?: string
    }
  }
}

declare const SMarkdown: SMarkdownComponent
export default SMarkdown
