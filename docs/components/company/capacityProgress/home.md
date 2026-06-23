# 容量组件

## Hidden Title {.md-hidden}

### 基础用法

:::demo 基础写法：`<s-capacity-progress :total="row.totalSpace" :used="row.usedSpace" width="300">...</s-capacity-progress>`。属性说明：`total` 示例值：`row.totalSpace`，类型/可选值/默认值按内部组件或 Element Plus 对应属性；`used` 示例值：`row.usedSpace`，类型/可选值/默认值按内部组件或 Element Plus 对应属性；`width` 示例值：`300`，类型/可选值/默认值按内部组件或 Element Plus 对应属性。本示例展示基础渲染和最小配置，可以直接复制基础写法后按业务替换数据。
company/capacityProgress/base
:::

### 在table中使用

:::demo 基础写法：`<s-capacity-progress :total="row.totalSpace" :used="row.overUsedSpace">...</s-capacity-progress>`。属性说明：`total` 示例值：`row.totalSpace`，类型/可选值/默认值按内部组件或 Element Plus 对应属性；`used` 示例值：`row.overUsedSpace`，类型/可选值/默认值按内部组件或 Element Plus 对应属性。本示例展示表格场景，可以直接复制基础写法后按业务替换数据。
company/capacityProgress/table
:::

### 自定义颜色(其他用法与tag一致)

:::demo 基础写法：`<s-capacity-progress :total="row.totalSpace" :used="row.usedSpace" :info="['UNKNOWN']" :warning="['OVERFLOW', 'CRITICAL', 'SHORT', 'OVERHALF']" :primary="['SUFFICIENT']" value="OVERFLOW" :customColor="true">...</s-capacity-progress>`。属性说明：`total` 示例值：`row.totalSpace`，类型/可选值/默认值按内部组件或 Element Plus 对应属性；`used` 示例值：`row.usedSpace`，类型/可选值/默认值按内部组件或 Element Plus 对应属性；`info` 示例值：`['UNKNOWN']`，类型/可选值/默认值按内部组件或 Element Plus 对应属性；`warning` 示例值：`['OVERFLOW', 'CRITICAL', 'SHORT',...`，类型/可选值/默认值按内部组件或 Element Plus 对应属性；`primary` 示例值：`['SUFFICIENT']`，类型/可选值/默认值按内部组件或 Element Plus 对应属性；`value` 示例值：`OVERFLOW`，类型：string / number，默认值：未设置；`customColor` 示例值：`true`，类型/可选值/默认值按内部组件或 Element Plus 对应属性；`danger` 示例值：`['BUG']`，类型/可选值/默认值按内部组件或 Element Plus 对应属性。本示例展示自定义配置，可以直接复制基础写法后按业务替换数据。
company/capacityProgress/customColor
:::

### 说明

- 用于展示容量占比、使用量等进度信息，适合表格和概览场景。
