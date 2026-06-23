# inputLabel标签输入组件

## Hidden Title {.md-hidden}

## 属性事件插槽简介

<ApiIntro />

### 基础用法

:::demo 基础写法：`<s-input-label v-model="arr">...</s-input-label>`。属性说明：`v-model` 示例值：`arr`，类型由绑定值决定，默认值由绑定变量初始值决定。本示例展示基础渲染和最小配置，可以直接复制基础写法后按业务替换数据。
inputLabel/base
:::

### 通常用法

:::demo 基础写法：`<s-input-label v-model="port" :inputAttrs="{ placeholder: '请输入数字后回车', width: 320 }" :regexp="/^([1-9]|[1-9][0-9]{1,3}|[1-5][0-9]{4}|6[0-5][0-5][0-3][0-5])$/" message="请输入1-65535之间的端口号">...</s-input-label>`。属性说明：`v-model` 示例值：`port`，类型由绑定值决定，默认值由绑定变量初始值决定；`inputAttrs` 示例值：`{ placeholder: '请输入数字后回车', width:...`，类型：object，默认值：`{}`；`regexp` 示例值：`/^([1-9]|[1-9][0-9]{1,3}|[1-5][0-...`，类型：RegExp，默认值：未设置；`message` 示例值：`请输入1-65535之间的端口号`，类型：string，默认值：`输入有误`。本示例展示通常用法配置。可以在输入的时候做一些输入规则的校验。
inputLabel/usually
:::

### 属性

|    属性名    | 说明                                               | 类型    | 默认值     |
| :----------: | -------------------------------------------------- | ------- | ---------- |
| `modelValue` | 标签数组值                                         | array   | `[]`       |
| `isComplex`  | 是否按对象数组处理，开启后默认写入 `{ name }` 结构 | boolean | `false`    |
|   `regexp`   | 输入校验正则                                       | RegExp  | -          |
|  `message`   | 校验失败提示文案                                   | string  | `输入有误` |
| `inputAttrs` | 透传给内部 `s-input` 的属性                        | object  | `{}`       |

### Exposes

|    名称     | 说明             | 类型     |
| :---------: | ---------------- | -------- |
| `$getValue` | 获取当前标签数组 | function |

### 说明

- 支持回车和失焦时新增标签。
- 重复值不会重复添加，校验失败会通过 `$toast` 提示。
