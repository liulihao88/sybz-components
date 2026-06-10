# formatBytes数字转字节

## Hidden Title {.md-hidden}

### 基础用法

:::demo
utils/formatBytes/base
:::

### 说明

`formatBytes` 用于把字节数转换成更易读的单位文本，例如把 `1048576` 转成 `1.00 MB`。它支持控制小数位、千分位、前后缀和取整方式，适合容量、流量、传输速度等展示场景。

### 调用形式

```ts
formatBytes(bytes)
formatBytes(bytes, options)
```

### 参数说明

| 参数 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `bytes` | `number \| string` | 是 | - | 要格式化的字节数。支持数字和数字字符串；非法数字会原样返回。 |
| `options` | `FormatBytesOptions` | 否 | `{}` | 控制格式化结果的配置项。 |

`FormatBytesOptions` 字段：

| 字段 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `digit` | `number` | `2` | 保留的小数位数。 |
| `thousands` | `boolean` | `false` | 是否给数值部分添加千分位分隔符。 |
| `prefix` | `string` | `''` | 结果前缀，例如 `$`。 |
| `suffix` | `string` | `''` | 结果后缀，例如 `/s`。 |
| `roundType` | `'floor' \| 'ceil' \| 'round'` | `'floor'` | 小数处理方式，分别表示向下、向上、四舍五入。 |

### 返回值

返回格式化后的字符串，例如 `1.00 KB`。如果 `bytes` 不是合法数字或数字字符串，会原样返回该值。

### 常用场景

```ts
formatBytes(1024)
// '1.00 KB'

formatBytes(1040000, { digit: 3, roundType: 'round' })
// '991.821 KB'

formatBytes(1040000, { prefix: '$', suffix: '/s', thousands: true })
// '$1,015.62 KB/s'
```

### 注意事项

单位按 `1024` 进制递增，支持 `B` 到 `YB`。当输入值小于或等于 `1` 时会直接按 `B` 展示。
