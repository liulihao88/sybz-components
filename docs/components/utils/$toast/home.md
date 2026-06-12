# $toast 提示

## Hidden Title {.md-hidden}

### 基础用法

:::demo
utils/$toast/base
:::

### 通常用法

:::demo
utils/$toast/usually
:::

### 说明

`$toast` 用于触发 Element Plus 的全局消息提示，适合保存成功、接口失败、普通反馈等场景。它在 `ElMessage` 的基础上增加了类型简写、默认样式和可选的关闭全部旧消息能力。

### 调用形式

```ts
$toast(message)
$toast(message, type)
$toast(message, type, options)
$toast(options)
$toast.success(message, options)
$toast.info(message, options)
$toast.error(message, options)
$toast.warning(message, options)
```

### 参数说明

| 参数          | 类型                                                                                      | 必填 | 默认值      | 说明                                                                                                 |
| ------------- | ----------------------------------------------------------------------------------------- | ---- | ----------- | ---------------------------------------------------------------------------------------------------- |
| `message`     | `string \| VNode \| () => VNode \| ToastOptions`                                          | 是   | -           | 提示内容。传对象时会被当成完整的 Element Plus `MessageOptions` 使用。                                |
| `type`        | `'success' \| 'info' \| 'error' \| 'warning' \| 's' \| 'i' \| 'e' \| 'w' \| ToastOptions` | 否   | `'success'` | 提示类型。`s/i/e/w` 分别是 `success/info/error/warning` 的简写；传对象时表示第二参数直接作为配置项。 |
| `otherParams` | `ToastOptions`                                                                            | 否   | `{}`        | 额外配置，会透传给 `ElMessage`。                                                                     |

`ToastOptions` 在 Element Plus `MessageOptions` 基础上额外支持：

| 字段          | 类型      | 默认值             | 说明                                                                     |
| ------------- | --------- | ------------------ | ------------------------------------------------------------------------ |
| `closeAll`    | `boolean` | `false`            | 显示当前消息前是否先关闭页面上已有的全部消息。                           |
| `customClass` | `string`  | `'s-antd-message'` | 自定义消息类名。传 `'el'` 时使用 Element Plus 原生样式，不追加默认类名。 |

### 返回值

`$toast` 无返回值，内部直接调用 `ElMessage` 展示提示。

### 常用场景

```ts
$toast('保存成功')
$toast('删除失败', 'e')
$toast('请检查表单', 'warning', { duration: 5000 })
$toast({ message: '自定义提示', type: 'info', closeAll: true })
$toast.error('接口请求失败', { showClose: true })
```

### 注意事项

`$toast` 依赖 Element Plus 的 `ElMessage`，需要在浏览器端且项目已正确引入 Element Plus 样式。需要渲染 HTML 字符串时，可通过配置项传 `dangerouslyUseHTMLString: true`。


:::utils-source $toast
:::
