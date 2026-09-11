# document-preview 文档预览组件

## 使用说明

`document-preview` 通过 `docx-preview` 在浏览器端渲染 Word 文件。使用 Word 预览功能时，请先在项目中安装依赖：

```bash
pnpm add docx-preview
```

PDF 文件使用浏览器原生能力，通过 `iframe` 预览；Word 文件会先通过 `fetch` 获取文件内容，再交给 `docx-preview` 渲染。因此，Word 文件地址必须允许当前页面跨域请求（配置正确的 CORS 响应头），并且文件服务需要支持 `GET` 请求。无法在线预览时，组件会显示下载文件入口。

组件会根据 `type` 选择预览方式：默认值为 `pdf`，但文件扩展名为 `.doc` 或 `.docx` 时会自动使用 Word 渲染；也可以显式传入 `type="auto"`、`type="pdf"` 或 `type="word"`。

### 基础用法

:::demo PDF 使用浏览器原生预览；Word 使用浏览器端渲染，不要求文件公网可访问。基础写法：`<s-document-preview src="文件地址" />`。
documentPreview/base
:::

### 本地pdf

:::demo 本地pdf
documentPreview/local
:::

### 本地word

:::demo 本地word
documentPreview/localWord
:::

### 测试

:::demo 本地word
documentPreview/test
:::

### 属性

| 属性               | 说明                                         | 类型                | 默认值         |
| ------------------ | -------------------------------------------- | ------------------- | -------------- |
| `src`              | 文件地址，PDF 可直接预览                     | string              | 必填           |
| `type`             | 文件类型，默认先按 PDF 预览，失败后回退 Word | `pdf / word / auto` | `pdf`          |
| `width` / `height` | 预览区域尺寸                                 | string / number     | `100% / 600px` |
| `download`         | 预览区域显示下载链接，点击后才下载           | boolean             | `true`         |
