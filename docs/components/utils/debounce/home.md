# debounce 防抖函数

## Hidden Title {.md-hidden}

<DocBasicUsage code='const debounced = debounce(fn, 500)' />

### 基础用法

:::demo
utils/debounce/base
:::

### 说明

`debounce` 用于创建一个防抖函数，适合搜索输入、表单提交、窗口尺寸变化等高频事件。连续调用时会重新计时，默认在停止调用 `500ms` 后执行最后一次传入的参数；也可以通过 `immediate` 让第一次调用立即执行。

### 调用形式

```ts
const debounced = debounce(fn)
const debounced = debounce(fn, delay)
const debounced = debounce(fn, delay, immediate)
const debounced = debounce(fn, delay, immediate, resultCallback)
```

### 参数说明

| 参数             | 类型                      | 必填 | 可选值           | 默认值  | 说明                                             |
| ---------------- | ------------------------- | ---- | ---------------- | ------- | ------------------------------------------------ |
| `fn`             | `(...args: any[]) => any` | 是   | 任意函数         | -       | 需要防抖执行的函数。                             |
| `delay`          | `number`                  | 否   | 大于等于 `0`     | `500`   | 防抖等待时间，单位毫秒。                         |
| `immediate`      | `boolean`                 | 否   | `true`、`false`  | `false` | 是否在第一次调用时立即执行。                     |
| `resultCallback` | `(result) => void`        | 否   | 任意结果回调函数 | -       | 每次 `fn` 真正执行后触发，参数是 `fn` 的返回值。 |

### 返回值

返回一个 Promise 风格的防抖函数，并带有 `cancel()` 方法：

| 返回内容   | 说明                                                        |
| ---------- | ----------------------------------------------------------- |
| 调用结果   | `Promise<Awaited<ReturnType<typeof fn>>>`，解析为函数结果。 |
| `cancel()` | 取消等待中的执行，并重置立即执行状态。                      |

### 常用场景

```ts
const search = debounce((keyword: string) => {
  return keyword.trim()
}, 300)

const result = await search('sybz')

const submit = debounce(
  () => saveForm(),
  500,
  true,
  (result) => {
    console.log('提交结果:', result)
  },
)

submit()
submit.cancel()
```

### 注意事项

`immediate=false` 时，连续调用只会在停止触发后执行最后一次。设置为 `true` 后，第一次调用会立即执行，等待期间的后续调用仍会重新计时并在结束时执行最后一次。组件卸载或不再需要等待中的任务时，应调用 `cancel()` 清理定时器。

:::utils-source debounce
:::
