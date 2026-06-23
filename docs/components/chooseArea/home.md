# chooseArea组件(选择省市区)

## Hidden Title {.md-hidden}

## 属性事件插槽简介

<ApiIntro />

### 基础用法

:::demo 基础写法：`<s-choose-area @change="result" v-model="areaValue" width="300">...</s-choose-area>`。属性说明：`v-model` 示例值：`areaValue`，类型由绑定值决定，默认值由绑定变量初始值决定；`width` 示例值：`300`，类型：string / number，默认值：`''`。本示例展示基础渲染和最小配置，可以直接复制基础写法后按业务替换数据。
chooseArea/base
:::

### 高度

:::demo 基础写法：`<s-choose-area v-model="areaValue" width="320" height="40" clearable>...</s-choose-area>`。属性说明：`v-model` 示例值：`areaValue`，类型由绑定值决定，默认值由绑定变量初始值决定；`width` 示例值：`320`，类型：string / number，默认值：`''`；`height` 示例值：`40`，类型：string / number，默认值：`''`；`clearable` 示例值：`true`，类型：boolean，可选值：`true` / `false`，默认值：`false`；`filterable` 示例值：`true`，类型/可选值/默认值按内部组件或 Element Plus 对应属性。本示例展示高度配置，可以直接复制基础写法后按业务替换数据。
chooseArea/height
:::

### 属性

| 属性名  | 说明       | 类型            | 默认值 |
| :-----: | ---------- | --------------- | ------ |
| `width` | 选择器宽度 | string / number | `''`   |
| `height` | 选择器高度 | string / number | `''`   |

### 说明

- 组件底层基于 `el-cascader` 封装，默认内置省市区数据。
- 未声明的属性会继续透传给 `el-cascader`，例如 `clearable`、`filterable`、`disabled` 等。
