# inputNumber数字输入框组件

[Element Plus 数字输入框组件文档](https://element-plus.org/zh-CN/component/input-number.html)

::: tip 常用属性说明

- `precision`: 精度
- `prefix`: 插槽前缀
- `suffix`: 插槽后缀
- `value-on-clear`: 输入框被清空时显示的值，支持 `number` / `null` / `min` / `max`。
- `controls-position`: 控制按钮位置，`s-input-number` 默认值为 `right`。
- `step-strictly`: 严格步进，设置为 `true` 后只能输入步进倍数。

:::

## Hidden Title {.md-hidden}

## 属性事件插槽简介

<ApiIntro />

### 基础用法

:::demo 基础写法：`<s-input-number v-model="value" :min="0" :max="10" />`。属性说明：`v-model` 示例值：`value`，类型由绑定值决定，默认值由绑定变量初始值决定；`min` 示例值：`0`，类型/可选值/默认值按内部组件或 Element Plus 对应属性；`max` 示例值：`10`，类型/可选值/默认值按内部组件或 Element Plus 对应属性。本示例展示基础渲染和最小配置，可以直接复制基础写法后按业务替换数据。
inputNumber/base
:::

### 成华主题

:::demo 基础写法：`<s-input-number v-model="count" theme="chenghua" title="审核数量" width="240" height="40" :min="0" />`。属性说明：`v-model` 示例值：`count`，类型由绑定值决定，默认值由绑定变量初始值决定；`theme` 示例值：`chenghua`，类型：`''` / `chenghua`，默认值：`''`；`title` 示例值：`审核数量`，类型：string，默认值：`''`；`width` 示例值：`240`，类型：string / number，默认值：`''`；`height` 示例值：`40`，类型：string / number，默认值：`''`；`min` 示例值：`0`，类型/可选值/默认值按内部组件或 Element Plus 对应属性；`step` 示例值：`2`，类型/可选值/默认值按内部组件或 Element Plus 对应属性；`controls-position` 示例值：`true`，类型：`''` / `right`，默认值：`right`。本示例展示成华主题样式。theme="chenghua" 时启用成华主题样式。
inputNumber/chenghua/base
:::

### 高度

:::demo 基础写法：`<s-input-number v-model="count" title="数量" width="220" height="40" :min="0" />`。属性说明：`v-model` 示例值：`count`，类型由绑定值决定，默认值由绑定变量初始值决定；`title` 示例值：`数量`，类型：string，默认值：`''`；`width` 示例值：`220`，类型：string / number，默认值：`''`；`height` 示例值：`40`，类型：string / number，默认值：`''`；`min` 示例值：`0`，类型/可选值/默认值按内部组件或 Element Plus 对应属性；`step` 示例值：`2`，类型/可选值/默认值按内部组件或 Element Plus 对应属性。本示例展示高度配置，可以直接复制基础写法后按业务替换数据。
inputNumber/height
:::

### 尺寸

:::demo 基础写法：`<s-input-number v-model="smallCount" title="小尺寸" size="small" :min="0" />`。属性说明：`v-model` 示例值：`smallCount`，类型由绑定值决定，默认值由绑定变量初始值决定；`title` 示例值：`小尺寸`，类型：string，默认值：`''`；`size` 示例值：`small`，类型：`''` / `large` / `default` / `small`，默认值：`''`；`min` 示例值：`0`，类型/可选值/默认值按内部组件或 Element Plus 对应属性。本示例展示尺寸配置，可以直接复制基础写法后按业务替换数据。
inputNumber/size
:::

### usually常用

:::demo 基础写法：`<s-input-number v-model="smallCount" title="宽度" width="200" />`。属性说明：`v-model` 示例值：`smallCount`，类型由绑定值决定，默认值由绑定变量初始值决定；`title` 示例值：`宽度`，类型：string，默认值：`''`；`width` 示例值：`200`，类型：string / number，默认值：`''`；`min` 示例值：`1`，类型/可选值/默认值按内部组件或 Element Plus 对应属性；`max` 示例值：`5`，类型/可选值/默认值按内部组件或 Element Plus 对应属性；`disabled` 示例值：`true`，类型：boolean，可选值：`true` / `false`，默认值：`false`；`precision` 示例值：`2`，类型/可选值/默认值按内部组件或 Element Plus 对应属性。本示例展示usually常用配置，可以直接复制基础写法后按业务替换数据。
inputNumber/usually
:::

### 属性

|    属性名    | 说明             | 类型            | 默认值 |
| :----------: | ---------------- | --------------- | ------ |
| `modelValue` | 绑定值           | any             | -      |
|   `title`    | 左侧标题前缀文案 | string          | `''`   |
|  `boxStyle`  | 标题前缀区域样式 | object          | `{}`   |
|   `width`    | 组件总宽度       | string / number | `''`   |
|   `height`   | 组件总高度       | string / number | `''`   |
|   `theme`    | 主题样式         | `''` / `chenghua` | `''` |
|    `size`    | 输入框尺寸       | `''` / `large` / `default` / `small` | `''` |
| `controls-position` | 控制按钮位置 | `''` / `right` | `right` |
|  `subAttrs`  | 外层容器额外属性 | object          | `{}`   |

### 插槽

|     插槽名      | 说明           |
| :-------------: | -------------- |
|    `prefix`     | 输入框前缀内容 |
|    `suffix`     | 输入框后缀内容 |
| `decrease-icon` | 减少按钮图标   |
| `increase-icon` | 增加按钮图标   |

### 说明

- 默认基于 `el-input-number` 二次封装，并透传绝大多数 `el-input-number` 属性。
- 传入 `title` 后会在左侧渲染 `s-comp-title`，用于和其他表单组件保持一致。
- 支持透传 `el-input-number` 的命名插槽。
