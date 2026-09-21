# Json JSON 编辑组件

`s-json` 基于 CodeMirror 6 封装，用于编辑完整 JSON 文本。键名和值都可以直接修改，并提供语法高亮、中文错误提示、错误定位、格式化、压缩、复制和只读模式。

## Hidden Title {.md-hidden}

<DocBasicUsage code='<s-json v-model:data="data" />' />

## 属性事件插槽简介

<ApiIntro />

### 基础用法（默认 `disabled=false`、`lineNumbers=true`、`toolbar=true`、`showStatus=true`）

:::demo 通过 `v-model:data` 绑定对象；键名和值均可编辑，JSON 合法时自动同步结构化数据。基础写法：`<s-json v-model:data="data" />`。属性：`disabled` 可选 `true / false`，默认值 `false`；`lineNumbers`、`toolbar`、`showStatus` 可选 `true / false`，默认值均为 `true`；`indent` 默认值 `2`；`minHeight` 默认值 `240`。
json/base
:::

### 完整编辑（默认 `height=''`、`theme='light'`）

:::demo 展示带固定高度的完整 JSON 编辑器。编辑过程中允许暂时不合法的文本，错误会显示在工具栏中，修正后再通过 `update:data` 同步对象。基础写法：`<s-json v-model:data="data" height="360" />`。属性：`height` 类型 `string / number`，默认值为空；`theme` 可选 `light / dark`，默认值 `light`。
json/interactive
:::

### 禁用状态（默认 `disabled=false`）

:::demo 使用 `disabled` 禁止编辑，并显示灰色背景及禁用状态；格式化和压缩操作会隐藏，仍可复制 JSON。基础写法：`<s-json v-model:data="data" disabled />`。属性：`disabled` 可选 `true / false`，默认值 `false`。
json/disabled
:::

### API

| 属性名        | 说明                                           | 类型 / 可选值                                       | 默认值        |
| ------------- | ---------------------------------------------- | --------------------------------------------------- | ------------- |
| `modelValue`  | 结构化 JSON，优先于 `data`，支持默认 `v-model` | `string / number / boolean / array / object / null` | `undefined`   |
| `data`        | 结构化 JSON，合法结果通过 `v-model:data` 同步  | `string / number / boolean / array / object / null` | `null`        |
| `disabled`    | 是否禁用编辑                                   | `true / false`                                      | `false`       |
| `indent`      | 格式化时使用的缩进空格数                       | `number`                                            | `2`           |
| `lineNumbers` | 是否显示行号                                   | `true / false`                                      | `true`        |
| `toolbar`     | 是否显示格式化、压缩和复制工具栏               | `true / false`                                      | `true`        |
| `showStatus`  | 是否显示 JSON 校验状态                         | `true / false`                                      | `true`        |
| `placeholder` | 空内容占位文字                                 | `string`                                            | `请输入 JSON` |
| `height`      | 编辑器高度，数字按 px 处理                     | `string / number`                                   | `''`          |
| `minHeight`   | 编辑器最小高度，数字按 px 处理                 | `string / number`                                   | `240`         |
| `theme`       | 编辑器主题                                     | `light / dark`                                      | `light`       |
| `style`       | 根节点额外样式                                 | `CSSProperties`                                     | -             |

### 事件

| 事件名              | 说明                               | 参数                            |
| ------------------- | ---------------------------------- | ------------------------------- |
| `update:modelValue` | 文本可解析时同步结构化 JSON        | `value: JsonData`               |
| `update:data`       | 文本可解析时同步结构化 JSON        | `value: JsonData`               |
| `change`            | 每次编辑时返回文本、数据及校验状态 | `{ text, data?, valid, error }` |
| `valid-change`      | 合法状态发生变化，错误信息为中文   | `valid: boolean, error: string` |
| `format`            | 格式化成功                         | `value: string`                 |
| `compact`           | 压缩成功                           | `value: string`                 |
| `copy`              | 复制成功                           | `value: string`                 |

### 暴露方法

| 方法名    | 说明                                 |
| --------- | ------------------------------------ |
| `format`  | 格式化当前 JSON，成功时返回 `true`   |
| `compact` | 压缩当前 JSON，成功时返回 `true`     |
| `copy`    | 复制当前文本                         |
| `focus`   | 聚焦编辑器                           |
| `getText` | 获取当前文本                         |
| `getData` | 获取解析结果，无效时返回 `undefined` |

### 说明

- `v-model` 与 `v-model:data` 的绑定值都是 `JsonData`；用户可以自由编辑完整文本，只有 JSON 合法时才会更新绑定值。
- 需要读取暂时不合法的编辑文本时，通过组件实例调用 `getText()`。
- `disabled` 的用法与 `s-input` 一致；禁用时使用置灰背景和禁用状态提示，隐藏格式化与压缩操作，保留高亮和复制能力。
