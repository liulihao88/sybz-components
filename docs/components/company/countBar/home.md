# 数量统计柱状图组件

## Hidden Title {.md-hidden}

<DocBasicUsage code='<SCountBar :data="data" style="height: 300px"></SCountBar>' />

### 基础用法

:::demo 展示基础用法。基础写法：`<SCountBar :data="data" style="height: 300px">...</SCountBar>`。属性：`data` 类型 `array`，默认值 `[]`；`options` 类型 `array`，默认值 `[]`。
company/countBar/base
:::

### 数据量大

:::demo 展示数据量大配置。基础写法：`<sCountBar :data="objectDisk" style="min-height: 200px" :options="{ count: 'magazineInCount', size: 'magazineInSize' }" />`。属性：`data` 类型 `array`，默认值 `[]`；`options` 类型 `array`，默认值 `[]`。
company/countBar/moreData
:::

### 说明

- 用于展示带比例感知的数量统计柱状图，适合排行和对比场景。
