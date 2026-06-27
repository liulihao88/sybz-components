# chart图表组件

[https://echarts.apache.org/handbook/zh/get-started](https://echarts.apache.org/handbook/zh/get-started)

## Hidden Title {.md-hidden}

<DocBasicUsage code='<s-chart :option="option" />' />

## 属性事件插槽简介

<ApiIntro />

### 基础用法

:::demo 基础写法：`<s-chart :option="option" />`。属性说明：`option` 示例值：`option`，类型/可选值/默认值按内部组件或 Element Plus 对应属性；`width` 示例值：`200`，类型/可选值/默认值按内部组件或 Element Plus 对应属性；`height` 示例值：`500`，类型/可选值/默认值按内部组件或 Element Plus 对应属性。本示例展示基础渲染和最小配置。这是chart的最基础用法。
chart/base
:::

### 折线图

:::demo 基础写法：`<s-chart v-show="isShow" :option="options" @click="click" @dblclick="addData()" @mousedown="mousedown" @mousemove="mousemove" @mouseover="mouseover" @mouseout="mouseout" @globalout="globalout" @contextmenu="contextmenu" @chart="chart" />`。属性说明：`v-show` 示例值：`isShow`，类型/可选值/默认值按内部组件或 Element Plus 对应属性；`option` 示例值：`options`，类型/可选值/默认值按内部组件或 Element Plus 对应属性。本示例展示折线图配置，可以直接复制基础写法后按业务替换数据。
chart/line
:::

### 柱状图

:::demo 基础写法：`<s-chart :option="options" style="width: 100%; height: 500px" />`。属性说明：`option` 示例值：`options`，类型/可选值/默认值按内部组件或 Element Plus 对应属性。本示例展示柱状图配置，可以直接复制基础写法后按业务替换数据。
chart/bar
:::

### 饼图

:::demo 基础写法：`<s-chart :option="options" style="width: 100%; height: 500px" />`。属性说明：`option` 示例值：`options`，类型/可选值/默认值按内部组件或 Element Plus 对应属性。本示例展示饼图配置，可以直接复制基础写法后按业务替换数据。
chart/pie
:::

### 主题切换

:::demo 基础写法：`<s-chart :option="options" :theme="theme" style="width: 100%; height: 500px" />`。属性说明：`option` 示例值：`options`，类型/可选值/默认值按内部组件或 Element Plus 对应属性；`theme` 示例值：`theme`，类型/可选值/默认值按内部组件或 Element Plus 对应属性。本示例展示主题切换，可以直接复制基础写法后按业务替换数据。
chart/theme
:::

### 空状态

:::demo 基础写法：`<s-chart :option="options" :isEmpty="isEmptyBn" height="300" />`。属性说明：`option` 示例值：`options`，类型/可选值/默认值按内部组件或 Element Plus 对应属性；`isEmpty` 示例值：`isEmptyBn`，类型/可选值/默认值按内部组件或 Element Plus 对应属性；`height` 示例值：`300`，类型/可选值/默认值按内部组件或 Element Plus 对应属性；`image` 示例值：`/img/logo.svg`，类型/可选值/默认值按内部组件或 Element Plus 对应属性；`description` 示例值：`empty 组件的描述信息`，类型/可选值/默认值按内部组件或 Element Plus 对应属性。本示例展示空状态展示。设置 isEmpty=true，即可显示空状态。
chart/empty
:::

### 插槽

:::demo 基础写法：`<s-chart :option="options">...</s-chart>`。属性说明：`option` 示例值：`options`，类型/可选值/默认值按内部组件或 Element Plus 对应属性。本示例展示插槽内容定制，可以直接复制基础写法后按业务替换数据。
chart/slot
:::

### dataset 数据集

:::demo 基础写法：`<s-chart :option="option" />`。属性说明：`option` 示例值：`option`，类型/可选值/默认值按内部组件或 Element Plus 对应属性。本示例展示dataset 数据集配置，可以直接复制基础写法后按业务替换数据。
chart/dataset
:::

### 多种情况

:::demo 基础写法：`<s-chart :option="option" />`。属性说明：`option` 示例值：`option`，类型/可选值/默认值按内部组件或 Element Plus 对应属性。本示例展示多种情况配置。多种chart图。
chart/multiple
:::

### 属性

| 属性名 | 说明                   | 类型           | 默认值 |
| :----: | ---------------------- | -------------- | ------ |
| option | 指定图表的配置项和数据 | Object         | {}     |
| height | 图表高度               | `processWidth` | 400px  |
| width  | 图表宽度               | `processWidth` | 100%   |

### Exposes

|   属性名    | 说明                    | 类型     |
| :---------: | ----------------------- | -------- |
|  initChart  | 调用echarts的init方法   | function |
| resizeChart | 调用echarts的resize方法 | function |
