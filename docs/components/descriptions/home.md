# Descriptions 描述列表

[Element Plus 描述组件文档](https://element-plus.org/zh-CN/component/descriptions.html)

## Hidden Title {.md-hidden}

<DocBasicUsage code='<s-descriptions :options="options" value="value2" label="key"></s-descriptions>' />

## 属性事件插槽简介

<ApiIntro />

### 基础用法

:::demo 展示基础用法。基础写法：`<s-descriptions :options="options" value="value2" label="key">...</s-descriptions>`。属性：`options` 类型 `array`，默认值 `[]`；`value` 类型 `string / number / boolean`，默认值按组件配置；`label` 类型 `string / number`，默认值按组件配置。
descriptions/base
:::

### 成华主题

:::demo 展示成华主题样式。基础写法：`<s-descriptions theme="chenghua" title="服务基础信息" extra="更新时间 10:24" :options="options" :column="3" label-width="110" show-all />`。属性：`theme` 可选 `default / chenghua / shijingshan`，默认值 `default`。
descriptions/chenghua/base
:::

### 石景山主题

:::demo 展示石景山主题样式。基础写法：`<s-descriptions theme="shijingshan" title="服务基础信息" extra="更新时间 10:24" :options="options" :column="3" show-all />`。属性：`theme` 可选 `default / chenghua / shijingshan`，默认值 `default`；`labelWidth` 类型 `string / number`，默认值 `auto`。
descriptions/shijingshan/base
:::

### 通常用法

:::demo 展示通常用法配置。基础写法：`<s-descriptions title="这是title" :options="options" class="w-block" :column="1" label-width="300" :size="sizeValue" :showAll="showAll" :border="borderValue" extra="这是extra">...</s-descriptions>`。属性：`title` 类型 `string`，默认值 `''`；`options` 类型 `array`，默认值 `[]`。
descriptions/usually
:::

### 每行展示多少项

:::demo 展示每行展示多少项配置。基础写法：`<s-descriptions :options="DataSource.descData" :column="radioValue">...</s-descriptions>`。属性：`options` 类型 `array`，默认值 `[]`；`column` 类型 `number`，默认值 `3`。
descriptions/column
:::

### 垂直列表

:::demo 展示垂直列表配置。基础写法：`<s-descriptions title="Vertical list with border" direction="vertical" :column="4" :size="size" border>...</s-descriptions>`。属性：`title` 类型 `string`，默认值 `''`；`direction` 可选 `row / row-reverse / column / column-reverse`，默认值 `row`。
descriptions/vertical
:::

### slot插槽 和 render

:::demo 展示插槽内容定制。基础写法：`<s-descriptions :options="options" class="w-block" :column="1" label-width="200px">...</s-descriptions>`。插槽：按示例中的插槽名定制内容。
descriptions/slot
:::

### 自定义样式

:::demo 展示自定义配置。基础写法：`<s-descriptions :options="options" :column="1" label-width="300">...</s-descriptions>`。属性：`options` 类型 `array`，默认值 `[]`；`column` 类型 `number`，默认值 `3`。
descriptions/customStyle
:::

### API

|    属性名    | 说明                                                     | 类型            | 默认值    |
| :----------: | -------------------------------------------------------- | --------------- | --------- |
|  `options`   | 描述项配置列表                                           | `ItemOptions[]` | -         |
|   `theme`    | 主题样式，支持 `default` / `chenghua` / `shijingshan`    | string          | `default` |
|   `column`   | 一行展示的描述项数量                                     | number          | `3`       |
| `labelWidth` | label 宽度，传 `auto` 时会按最长 label 自动计算          | string / number | `auto`    |
|  `showAll`   | 是否完整展示文本；为 `false` 时通过 `s-tooltip` 省略展示 | boolean         | `false`   |
|   `label`    | options 中作为标签文本的字段名                           | string          | `label`   |
|   `value`    | options 中作为内容值的字段名                             | string          | `value`   |

### ItemOptions

|    属性名     | 说明                                                     | 类型                                                              | 默认值 |
| :-----------: | -------------------------------------------------------- | ----------------------------------------------------------------- | ------ |
|    `label`    | 标签文本                                                 | string                                                            | -      |
|    `value`    | 内容值                                                   | any                                                               | -      |
|  `labelSlot`  | 自定义 label 插槽名                                      | string                                                            | -      |
|  `valueSlot`  | 自定义 value 插槽名                                      | string                                                            | -      |
| `labelRender` | 自定义 label 渲染函数，`row` / `item` 均为当前描述项数据 | `({ row, value, column, item, label, index }) => VNode \| string` | -      |
|   `render`    | 自定义 value 渲染函数，`row` / `item` 均为当前描述项数据 | `({ row, value, column, item, label, index }) => VNode \| string` | -      |
|   `filter`    | 内容值格式化函数，`row` 为当前描述项数据                 | `({ value, index, label, row }) => any`                           | -      |
|    `attrs`    | 透传给 `el-descriptions-item` 的属性                     | object                                                            | -      |
| `labelAttrs`  | 透传给 label 内部 `s-tooltip` 的属性                     | object                                                            | -      |
| `valueAttrs`  | 透传给 value 内部 `s-tooltip` 的属性                     | object                                                            | -      |

### 插槽

|        插槽名        | 说明                                      | 插槽参数                        |
| :------------------: | ----------------------------------------- | ------------------------------- |
|      `default`       | 自定义完整描述内容，会覆盖 `options` 渲染 | -                               |
| `labelSlot` 对应名称 | 自定义某一项 label                        | `{ item, label, value, index }` |
| `valueSlot` 对应名称 | 自定义某一项 value                        | `{ item, label, value, index }` |

### 透传属性

- 组件默认开启 `border`，其他属性会继续透传给 Element Plus `el-descriptions`。
