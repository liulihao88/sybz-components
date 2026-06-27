# row 布局组件

[https://element-plus.org/zh-CN/component/layout.html](https://element-plus.org/zh-CN/component/layout.html)

`s-row` 基于 `el-row` 封装，适合快速写栅格布局。默认插槽里的普通节点会自动包一层 `el-col`；如果插槽子节点已经是 `el-col`，组件会直接渲染，便于继续使用 Element Plus 原生能力。

## Hidden Title {.md-hidden}

<DocBasicUsage code='<s-row :col="6" :gutter="16"></s-row>' />

## 属性事件插槽简介

<ApiIntro />

### 基础用法

:::demo 基础写法：`<s-row :col="6" :gutter="16">...</s-row>`。属性说明：`col` 示例值：`6`，类型：number / number[]，默认值：`24`；`gutter` 示例值：`16`，类型：number / string，默认值：`0`；`col-attrs` 示例值：`{ xs: 12, sm: 8, md: 6 }`，类型：object，默认值：`{}`。本示例展示基础渲染和最小配置。`col` 用来控制自动生成的 `el-col` 宽度。`col` 的可选值是 `number` 和 `number[]`，默认值是 `24`；`colAttrs` 的可选值是 `object`，默认值是 `{}`。
row/base
:::

### gutter 间距

:::demo 基础写法：`<s-row :col="8" :gutter="gutter">...</s-row>`。属性说明：`col` 示例值：`8`，类型：number / number[]，默认值：`24`；`gutter` 示例值：`gutter`，类型：number / string，默认值：`0`。本示例展示gutter 间距配置。`gutter` 控制列间距。`gutter` 的可选值是 `number` 和 `string`，默认值是 `0`。
row/gutter
:::

### gap 间距

:::demo 基础写法：`<s-row :col="8" :gap="gap">...</s-row>`。属性说明：`col` 示例值：`8`，类型：number / number[]，默认值：`24`；`gap` 示例值：`gap`，类型：number / string，默认值：`''`。本示例展示gap 间距配置。`gap` 是 `s-row` 提供的间距别名，会优先于 `gutter` 生效。`gap` 的可选值是 `number` 和 `string`，默认值是 `''`。
row/gap
:::

### 属性

|   属性名   | 说明                                                                      | 类型                                                          | 默认值  |
| :--------: | ------------------------------------------------------------------------- | ------------------------------------------------------------- | ------- |
|   `col`    | 普通插槽子节点自动包裹为 `el-col` 时使用的 `span`，数组会按顺序匹配子节点 | number / number[]                                             | `24`    |
|   `gap`    | 列间距别名，支持 `processWidth` 写法；存在时优先于 `gutter`               | number / string                                               | `''`    |
|  `gutter`  | 栅格间隔，数字和 `px` 字符串会走 Element Plus 原生 gutter                 | number / string                                               | `0`     |
| `justify`  | 主轴对齐方式，透传给 `el-row`                                             | `start` / `end` / `center` / `space-around` / `space-between` | `start` |
|  `align`   | 交叉轴对齐方式，透传给 `el-row`                                           | `top` / `middle` / `bottom`                                   | `top`   |
| `colAttrs` | 自动生成的 `el-col` 额外属性，适合统一传 `offset`、`xs`、`sm`、`md` 等    | object                                                        | `{}`    |

### 透传属性

|  属性名  | 说明                           | 类型 | 默认值 |
| :------: | ------------------------------ | ---- | ------ |
| `$attrs` | 会透传到内部 `el-row` 根节点上 | any  | -      |

### 插槽

|  插槽名   | 说明                                                                |
| :-------: | ------------------------------------------------------------------- |
| `default` | 默认内容。普通节点会自动包裹 `el-col`；直接传入 `el-col` 时不再包裹 |

### 说明

- 插槽子节点如果本身就是 `el-col`，组件会直接渲染，保留 `span`、`offset`、响应式属性等原生能力。
- 普通节点会自动包裹一层 `el-col`，适合快速搭布局；此时 `col` 和 `colAttrs` 会作用在自动生成的列上。
- `gap` 和 `gutter` 的布局效果一致；如果两个同时传入，组件会优先使用 `gap`。
- `gap` 支持 `16`、`'16'`、`'16px'`、`'1rem'`、`'5%'` 等 `processWidth` 风格写法。
- 数字和 `px` 会优先走 Element Plus 原生 `gutter`，其他单位会退回为组件内部 CSS 变量实现。
