# preview 文件预览组件

<DocBasicUsage code='<s-preview src="文件地址" />' />

## 使用说明

`s-preview` 支持 TXT、CSV、TSV、Markdown、PDF、Word（DOCX）及 Excel（XLSX/XLSM）的容器内预览，也可用 `mode="dialog"` 在 `s-dialog` 中预览。CSV、TSV 按表格展示，支持带引号的字段和换行；最多显示前 1000 行。PDF 使用浏览器原生预览；Word 和 Excel 复用 `s-document-preview`。旧版 DOC、XLS 文件的浏览器端渲染结果取决于现有解析器。PPTX 暂不支持。文本、CSV、TSV 和 Markdown 最多加载 2 MB；Markdown 禁用原始 HTML 渲染。下载按钮仅在弹窗模式的标题栏显示。

Word 文件为空或内容损坏、无法解析时，提示“文档为空或已损坏，无法预览。”；文件加载失败时会显示加载错误。

文件地址可通过 `src` 传入，`name` 可指定文件名并帮助识别无扩展名的地址。无法从扩展名判断格式时，组件尝试读取响应头；跨域文件服务需允许当前页面访问。下载是否成功还取决于文件服务的响应头和跨域设置。

### 基础用法（mode 默认 inline，download 默认 true）

基础写法：`<s-preview src="文件地址" />`，直接在容器中预览。

:::demo 属性 `mode` 可选 `inline / dialog`，默认 `inline`；`download` 可选 `true / false`，默认 `true`。
preview/base
:::

### 弹窗预览（mode 默认 inline）

基础写法：`<s-preview ref="previewRef" src="文件地址" mode="dialog" />`，通过 `previewRef.open()` 从外部打开弹框。可用 `trigger` 插槽自定义触发器，插槽提供 `open` 和 `disabled`。

:::demo 属性 `mode` 可选 `inline / dialog`，默认 `inline`。
preview/dialog
:::

### 其他属性（type 默认 auto）

:::demo 切换预览格式、展示方式及下载按钮。属性 `type` 可选 `auto / txt / csv / tsv / pdf / md / word / excel`，默认 `auto`；`mode` 可选 `inline / dialog`，默认 `inline`；`download` 可选 `true / false`，默认 `true`。
preview/other
:::

### 属性

| 属性           | 说明                                       | 可选值 / 类型                                      | 默认值   |
| -------------- | ------------------------------------------ | -------------------------------------------------- | -------- |
| `src`          | 文件地址                                   | string                                             | 必填     |
| `name`         | 文件名，亦用于识别格式                     | string                                             | 未设置   |
| `type`         | 预览格式                                   | `auto / txt / csv / tsv / pdf / md / word / excel` | `auto`   |
| `mode`         | 展示方式                                   | `inline / dialog`                                  | `inline` |
| `download`     | 在弹窗标题栏显示下载按钮；容器内模式不显示 | `true / false`                                     | `true`   |
| `disabled`     | 禁用弹窗触发器                             | `true / false`                                     | `false`  |
| `width` / `w`  | 预览区宽度                                 | CSS 长度 / 数字 / 布尔值                           | `100%`   |
| `height` / `h` | 预览区高度                                 | CSS 长度 / 数字 / 布尔值                           | `600px`  |

### 插槽

| 插槽       | 说明                                        |
| ---------- | ------------------------------------------- |
| `trigger`  | 弹窗模式的触发内容，提供 `open`、`disabled` |
| `fallback` | 不支持预览或加载失败时的提示，提供 `error`  |

### Exposes

| 方法      | 说明                               |
| --------- | ---------------------------------- |
| `open()`  | 打开弹框并加载文件，仅弹窗模式生效 |
| `close()` | 关闭弹框，仅弹窗模式生效           |
