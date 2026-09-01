# 容量组件

## Hidden Title {.md-hidden}

<DocBasicUsage code='<s-capacity-progress :total="row.totalSpace" :used="row.usedSpace" width="300"></s-capacity-progress>' />

### 基础用法

:::demo 展示基础用法。基础写法：`<s-capacity-progress :total="row.totalSpace" :used="row.usedSpace" width="300"></s-capacity-progress>`。属性：`total` 类型 `number`，默认值按数据长度计算；`width` 类型 `string / number`，默认值 `''`。
company/capacityProgress/base
:::

### 在table中使用

:::demo 展示表格场景。基础写法：`<s-capacity-progress :total="row.totalSpace" :used="row.overUsedSpace"></s-capacity-progress>`。属性：`total` 类型 `number`，默认值按数据长度计算。
company/capacityProgress/table
:::

### 自定义颜色(其他用法与tag一致)

:::demo 展示自定义配置。基础写法：`<s-capacity-progress :total="row.totalSpace" :used="row.usedSpace" :info="['UNKNOWN']" :warning="['OVERFLOW', 'CRITICAL', 'SHORT', 'OVERHALF']" :primary="['SUFFICIENT']" value="OVERFLOW" :customColor="true"></s-capacity-progress>`。属性：`total` 类型 `number`，默认值按数据长度计算；`value` 类型 `string / number / boolean`，默认值按组件配置。
company/capacityProgress/customColor
:::

### 公共外观属性（hoverAnimation 默认值：false）

:::demo `width / height / color / hoverAnimation` 由公共 Hook 统一处理。基础写法：`<s-capacity-progress :total="100" :used="38" width="320" height="32" color="#7c3aed" hover-animation />`。属性：`width / height` 类型 `string / number`，默认值未设置；`color` 类型 `string`，默认值 `''`；`hoverAnimation` 可选值 `true / false`，默认值 `false`。
company/capacityProgress/commonProps
:::

### 说明

- 用于展示容量占比、使用量等进度信息，适合表格和概览场景。
