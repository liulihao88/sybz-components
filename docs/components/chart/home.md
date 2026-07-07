# chart图表组件

[https://echarts.apache.org/handbook/zh/get-started](https://echarts.apache.org/handbook/zh/get-started)

## Hidden Title {.md-hidden}

<DocBasicUsage code='<s-chart :option="option" />' />

## 属性事件插槽简介

<ApiIntro />

### 基础用法

:::demo 展示基础用法。基础写法：`<s-chart :option="option" />`。属性：`option` 类型 `object`，默认值必传；`width` 类型 `string / number`，默认值 `''`；`height` 类型 `string / number`，默认值 `''`。
chart/base
:::

### 折线图

:::demo 展示折线图配置。基础写法：`<s-chart v-show="isShow" :option="options" @click="click" @dblclick="addData()" @mousedown="mousedown" @mousemove="mousemove" @mouseover="mouseover" @mouseout="mouseout" @globalout="globalout" @contextmenu="contextmenu" @chart="chart" />`。属性：`option` 类型 `object`，默认值必传。
chart/line
:::

### 柱状图

:::demo 展示柱状图配置。基础写法：`<s-chart :option="options" style="width: 100%; height: 500px" />`。属性：`option` 类型 `object`，默认值必传。
chart/bar
:::

### 饼图

:::demo 展示饼图配置。基础写法：`<s-chart :option="options" style="width: 100%; height: 500px" />`。属性：`option` 类型 `object`，默认值必传。
chart/pie
:::

### 主题切换

:::demo 展示主题切换。基础写法：`<s-chart :option="options" :theme="theme" style="width: 100%; height: 500px" />`。属性：`theme` 可选 `default / chenghua / shijingshan`，默认值 `default`。
chart/theme
:::

### 空状态

:::demo 展示空状态展示。基础写法：`<s-chart :option="options" :isEmpty="isEmptyBn" height="300" />`。属性：`isEmpty` 类型 `boolean / function`，默认值 `false`；`description` 类型 `string`，默认值按组件默认配置。
chart/empty
:::

### 插槽

:::demo 展示插槽内容定制。基础写法：`<s-chart :option="options">...</s-chart>`。插槽：按示例中的插槽名定制内容。
chart/slot
:::

### dataset 数据集

:::demo 展示dataset 数据集配置。基础写法：`<s-chart :option="option" />`。属性：`option` 类型 `object`，默认值必传。
chart/dataset
:::

### 多种情况

:::demo 展示多种情况配置。基础写法：`<s-chart :option="option" />`。属性：`option` 类型 `object`，默认值必传。
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
