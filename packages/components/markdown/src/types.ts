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

export type MarkdownEmits = {
  rendered: [payload: MarkdownRenderPayload]
  error: [error: unknown]
  copy: [code: string]
  linkClick: [payload: MarkdownLinkClickPayload]
}

export interface MarkdownExposed {
  render: () => Promise<void>
  renderedHtml: string
  headings: MarkdownHeading[]
  state: {
    html: string
    headings: MarkdownHeading[]
  }
}

export interface MarkdownProps {
  /** Markdown 源文本，默认值：'' */
  source?: string
  /** 是否允许渲染源文本中的原始 HTML，默认值：false */
  allowHtml?: boolean
  /** 是否使用 DOMPurify 过滤渲染后的 HTML，默认值：true */
  sanitize?: boolean
  /** 是否将源文本中的换行转换为 `<br>`，默认值：false */
  breaks?: boolean
  /** 是否自动识别文本中的链接，默认值：true */
  linkify?: boolean
  /** 是否启用语言中立的排版替换，默认值：true */
  typographer?: boolean
  /** 是否对带语言标识的代码块进行语法高亮，默认值：true */
  highlight?: boolean
  /** 是否在代码块中显示复制按钮，默认值：true */
  copyCode?: boolean
  /** 是否渲染 mermaid 代码块，默认值：true */
  mermaid?: boolean
  /** 是否渲染数学公式，默认值：true */
  math?: boolean
  /** 是否为标题生成锚点并收集标题目录，默认值：true */
  headingAnchors?: boolean
  /** 是否在新窗口打开 HTTP(S) 链接，默认值：true */
  externalLinks?: boolean
  /** 相对链接和图片地址的解析基准地址，默认值：'' */
  baseUrl?: string
  /** 是否对图片启用原生懒加载，默认值：true */
  imageLazy?: boolean
  /** 是否允许点击图片打开全屏预览，默认值：true */
  imagePreview?: boolean
  /** Markdown 内容为空时显示的文本，默认值：'' */
  emptyText?: string
}
