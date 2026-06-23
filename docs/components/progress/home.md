# progress进度条

[Element Plus Progress 组件文档](https://element-plus.org/zh-CN/component/progress.html)

## Hidden Title {.md-hidden}

## 属性事件插槽简介

<ApiIntro />

<s-warning content="由于公司业务中值在不同百分比下, 会显示不同的颜色, 所以会对原有的<code>el-progress</code>样式颜色有影响, 如果想去掉影响, 可以设置`<code>customColor</code>属性为<code>false</code> "></s-warning>

### 基础用法

:::demo 基础写法：`<s-progress :percentage="80">...</s-progress>`。属性说明：`percentage` 示例值：`80`，类型：number，默认值：未设置；`indeterminate` 示例值：`true`，类型/可选值/默认值按内部组件或 Element Plus 对应属性；`color` 示例值：`blue`，类型/可选值/默认值按内部组件或 Element Plus 对应属性；`stroke-width` 示例值：`10`，类型/可选值/默认值按内部组件或 Element Plus 对应属性；`show-text` 示例值：`false`，类型/可选值/默认值按内部组件或 Element Plus 对应属性；`type` 示例值：`circle`，类型：string，可选值：`primary` / `success` / `warning` / `danger` / `info` / `text`，默认值：`default` 或 `""`。本示例展示基础渲染和最小配置，可以直接复制基础写法后按业务替换数据。
progress/base
:::

### 其他用法

:::demo 基础写法：`<s-radio v-model="defaultColor" :options="[true, false]" type="simple" title="不使用el-progress默认颜色">...</s-radio>`。属性说明：`v-model` 示例值：`defaultColor`，类型由绑定值决定，默认值由绑定变量初始值决定；`options` 示例值：`[true, false]`，类型/可选值/默认值按内部组件或 Element Plus 对应属性；`type` 示例值：`simple`，类型：string，可选值：`primary` / `success` / `warning` / `danger` / `info` / `text`，默认值：`default` 或 `""`；`title` 示例值：`不使用el-progress默认颜色`，类型：string，默认值：`""`。本示例展示其他用法配置，可以直接复制基础写法后按业务替换数据。
progress/other
:::

### 自定义颜色

:::demo 基础写法：`<s-progress :percentage="percentage" :color="progressColor">...</s-progress>`。属性说明：`percentage` 示例值：`percentage`，类型：number，默认值：未设置；`color` 示例值：`progressColor`，类型/可选值/默认值按内部组件或 Element Plus 对应属性。本示例展示自定义配置，可以直接复制基础写法后按业务替换数据。
progress/color
:::

### 属性

|     属性名      | 说明                   | 类型    | 默认值 |
| :-------------: | ---------------------- | ------- | ------ |
|  `percentage`   | 进度百分比             | number  | -      |
| `animationTime` | 动画时长，单位毫秒     | number  | `500`  |
|  `isAnimation`  | 是否启用递增动画       | boolean | `true` |
|  `customColor`  | 是否按区间使用内置颜色 | boolean | `true` |

### 插槽

|  插槽名   | 说明                                  |
| :-------: | ------------------------------------- |
| `default` | 自定义进度条内容，可拿到 `percentage` |

### 说明

- 默认透传 `stroke-width="16"` 给 `el-progress`。
- 当未主动传 `color` 时，会根据百分比自动切换灰色、橙色、绿色。
