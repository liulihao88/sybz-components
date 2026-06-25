# useDebounceFn 防抖函数

## Hidden Title {.md-hidden}

### 基础用法

:::demo 基础用法：`const search = useDebounceFn((value) => { ... }, 500)`。属性说明：`fn` 示例值：`(value) => { ... }`，类型：function，默认值：必传；`wait` 示例值：`500`，类型：number，默认值：`300`。返回函数额外提供 `cancel` 和 `flush`。本示例展示输入框检索防抖，可以直接复制基础写法后替换查询接口。
hooks/useDebounceFn/base
:::

### 说明

`useDebounceFn` 用于高频触发后只执行最后一次，适合搜索输入、窗口尺寸变化后的延迟计算、远程校验等场景。

### 调用形式

```ts
const debouncedFn = useDebounceFn(fn, wait)
debouncedFn()
debouncedFn.cancel()
debouncedFn.flush()
```

### 参数说明

| 参数   | 类型                      | 必填 | 默认值 | 说明                     |
| ------ | ------------------------- | ---- | ------ | ------------------------ |
| `fn`   | `(...args: any[]) => any` | 是   | -      | 要执行的函数。           |
| `wait` | `number`                  | 否   | `300`  | 防抖等待时间，单位毫秒。 |

### 返回值

返回一个防抖后的函数，并带有两个方法：

| 名称     | 类型         | 说明                   |
| -------- | ------------ | ---------------------- |
| `cancel` | `() => void` | 取消等待中的执行。     |
| `flush`  | `() => any`  | 立即执行等待中的函数。 |
