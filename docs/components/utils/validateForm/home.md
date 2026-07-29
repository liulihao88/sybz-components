# validateForm校验form函数封装

## Hidden Title {.md-hidden}

<DocBasicUsage code='await validateForm(formRef)' />

### 基础用法

:::demo
utils/validateForm/base
:::

### 说明

`validateForm` 用于把 Element Plus 表单实例的回调式 `validate` 封装成 Promise。校验通过时 resolve，校验失败时 reject，并可自动弹出统一错误提示。

### 调用形式

```ts
await validateForm(formRef)
await validateForm(formRef, options)
```

### 参数说明

| 参数      | 类型                                | 必填 | 默认值 | 说明                                                |
| --------- | ----------------------------------- | ---- | ------ | --------------------------------------------------- |
| `formRef` | `FormInstance \| Ref<FormInstance>` | 是   | -      | Element Plus 表单实例，或保存表单实例的 Vue `ref`。 |
| `options` | `ValidateFormOptions`               | 否   | `{}`   | 校验失败时的提示配置。                              |

`ValidateFormOptions` 字段：

| 字段          | 类型      | 默认值                           | 说明                             |
| ------------- | --------- | -------------------------------- | -------------------------------- |
| `message`     | `string`  | `'存在必填项未填写，请补充完整'` | 校验失败时的提示文案。           |
| `detail`      | `boolean` | `false`                          | 是否在提示文案后拼接失败字段名。 |
| `showMessage` | `boolean` | `true`                           | 是否通过 `$toast` 显示错误提示。 |

### 返回值

返回 `Promise<Record<string, any>>`。校验通过时 resolve 表单状态对象；校验失败时 reject Element Plus 返回的错误状态对象。

### 常用场景

```ts
try {
  await validateForm(formRef)
  await submit()
} catch (status) {
  console.log('校验失败字段', status)
}

await validateForm(formRef, {
  message: '请完善必填信息',
  detail: true,
})

await validateForm(formRef, {
  showMessage: false,
})
```

### 注意事项

`formRef` 必须能取到带 `validate(callback)` 方法的表单实例。`showMessage=false` 只是不弹提示，Promise 仍会 reject，调用处仍需要处理失败分支。

:::utils-source validateForm
:::
