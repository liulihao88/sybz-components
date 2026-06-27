# 数量统计柱状图组件

## Hidden Title {.md-hidden}

<DocBasicUsage code='<SCountBar :data="data" style="height: 300px"></SCountBar>' />

### 基础用法

:::demo 基础写法：`<SCountBar :data="data" style="height: 300px">...</SCountBar>`。属性说明：`data` 示例值：`data`，类型/可选值/默认值按内部组件或 Element Plus 对应属性；`options` 示例值：`{ count: 'magazineInCount', size:...`，类型/可选值/默认值按内部组件或 Element Plus 对应属性。本示例展示基础渲染和最小配置，可以直接复制基础写法后按业务替换数据。
company/countBar/base
:::

### 数据量大

:::demo 基础写法：`<sCountBar :data="objectDisk" style="min-height: 200px" :options="{ count: 'magazineInCount', size: 'magazineInSize' }" />`。属性说明：`data` 示例值：`objectDisk`，类型/可选值/默认值按内部组件或 Element Plus 对应属性；`options` 示例值：`{ count: 'magazineInCount', size:...`，类型/可选值/默认值按内部组件或 Element Plus 对应属性。本示例展示数据量大配置，可以直接复制基础写法后按业务替换数据。
company/countBar/moreData
:::

### 说明

- 用于展示带比例感知的数量统计柱状图，适合排行和对比场景。
