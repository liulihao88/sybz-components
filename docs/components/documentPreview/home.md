# document-preview 文档预览组件

## 基础用法

:::demo PDF 使用浏览器原生预览；Word 默认使用 Office Online，文件地址必须可被公网访问。基础写法：`<s-document-preview src="文件地址" />`。
documentPreview/base
:::

### 属性

| 属性               | 说明                                     | 类型                         | 默认值         |
| ------------------ | ---------------------------------------- | ---------------------------- | -------------- |
| `src`              | 文件地址，PDF 可直接预览                 | string                       | 必填           |
| `type`             | 文件类型                                 | `auto / pdf / word`          | `auto`         |
| `wordPreview`      | Word 预览服务；`download` 仅显示下载兜底 | `office / google / download` | `office`       |
| `width` / `height` | 预览区域尺寸                             | string / number              | `100% / 600px` |
| `download`         | 失败时显示下载链接                       | boolean                      | `true`         |
