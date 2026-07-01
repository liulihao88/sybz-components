# tabs切换组件

[Element Plus Tabs Documentation](https://element-plus.org/zh-CN/component/tabs.html)

## Hidden Title {.md-hidden}

<DocBasicUsage code='<s-tabs :options="navList"></s-tabs>' />

## 属性事件插槽简介

<ApiIntro />

### 基础用法

:::demo 基础写法：`<s-tabs :options="navList">...</s-tabs>`。属性说明：`options` 示例值：`navList`，类型：array，默认值：`[]`。本示例展示基础渲染和最小配置，可以直接复制基础写法后按业务替换数据。
tabs/base
:::

### 尺寸

:::demo 基础写法：`<s-tabs :options="navList" size="small">...</s-tabs>`。属性说明：`options` 示例值：`navList`，类型：array，默认值：`[]`；`size` 示例值：`small`，类型：string，默认值：`default`。本示例展示尺寸配置，可以直接复制基础写法后按业务替换数据。
tabs/size
:::

### 胶囊类型

:::demo 基础写法：`<s-tabs v-model="smallActiveTab" :options="navList" type="capsule" size="small">...</s-tabs>`。属性说明：`v-model` 示例值：`smallActiveTab`，类型由绑定值决定，默认值由绑定变量初始值决定；`options` 示例值：`navList`，类型：array，默认值：`[]`；`type` 示例值：`capsule`，类型：string，可选值：`capsule` / Element Plus 原生 `type` 值，默认值：按内部组件或 Element Plus 对应属性；`size` 示例值：`small`，类型：string，默认值：`default`。本示例展示胶囊类型切换，可以直接复制基础写法后按业务替换数据。
tabs/capsule
:::

### chenghua主题

:::demo 基础写法：`<s-tabs :options="navList" theme="chenghua">...</s-tabs>`。属性说明：`options` 示例值：`navList`，类型：array，默认值：`[]`；`theme` 示例值：`chenghua`，类型：`''` / `chenghua`，默认值：`''`。本示例展示成华主题样式，可以直接复制基础写法后按业务替换数据。
tabs/chenghua
:::

### 通常用法

:::demo 基础写法：`<s-tabs :options="navList" v-model="navName" @tabChange="tabChange">...</s-tabs>`。属性说明：`options` 示例值：`navList`，类型：array，默认值：`[]`；`v-model` 示例值：`navName`，类型由绑定值决定，默认值由绑定变量初始值决定。本示例展示通常用法配置，可以直接复制基础写法后按业务替换数据。
tabs/usually
:::

### Slots

:::demo 基础写法：`<s-tabs :options="navList">...</s-tabs>`。属性说明：`options` 示例值：`navList`，类型：array，默认值：`[]`。本示例展示插槽内容定制，可以直接复制基础写法后按业务替换数据。
tabs/slot
:::

### Trigger `click|hover`

:::demo 基础写法：`<s-tabs :options="navList" trigger="hover" v-model="navValue">...</s-tabs>`。属性说明：`options` 示例值：`navList`，类型：array，默认值：`[]`；`trigger` 示例值：`hover`，类型：string，默认值：`click`；`v-model` 示例值：`navValue`，类型由绑定值决定，默认值由绑定变量初始值决定。本示例展示鼠标移入上移并轻微放大的动效，可以直接复制基础写法后按业务替换数据。
tabs/trigger
:::

### children `支持嵌套 el-tab-pane`

:::demo 基础写法：`<s-tabs v-model="activeName" class="demo-tabs" default-value="third" @tab-click="handleClick" :options="tabs">...</s-tabs>`。属性说明：`v-model` 示例值：`activeName`，类型由绑定值决定，默认值由绑定变量初始值决定；`default-value` 示例值：`third`，类型/可选值/默认值按内部组件或 Element Plus 对应属性；`options` 示例值：`tabs`，类型：array，默认值：`[]`。本示例展示children `支持嵌套 el-tab-pane`配置，可以直接复制基础写法后按业务替换数据。
tabs/children
:::

### other

:::demo 基础写法：`<s-tabs :options="navList" :type="type" :stretch="stretch">...</s-tabs>`。属性说明：`options` 示例值：`navList`，类型：array，默认值：`[]`；`type` 示例值：`type`，类型：string，可选值：`primary` / `success` / `warning` / `danger` / `info` / `text`，默认值：`default` 或 `""`；`stretch` 示例值：`stretch`，类型/可选值/默认值按内部组件或 Element Plus 对应属性。本示例展示other配置，可以直接复制基础写法后按业务替换数据。
tabs/other
:::

### addRemove

:::demo 基础写法：`<s-tabs v-model="editableTabsValue" type="card" class="demo-tabs" closable @tab-remove="removeTab">...</s-tabs>`。属性说明：`v-model` 示例值：`editableTabsValue`，类型由绑定值决定，默认值由绑定变量初始值决定；`type` 示例值：`card`，类型：string，可选值：`primary` / `success` / `warning` / `danger` / `info` / `text`，默认值：`default` 或 `""`；`closable` 示例值：`true`，类型/可选值/默认值按内部组件或 Element Plus 对应属性。本示例展示addRemove配置，可以直接复制基础写法后按业务替换数据。
tabs/addRemove
:::

### 位置

可以通过 tab-position 设置标签的位置

标签一共有四个方向的设置 tabPosition="left|right|top|bottom"

:::demo 基础写法：`<s-tabs :options="navList" :tab-position="tabPosition">...</s-tabs>`。属性说明：`options` 示例值：`navList`，类型：array，默认值：`[]`；`tab-position` 示例值：`tabPosition`，类型/可选值/默认值按内部组件或 Element Plus 对应属性。本示例展示位置配置，可以直接复制基础写法后按业务替换数据。
tabs/location
:::

### 属性

|    属性名    | 说明                                                                        | 类型                      | 默认值                             |
| :----------: | --------------------------------------------------------------------------- | ------------------------- | ---------------------------------- |
| `modelValue` | 当前激活 tab                                                                | string / number / boolean | -                                  |
|  `options`   | 标签页配置                                                                  | array                     | `[]`                               |
|   `label`    | 标签标题字段名                                                              | string                    | `label`                            |
|   `value`    | 标签值字段名                                                                | string                    | `value`                            |
|  `subAttrs`  | 透传给 `el-tab-pane` 的属性                                                 | object                    | `{}`                               |
|  `trigger`   | 切换触发方式，支持 `click` / `hover`                                        | string                    | `click`                            |
|    `type`    | 标签类型，支持 `capsule` 和 Element Plus 原生 `card` / `border-card` 等类型 | string                    | 按内部组件或 Element Plus 对应属性 |
|   `theme`    | 主题样式，支持 `chenghua`                                                   | `''` / `chenghua`         | `''`                               |
|    `size`    | 尺寸，支持 `small` / `default` / `large`                                    | string                    | `default`                          |

### 事件

|       事件名        | 说明                    |
| :-----------------: | ----------------------- |
| `update:modelValue` | 当前激活 tab 变化时触发 |

### 插槽

|      插槽名      | 说明                                   |
| :--------------: | -------------------------------------- |
|    `default`     | 自定义整个 tabs 内容                   |
|    `${value}`    | 自定义每个 tab-pane 内容，名称为选项值 |
| `${value}-label` | 自定义每个 tab 标题区域                |
