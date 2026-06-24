# useZIndex 层级管理

## Hidden Title {.md-hidden}

### 基础用法

:::demo 基础用法：`const { currentZIndex, nextZIndex } = useZIndex(2000)`。属性说明：`initialValue` 示例值：`2000`，类型：number，默认值：`2000`；返回值 `currentZIndex` 是当前层级，`nextZIndex` 会生成下一个层级。本示例展示多个浮层依次提升层级。
hooks/useZIndex/base
:::

### 说明

`useZIndex` 用于生成递增的层级值，适合消息、弹窗、浮层、抽屉等需要后打开元素在上层显示的场景。

### 调用形式

```ts
const { currentZIndex, nextZIndex, initialZIndex } = useZIndex(initialValue)
```

### 参数说明

| 参数 | 类型 | 必填 | 默认值 | 说明 |
| ---- | ---- | ---- | ------ | ---- |
| `initialValue` | `number` | 否 | `2000` | 起始层级。 |

### 返回值

| 名称 | 类型 | 说明 |
| ---- | ---- | ---- |
| `currentZIndex` | `ComputedRef<number>` | 当前层级。 |
| `nextZIndex` | `() => number` | 生成并返回下一个层级。 |
| `initialZIndex` | `Ref<number>` | 起始层级。 |
