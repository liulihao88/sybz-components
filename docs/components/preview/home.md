# preview 文件预览组件

<DocBasicUsage code='<s-preview src="文件地址" />' />

## 使用说明

`s-preview` 支持 TXT、CSV、TSV、Markdown、PDF、Word（DOCX）及 Excel（XLSX/XLSM）的容器内预览，也可用 `mode="dialog"` 在 `s-dialog` 中预览。CSV、TSV 按表格展示，支持带引号的字段和换行；最多显示前 1000 行。PDF 使用浏览器原生预览；Word 和 Excel 复用 `s-document-preview`。Markdown 使用 `s-markdown` 的只读渲染（`editable=false`、`disabled=false`），并禁用原始 HTML。旧版 DOC、XLS 文件的浏览器端渲染结果取决于现有解析器。PPTX 暂不支持。文本、CSV、TSV 和 Markdown 最多加载 2 MB。弹窗标题栏提供全屏切换；全屏时隐藏标题栏，按 Esc 返回普通弹窗。下载按钮只在弹窗模式显示。

Word 文件为空或内容损坏、无法解析时，提示“文档为空或已损坏，无法预览。”；文件加载失败时会显示加载错误。

文件地址可通过 `src` 传入，`name` 可指定文件名并帮助识别无扩展名的地址。无法从扩展名判断格式时，组件尝试读取响应头；跨域文件服务需允许当前页面访问。下载是否成功还取决于文件服务的响应头和跨域设置。

### 基础用法（mode 默认 inline，download 默认 true）

基础写法：`<s-preview src="文件地址" />`，直接在容器中预览。

:::demo 属性 `mode` 可选 `inline / dialog`，默认 `inline`；`download` 可选 `true / false`，默认 `true`。
preview/base
:::

### 弹窗预览（mode 默认 inline）

基础写法：`<s-preview src="文件地址" mode="dialog" title="123"><s-button>预览文件</s-button></s-preview>`，点击默认插槽内容打开弹框。`title` 默认使用文件名；弹窗模式下，其他额外属性也会转发给内部 `s-dialog`。也可通过组件 ref 调用 `open()`，由外部方法打开。

:::demo 属性 `mode` 可选 `inline / dialog`，默认 `inline`。
preview/dialog
:::

### 其他属性（type 默认 auto）

:::demo 切换预览格式、展示方式、下载及全屏按钮。属性 `type` 可选 `auto / txt / csv / tsv / pdf / md / word / excel`，默认 `auto`；`mode` 可选 `inline / dialog`，默认 `inline`；`download`、`fullscreen` 可选 `true / false`，默认均为 `true`。
preview/other
:::

### 属性

| 属性           | 说明                                       | 可选值 / 类型                                      | 默认值   |
| -------------- | ------------------------------------------ | -------------------------------------------------- | -------- |
| `src`          | 文件地址                                   | string                                             | 必填     |
| `name`         | 文件名，亦用于识别格式                     | string                                             | 未设置   |
| `title`        | 弹窗标题                                   | string                                             | 文件名   |
| `type`         | 预览格式                                   | `auto / txt / csv / tsv / pdf / md / word / excel` | `auto`   |
| `mode`         | 展示方式                                   | `inline / dialog`                                  | `inline` |
| `download`     | 在弹窗标题栏显示下载按钮；容器内模式不显示 | `true / false`                                     | `true`   |
| `fullscreen`   | 在弹窗标题栏显示全屏按钮；容器内模式不显示 | `true / false`                                     | `true`   |
| `disabled`     | 禁用弹窗的 `open()` 方法                   | `true / false`                                     | `false`  |
| `width` / `w`  | 预览区宽度                                 | CSS 长度 / 数字 / 布尔值                           | `100%`   |
| `height` / `h` | 预览区高度                                 | CSS 长度 / 数字 / 布尔值                           | `600px`  |

### 插槽

| 插槽       | 说明                                       |
| ---------- | ------------------------------------------ |
| `default`  | 弹窗模式的触发内容，点击后打开预览         |
| `fallback` | 不支持预览或加载失败时的提示，提供 `error` |

### Exposes

| 方法      | 说明                               |
| --------- | ---------------------------------- |
| `open()`  | 打开弹框并加载文件，仅弹窗模式生效 |
| `close()` | 关闭弹框，仅弹窗模式生效           |
