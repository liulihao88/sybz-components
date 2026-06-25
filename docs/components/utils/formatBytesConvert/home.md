# 将字节转换成数字

## Hidden Title {.md-hidden}

### 基础用法

:::demo
utils/formatBytesConvert/base
:::

### 说明

`formatBytesConvert` 用于把带单位的字节文本转换成原始字节数，例如把 `1.5GB` 转成 `1610612736`。它也可以处理纯数字、数字字符串和带千分位的输入。

### 调用形式

```ts
formatBytesConvert(value)
formatBytesConvert(value, options)
```

### 参数说明

| 参数      | 类型                        | 必填 | 默认值 | 说明                                                       |
| --------- | --------------------------- | ---- | ------ | ---------------------------------------------------------- |
| `value`   | `unknown`                   | 是   | -      | 要转换的值。支持 `100GB`、`1,024 KB`、数字、数字字符串等。 |
| `options` | `FormatBytesConvertOptions` | 否   | `{}`   | 控制转换后展示格式的配置项。                               |

`FormatBytesConvertOptions` 字段：

| 字段         | 类型      | 默认值  | 说明                                                              |
| ------------ | --------- | ------- | ----------------------------------------------------------------- |
| `digit`      | `number`  | `0`     | 转换结果需要保留的小数位数。大于 `0` 时返回字符串。               |
| `thounsands` | `boolean` | `false` | 是否给转换结果添加千分位分隔符。字段名按源码保持为 `thounsands`。 |

### 返回值

返回字节数。默认通常返回 `number`；启用 `digit` 或 `thounsands` 后会返回格式化后的 `string`。输入格式非法时返回 `undefined` 并在控制台输出警告。

### 常用场景

```ts
formatBytesConvert('1GB')
// 1073741824

formatBytesConvert('1,024 KB')
// 1048576

formatBytesConvert('1.5GB', { digit: 2 })
// '1610612736.00'

formatBytesConvert(1040000, { thounsands: true })
// '1,040,000'
```

### 注意事项

支持的单位包括 `B`、`Byte`、`KB`、`MB`、`GB`、`TB`、`PB`、`EB`、`ZB`、`YB`，单位大小写不敏感。`thounsands` 是当前 API 的实际字段名，使用时不要写成 `thousands`。

:::utils-source formatBytesConvert
:::
