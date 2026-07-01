# Descriptions 描述列表

[Element Plus 描述组件文档](https://element-plus.org/zh-CN/component/descriptions.html)

## Hidden Title {.md-hidden}

<DocBasicUsage code='<s-descriptions :options="options" value="value2" label="key"></s-descriptions>' />

## 属性事件插槽简介

<ApiIntro />

### 基础用法

:::demo 基础写法：`<s-descriptions :options="options" value="value2" label="key">...</s-descriptions>`。属性说明：`options` 示例值：`options`，类型：`ItemOptions[]`，默认值：未设置；`value` 示例值：`value2`，类型：string，默认值：`value`；`label` 示例值：`key`，类型：string，默认值：`label`。本示例展示基础渲染和最小配置，可以通过 `label` 和 `value` 快捷指定描述项里用于展示的字段名。
descriptions/base
:::

### 成华主题

:::demo 基础写法：`<s-descriptions theme="chenghua" title="服务基础信息" extra="更新时间 10:24" :options="options" :column="3" label-width="110" show-all />`。属性说明：`theme` 示例值：`chenghua`，类型：string，默认值：`''`；`title` 示例值：`服务基础信息`，类型：string，默认值：`""`；`extra` 示例值：`更新时间 10:24`，类型/可选值/默认值按内部组件或 Element Plus 对应属性；`options` 示例值：`options`，类型：`ItemOptions[]`，默认值：未设置；`column` 示例值：`3`，类型：number，默认值：`3`；`label-width` 示例值：`110`，类型：string / number，默认值：`auto`；`show-all` 示例值：`true`，类型：boolean，默认值：`false`。本示例展示成华主题样式。`theme="chenghua"` 时启用成华主题样式。`theme` 的可选值是 `''` 和 `chenghua`，默认值是 `''`；`column` 的类型是 `number`，默认值是 `3`；`labelWidth` 支持 `string` 和 `number`，默认值是 `auto`；`showAll` 的可选值是 `true` 和 `false`，默认值是 `false`。
descriptions/chenghua/base
:::

### 通常用法

:::demo 基础写法：`<s-descriptions title="这是title" :options="options" class="w-block" :column="1" label-width="300" :size="sizeValue" :showAll="showAll" :border="borderValue" extra="这是extra">...</s-descriptions>`。属性说明：`title` 示例值：`这是title`，类型：string，默认值：`""`；`options` 示例值：`options`，类型：`ItemOptions[]`，默认值：未设置；`column` 示例值：`1`，类型：number，默认值：`3`；`label-width` 示例值：`300`，类型：string / number，默认值：`auto`；`size` 示例值：`sizeValue`，类型：string，可选值：`large` / `default` / `small`，默认值：继承全局尺寸或 `default`；`showAll` 示例值：`showAll`，类型：boolean，默认值：`false`；`border` 示例值：`borderValue`，类型/可选值/默认值按内部组件或 Element Plus 对应属性；`extra` 示例值：`这是extra`，类型/可选值/默认值按内部组件或 Element Plus 对应属性。本示例展示通常用法配置，可以直接复制基础写法后按业务替换数据。
descriptions/usually
:::

### 每行展示多少项

:::demo 基础写法：`<s-descriptions :options="DataSource.descData" :column="radioValue">...</s-descriptions>`。属性说明：`options` 示例值：`DataSource.descData`，类型：`ItemOptions[]`，默认值：未设置；`column` 示例值：`radioValue`，类型：number，默认值：`3`。本示例展示每行展示多少项配置，可以直接复制基础写法后按业务替换数据。
descriptions/column
:::

### 垂直列表

:::demo 基础写法：`<s-descriptions title="Vertical list with border" direction="vertical" :column="4" :size="size" border>...</s-descriptions>`。属性说明：`title` 示例值：`Vertical list with border`，类型：string，默认值：`""`；`direction` 示例值：`vertical`，类型/可选值/默认值按内部组件或 Element Plus 对应属性；`column` 示例值：`4`，类型：number，默认值：`3`；`size` 示例值：`size`，类型：string，可选值：`large` / `default` / `small`，默认值：继承全局尺寸或 `default`；`border` 示例值：`true`，类型/可选值/默认值按内部组件或 Element Plus 对应属性。本示例展示垂直列表配置，可以直接复制基础写法后按业务替换数据。
descriptions/vertical
:::

### slot插槽

:::demo 基础写法：`<s-descriptions :options="options" class="w-block" :column="1" label-width="200px">...</s-descriptions>`。属性说明：`options` 示例值：`options`，类型：`ItemOptions[]`，默认值：未设置；`column` 示例值：`1`，类型：number，默认值：`3`；`label-width` 示例值：`200px`，类型：string / number，默认值：`auto`。本示例展示插槽内容定制，可以直接复制基础写法后按业务替换数据。
descriptions/slot
:::

### 自定义样式

:::demo 基础写法：`<s-descriptions :options="options" :column="1" label-width="300">...</s-descriptions>`。属性说明：`options` 示例值：`options`，类型：`ItemOptions[]`，默认值：未设置；`column` 示例值：`1`，类型：number，默认值：`3`；`label-width` 示例值：`300`，类型：string / number，默认值：`auto`。本示例展示自定义配置，可以直接复制基础写法后按业务替换数据。
descriptions/customStyle
:::

### API

|    属性名    | 说明                                                     | 类型            | 默认值  |
| :----------: | -------------------------------------------------------- | --------------- | ------- |
|  `options`   | 描述项配置列表                                           | `ItemOptions[]` | -       |
|   `theme`    | 主题样式，支持 `''` / `chenghua`                         | string          | `''`    |
|   `column`   | 一行展示的描述项数量                                     | number          | `3`     |
| `labelWidth` | label 宽度，传 `auto` 时会按最长 label 自动计算          | string / number | `auto`  |
|  `showAll`   | 是否完整展示文本；为 `false` 时通过 `s-tooltip` 省略展示 | boolean         | `false` |
|   `label`    | options 中作为标签文本的字段名                           | string          | `label` |
|   `value`    | options 中作为内容值的字段名                             | string          | `value` |

### ItemOptions

|    属性名     | 说明                                                                                                | 类型                                                 | 默认值 |
| :-----------: | --------------------------------------------------------------------------------------------------- | ---------------------------------------------------- | ------ |
|    `label`    | 标签文本                                                                                            | string                                               | -      |
|    `value`    | 内容值                                                                                              | any                                                  | -      |
|  `labelSlot`  | 自定义 label 插槽名                                                                                 | string                                               | -      |
|  `valueSlot`  | 自定义 value 插槽名                                                                                 | string                                               | -      |
| `labelRender` | 自定义 label 渲染函数                                                                               | `(item) => VNode \| string`                          | -      |
|   `render`    | 自定义 value 渲染函数                                                                               | `(item) => VNode \| string`                          | -      |
|   `filter`    | 内容值格式化函数，参数包含 `row` / `item` / `scope` / `index` / `value` / `label`，并平铺当前项字段 | `({ row, item, scope, index, value, label }) => any` | -      |
|    `attrs`    | 透传给 `el-descriptions-item` 的属性                                                                | object                                               | -      |
| `labelAttrs`  | 透传给 label 内部 `s-tooltip` 的属性                                                                | object                                               | -      |
| `valueAttrs`  | 透传给 value 内部 `s-tooltip` 的属性                                                                | object                                               | -      |

### 插槽

|        插槽名        | 说明                                      | 插槽参数                        |
| :------------------: | ----------------------------------------- | ------------------------------- |
|      `default`       | 自定义完整描述内容，会覆盖 `options` 渲染 | -                               |
| `labelSlot` 对应名称 | 自定义某一项 label                        | `{ item, label, value, index }` |
| `valueSlot` 对应名称 | 自定义某一项 value                        | `{ item, label, value, index }` |

### 透传属性

- 组件默认开启 `border`，其他属性会继续透传给 Element Plus `el-descriptions`。
