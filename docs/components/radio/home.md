# radio 单选组件

[Element Plus Radio 组件文档](https://element-plus.org/zh-CN/component/radio.html)

## Hidden Title {.md-hidden}

<DocBasicUsage code='<s-radio v-model="value" :options="options" />' />

## 属性事件插槽简介

<ApiIntro />

### 基础用法

:::demo 基础写法：`<s-radio v-model="value" :options="options" />`。属性说明：`v-model` 示例值：`value`，类型由绑定值决定，默认值由绑定变量初始值决定；`options` 示例值：`options`，类型：array，默认值：`[]`。本示例展示基础渲染和最小配置。基于 Element-plus 的 `el-radio` 二次封装的**单选组件**，继承原组件的所有属性。
radio/base
:::

### 成华主题

:::demo 基础写法：`<s-radio v-model="service" title="服务类型" theme="chenghua" :options="serviceOptions" />`。属性说明：`v-model` 示例值：`service`，类型由绑定值决定，默认值由绑定变量初始值决定；`title` 示例值：`服务类型`，类型：string，默认值：未设置；`theme` 示例值：`chenghua`，类型：`default` / `chenghua` / `shijingshan`，默认值：`default`；`options` 示例值：`serviceOptions`，类型：array，默认值：`[]`；`border` 示例值：`true`，类型：boolean，默认值：`false`；`show-type` 示例值：`button`，类型：string，默认值：`radio`。本示例展示成华主题样式。`theme="chenghua"` 时启用成华主题样式；`showType` 的可选值是 `radio` 和 `button`，默认值是 `radio`；`border` 的可选值是 `true` 和 `false`，默认值是 `false`。
radio/chenghua/base
:::

### disabled

:::demo 基础写法：`<s-radio v-model="value" :options="options" :disabled="true" />`。属性说明：`v-model` 示例值：`value`，类型由绑定值决定，默认值由绑定变量初始值决定；`options` 示例值：`options`，类型：array，默认值：`[]`；`disabled` 示例值：`true`，类型：boolean，可选值：`true` / `false`，默认值：`false`；`itemDisabled` 示例值：`itemDisabled`，类型：function，默认值：`() => {}`。本示例展示禁用状态。基于 Element-plus 的 `el-radio` 二次封装的**单选组件**，继承原组件的所有属性。
radio/disabled
:::

### 通常用法

:::demo 基础写法：`<s-radio v-model="value" :options="options" value="id" label="name" />`。属性说明：`v-model` 示例值：`value`，类型由绑定值决定，默认值由绑定变量初始值决定；`options` 示例值：`options`，类型：array，默认值：`[]`；`value` 示例值：`id`，类型：string / number / boolean，默认值：`value`；`label` 示例值：`name`，类型：string / number / boolean，默认值：`label`；`showType` 示例值：`button`，类型：string，默认值：`radio`；`size` 示例值：`small`，类型：string，可选值：`large` / `default` / `small`，默认值：继承全局尺寸或 `default`。本示例展示通常用法配置，可以直接复制基础写法后按业务替换数据。
radio/usually
:::

### 使用type

:::demo 基础写法：`<s-radio v-model="value" type="boolean" />`。属性说明：`v-model` 示例值：`value`，类型由绑定值决定，默认值由绑定变量初始值决定；`type` 示例值：`boolean`，类型：string，默认值：`''`；`options` 示例值：`options`，类型：array，默认值：`[]`。本示例展示使用type配置。这里更改了type属性, 可以有很多种自定义options的变换, 属于自定义的扩展。
radio/type
:::

### 多个属性的用法

:::demo 基础写法：`<s-radio v-model="value" :options="options" value="id" label="name" showType="button" size="small" @change="change" :subAttrs="{ disabled: 'isDis' }" />`。属性说明：`v-model` 示例值：`value`，类型由绑定值决定，默认值由绑定变量初始值决定；`options` 示例值：`options`，类型：array，默认值：`[]`；`value` 示例值：`id`，类型：string / number / boolean，默认值：`value`；`label` 示例值：`name`，类型：string / number / boolean，默认值：`label`；`showType` 示例值：`button`，类型：string，默认值：`radio`；`size` 示例值：`small`，类型：string，可选值：`large` / `default` / `small`，默认值：继承全局尺寸或 `default`；`subAttrs` 示例值：`{ disabled: 'isDis' }`，类型/可选值/默认值按内部组件或 Element Plus 对应属性。本示例展示多个属性的用法配置，可以直接复制基础写法后按业务替换数据。
radio/multyAttrs
:::

### Slots

:::demo 基础写法：`<s-radio v-model="value" :options="options" size="large" @change="change">...</s-radio>`。属性说明：`v-model` 示例值：`value`，类型由绑定值决定，默认值由绑定变量初始值决定；`options` 示例值：`options`，类型：array，默认值：`[]`；`size` 示例值：`large`，类型：string，可选值：`large` / `default` / `small`，默认值：继承全局尺寸或 `default`。本示例展示插槽内容定制，可以直接复制基础写法后按业务替换数据。
radio/slot
:::

### 属性

|      属性名      | 说明                                                  | 类型                                          | 默认值     |
| :--------------: | ----------------------------------------------------- | --------------------------------------------- | ---------- |
|     `title`      | 左侧标题文案                                          | string                                        | -          |
| `compTitleStyle` | 左侧标题组件样式                                      | object                                        | `{}`       |
|      `type`      | 数据类型，支持 `''` / `simple` / `boolean`            | string                                        | `''`       |
|     `theme`      | 主题样式，支持 `default` / `chenghua` / `shijingshan` | string                                        | `default`  |
|    `showType`    | 展示形式，支持 `radio` / `button`                     | string                                        | `radio`    |
|    `options`     | 单选项列表，支持对象数组或基础值数组                  | RadioItem[] / string[] / number[] / boolean[] | `[]`       |
|     `border`     | 是否显示边框                                          | boolean                                       | `false`    |
|      `size`      | 单选尺寸，支持顶层传入和全局默认配置                  | `''` / `large` / `default` / `small`          | `''`       |
|     `value`      | 选项值字段名                                          | string / number / boolean                     | `value`    |
|     `label`      | 选项展示字段名                                        | string / number / boolean                     | `label`    |
|  `itemDisabled`  | 单项禁用判断函数                                      | function                                      | `() => {}` |

### 说明

- 组件底层基于 `el-radio-group` 封装，支持透传原生属性和事件。
- `options` 可以传 `{ label, value }` 对象数组，也可以直接传 string / number / boolean 基础值数组，基础值会自动转换为 `{ label, value }`。
- `type="boolean"` 时会自动生成 `true / false` 两个选项。
