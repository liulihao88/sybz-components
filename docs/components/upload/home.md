# upload 上传组件

[Element Plus Upload 上传组件文档](https://element-plus.org/zh-CN/component/upload.html)

## Hidden Title {.md-hidden}

<DocBasicUsage code='<s-upload v-model="files" :auto-upload="false" />' />

## 属性事件插槽简介

<ApiIntro />

### 基础用法

:::demo 展示文件选择和拖拽上传。基础写法：`<s-upload v-model="files" :auto-upload="false" />`。属性：`modelValue` 类型 `UploadUserFile[]`，默认值 `[]`；`autoUpload` 可选 `true / false`，Element Plus 默认值 `true`。
upload/base
:::

### 图片多选与限制

:::demo 展示图片多选、数量、类型和大小限制。基础写法：`<s-upload v-model="files" accept="image/*" list-type="picture-card" multiple :limit="6" :max-file-size-bytes="2097152" />`。属性：`accept` 类型 `string`，默认值 `''`；`listType` 可选 `text / picture / picture-card`，默认值 `text`；`multiple` 可选 `true / false`，默认值 `false`；`limit` 类型 `number`，默认值未设置；`maxFileSizeBytes` 类型 `number`，默认值 `Infinity`。
upload/picture
:::

### 自定义上传接口

:::demo 展示通过 `request(file, context)` 传入业务上传接口，并通过 `context.onProgress` 上报进度、通过组件实例 `cancel(file)` 取消上传。基础写法：`<s-upload v-model="files" :request="uploadFile" :cancel="cancelFile" />`。属性：`request` 类型 `SUploadRequest`，默认值未设置；`cancel` 类型 `SUploadCancel`，默认值未设置；`context` 包含 `data / headers / filename / onProgress / onSuccess / onError` 等上传上下文。
upload/request
:::

### 属性

| 属性名                  | 说明                                                 | 类型                            | 默认值                       |
| ----------------------- | ---------------------------------------------------- | ------------------------------- | ---------------------------- |
| `modelValue`            | 双向绑定的文件列表                                   | `UploadUserFile[]`              | `[]`                         |
| `maxFileSizeBytes`      | 单个文件最大字节数                                   | `number`                        | `Infinity`                   |
| `request`               | 自定义上传接口                                       | `SUploadRequest`                | -                            |
| `cancel`                | 取消业务上传请求                                     | `SUploadCancel`                 | -                            |
| `showValidationMessage` | 校验失败时是否显示消息提示                           | `boolean`                       | `true`                       |
| `placeholder`           | 默认上传区域主文案                                   | `string`                        | `拖拽文件到此处，或点击上传` |
| `tip`                   | 默认上传区域辅助文案，未设置时自动展示类型和大小限制 | `string`                        | `''`                         |
| `accept`                | 允许的文件类型，支持 MIME、通配 MIME 和扩展名        | `string`                        | `''`                         |
| `multiple`              | 是否支持多选                                         | `boolean`                       | `false`                      |
| `limit`                 | 最大上传文件数量                                     | `number`                        | -                            |
| `listType`              | 文件列表展示类型                                     | `text / picture / picture-card` | `text`                       |

其余属性继承 Element Plus Upload。

### 事件

| 事件名              | 说明                           | 参数                          |
| ------------------- | ------------------------------ | ----------------------------- |
| `update:modelValue` | 文件列表更新                   | `(files)`                     |
| `change`            | 文件状态变化                   | `(file, files)`               |
| `validation-error`  | 类型、大小或自定义前置校验失败 | `({ file, reason, message })` |

### 实例方法

| 方法名                 | 说明                                                           | 参数                                    |
| ---------------------- | -------------------------------------------------------------- | --------------------------------------- |
| `cancel(file, remove)` | 取消指定文件上传；`remove` 默认值为 `true`，表示同时从列表移除 | `file?: UploadFile`、`remove?: boolean` |
| `abort(file?)`         | 调用 Element Plus 原生中止请求                                 | `file?: UploadFile`                     |
| `submit()`             | 提交所有待上传文件                                             | -                                       |

### 插槽

支持 `default / trigger / tip / file` 等 Element Plus Upload 插槽。未传 `default` 插槽时展示内置拖拽上传区域。
