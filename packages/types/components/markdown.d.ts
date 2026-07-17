import type { SMarkdownProps } from '../component-props'

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
      emptyText?: string
    }
  }
}

declare const SMarkdown: SMarkdownComponent
export default SMarkdown
