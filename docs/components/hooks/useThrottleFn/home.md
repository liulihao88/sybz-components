# useThrottleFn 节流函数

## Hidden Title {.md-hidden}

<DocBasicUsage code='const handleClick = useThrottleFn(() => { ... }, 1000)' />

### 基础用法

:::demo 基础用法：`const handleClick = useThrottleFn(() => { ... }, 1000)`。属性说明：`fn` 示例值：`() => { ... }`，类型：function，默认值：必传；`wait` 示例值：`1000`，类型：number，默认值：`300`；`options.leading` 示例值：`true`，类型：boolean，默认值：`true`；`options.trailing` 示例值：`true`，类型：boolean，默认值：`true`。返回函数额外提供 `cancel` 和 `flush`。本示例展示按钮防重复点击，可以直接复制基础写法后替换业务操作。
hooks/useThrottleFn/base
:::

### 说明

`useThrottleFn` 用于固定时间内限制执行频率，适合滚动、拖拽、按钮防重复点击、鼠标移动等高频事件。

### 调用形式

```ts
const throttledFn = useThrottleFn(fn, wait, {
  leading: true,
  trailing: true,
})
```

### 参数说明

| 参数               | 类型                      | 必填 | 默认值 | 说明                           |
| ------------------ | ------------------------- | ---- | ------ | ------------------------------ |
| `fn`               | `(...args: any[]) => any` | 是   | -      | 要执行的函数。                 |
| `wait`             | `number`                  | 否   | `300`  | 节流间隔，单位毫秒。           |
| `options.leading`  | `boolean`                 | 否   | `true` | 是否立即执行第一次。           |
| `options.trailing` | `boolean`                 | 否   | `true` | 间隔结束后是否补执行最后一次。 |

### 返回值

返回一个节流后的函数，并带有两个方法：

| 名称     | 类型         | 说明                   |
| -------- | ------------ | ---------------------- |
| `cancel` | `() => void` | 取消等待中的执行。     |
| `flush`  | `() => any`  | 立即执行等待中的函数。 |
