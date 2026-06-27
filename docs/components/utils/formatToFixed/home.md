# formatToFixed方法

## Hidden Title {.md-hidden}

<DocBasicUsage code='formatToFixed(22)' />

### 基础用法

:::demo
utils/formatToFixed/base
:::

### 通常用法

:::demo
utils/formatToFixed/usually
:::

### 说明

`formatToFixed` 用于把数字或带单位的数字字符串格式化为固定小数位文本，并可追加前缀、后缀、千分位或移除原单位。它适合金额、百分比、容量数值等展示场景。

### 调用形式

```ts
formatToFixed(value)
formatToFixed(value, digit)
formatToFixed(value, options)
```

### 参数说明

| 参数      | 类型                   | 必填 | 默认值 | 说明                                                                 |
| --------- | ---------------------- | ---- | ------ | -------------------------------------------------------------------- |
| `value`   | `unknown`              | 是   | -      | 要格式化的值。支持数字、数字字符串、带单位的数字字符串，如 `22 TB`。 |
| `digit`   | `number`               | 否   | `2`    | 第二个参数直接传数字时，表示保留的小数位数。                         |
| `options` | `FormatToFixedOptions` | 否   | `{}`   | 第二个参数传对象时，用于控制完整格式。                               |

`FormatToFixedOptions` 字段：

| 字段        | 类型      | 默认值  | 说明                             |
| ----------- | --------- | ------- | -------------------------------- |
| `digit`     | `number`  | `2`     | 保留的小数位数。                 |
| `prefix`    | `string`  | `''`    | 结果前缀，例如 `$`。             |
| `suffix`    | `string`  | `''`    | 结果后缀，例如 `%`。             |
| `unit`      | `boolean` | `true`  | 是否保留原始值里的单位。         |
| `thousands` | `boolean` | `false` | 是否给数值部分添加千分位分隔符。 |

### 返回值

返回格式化后的字符串。如果输入无法按数字规则解析，会返回 `String(value)`。

### 常用场景

```ts
formatToFixed(22)
// '22.00'

formatToFixed(22.1234, 3)
// '22.123'

formatToFixed('22 TB', { unit: false, prefix: '$' })
// '$22.00'

formatToFixed(222222, { digit: 2, thousands: true })
// '222,222.00'
```

### 注意事项

`unit: false` 只会移除输入值里原本携带的单位，不会影响 `suffix`。如果需要展示百分号，使用 `suffix: '%'`。

:::utils-source formatToFixed
:::
