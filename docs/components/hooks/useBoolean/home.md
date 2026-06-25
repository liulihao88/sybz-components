# useBoolean 布尔状态

## Hidden Title {.md-hidden}

### 基础用法

:::demo 基础用法：`const { state, setTrue, setFalse, toggle } = useBoolean(false)`。属性说明：`initialValue` 示例值：`false`，类型：boolean，默认值：`false`；返回值 `state` 是布尔 Ref，`setTrue` 设置为 true，`setFalse` 设置为 false，`toggle` 取反。本示例展示弹窗开关这类最常见场景，可以直接复制基础写法后按业务替换变量名。
hooks/useBoolean/base
:::

### 说明

`useBoolean` 用来管理布尔值状态，适合弹窗显示、折叠展开、开关状态、确认区显示隐藏等场景。

### 调用形式

```ts
const { state, set, setTrue, setFalse, toggle } = useBoolean(initialValue)
```

### 参数说明

| 参数           | 类型      | 必填 | 默认值  | 说明         |
| -------------- | --------- | ---- | ------- | ------------ |
| `initialValue` | `boolean` | 否   | `false` | 初始布尔值。 |

### 返回值

| 名称       | 类型                       | 说明                         |
| ---------- | -------------------------- | ---------------------------- |
| `state`    | `Ref<boolean>`             | 当前布尔状态。               |
| `set`      | `(value: boolean) => void` | 设置指定布尔值。             |
| `setTrue`  | `() => void`               | 设置为 `true`。              |
| `setFalse` | `() => void`               | 设置为 `false`。             |
| `toggle`   | `() => void`               | 在 `true` / `false` 间切换。 |
