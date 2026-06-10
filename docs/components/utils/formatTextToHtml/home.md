# formatTextToHtml文本转HTML

## Hidden Title {.md-hidden}

### 基础用法

:::demo
utils/formatTextToHtml/base
:::

### 说明

`formatTextToHtml` 用于把纯文本里的换行符和制表符转换成可直接渲染的 HTML 片段，常用于日志详情、错误信息、文件元信息等需要保留排版的展示场景。

### 调用形式

```ts
formatTextToHtml(text)
```

### 参数说明

| 参数   | 类型          | 必填 | 默认值 | 说明                                                   |
| ------ | ------------- | ---- | ------ | ------------------------------------------------------ |
| `text` | `string \| T` | 是   | -      | 要转换的文本。只有字符串会被转换，其他类型会原样返回。 |

### 返回值

字符串输入会返回转换后的 HTML 字符串；非字符串、空值会原样返回。

转换规则：

| 原始字符 | 转换结果                   | 说明                          |
| -------- | -------------------------- | ----------------------------- |
| `\n`     | `<br>`                     | 保留换行展示。                |
| `\t`     | `&nbsp;&nbsp;&nbsp;&nbsp;` | 把制表符转换成 4 个空格效果。 |

### 常用场景

```ts
formatTextToHtml('Hello\nWorld')
// 'Hello<br>World'

formatTextToHtml('Name\tValue')
// 'Name&nbsp;&nbsp;&nbsp;&nbsp;Value'
```

### 注意事项

返回值通常配合 `v-html` 或 Element Plus 消息的 `dangerouslyUseHTMLString` 使用。这个函数只转换换行和制表符，不会过滤用户输入的 HTML；渲染不可信内容前需要自行做安全处理。
