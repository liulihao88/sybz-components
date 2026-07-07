# useLoading 加载状态

## Hidden Title {.md-hidden}

<DocBasicUsage code='const { loading, withLoading } = useLoading(false)' />

### 基础用法

:::demo 展示按钮异步提交。基础写法：`const { loading, withLoading } = useLoading(false)`。
hooks/useLoading/base
:::

### 说明

`useLoading` 用于管理异步请求、表单提交、弹窗确认等加载状态。相比手写 `try/finally`，`withLoading` 可以让代码更短，也不容易忘记关闭 loading。

### 调用形式

```ts
const { loading, setLoading, startLoading, stopLoading, withLoading } = useLoading(initialValue)
```

### 参数说明

| 参数           | 类型      | 必填 | 默认值  | 说明           |
| -------------- | --------- | ---- | ------- | -------------- |
| `initialValue` | `boolean` | 否   | `false` | 初始加载状态。 |

### 返回值

| 名称           | 类型                                                | 说明                                   |
| -------------- | --------------------------------------------------- | -------------------------------------- |
| `loading`      | `Ref<boolean>`                                      | 当前加载状态。                         |
| `setLoading`   | `(value: boolean) => void`                          | 手动设置加载状态。                     |
| `startLoading` | `() => void`                                        | 开启加载。                             |
| `stopLoading`  | `() => void`                                        | 关闭加载。                             |
| `withLoading`  | `<T>(handler: () => T \| Promise<T>) => Promise<T>` | 包裹同步或异步任务，自动维护 loading。 |
