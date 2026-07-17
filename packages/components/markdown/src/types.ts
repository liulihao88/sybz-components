export type MarkdownHeading = {
  level: number
  text: string
  slug: string
}

export interface MarkdownLinkClickPayload {
  event: MouseEvent
  href: string
}

export interface MarkdownRenderPayload {
  html: string
  headings: MarkdownHeading[]
}

export interface MarkdownProps {
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
