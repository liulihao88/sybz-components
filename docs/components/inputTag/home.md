# inputTag标签输入组件

## Hidden Title {.md-hidden}

<DocBasicUsage code='<s-input-tag v-model="tags"></s-input-tag>' />

## 属性事件插槽简介

<ApiIntro />

### 基础用法

:::demo 基础写法：`<s-input-tag v-model="tags" />`；回车、失焦或粘贴时按 `splitRegExp`（默认 `/(?:,|，|、|;|；|\s)+/`）切分，任一结果校验失败则整批不添加，输入框为空时按退格删除最后一个标签；`singleLine` 默认 `true`，标签单行、超出时左右滚动，设为 `false` 时自动换行并按标签数量撑高。
inputTag/base
:::

### 其他用法（singleLine 默认 true；splitRegExp 默认 `/(?:,|，|、|;|；|\s)+/`；allowDuplicate 默认 false；maxCount 默认 0；disabled 默认 false；tagAttrs 默认 `{}`，示例 type / effect）

::: other
inputTag/other
:::

### 校验（regexp 默认未设置；message 默认 `输入有误`）

:::demo 基础写法：`<s-input-tag v-model="ports" :regexp="/^\d{1,5}$/" message="请输入端口号" />`；`regexp` 校验每个切分后的标签，失败时 `$toast` 提示并保留输入内容。
inputTag/validate
:::

### 属性

|      属性名      | 说明                                                                                                     | 类型                    | 默认值                        |
| :--------------: | -------------------------------------------------------------------------------------------------------- | ----------------------- | ----------------------------- |
|   `modelValue`   | 标签数组                                                                                                 | array                   | `[]`                          |
|  `splitRegExp`   | 分隔符正则，输入或粘贴时按它切分；可传正则字符串，传 `false` 关闭分割                                    | RegExp / string / false | `/(?:,\|，\|、\|;\|；\|\s)+/` |
|     `regexp`     | 单个标签的校验正则                                                                                       | RegExp                  | -                             |
|    `message`     | 校验失败提示文案                                                                                         | string                  | `输入有误`                    |
| `allowDuplicate` | 是否允许重复标签；不允许时通过 `$toast` 提示并保留输入内容                                               | boolean                 | `false`                       |
|    `maxCount`    | 最多标签数，`0` 表示不限制                                                                               | number                  | `0`                           |
|   `isComplex`    | 是否按对象数组处理，新增时写入 `{ name }`；对象项 `isDelete: 0` 时锁定                                   | boolean                 | `false`                       |
|   `inputAttrs`   | 透传给内部 `s-input` 的属性                                                                              | object                  | `{}`                          |
|    `tagAttrs`    | 透传给每个标签 `s-tag` 的属性，如 type / effect / size / round / theme；`closable: false` 可隐藏关闭按钮 | object                  | `{}`                          |
|  `placeholder`   | 输入框占位文案                                                                                           | string                  | `输入后回车`                  |
|   `singleLine`   | 是否只显示一行；`false` 时自动换行、高度随标签数量变化                                                   | boolean                 | `true`                        |
|    `disabled`    | 是否禁用；禁用时不渲染内部输入框                                                                         | boolean                 | `false`                       |
|   `clearable`    | 是否显示一键清空按钮                                                                                     | boolean                 | `true`                        |

### 事件

|       事件名        | 说明                                 | 参数                     |
| :-----------------: | ------------------------------------ | ------------------------ |
| `update:modelValue` | 标签变化时触发                       | `(value: array)`         |
|      `change`       | 标签变化后触发，包含新增、删除和清空 | `(value: array)`         |
|        `add`        | 新增标签时触发，分割出多个时逐个触发 | `(value)`                |
|      `remove`       | 删除标签时触发                       | `(value, index: number)` |
|       `clear`       | 点击一键清空时触发                   | -                        |

### 插槽

| 插槽名 | 说明                                 | 参数                     |
| :----: | ------------------------------------ | ------------------------ |
| `tag`  | 自定义标签内容，关闭按钮仍由组件渲染 | `{ item, index, label }` |

### 方法

|    名称     | 说明             | 类型          |
| :---------: | ---------------- | ------------- |
| `$getValue` | 获取当前标签数组 | `() => array` |
| `clearAll`  | 清空全部标签     | `() => void`  |
|   `focus`   | 聚焦到内部输入框 | `() => void`  |
