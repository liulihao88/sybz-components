# checkbox多选框组件

[https://element-plus.org/zh-CN/component/checkbox.html](https://element-plus.org/zh-CN/component/checkbox.html)

## Hidden Title {.md-hidden}

## 属性事件插槽简介

<ApiIntro />

### 基础用法

:::demo 基础写法：`<s-checkbox v-model="checkboxValue" :options="options">...</s-checkbox>`。属性说明：`v-model` 示例值：`checkboxValue`，类型由绑定值决定，默认值由绑定变量初始值决定；`options` 示例值：`options`，类型/可选值/默认值按内部组件或 Element Plus 对应属性。本示例展示基础渲染和最小配置。这是checkbox的最基础用法。
checkbox/base
:::

### 成华主题

:::demo 基础写法：`<s-checkbox v-model="checkedServices" theme="chenghua" :options="options" gap="18">...</s-checkbox>`。属性说明：`v-model` 示例值：`checkedServices`，类型由绑定值决定，默认值由绑定变量初始值决定；`theme` 示例值：`chenghua`，类型/可选值/默认值按内部组件或 Element Plus 对应属性；`options` 示例值：`options`，类型/可选值/默认值按内部组件或 Element Plus 对应属性；`gap` 示例值：`18`，类型/可选值/默认值按内部组件或 Element Plus 对应属性；`show-type` 示例值：`button`，类型/可选值/默认值按内部组件或 Element Plus 对应属性；`show-all` 示例值：`false`，类型/可选值/默认值按内部组件或 Element Plus 对应属性。本示例展示成华主题样式。theme="chenghua" 时启用成华主题样式。
checkbox/chenghua/base
:::

### 通常用法

:::demo 基础写法：`<s-checkbox v-model="checkboxValue" :options="options" label="name" value="id">...</s-checkbox>`。属性说明：`v-model` 示例值：`checkboxValue`，类型由绑定值决定，默认值由绑定变量初始值决定；`options` 示例值：`options`，类型/可选值/默认值按内部组件或 Element Plus 对应属性；`label` 示例值：`name`，类型：string / number，默认值：未设置；`value` 示例值：`id`，类型：string / number，默认值：未设置；`type` 示例值：`simple`，类型：string，可选值：`primary` / `success` / `warning` / `danger` / `info` / `text`，默认值：`default` 或 `""`；`size` 示例值：`small`，类型：string，可选值：`large` / `default` / `small`，默认值：继承全局尺寸或 `default`。本示例展示通常用法配置，可以直接复制基础写法后按业务替换数据。
checkbox/usually
:::

### 多属性用法

:::demo 基础写法：`<s-checkbox @change="change" v-model="checkboxValue" :options="options" label="name" :showAll="false" size="small" showType="button" value="id" :customDisabled="(item) => item.id === 'xrr'">...</s-checkbox>`。属性说明：`v-model` 示例值：`checkboxValue`，类型由绑定值决定，默认值由绑定变量初始值决定；`options` 示例值：`options`，类型/可选值/默认值按内部组件或 Element Plus 对应属性；`label` 示例值：`name`，类型：string / number，默认值：未设置；`showAll` 示例值：`false`，类型/可选值/默认值按内部组件或 Element Plus 对应属性；`size` 示例值：`small`，类型：string，可选值：`large` / `default` / `small`，默认值：继承全局尺寸或 `default`；`showType` 示例值：`button`，类型/可选值/默认值按内部组件或 Element Plus 对应属性；`value` 示例值：`id`，类型：string / number，默认值：未设置；`customDisabled` 示例值：`(item) => item.id === 'xrr'`，类型/可选值/默认值按内部组件或 Element Plus 对应属性。本示例展示多属性用法配置，可以直接复制基础写法后按业务替换数据。
checkbox/multyAttrs
:::

### 插槽用法

:::demo 基础写法：`<s-checkbox v-model="value" :options="options" size="large">...</s-checkbox>`。属性说明：`v-model` 示例值：`value`，类型由绑定值决定，默认值由绑定变量初始值决定；`options` 示例值：`options`，类型/可选值/默认值按内部组件或 Element Plus 对应属性；`size` 示例值：`large`，类型：string，可选值：`large` / `default` / `small`，默认值：继承全局尺寸或 `default`。本示例展示插槽内容定制，可以直接复制基础写法后按业务替换数据。
checkbox/slot
:::

### 自定义间距 gap

:::demo 基础写法：`<s-checkbox v-model="value" :options="options" :gap="horizontalGap">...</s-checkbox>`。属性说明：`v-model` 示例值：`value`，类型由绑定值决定，默认值由绑定变量初始值决定；`options` 示例值：`options`，类型/可选值/默认值按内部组件或 Element Plus 对应属性；`gap` 示例值：`horizontalGap`，类型/可选值/默认值按内部组件或 Element Plus 对应属性。本示例展示自定义配置，可以直接复制基础写法后按业务替换数据。
checkbox/customGap
:::

### 属性

|     属性名     | 说明                                               | 类型               | 默认值 |
| :------------: | -------------------------------------------------- | ------------------ | ------ |
|      type      | options参数的类型, 可以设置为simple                | string             | -      |
|    options     | checkbox的选项                                     | object             | {}     |
|    showType    | 显示的样式                                         | string             | check  |
|     label      | 显示的文本对应的字段                               | string             | label  |
|     value      | 后台的值需要的字段                                 | string             | value  |
|    showAll     | 是否显示全选                                       | boolean            | true   |
|     attrs      | 控制el-checkbox组件的参数                          | object             | {}     |
| customDisabled | 自定义的disabled                                   | function           | {}     |
|  customLabel   | 自定义显示的label                                  | function/string/'' | {}     |
|      gap       | 多个复选框之间的水平间距，支持 `processWidth` 写法 | number/string      | -      |
|     theme      | 主题样式                                           | `''` / `chenghua`  | `''`   |

### 方法

| 属性名 | 说明                           | 类型     |
| :----: | ------------------------------ | -------- |
| change | 值的改变可以通过change事件监听 | Function |

### Slots插槽

| 插槽名  | 说明             |
| :-----: | ---------------- |
| default | 默认可以使用插槽 |

### 说明

- `gap` 支持 `16`、`'16'`、`'16px'`、`'1rem'`、`'5%'` 这类常见写法；纯数字或数字字符串会自动补成 `px`。
