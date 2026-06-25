# Tooltip 文字提示组件

`s-tooltip` 基于 Element Plus `el-tooltip` 封装，额外提供了“文本溢出时才显示提示”和“多行省略”能力，适合表格列、描述信息、按钮说明等场景。

[Element Plus Tooltip 文档](https://element-plus.org/zh-CN/component/tooltip.html)

## Hidden Title {.md-hidden}

## 属性事件插槽简介

<ApiIntro />

### 基础用法

:::demo 基础写法：`<s-tooltip width="100" content="这是一段比较长的提示文本，默认只展示单行，超出当前宽度后鼠标移入会显示完整内容。" placement="right">...</s-tooltip>`。属性说明：`width` 示例值：`100`，类型：string，默认值：`100%`；`content` 示例值：`这是一段比较长的提示文本，默认只展示单行，超出当前宽度后鼠标移入会...`，类型：string / VNode，默认值：未设置；`placement` 示例值：`right`，类型：string，默认值：Element Plus 默认值。本示例展示基础渲染和最小配置，可以直接复制基础写法后按业务替换数据。
tooltip/base
:::

### 通常用法

:::demo 基础写法：`<s-tooltip width="220px" placement="right" show-arrow content="这是一段比较长的提示文本，默认只展示单行，超出当前宽度后鼠标移入会显示完整内容。" />`。属性说明：`width` 示例值：`220px`，类型：string，默认值：`100%`；`placement` 示例值：`right`，类型：string，默认值：Element Plus 默认值；`show-arrow` 示例值：`true`，类型/可选值/默认值按内部组件或 Element Plus 对应属性；`content` 示例值：`这是一段比较长的提示文本，默认只展示单行，超出当前宽度后鼠标移入会...`，类型：string / VNode，默认值：未设置；`showAfter` 示例值：`1000`，类型：number，默认值：`0`。本示例展示通常用法配置，可以直接复制基础写法后按业务替换数据。
tooltip/usually
:::

### 主题与点击事件

:::demo 基础写法：`<s-tooltip content="默认 dark 主题，文本超出宽度时会显示完整内容。" width="200px" placement="bottom" />`。属性说明：`content` 示例值：`默认 dark 主题，文本超出宽度时会显示完整内容。`，类型：string / VNode，默认值：未设置；`width` 示例值：`200px`，类型：string，默认值：`100%`；`placement` 示例值：`bottom`，类型：string，默认值：Element Plus 默认值；`effect` 示例值：`light`，类型：string，默认值：`dark`。本示例展示主题切换，可以直接复制基础写法后按业务替换数据。
tooltip/theme
:::

### 最大行数

:::demo 基础写法：`<s-tooltip :content="longText" width="220px" :line-clamp="2" placement="top" />`。属性说明：`content` 示例值：`longText`，类型：string / VNode，默认值：未设置；`width` 示例值：`220px`，类型：string，默认值：`100%`；`line-clamp` 示例值：`2`，类型：string / number，默认值：`1`；`placement` 示例值：`top`，类型：string，默认值：Element Plus 默认值；`effect` 示例值：`light`，类型：string，默认值：`dark`。本示例展示最大行数配置。line-clamp。
tooltip/lineClamp
:::

### 触发方式

:::demo 基础写法：`<s-tooltip content="默认使用 hover 触发" trigger="hover">...</s-tooltip>`。属性说明：`content` 示例值：`默认使用 hover 触发`，类型：string / VNode，默认值：未设置；`trigger` 示例值：`hover`，类型：string / string[]，默认值：Element Plus 默认值。本示例展示触发方式配置。`'hover' | 'click' | 'focus' | 'contextmenu'`，也支持数组形式。
tooltip/trigger
:::

### 延迟触发

:::demo 基础写法：`<s-tooltip content="鼠标移入 1 秒后显示 tooltip" :show-after="1000">...</s-tooltip>`。属性说明：`content` 示例值：`鼠标移入 1 秒后显示 tooltip`，类型：string / VNode，默认值：未设置；`show-after` 示例值：`1000`，类型：number，默认值：`0`。本示例展示延迟触发配置。show-after。
tooltip/delay
:::

### 自定义主题和禁用状态

:::demo 基础写法：`<s-tooltip content="默认暗色主题" placement="top">...</s-tooltip>`。属性说明：`content` 示例值：`默认暗色主题`，类型：string / VNode，默认值：未设置；`placement` 示例值：`top`，类型：string，默认值：Element Plus 默认值；`effect` 示例值：`light`，类型：string，默认值：`dark`；`disabled` 示例值：`disabled`，类型：boolean，默认值：`false`；`width` 示例值：`220px`，类型：string，默认值：`100%`。本示例展示禁用状态，可以直接复制基础写法后按业务替换数据。
tooltip/other
:::

### 显示 HTML / VNode 内容

:::demo 基础写法：`<s-tooltip width="220px" :dangerouslyUseHTMLString="true" :content="rawHtml">HTML 字符串内容</s-tooltip>`。属性说明：`width` 示例值：`220px`，类型：string，默认值：`100%`；`dangerouslyUseHTMLString` 示例值：`true`，类型：boolean，默认值：`false`；`content` 示例值：`rawHtml`，类型：string / VNode，默认值：未设置；`trigger` 示例值：`click`，类型：string / string[]，默认值：Element Plus 默认值；`placement` 示例值：`right`，类型：string，默认值：Element Plus 默认值。本示例展示显示 HTML / VNode 内容配置。dangerouslyUseHTMLString。
tooltip/html
:::

### 自定义插槽

:::demo 基础写法：`<s-tooltip placement="right">...</s-tooltip>`。属性说明：`placement` 示例值：`right`，类型：string，默认值：Element Plus 默认值。本示例展示插槽内容定制。default|content。
tooltip/slot
:::

### 受控模式

:::demo 基础写法：`<s-tooltip :visible="visible" content="当前 tooltip 由外部 visible 状态完全控制" placement="top">...</s-tooltip>`。属性说明：`visible` 示例值：`visible`，类型：boolean，默认值：未设置；`content` 示例值：`当前 tooltip 由外部 visible 状态完全控制`，类型：string / VNode，默认值：未设置；`placement` 示例值：`top`，类型：string，默认值：Element Plus 默认值。本示例展示受控模式配置。visible。
tooltip/visible
:::

### 全局默认配置

tooltip 支持在 `app.use` 的第二个参数里配置全局默认值，写法和 Element Plus 的全局配置保持一致。
除 `width`、`lineClamp`、`showSlot`、`effect` 这些封装属性外，Element Plus Tooltip 的属性可直接写在 `tooltip` 下。

```js
app.use(SybzComponents, {
  tooltip: {
    width: '240px',
    lineClamp: 2,
    effect: 'light',
    placement: 'top',
    showAfter: 1000,
  },
})
```

| 配置项                             | 可选值          | 默认值              | 说明                                |
| ---------------------------------- | --------------- | ------------------- | ----------------------------------- |
| `tooltip.width`                    | string          | `100%`              | 默认文本触发区域最大宽度            |
| `tooltip.lineClamp`                | string / number | `1`                 | 默认文本区域最大展示行数            |
| `tooltip.effect`                   | string          | `dark`              | tooltip 主题                        |
| `tooltip.placement`                | string          | Element Plus 默认值 | tooltip 弹出位置                    |
| `tooltip.showAfter`                | number          | `0`                 | 延迟显示时间，单位毫秒              |
| `tooltip.dangerouslyUseHTMLString` | boolean         | `false`             | 是否将 `content` 按 HTML 字符串渲染 |

### 组件属性

|           属性名           | 说明                                       | 类型            | 默认值  |
| :------------------------: | ------------------------------------------ | --------------- | ------- |
|          `width`           | 默认文本触发区域最大宽度                   | string          | `100%`  |
|        `lineClamp`         | 默认文本区域最大展示行数，`1` 表示单行省略 | string / number | `1`     |
|         `showSlot`         | 是否渲染默认触发内容区域                   | boolean         | `true`  |
|          `effect`          | tooltip 主题，会透传给 `el-tooltip`        | string          | `dark`  |
| `dangerouslyUseHTMLString` | 是否将 `content` 按 HTML 字符串渲染        | boolean         | `false` |

### 常用透传属性

|    属性名     | 说明                                           | 类型              | 默认值              |
| :-----------: | ---------------------------------------------- | ----------------- | ------------------- |
|   `content`   | 提示内容；未传默认插槽时，也会作为默认展示文本 | string / VNode    | -                   |
|  `placement`  | tooltip 弹出位置                               | string            | Element Plus 默认值 |
|   `trigger`   | 触发方式，支持单个值或数组                     | string / string[] | Element Plus 默认值 |
| `show-after`  | 延迟显示时间，单位毫秒                         | number            | `0`                 |
|   `visible`   | 受控显示状态                                   | boolean           | -                   |
|  `disabled`   | 是否禁用 tooltip                               | boolean           | `false`             |
| `raw-content` | Element Plus 原生 HTML 解析属性，仍支持透传    | boolean           | `false`             |

### 事件

| 事件名  | 说明                   |
| :-----: | ---------------------- |
| `click` | 点击触发内容区域时触发 |

### 插槽

|  插槽名   | 说明                                       |
| :-------: | ------------------------------------------ |
| `default` | 自定义触发区域；常用于包裹按钮、图标等元素 |
| `content` | 自定义 tooltip 内容                        |

### 说明

- 未传默认插槽时，组件会把 `content` 作为展示文本，并在文本超出可视区域后才显示 tooltip。
- 传入默认插槽后，tooltip 会按正常交互触发，不再做文本溢出判断。
- 设置 `lineClamp` 大于 `1` 后，会按最大行数进行多行省略；超出可视高度时同样会显示 tooltip。
- `lineClamp` 只作用于组件默认渲染的文本区域，不影响自定义触发插槽的布局。
- `content` 支持字符串、HTML 字符串、VNode，以及 `content` 插槽形式的动态内容。
- 更多配置请参考 Element Plus Tooltip 文档。
