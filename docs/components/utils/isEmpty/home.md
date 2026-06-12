# isEmpty判断是否是空值

## Hidden Title {.md-hidden}

### 基础用法

:::demo
utils/isEmpty/base
:::

### 说明

`isEmpty` 用于判断一个值是否属于业务上的“空值”。默认采用更安全的结构空值语义：只把没有实际内容的值视为空，不会把 `0`、`false`、`BigInt(0)` 误判为空。

### 调用形式

```ts
isEmpty(value)
isEmpty(value, strict)
```

### 参数说明

| 参数     | 类型      | 必填 | 默认值 | 说明                                                                                     |
| -------- | --------- | ---- | ------ | ---------------------------------------------------------------------------------------- |
| `value`  | `any`     | 是   | -      | 要判断的值。支持普通值和 Vue `ref`。                                                     |
| `strict` | `boolean` | 否   | `true` | 是否使用严格空值语义。传 `false` 时兼容旧逻辑，会把 `0`、`false`、`BigInt(0)` 也视为空。 |

### 返回值

返回 `boolean`，表示是否为空。

默认 `strict=true` 时会返回 `true` 的情况：

| 值                        | 说明                                                    |
| ------------------------- | ------------------------------------------------------- |
| `undefined` / `null`      | 空值。                                                  |
| `''` / `'   '`            | 空字符串或全空格字符串。                                |
| `[]`                      | 空数组。                                                |
| `{}`                      | 没有自有 key 的普通对象，包含 Symbol key 的对象不算空。 |
| `NaN`                     | 非法数字。                                              |
| `new Map()` / `new Set()` | 空集合。                                                |
| `new Date('invalid')`     | 无效日期。                                              |

默认 `strict=true` 时 `0`、`false`、`BigInt(0)`、函数、正则、Promise、有效日期都不算空。

### 常用场景

```ts
isEmpty('')
// true

isEmpty(0)
// false

isEmpty(0, false)
// true

isEmpty(ref([]))
// true
```

### 注意事项

对象判断只针对普通对象，避免把 `RegExp`、`Error`、`Promise` 等实例误判为空。如果你需要旧版“假值都算空”的语义，明确传 `strict=false`。


:::utils-source isEmpty
:::
