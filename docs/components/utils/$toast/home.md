# $toast 提示

## Hidden Title {.md-hidden}

<DocBasicUsage code="$toast('保存成功')" />

### 基础用法

:::demo
utils/$toast/base
:::

### other

已在 Vue 应用中全局注册的组件可以直接写进字符串：

```ts
import { $toast } from '@sybz-components/utils'

$toast('<s-tag type="danger">你好</s-tag>', { dangerouslyUseHTMLString: true })
```

`dangerouslyUseHTMLString: true` 会从当前 Vue 应用的全局组件表查找 `s-tag` 并渲染。第二个参数需要使用对象语法 `{ dangerouslyUseHTMLString: true }`。

`icon` 可直接传 `s-icon` 支持的图标名称。应用已全局注册 `SIcon` 时，`$toast` 会用它渲染字符串图标；原有的 Vue 图标组件传法也继续支持：

```ts
$toast('操作成功', { icon: 'Plus' })
$toast('正在处理', {
  icon: 'mdi:ab-testing',
  iconAttrs: { size: 22, color: '#409eff', style: { marginRight: '4px' } },
})
$toast('操作失败', { icon: '❌' })
```

字符串图标沿用 `s-icon` 的自动识别规则，包括 Element Plus 名称、Iconify 名称、Emoji、CSS 图标类名和图片 URL。通过 `iconAttrs` 可设置 `size`、`color`、`source`、`type`、`variant`、`class` 和 `style` 等属性；自定义 SVG 名称可写 `iconAttrs: { source: 'svg' }`。

:::demo
utils/$toast/other
:::

### 说明

`$toast` 用于触发 Element Plus 的全局消息提示，适合保存成功、接口失败、普通反馈等场景。它在 `ElMessage` 的基础上增加了类型简写、默认样式和可选的关闭全部旧消息能力。鼠标停在右上角关闭区域时，才会出现不占布局空间的圆形关闭按钮。

应用入口可通过 `configureUtils({ theme: 'shijingshan' })` 设置全局默认主题。单次调用的 `theme` 会覆盖全局配置。

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

| 字段          | 类型                                       | 默认值               | 说明                                                              |
| ------------- | ------------------------------------------ | -------------------- | ----------------------------------------------------------------- |
| `theme`       | `'default' \| 'chenghua' \| 'shijingshan'` | 全局主题或 `default` | 消息主题；单次设置会覆盖 `configureUtils` 的全局主题。            |
| `closeAll`    | `boolean`                                  | `false`              | 显示当前消息前是否先关闭页面上已有的全部消息。                    |
| `showClose`   | `boolean`                                  | `true`               | 鼠标停在右上角关闭区域或键盘聚焦按钮时显示；传 `false` 则不渲染。 |
| `customClass` | `string`                                   | `'s-antd-message'`   | 自定义消息类名。传 `'el'` 时使用 Element Plus 原生外观。          |
| `icon`        | `string \| Component`                      | 按消息类型           | 字符串按全局 `SIcon` 的自动识别规则渲染，也可传 Vue 图标组件。    |
| `iconAttrs`   | `object`                                   | -                    | 传给 `SIcon` 或自定义图标组件的属性和样式。                       |

### 返回值

`$toast` 无返回值，内部直接调用 `ElMessage` 展示提示。

### 常用场景

```ts
$toast('保存成功')
$toast('删除失败', 'e')
$toast('请检查表单', 'warning', { duration: 5000 })
$toast({ message: '自定义提示', type: 'info', closeAll: true })
$toast.error('接口请求失败', { showClose: true })
$toast({ message: '单次使用成华主题', theme: 'chenghua' })
```

### 注意事项

`$toast` 依赖 Element Plus 的 `ElMessage`，需要在浏览器端且项目已正确引入 Element Plus 样式。`dangerouslyUseHTMLString: true` 会解析字符串并渲染已全局注册的 Vue 组件；仅传可信内容。也可直接传 Vue VNode 或返回 VNode 的函数。

:::utils-source $toast
:::
