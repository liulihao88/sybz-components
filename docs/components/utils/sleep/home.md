# sleep延迟函数

## Hidden Title {.md-hidden}

### 基础用法

:::demo
utils/sleep/base
:::

### 说明

`sleep` 用于创建一个延迟结束的 `Promise`，适合在异步流程中等待一段时间，或在延迟结束后执行一个回调函数。

### 调用形式

```ts
await sleep(delay)
await sleep(delay, callback)
```

### 参数说明

| 参数       | 类型         | 必填 | 默认值 | 说明                           |
| ---------- | ------------ | ---- | ------ | ------------------------------ |
| `delay`    | `number`     | 否   | `0`    | 延迟时间，单位毫秒。           |
| `callback` | `() => void` | 否   | -      | 延迟结束后立即执行的回调函数。 |

### 返回值

返回 `Promise<void>`。定时器结束后会先执行 `callback`，再 resolve。

### 常用场景

```ts
await sleep(1000)

await sleep(300, () => {
  console.log('延迟结束')
})

loading.value = true
await sleep(500)
loading.value = false
```

### 注意事项

`sleep` 不会取消定时器，也不会捕获 `callback` 内部异常。若回调里可能抛错，建议在回调内部自行处理。

:::utils-source sleep
:::
