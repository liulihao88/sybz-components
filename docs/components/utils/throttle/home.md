# throttle 节流函数

## Hidden Title {.md-hidden}

<DocBasicUsage code='const throttled = throttle(fn, 1000)' />

### 基础用法

:::demo
utils/throttle/base
:::

### 说明

`throttle` 用于创建一个节流函数，适合滚动、拖拽、窗口尺寸变化、连续点击等高频事件。它会限制函数在指定间隔内最多执行一次，并支持控制首次是否立即执行、最后一次调用是否补执行。

### 调用形式

```ts
const throttled = throttle(fn)
const throttled = throttle(fn, delay)
const throttled = throttle(fn, delay, options)
const throttled = throttle(fn, delay, options, resultCallback)
```

### 参数说明

| 参数             | 类型                                                   | 必填 | 默认值                              | 说明                                               |
| ---------------- | ------------------------------------------------------ | ---- | ----------------------------------- | -------------------------------------------------- |
| `fn`             | `(...args: any[]) => any`                              | 是   | -                                   | 需要节流执行的函数。                               |
| `delay`          | `number`                                               | 否   | `1000`                              | 节流间隔，单位毫秒。                               |
| `options`        | `boolean \| { leading?: boolean; trailing?: boolean }` | 否   | `{ leading: true, trailing: true }` | 节流选项。传 `false` 等同于 `{ leading: false }`。 |
| `resultCallback` | `(result) => void`                                     | 否   | -                                   | 每次 `fn` 真正执行后触发，参数是 `fn` 的返回值。   |

### options 说明

| 字段       | 类型      | 默认值 | 说明                                                       |
| ---------- | --------- | ------ | ---------------------------------------------------------- |
| `leading`  | `boolean` | `true` | 是否在第一次调用时立即执行。                               |
| `trailing` | `boolean` | `true` | 是否在节流周期结束时，使用最后一次调用的参数再补执行一次。 |

### 返回值

返回带 `cancel()` 和 `flush()` 方法的节流函数：

| 方法       | 说明                                                       |
| ---------- | ---------------------------------------------------------- |
| `cancel()` | 取消等待中的 trailing 执行，并清空当前节流状态。           |
| `flush()`  | 如果存在等待中的 trailing 执行，立即使用最后一次参数执行。 |

### 常用场景

```ts
const handleResize = throttle(() => {
  console.log('resize')
}, 300)

window.addEventListener('resize', handleResize)

const saveDraft = throttle(
  (content: string) => {
    return content.trim()
  },
  1000,
  { leading: false, trailing: true },
  (result) => {
    console.log('保存草稿:', result)
  },
)

saveDraft('hello')
saveDraft.flush()
saveDraft.cancel()
```

### 注意事项

`throttle` 默认会立即执行第一次调用，并在节流周期结束时补执行最后一次调用。若只希望在停止触发后执行一次，可以设置 `{ leading: false, trailing: true }`；若只希望固定间隔立即响应，不需要补执行，可以设置 `{ trailing: false }`。

:::utils-source throttle
:::
