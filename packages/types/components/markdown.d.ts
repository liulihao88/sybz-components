import { MdEditor } from 'md-editor-v3'
import type { MarkdownEmits, MarkdownExposed, MarkdownProps } from '../../components/markdown/src/types'

type MdEditorInstance = InstanceType<typeof MdEditor>

/**
 * s-markdown Markdown 与纯 HTML 编辑、实时预览组件，支持 v-model、宽高设置、安全过滤、图片全屏预览、缩放、旋转、多图切换和下载。
 *
 * 先提示 sybz 自身属性，再提示 md-editor-v3 的公开属性。
 */
export type SMarkdownPublicProps = MarkdownProps & Omit<MdEditorInstance['$props'], keyof MarkdownProps | 'sanitize'>

export type SMarkdownComponent = {
  new (): {
    $props: {
      /** 通过 v-model 绑定的 Markdown 或 HTML 源文本，优先级高于 source */
      modelValue?: string
      /** Markdown 或 HTML 源文本，默认值：'' */
      source?: string
      /** 是否显示编辑区并实时预览，默认值：false */
      editable?: boolean
      /** 编辑模式下是否禁用文本输入和工具栏操作，默认值：false */
      disabled?: boolean
      /** 组件宽度，数字按 px 处理，默认值：'100%' */
      width?: string | number
      /** 组件高度，数字按 px 处理；编辑模式默认沿用 md-editor-v3 的 500px，只读模式默认由内容撑开 */
      height?: string | number
      /** 源文本的解析模式，HTML 模式会跳过 Markdown 解析，默认值：'markdown' */
      contentType?: 'markdown' | 'html'
      /** 是否允许渲染 Markdown 源文本中的原始 HTML，默认值：true */
      allowHtml?: boolean
      /** 预览模式是否使用 DOMPurify；编辑模式下可传入 md-editor-v3 的 HTML 过滤函数，默认值：true */
      sanitize?: boolean | ((html: string) => string)
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
    } & Omit<
      MdEditorInstance['$props'],
      | 'modelValue'
      | 'source'
      | 'editable'
      | 'disabled'
      | 'width'
      | 'height'
      | 'contentType'
      | 'allowHtml'
      | 'sanitize'
      | 'breaks'
      | 'linkify'
      | 'typographer'
      | 'highlight'
      | 'copyCode'
      | 'mermaid'
      | 'math'
      | 'headingAnchors'
      | 'externalLinks'
      | 'baseUrl'
      | 'imageLazy'
      | 'imagePreview'
      | 'emptyText'
      | 'sanitize'
    >
    $emit: <Event extends keyof MarkdownEmits>(event: Event, ...args: MarkdownEmits[Event]) => void
    $slots: MdEditorInstance['$slots'] & Record<string, (...args: any[]) => any>
    render: MarkdownExposed['render']
    renderedHtml: MarkdownExposed['renderedHtml']
    headings: MarkdownExposed['headings']
    state: MarkdownExposed['state']
    on: MarkdownExposed['on']
    togglePageFullscreen: MarkdownExposed['togglePageFullscreen']
    toggleFullscreen: MarkdownExposed['toggleFullscreen']
    togglePreview: MarkdownExposed['togglePreview']
    togglePreviewOnly: MarkdownExposed['togglePreviewOnly']
    toggleHtmlPreview: MarkdownExposed['toggleHtmlPreview']
    toggleCatalog: MarkdownExposed['toggleCatalog']
    triggerSave: MarkdownExposed['triggerSave']
    insert: MarkdownExposed['insert']
    focus: MarkdownExposed['focus']
    rerender: MarkdownExposed['rerender']
    getSelectedText: MarkdownExposed['getSelectedText']
    resetHistory: MarkdownExposed['resetHistory']
    domEventHandlers: MarkdownExposed['domEventHandlers']
    execCommand: MarkdownExposed['execCommand']
    getEditorView: MarkdownExposed['getEditorView']
  }
}

declare const SMarkdown: SMarkdownComponent
export default SMarkdown
