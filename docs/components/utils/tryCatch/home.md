# tryCatch方法

## Hidden Title {.md-hidden}

### 基础用法

:::demo
utils/tryCatch/base
:::

### 说明

`tryCatch` 用于统一处理同步 `throw` 和异步 `reject`，避免每个接口或任务都手写 `try...catch`。它会返回固定的 `{ data, error }` 结构，并可自动维护一个 Vue `ref` 类型的 loading 状态。

### 调用形式

```ts
await tryCatch(promise)
await tryCatch(() => task())
await tryCatch(() => task(), loadingRef)
```

### 参数说明

| 参数         | 类型                                  | 必填 | 默认值 | 说明                                                                            |
| ------------ | ------------------------------------- | ---- | ------ | ------------------------------------------------------------------------------- |
| `task`       | `Promise<T> \| () => T \| Promise<T>` | 是   | -      | 要执行的任务。推荐传函数，这样同步抛错和异步 reject 都能被捕获。                |
| `loadingRef` | `Ref<boolean> \| null`                | 否   | -      | 可选 loading 状态。传入 Vue `ref` 时，执行前会设为 `true`，结束后设为 `false`。 |

### 返回值

返回 `Promise<{ data: T | null; error: any }>`：

| 字段    | 成功时   | 失败时       | 说明       |
| ------- | -------- | ------------ | ---------- |
| `data`  | 任务结果 | `null`       | 成功结果。 |
| `error` | `null`   | 捕获到的异常 | 失败原因。 |

### 常用场景

```ts
const loading = ref(false)

const { data, error } = await tryCatch(() => fetchUser(), loading)
if (error) {
  $toast(error.message, 'e')
}

const result = await tryCatch(Promise.resolve({ id: 1 }))
```

### 注意事项

优先传 `() => task()`，这样函数执行阶段的同步错误也能被捕获。如果第二个参数不是 `ref`，函数不会直接修改它，并会在控制台提示无法修改非 `ref` 的 loading。


:::utils-source tryCatch
:::
