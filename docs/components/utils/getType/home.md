# getType获取类型

## Hidden Title {.md-hidden}

### 基础用法

:::demo
utils/getType/base
:::

### 说明

`getType` 用于获取值的原始类型名称，并统一返回小写字符串。相比直接使用 `typeof`，它能区分 `array`、`date`、`regexp`、`map`、`weakmap`、`null` 等对象类型。

### 调用形式

```ts
getType(value)
```

### 参数说明

| 参数    | 类型      | 必填 | 默认值 | 说明                 |
| ------- | --------- | ---- | ------ | -------------------- |
| `value` | `unknown` | 是   | -      | 要判断类型的任意值。 |

### 返回值

返回小写类型字符串。基础类型返回 `typeof` 结果，对象类型返回 `Object.prototype.toString` 解析出的类型。

常见返回值：

| 输入            | 返回值        |
| --------------- | ------------- |
| `123`           | `'number'`    |
| `'text'`        | `'string'`    |
| `null`          | `'null'`      |
| `undefined`     | `'undefined'` |
| `[]`            | `'array'`     |
| `{}`            | `'object'`    |
| `new Date()`    | `'date'`      |
| `/abc/`         | `'regexp'`    |
| `new Map()`     | `'map'`       |
| `new WeakMap()` | `'weakmap'`   |

### 常用场景

```ts
getType([])
// 'array'

getType(null)
// 'null'

getType(new RegExp('abc'))
// 'regexp'
```

### 注意事项

`getType` 只返回类型名称，不做类型收窄。如果在 TypeScript 中需要类型保护，可以结合 `packages/utils/src/is.ts` 中的 `isArray`、`isMap`、`isFunction` 等方法。

:::utils-source getType
:::
