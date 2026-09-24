# Markdown 强大的 Markdown 渲染

`s-markdown` 用于安全渲染 CommonMark/GFM 或完整 HTML 片段，并扩展代码高亮、任务列表、脚注、数学公式、Mermaid、目录锚点、代码复制、图片预览和图片下载能力。

## Hidden Title {.md-hidden}

<DocBasicUsage code='<s-markdown :source="source" />' />

## 属性事件插槽简介

<ApiIntro />

### 基础用法（默认 `allowHtml=true`、`sanitize=true`、`linkify=true`、`highlight=true`、`mermaid=true`、`math=true`）

:::demo 传入 Markdown 字符串即可渲染。基础写法：`<s-markdown :source="source" />`。`source` 默认值 `''`；安全过滤、原始 HTML、链接识别、代码高亮、Mermaid、数学公式默认开启。
markdown/base
:::

### chenghua示例

:::demo 同一个组件可以渲染 KaTeX 数学公式、Mermaid 图表、脚注和定义列表。属性：`source` 默认值 `''`；`math`、`mermaid` 默认值均为 `true`。
markdown/chenghua
:::

### 编辑与实时预览（默认 `editable=false`、`disabled=false`、`width='100%'`、`language='zh-CN'`、`theme='light'`）

开启 `editable` 后使用内置的 `md-editor-v3`，通过 `v-model` 绑定源文本。工具栏、快捷键、实时预览、全屏、目录、图片上传、代码高亮、Mermaid、KaTeX、自定义工具栏和全部公开方法均由编辑器提供。`md-editor-v3` 已作为 `sybz-components` 的运行时依赖，业务项目不需要单独安装。

`editable` 可选 `true / false`，默认值 `false`；`disabled` 可选 `true / false`，默认值 `false`，开启后文本和左侧编辑工具不可操作，左侧源码仍可滚动，右侧预览、分栏和全屏工具仍可使用；其他属性、事件、插槽与暴露方法保持 `md-editor-v3@4.21.3` 的用法。

:::demo 基础写法：`<s-markdown v-model="source" editable />`。属性：`editable`、`disabled` 可选 `true / false`，默认值均为 `false`；`width` 默认值 `100%`，`height` 默认值为编辑器的 `500px`，示例设置 `width="100%"`、`:height="420"`；还展示了 `language="zh-CN"`、`:show-code-row-number="true"` 和 `@on-save`。
markdown/editable
:::

### 完整语法

:::demo 同一个组件可以渲染 KaTeX 数学公式、Mermaid 图表、脚注和定义列表。属性：`source` 默认值 `''`；`math`、`mermaid` 默认值均为 `true`。
markdown/all
:::

### 图片预览（默认 `imagePreview=true`）

点击 Markdown 图片后会打开全视口预览，支持放大、缩小、旋转、上一张、下一张、下载和关闭，也可以聚焦图片后按 Enter 或空格键打开。`imagePreview` 的可选值是 `true` 和 `false`，默认值是 `true`；设置为 `false` 可关闭点击预览。地址为空的图片不会生成破图元素，只显示图片的替代文字；加载失败或无法解码的图片会保留正文替代文字，但不会进入预览列表，上一张和下一张只会切换加载成功的图片。远程图片下载受浏览器同源策略限制，图片服务器未开放 CORS 时会回退为直接打开原图地址。

:::demo 展示图片点击放大和下载。基础写法：`<s-markdown :source="source" image-preview />`。属性：`imagePreview` 可选 `true / false`，默认值 `true`；`imageLazy` 可选 `true / false`，默认值 `true`。
markdown/imagePreview
:::

### 石景山项目部分代码示例

:::demo
markdown/example
:::

### 纯 HTML（默认 `contentType='markdown'`）

接口直接返回完整 HTML 片段时，使用 `content-type="html"` 跳过 Markdown 语法解析，避免 HTML 中的空行和缩进被识别为代码块。HTML 仍会经过默认开启的 DOMPurify 安全过滤。`contentType` 可选值为 `markdown / html`，默认值为 `markdown`。

:::demo 基础写法：`<s-markdown :source="source" content-type="html" />`。属性：`source` 默认值 `''`；`contentType` 可选 `markdown / html`，默认值 `markdown`；`sanitize` 可选 `true / false`，默认值 `true`。
markdown/html
:::

### API

| 属性名           | 说明                                     | 类型 / 可选值        | 默认值       |
| ---------------- | ---------------------------------------- | -------------------- | ------------ |
| `modelValue`     | `v-model` 绑定的源文本，优先于 `source`  | `string`             | `undefined`  |
| `source`         | Markdown 或 HTML 源文本                  | `string`             | `''`         |
| `editable`       | 是否显示编辑区并实时预览                 | `true / false`       | `false`      |
| `disabled`       | 编辑模式下是否禁用文本和工具栏操作       | `true / false`       | `false`      |
| `width`          | 组件宽度，数字按 px 处理                 | `string / number`    | `100%`       |
| `height`         | 组件高度，数字按 px 处理                 | `string / number`    | 编辑时 500px |
| `contentType`    | 源文本解析模式，HTML 模式跳过 Markdown   | `markdown / html`    | `markdown`   |
| `allowHtml`      | 是否解析源文本中的原始 HTML              | `true / false`       | `true`       |
| `sanitize`       | 预览时是否过滤；编辑时可传 HTML 过滤函数 | `boolean / function` | `true`       |
| `breaks`         | 是否把普通换行转换为 `<br>`              | `true / false`       | `false`      |
| `linkify`        | 是否自动识别 URL                         | `true / false`       | `true`       |
| `typographer`    | 是否启用排版替换                         | `true / false`       | `true`       |
| `highlight`      | 是否使用 Prism 高亮常用语言              | `true / false`       | `true`       |
| `copyCode`       | 是否显示代码复制按钮                     | `true / false`       | `true`       |
| `mermaid`        | 是否渲染 `mermaid` 代码块                | `true / false`       | `true`       |
| `math`           | 是否通过 KaTeX 渲染 `$...$` 与 `$$...$$` | `true / false`       | `true`       |
| `headingAnchors` | 是否为标题生成稳定 ID                    | `true / false`       | `true`       |
| `externalLinks`  | 是否让 HTTP(S) 链接在新窗口安全打开      | `true / false`       | `true`       |
| `baseUrl`        | 相对链接和图片的解析基准地址             | `string`             | `''`         |
| `imageLazy`      | 是否为图片启用懒加载和异步解码           | `true / false`       | `true`       |
| `imagePreview`   | 是否允许点击图片打开全视口操作预览       | `true / false`       | `true`       |
| `emptyText`      | 无内容时显示的文字                       | `string`             | `''`         |

开启 `editable` 后还支持 `md-editor-v3` 的全部属性，包括 `theme`、`language`、`previewTheme`、`codeTheme`、`toolbars`、`toolbarsExclude`、`footers`、`placeholder`、`preview`、`htmlPreview`、`pageFullscreen`、`showCodeRowNumber`、`noMermaid`、`noKatex`、`onSave` 和 `onUploadImg` 等，属性名称、可选值和默认值均与 `md-editor-v3@4.21.3` 一致。

### 事件

| 事件名              | 说明                           | 参数                 |
| ------------------- | ------------------------------ | -------------------- |
| `update:modelValue` | 编辑内容变化时触发             | `value: string`      |
| `rendered`          | Markdown 与异步增强完成后触发  | `{ html, headings }` |
| `error`             | 解析、Mermaid 或复制失败时触发 | `unknown`            |
| `copy`              | 代码复制成功后触发             | `code: string`       |
| `link-click`        | 点击渲染结果中的链接时触发     | `{ event, href }`    |

### 暴露方法与状态

| 名称           | 说明                                       |
| -------------- | ------------------------------------------ |
| `render()`     | 主动重新渲染当前内容                       |
| `renderedHtml` | 当前生成并过滤后的 HTML                    |
| `headings`     | 标题目录数组，包含 `level`、`text`、`slug` |
| `state`        | 包含最终 `html` 和 `headings` 的只读状态   |

编辑模式下同时暴露 `md-editor-v3` 的 `on()`、`togglePageFullscreen()`、`toggleFullscreen()`、`togglePreview()`、`togglePreviewOnly()`、`toggleHtmlPreview()`、`toggleCatalog()`、`triggerSave()`、`insert()`、`focus()`、`rerender()`、`getSelectedText()`、`resetHistory()`、`domEventHandlers()`、`execCommand()` 和 `getEditorView()`。

### 安全说明

- 默认 `allowHtml=true`，会解析 Markdown 中的原始 HTML。
- 完整 HTML 片段应设置 `contentType='html'`，跳过 Markdown 解析；`sanitize` 仍然生效。
- 如果内容来源不完全可信，建议继续保留默认的 `sanitize=true`。
- 服务端渲染且 `sanitize=true` 时，原始 HTML 会先按普通文字安全输出，自定义 HTML 属性暂不生效；客户端挂载后再通过 DOMPurify 过滤并渲染，避免未过滤内容进入服务端页面。
- 仅在内容完全可信且业务确实需要脚本级 HTML 能力时关闭 `sanitize`。
- Mermaid 使用严格安全级别，外部链接自动增加 `noopener noreferrer`。
