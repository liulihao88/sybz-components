# select下拉框组件

[https://element-plus.org/zh-CN/component/select.html](https://element-plus.org/zh-CN/component/select.html)

## Hidden Title {.md-hidden}

## 属性事件插槽简介

<ApiIntro />

### 基础用法

:::demo 基础写法：`<s-select v-model="selectVal" :options="options" title="哈哈">...</s-select>`。属性说明：`v-model` 示例值：`selectVal`，类型由绑定值决定，默认值由绑定变量初始值决定；`options` 示例值：`options`，类型：array，默认值：`[]`；`title` 示例值：`哈哈`，类型：string，默认值：`''`。本示例展示基础渲染和最小配置。之所以, options为空, 加红色边框, 是为了减少不必要的点击后才知道数据为空的操作。
select/base
:::

### 成华主题

#### chenghua基础用法

:::demo 基础写法：`<s-select v-model="value" width="320" theme="chenghua" title="服务名称" :options="options" />`。属性说明：`v-model` 示例值：`value`，类型由绑定值决定，默认值由绑定变量初始值决定；`width` 示例值：`320`，类型：string / number，默认值：`''`；`theme` 示例值：`chenghua`，类型：string，默认值：`''`；`title` 示例值：`服务名称`，类型：string，默认值：`''`；`options` 示例值：`options`，类型：array，默认值：`[]`。本示例展示基础渲染和最小配置，可以直接复制基础写法后按业务替换数据。
select/chenghua/chenghuaBase
:::

#### chenghua尺寸

:::demo 基础写法：`<s-select v-model="smallValue" width="320" theme="chenghua" size="small" :options="options" />`。属性说明：`v-model` 示例值：`smallValue`，类型由绑定值决定，默认值由绑定变量初始值决定；`width` 示例值：`320`，类型：string / number，默认值：`''`；`theme` 示例值：`chenghua`，类型：string，默认值：`''`；`size` 示例值：`small`，类型：string，默认值：`''`；`options` 示例值：`options`，类型：array，默认值：`[]`。本示例展示成华主题样式，可以直接复制基础写法后按业务替换数据。
select/chenghua/chenghuaSize
:::

#### chenghua多选

:::demo 基础写法：`<s-select v-model="multipleValue" width="100%" theme="chenghua" multiple title="多选服务" :options="options" />`。属性说明：`v-model` 示例值：`multipleValue`，类型由绑定值决定，默认值由绑定变量初始值决定；`width` 示例值：`100%`，类型：string / number，默认值：`''`；`theme` 示例值：`chenghua`，类型：string，默认值：`''`；`multiple` 示例值：`true`，类型：boolean，默认值：`false`；`title` 示例值：`多选服务`，类型：string，默认值：`''`；`options` 示例值：`options`，类型：array，默认值：`[]`。本示例展示成华主题样式，可以直接复制基础写法后按业务替换数据。
select/chenghua/chenghuaMultiple
:::

### 通常用法

:::demo 基础写法：`<s-select v-model="selectVal" :options="options" label="name" value="id" title="value和label分别设置">...</s-select>`。属性说明：`v-model` 示例值：`selectVal`，类型由绑定值决定，默认值由绑定变量初始值决定；`options` 示例值：`options`，类型：array，默认值：`[]`；`label` 示例值：`name`，类型：string / array，默认值：`label`；`value` 示例值：`id`，类型：string，默认值：`value`；`title` 示例值：`value和label分别设置`，类型：string，默认值：`''`；`width` 示例值：`220`，类型：string / number，默认值：`''`；`size` 示例值：`large`，类型：string，默认值：`''`；`disabled` 示例值：`true`，类型：boolean，可选值：`true` / `false`，默认值：`false`。本示例展示通常用法配置，可以直接复制基础写法后按业务替换数据。
select/usually
:::

### 高度

:::demo 基础写法：`<s-select v-model="value" title="服务名称" width="200" height="40" :options="options" />`。属性说明：`v-model` 示例值：`value`，类型由绑定值决定，默认值由绑定变量初始值决定；`title` 示例值：`服务名称`，类型：string，默认值：`''`；`width` 示例值：`200`，类型：string / number，默认值：`''`；`height` 示例值：`40`，类型：string / number，默认值：`''`；`options` 示例值：`options`，类型：array，默认值：`[]`；`size` 示例值：`small`，类型：string，默认值：`''`。本示例展示高度配置，可以直接复制基础写法后按业务替换数据。
select/height
:::

### 尺寸

:::demo 基础写法：`<s-select v-model="selectValue" :options="options" multiple :size="size" :showQuick="true" :title="`选择尺寸=>${size}`" />`。属性说明：`v-model` 示例值：`selectValue`，类型由绑定值决定，默认值由绑定变量初始值决定；`options` 示例值：`options`，类型：array，默认值：`[]`；`multiple` 示例值：`true`，类型：boolean，默认值：`false`；`size` 示例值：`size`，类型：string，默认值：`''`；`showQuick` 示例值：`true`，类型：boolean，默认值：`true`；`title` 示例值：``选择尺寸=>${size}``，类型：string，默认值：`''`。本示例展示尺寸配置，可以直接复制基础写法后按业务替换数据。
select/size
:::

### 多选--隐藏多余标签的多选

:::demo 基础写法：`<s-select title="你好" v-model="optionsId" multiple label="name" value="id" showPrefix @changeSelect="changeSelect" @change="change" :options="stepList">...</s-select>`。属性说明：`title` 示例值：`你好`，类型：string，默认值：`''`；`v-model` 示例值：`optionsId`，类型由绑定值决定，默认值由绑定变量初始值决定；`multiple` 示例值：`true`，类型：boolean，默认值：`false`；`label` 示例值：`name`，类型：string / array，默认值：`label`；`value` 示例值：`id`，类型：string，默认值：`value`；`showPrefix` 示例值：`true`，类型：boolean，默认值：`false`；`options` 示例值：`stepList`，类型：array，默认值：`[]`；`collapse-tags` 示例值：`true`，类型/可选值/默认值按内部组件或 Element Plus 对应属性。本示例展示多选交互，可以直接复制基础写法后按业务替换数据。
select/multiple
:::

### 调用change方法

:::demo 基础写法：`<s-select ref="simpleSelectRef" v-model="selectVal" :options="options" @change="selectChange">...</s-select>`。属性说明：`v-model` 示例值：`selectVal`，类型由绑定值决定，默认值由绑定变量初始值决定；`options` 示例值：`options`，类型：array，默认值：`[]`。本示例展示调用change方法配置。主动调用select的change方法, 主要的使用场景是本地开发的时候, 给select加默认值。
select/change
:::

### 遍历调用change方法

:::demo 基础写法：`<s-select v-model="v.cc" :options="options" :ref="(el) => getSelectRef(el, i)">...</s-select>`。属性说明：`v-model` 示例值：`v.cc`，类型由绑定值决定，默认值由绑定变量初始值决定；`options` 示例值：`options`，类型：array，默认值：`[]`。本示例展示遍历调用change方法配置。主动调用select的change方法, 主要的使用场景是本地开发的时候, 给遍历的select加默认值。
select/multyChange
:::

### 集成绝大部分属性和方法

:::demo 基础写法：`<s-select title="大部分常用属性" v-model="selectVal" :options="options" label="name" value="id" :itemDisabled="itemDisabled" :customLabel="(item) => item.name + '(' + item.id + ')'">...</s-select>`。属性说明：`title` 示例值：`大部分常用属性`，类型：string，默认值：`''`；`v-model` 示例值：`selectVal`，类型由绑定值决定，默认值由绑定变量初始值决定；`options` 示例值：`options`，类型：array，默认值：`[]`；`label` 示例值：`name`，类型：string / array，默认值：`label`；`value` 示例值：`id`，类型：string，默认值：`value`；`itemDisabled` 示例值：`itemDisabled`，类型：function，默认值：`() => {}`；`customLabel` 示例值：`(item) => item.name + '(' + item....`，类型：function / string，默认值：`''`。本示例展示集成绝大部分属性和方法配置，可以直接复制基础写法后按业务替换数据。
select/all
:::

### customLabel自定义显示label

:::demo 基础写法：`<s-select v-model="selectVal" :options="options" :customLabel="customLabel">...</s-select>`。属性说明：`v-model` 示例值：`selectVal`，类型由绑定值决定，默认值由绑定变量初始值决定；`options` 示例值：`options`，类型：array，默认值：`[]`；`customLabel` 示例值：`customLabel`，类型：function / string，默认值：`''`。本示例展示自定义配置，可以直接复制基础写法后按业务替换数据。
select/customLabel
:::

### 解析html

:::demo 基础写法：`<s-select v-model="selectValue" :options="options">...</s-select>`。属性说明：`v-model` 示例值：`selectValue`，类型由绑定值决定，默认值由绑定变量初始值决定；`options` 示例值：`options`，类型：array，默认值：`[]`。本示例展示解析html配置，可以直接复制基础写法后按业务替换数据。
select/html
:::

### 插槽

:::demo 基础写法：`<s-select v-model="selectValue" :options="options" width="100%">...</s-select>`。属性说明：`v-model` 示例值：`selectValue`，类型由绑定值决定，默认值由绑定变量初始值决定；`options` 示例值：`options`，类型：array，默认值：`[]`；`width` 示例值：`100%`，类型：string / number，默认值：`''`。本示例展示插槽内容定制，可以直接复制基础写法后按业务替换数据。
select/slot
:::

### disabled, 设置选项不允许选择

:::demo 基础写法：`<s-select v-model="selectValue1" :options="options" :itemDisabled="itemDisabled" title="单选正常" />`。属性说明：`v-model` 示例值：`selectValue1`，类型由绑定值决定，默认值由绑定变量初始值决定；`options` 示例值：`options`，类型：array，默认值：`[]`；`itemDisabled` 示例值：`itemDisabled`，类型：function，默认值：`() => {}`；`title` 示例值：`单选正常`，类型：string，默认值：`''`；`type` 示例值：`simple`，类型：string，默认值：`''`；`multiple` 示例值：`true`，类型：boolean，默认值：`false`。本示例展示禁用状态，可以直接复制基础写法后按业务替换数据。
select/disabled
:::

### table单选

:::demo 基础写法：`<s-select v-model="selectName" :title="`单选的 => ${selectValue}`" width="100%" ref="selectRef" value-key="value" @clear="handleCurrentChange(null)">...</s-select>`。属性说明：`v-model` 示例值：`selectName`，类型由绑定值决定，默认值由绑定变量初始值决定；`title` 示例值：`单选的 => ${selectValue}`，类型：string，默认值：`''`；`width` 示例值：`100%`，类型：string / number，默认值：`''`；`value-key` 示例值：`value`，类型/可选值/默认值按内部组件或 Element Plus 对应属性。本示例展示单选交互，可以直接复制基础写法后按业务替换数据。
select/simpleTableSelect
:::

### table多选

:::demo 基础写法：`<s-select v-model="selectName" :title="`多选的 => ${selectValue}`" width="100%" ref="selectRef" multiple @change="change" :collapse-tags="true" :collapse-tags-tooltip="true" @clear="clear">...</s-select>`。属性说明：`v-model` 示例值：`selectName`，类型由绑定值决定，默认值由绑定变量初始值决定；`title` 示例值：`多选的 => ${selectValue}`，类型：string，默认值：`''`；`width` 示例值：`100%`，类型：string / number，默认值：`''`；`multiple` 示例值：`true`，类型：boolean，默认值：`false`；`collapse-tags` 示例值：`true`，类型/可选值/默认值按内部组件或 Element Plus 对应属性；`collapse-tags-tooltip` 示例值：`true`，类型/可选值/默认值按内部组件或 Element Plus 对应属性。本示例展示多选交互，可以直接复制基础写法后按业务替换数据。
select/multipleTableSelect
:::

### 属性

|           属性名           | 说明                                              | 类型                    | 默认值     |
| :------------------------: | ------------------------------------------------- | ----------------------- | ---------- |
|        `modelValue`        | 当前值                                            | array / string / number | -          |
|          `value`           | 选项值字段名                                      | string                  | `value`    |
|          `label`           | 选项显示字段名，支持字符串或多字段数组            | string / array          | `label`    |
|         `options`          | 选项数据                                          | array                   | `[]`       |
|           `type`           | 数据类型，传 `simple` 时按基础类型数组处理        | string                  | `''`       |
|         `multiple`         | 是否多选                                          | boolean                 | `false`    |
|         `showAll`          | 多选时是否显示全选/反选                           | boolean                 | `true`     |
|        `showPrefix`        | 是否显示前缀数量信息                              | boolean                 | `false`    |
|        `showQuick`         | 是否显示上下快速切换按钮                          | boolean                 | `true`     |
|           `size`           | 选择器尺寸，支持 `small` / `default` / `large`    | string                  | `''`       |
|          `theme`           | 选择器主题，支持 `chenghua`                       | string                  | `''`       |
|          `title`           | 左侧标题文案                                      | string                  | `''`       |
|         `connect`          | 多字段 label 拼接符                               | string                  | `/`        |
|       `customLabel`        | 自定义 label 生成函数                             | function / string       | `''`       |
|          `width`           | 组件宽度                                          | string / number         | `''`       |
|          `height`          | 组件高度                                          | string / number         | `''`       |
|      `disPlaceholder`      | 禁用态占位文案                                    | string                  | `''`       |
|       `itemDisabled`       | 单项禁用判断函数                                  | function                | `() => {}` |
|           `url`            | 远程请求地址或方法                                | string / function       | `''`       |
|        `urlParams`         | 远程请求参数                                      | object                  | `{}`       |
|    `optionsExpression`     | 远程结果取值表达式                                | string                  | `''`       |
|        `emptyColor`        | 选项为空时是否高亮边框                            | boolean                 | `false`    |
|       `showTooltip`        | 选中项文本溢出时是否显示 tooltip                  | boolean                 | `true`     |
|       `tooltipAttrs`       | 选中项溢出 tooltip 额外属性                       | object                  | `{}`       |
| `dangerouslyUseHtmlString` | 是否将选中项溢出 tooltip 的内容按 HTML 字符串渲染 | boolean                 | `false`    |

### 事件

|       事件名        | 说明                   |
| :-----------------: | ---------------------- |
| `update:modelValue` | 选中值变化时触发       |
|      `change`       | 值变化时触发           |
|   `changeSelect`    | 组件内部切换选项时触发 |

### 说明

- 组件基于 `el-select` 封装，绝大多数原生属性都可以直接透传。
- 多选模式下支持全选、反选和上下快速切换。
