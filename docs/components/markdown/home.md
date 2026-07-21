# Markdown 强大的 Markdown 渲染

`s-markdown` 用于安全渲染 CommonMark/GFM 文本，并扩展代码高亮、任务列表、脚注、数学公式、Mermaid、目录锚点、代码复制和图片预览能力。

## Hidden Title {.md-hidden}

<DocBasicUsage code='<s-markdown :source="source" />' />

## 属性事件插槽简介

<ApiIntro />

### 基础用法（默认 `sanitize=true`、`linkify=true`、`highlight=true`、`mermaid=true`、`math=true`）

:::demo 传入 Markdown 字符串即可渲染。基础写法：`<s-markdown :source="source" />`。`source` 默认值 `''`；安全过滤、链接识别、代码高亮、Mermaid、数学公式默认开启，原始 HTML 默认关闭。
markdown/base
:::

### chenghua示例

:::demo 同一个组件可以渲染 KaTeX 数学公式、Mermaid 图表、脚注和定义列表。属性：`source` 默认值 `''`；`math`、`mermaid` 默认值均为 `true`。
markdown/chenghua
:::

### 完整语法

:::demo 同一个组件可以渲染 KaTeX 数学公式、Mermaid 图表、脚注和定义列表。属性：`source` 默认值 `''`；`math`、`mermaid` 默认值均为 `true`。
markdown/all
:::

### 图片预览（默认 `imagePreview=true`）

点击 Markdown 图片后会打开全视口预览，支持放大、缩小、旋转、上一张、下一张和关闭。`imagePreview` 的可选值是 `true` 和 `false`，默认值是 `true`；设置为 `false` 可关闭点击预览。

:::demo 展示图片点击预览配置。基础写法：`<s-markdown :source="source" image-preview />`。属性：`imagePreview` 可选 `true / false`，默认值 `true`；`imageLazy` 可选 `true / false`，默认值 `true`。
markdown/imagePreview
:::

### 石景山项目部分代码示例

:::demo
markdown/example
:::

### API

| 属性名           | 说明                                     | 类型 / 可选值  | 默认值  |
| ---------------- | ---------------------------------------- | -------------- | ------- |
| `source`         | Markdown 源文本                          | `string`       | `''`    |
| `allowHtml`      | 是否解析源文本中的原始 HTML              | `true / false` | `false` |
| `sanitize`       | 是否使用 DOMPurify 过滤输出              | `true / false` | `true`  |
| `breaks`         | 是否把普通换行转换为 `<br>`              | `true / false` | `false` |
| `linkify`        | 是否自动识别 URL                         | `true / false` | `true`  |
| `typographer`    | 是否启用排版替换                         | `true / false` | `true`  |
| `highlight`      | 是否使用 Prism 高亮常用语言              | `true / false` | `true`  |
| `copyCode`       | 是否显示代码复制按钮                     | `true / false` | `true`  |
| `mermaid`        | 是否渲染 `mermaid` 代码块                | `true / false` | `true`  |
| `math`           | 是否通过 KaTeX 渲染 `$...$` 与 `$$...$$` | `true / false` | `true`  |
| `headingAnchors` | 是否为标题生成稳定 ID                    | `true / false` | `true`  |
| `externalLinks`  | 是否让 HTTP(S) 链接在新窗口安全打开      | `true / false` | `true`  |
| `baseUrl`        | 相对链接和图片的解析基准地址             | `string`       | `''`    |
| `imageLazy`      | 是否为图片启用懒加载和异步解码           | `true / false` | `true`  |
| `imagePreview`   | 是否允许点击图片打开全视口操作预览       | `true / false` | `true`  |
| `emptyText`      | 无内容时显示的文字                       | `string`       | `''`    |

### 事件

| 事件名       | 说明                           | 参数                 |
| ------------ | ------------------------------ | -------------------- |
| `rendered`   | Markdown 与异步增强完成后触发  | `{ html, headings }` |
| `error`      | 解析、Mermaid 或复制失败时触发 | `unknown`            |
| `copy`       | 代码复制成功后触发             | `code: string`       |
| `link-click` | 点击渲染结果中的链接时触发     | `{ event, href }`    |

### 暴露方法与状态

| 名称           | 说明                                       |
| -------------- | ------------------------------------------ |
| `render()`     | 主动重新渲染当前内容                       |
| `renderedHtml` | 当前生成并过滤后的 HTML                    |
| `headings`     | 标题目录数组，包含 `level`、`text`、`slug` |

### 安全说明

- 默认 `allowHtml=false`，不会执行 Markdown 中的原始 HTML。
- 需要展示可信 HTML 时设置 `allow-html`，但建议继续保留默认的 `sanitize=true`。
- 仅在内容完全可信且业务确实需要脚本级 HTML 能力时关闭 `sanitize`。
- Mermaid 使用严格安全级别，外部链接自动增加 `noopener noreferrer`。
