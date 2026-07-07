# useZIndex 层级管理

## Hidden Title {.md-hidden}

<DocBasicUsage code='const { currentZIndex, nextZIndex } = useZIndex(2000)' />

### 基础用法

:::demo 展示多个浮层依次提升层级。基础写法：`const { currentZIndex, nextZIndex } = useZIndex(2000)`。
hooks/useZIndex/base
:::

### 说明

`useZIndex` 用于生成递增的层级值，适合消息、弹窗、浮层、抽屉等需要后打开元素在上层显示的场景。

### 调用形式

```ts
const { currentZIndex, nextZIndex, initialZIndex } = useZIndex(initialValue)
```

### 参数说明

| 参数           | 类型     | 必填 | 默认值 | 说明       |
| -------------- | -------- | ---- | ------ | ---------- |
| `initialValue` | `number` | 否   | `2000` | 起始层级。 |

### 返回值

| 名称            | 类型                  | 说明                   |
| --------------- | --------------------- | ---------------------- |
| `currentZIndex` | `ComputedRef<number>` | 当前层级。             |
| `nextZIndex`    | `() => number`        | 生成并返回下一个层级。 |
| `initialZIndex` | `Ref<number>`         | 起始层级。             |
