# 文本组件

## Hidden Title {.md-hidden}

## 属性事件插槽简介

<ApiIntro />

### 基础用法

:::demo 基础写法：`<el-card shadow="never">...</el-card>`。属性说明：`shadow` 示例值：`never`，类型/可选值/默认值按内部组件或 Element Plus 对应属性；`href` 示例值：`https://element-plus.org/zh-CN/co...`，类型/可选值/默认值按内部组件或 Element Plus 对应属性；`target` 示例值：`_blank`，类型/可选值/默认值按内部组件或 Element Plus 对应属性。本示例展示基础渲染和最小配置，可以直接复制基础写法后按业务替换数据。
text/base
:::

### 通常用法

:::demo 基础写法：`<s-text style="width: 100px">...</s-text>`。属性说明：该示例不需要额外属性，未传属性时使用组件默认值。本示例展示通常用法配置，可以直接复制基础写法后按业务替换数据。
text/usually
:::

### 属性

|    属性名    | 说明                               | 类型            | 默认值 |
| :----------: | ---------------------------------- | --------------- | ------ |
| `lineClamp`  | 多行省略行数，不传时按单行省略处理 | string / number | -      |
| `tippyProps` | 透传给 `vue-tippy` 的配置          | object          | `{}`   |

### 插槽

|  插槽名   | 说明                                         |
| :-------: | -------------------------------------------- |
| `default` | 默认文本内容                                 |
| `content` | tooltip 自定义内容，未提供时默认使用文本内容 |

### 说明

- 文本溢出时才会启用 tooltip，未溢出时自动禁用。
- 底层展示基于 `el-text`，tooltip 能力基于 `vue-tippy`。
