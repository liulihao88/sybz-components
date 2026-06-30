# mockValue生成随机字符串

## Hidden Title {.md-hidden}

<DocBasicUsage code='mockValue()' />

### 基础用法

:::demo
utils/mockValue/base
:::

### 说明

`mockValue` 用于生成随机字符串，也内置了手机号、邮箱、时间、数字、IP、端口和选项数组取值等模式。它常用于 mock 数据、临时标识、表单默认值和演示数据。

### 调用形式

```ts
mockValue()
mockValue(type)
mockValue(type, length)
mockValue(type, length, options)
mockValue(optionsArray, length, options)
```

### 参数说明

| 参数      | 类型                                             | 必填 | 默认值 | 说明                                                                         |
| --------- | ------------------------------------------------ | ---- | ------ | ---------------------------------------------------------------------------- |
| `type`    | `string \| Array<{ label: string; value: any }>` | 否   | `''`   | 生成模式。不传时生成普通随机字符串；传数组时随机返回某一项或该项的 `value`。 |
| `length`  | `number`                                         | 否   | `4`    | 普通随机字符串或 `number` 模式的长度。                                       |
| `options` | `MockValueOptions`                               | 否   | `{}`   | 不同模式下的额外配置。                                                       |

内置 `type`：

| `type`     | 返回值   | 说明                                                                    |
| ---------- | -------- | ----------------------------------------------------------------------- |
| `''`       | `string` | 生成由去除易混字符后的大小写字母和数字组成的随机字符串。                |
| `'phone'`  | `string` | 生成 `130/131/132/133/135/136/137/138/170/187/189` 等前缀开头的手机号。 |
| `'email'`  | `string` | 生成随机字符串并追加邮箱后缀。                                          |
| `'time'`   | `string` | 生成随机字符串，再追加当前时间。                                        |
| `'number'` | `number` | 生成指定长度的正整数，不包含 `0`。                                      |
| `'ip'`     | `string` | 生成 `10.0.11.x` 格式的 IP。                                            |
| `'port'`   | `number` | 生成 `1-65535` 范围内的端口号。                                         |
| `Array`    | `any`    | 从数组中随机取一项；如果数组项有 `value` 字段，返回 `value`。           |

`MockValueOptions` 字段：

| 字段           | 类型             | 默认值                      | 说明                                                       |
| -------------- | ---------------- | --------------------------- | ---------------------------------------------------------- |
| `emailStr`     | `string`         | `'@qq.com'`                 | `email` 模式下追加的邮箱后缀。                             |
| `timeStr`      | `string`         | `'{y}-{m}-{d} {h}:{i}:{s}'` | `time` 模式下追加的时间格式，格式规则同 `formatTime`。     |
| `startStr`     | `string`         | `''`                        | 生成结果前缀，普通随机字符串、`email`、`time` 模式会使用。 |
| `optionsIndex` | `number \| null` | `null`                      | 数组选项模式下指定固定索引；不传时随机取值。               |

### 返回值

根据 `type` 返回 `string`、`number` 或数组项的 `value`。传空数组时返回空字符串。

### 常用场景

```ts
mockValue()
// 'aB3d'

mockValue('number', 6)
// 483921

mockValue('email', 6, { emailStr: '@example.com' })
// 'xY3kP2@example.com'

mockValue('time', 4, { startStr: 'task-', timeStr: '{h}:{i}:{s}' })
// 'task-aB3d 09:30:12'

mockValue(
  [
    { label: '启用', value: 1 },
    { label: '禁用', value: 0 },
  ],
  4,
  { optionsIndex: 0 },
)
// 1
```

### 注意事项

`mockValue` 使用 `Math.random()`，适合业务展示和 mock 数据，不适合作为密码学安全随机数。`number` 模式不会生成包含 `0` 的数字。

:::utils-source mockValue
:::
