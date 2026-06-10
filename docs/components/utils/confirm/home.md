# confirm 二次确认框

## Hidden Title {.md-hidden}

### 基础用法

:::demo
utils/confirm/base
:::

### 在弹框中使用

:::demo
utils/confirm/dialog
:::

### 测试

:::demo
utils/confirm/test
:::

### 说明

`confirm` 用于在执行删除、提交、关闭等危险或重要操作前发起二次确认。它基于 Element Plus `ElMessageBox.confirm` 封装，默认补齐标题、按钮文案、按钮样式，并额外处理嵌套弹窗中的挂载节点和 Vue `appContext`。

### 调用形式

```ts
confirm(message)
confirm(message, options)
confirm(message, options, appContext)
```

### 参数说明

| 参数         | 类型                             | 必填 | 默认值 | 说明                                                                           |
| ------------ | -------------------------------- | ---- | ------ | ------------------------------------------------------------------------------ |
| `message`    | `string \| VNode \| () => VNode` | 是   | -      | 确认框内容。可以传普通文本、HTML 字符串、VNode，或返回 VNode 的函数。          |
| `options`    | `ConfirmOptions`                 | 否   | `{}`   | Element Plus `ElMessageBoxOptions` 配置，并额外支持 `appendTo`、`appContext`。 |
| `appContext` | `AppContext \| null`             | 否   | `null` | Vue 应用上下文。多应用或需要渲染组件内容时可手动传入。                         |

`ConfirmOptions` 常用字段：

| 字段                       | 类型                            | 默认值           | 说明                                                         |
| -------------------------- | ------------------------------- | ---------------- | ------------------------------------------------------------ |
| `title`                    | `string`                        | `'提示'`         | 确认框标题。                                                 |
| `showCancelButton`         | `boolean`                       | `true`           | 是否显示取消按钮。                                           |
| `cancelButtonText`         | `string`                        | `'取消'`         | 取消按钮文案。                                               |
| `confirmButtonText`        | `string`                        | `'确定'`         | 确认按钮文案。                                               |
| `dangerouslyUseHTMLString` | `boolean`                       | `true`           | 是否把字符串内容按 HTML 渲染。                               |
| `appendTo`                 | `string \| HTMLElement \| null` | 自动识别当前弹窗 | 指定 MessageBox 挂载节点。传普通字符串时会优先按 `id` 查询。 |
| `appContext`               | `AppContext \| null`            | 自动解析         | 手动指定 Vue 应用上下文。优先级高于第三个参数。              |

### 返回值

返回 `ElMessageBox.confirm` 的 `Promise`。用户点击确认时 resolve；点击取消或关闭时 reject。

### 常用场景

```ts
await confirm('确定删除当前记录吗？')

await confirm('确认提交？', {
  confirmButtonText: '提交',
  cancelButtonText: '再想想',
})

await confirm('只提示确认按钮', {
  showCancelButton: false,
})

await confirm('第一行<br><span class="text-[var(--blue)]">重点内容</span>', {
  dangerouslyUseHTMLString: true,
})
```

### 注意事项

`confirm` 依赖 Element Plus 的 `ElMessageBox`，需要在浏览器端使用。默认开启 `dangerouslyUseHTMLString`，传入来自用户输入的 HTML 前要先做好可信处理，避免注入风险。嵌套 `s-dialog` 或 `el-dialog` 中使用时，如果默认挂载位置不符合预期，可以显式传 `appendTo`。
