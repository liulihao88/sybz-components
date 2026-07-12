# select下拉框组件

[https://element-plus.org/zh-CN/component/select.html](https://element-plus.org/zh-CN/component/select.html)

## Hidden Title {.md-hidden}

<DocBasicUsage code='<s-select v-model="selectVal" :options="options" title="哈哈"></s-select>' />

## 属性事件插槽简介

<ApiIntro />

### 基础用法

:::demo 展示基础用法。基础写法：`<s-select v-model="selectVal" :options="options" title="哈哈"></s-select>`。属性：`options` 类型 `array`，默认值 `[]`；`title` 类型 `string`，默认值 `''`。
select/base
:::

### 成华主题

#### chenghua基础用法

:::demo 展示chenghua基础用法。基础写法：`<s-select v-model="value" width="320" theme="chenghua" title="服务名称" :options="options" />`。
select/chenghua/chenghuaBase
:::

#### chenghua尺寸

:::demo 展示成华主题样式。基础写法：`<s-select v-model="smallValue" width="320" theme="chenghua" size="small" :options="options" />`。
select/chenghua/chenghuaSize
:::

#### chenghua多选

:::demo 展示成华主题样式。基础写法：`<s-select v-model="multipleValue" width="100%" theme="chenghua" multiple title="多选服务" :options="options" />`。
select/chenghua/chenghuaMultiple
:::

### 石景山主题

#### shijingshan基础用法

:::demo 展示石景山基础用法。基础写法：`<s-select v-model="value" width="320" theme="shijingshan" title="服务名称" :options="options" />`。
select/shijingshan/shijingshanBase
:::

#### shijingshan尺寸

:::demo 展示石景山主题样式。基础写法：`<s-select v-model="smallValue" width="320" theme="shijingshan" size="small" :options="options" />`。
select/shijingshan/shijingshanSize
:::

#### shijingshan多选

:::demo 展示石景山主题样式。基础写法：`<s-select v-model="multipleValue" width="100%" theme="shijingshan" multiple title="多选服务" :options="options" />`。
select/shijingshan/shijingshanMultiple
:::

### 通常用法

:::demo 展示通常用法配置。基础写法：`<s-select v-model="selectVal" :options="options" label="name" value="id" title="value和label分别设置"></s-select>`。属性：`options` 类型 `array`，默认值 `[]`；`label` 类型 `string / number`，默认值按组件配置。
select/usually
:::

### 高度

:::demo 展示高度配置。基础写法：`<s-select v-model="value" title="服务名称" width="200" height="40" :options="options" />`。属性：`height` 类型 `string / number`，默认值 `''`。
select/height
:::

### 尺寸

:::demo 展示尺寸配置。基础写法：`<s-select v-model="selectValue" :options="options" multiple :size="size" :showQuick="true" :title="title" />`。属性：`size` 可选 `'' / small / default / large`，默认值 `''`。
select/size
:::

### 多选--隐藏多余标签的多选

:::demo 展示多选交互。基础写法：`<s-select title="你好" v-model="optionsId" multiple label="name" value="id" showPrefix @changeSelect="changeSelect" @change="change" :options="stepList"></s-select>`。属性：`multiple` 可选 `true / false`，默认值 `false`。
select/multiple
:::

### 调用change方法

:::demo 展示调用change方法配置。基础写法：`<s-select ref="simpleSelectRef" v-model="selectVal" :options="options" @change="selectChange"></s-select>`。
select/change
:::

### 遍历调用change方法

:::demo 展示遍历调用change方法配置。基础写法：`<s-select v-model="v.cc" :options="options" :ref="(el) => getSelectRef(el, i)"></s-select>`。属性：`options` 类型 `array`，默认值 `[]`。
select/multyChange
:::

### 集成绝大部分属性和方法

:::demo 展示集成绝大部分属性和方法配置。基础写法：`<s-select title="大部分常用属性" v-model="selectVal" :options="options" label="name" value="id" :customDisabled="customDisabled" :customLabel="({ option }) => option.name + '(' + option.id + ')'"></s-select>`。属性：`customDisabled` 类型 `({ option, index, value }) => boolean`，默认值 `undefined`；`title` 类型 `string`，默认值 `''`；`options` 类型 `array`，默认值 `[]`。
select/all
:::

### customLabel自定义显示label

:::demo 展示自定义配置。基础写法：`<s-select v-model="selectVal" :options="options" :customLabel="customLabel"></s-select>`。属性：`options` 类型 `array`，默认值 `[]`；`customLabel` 类型 `({ option, index, value }) => any`，默认值 `undefined`。
select/customLabel
:::

### 解析html

:::demo 展示解析html配置。基础写法：`<s-select v-model="selectValue" :options="options"></s-select>`。属性：`options` 类型 `array`，默认值 `[]`。
select/html
:::

### 插槽

:::demo 展示插槽内容定制。基础写法：`<s-select v-model="selectValue" :options="options" width="100%"></s-select>`。插槽：按示例中的插槽名定制内容。
select/slot
:::

### disabled, 设置选项不允许选择

:::demo 展示禁用状态。基础写法：`<s-select v-model="selectValue1" :options="options" :customDisabled="customDisabled" title="单选正常" />`。属性：`customDisabled` 类型 `({ option, index, value }) => boolean`，默认值 `undefined`。
select/disabled
:::

### table单选

:::demo 展示表格单选。基础写法：`<s-select v-model="selectName" title="单选的" width="100%" ref="selectRef" value-key="value" @clear="handleCurrentChange(null)"></s-select>`。属性：`width` 类型 `string / number`，默认值 `''`。
select/simpleTableSelect
:::

### table多选

:::demo 展示表格多选。基础写法：`<s-select v-model="selectName" title="多选的" width="100%" ref="selectRef" multiple @change="change" :collapse-tags="true" :collapse-tags-tooltip="true" @clear="clear"></s-select>`。属性：`multiple` 可选 `true / false`，默认值 `false`。
select/multipleTableSelect
:::

### 属性

|           属性名           | 说明                                                    | 类型                    | 默认值    |
| :------------------------: | ------------------------------------------------------- | ----------------------- | --------- |
|        `modelValue`        | 当前值                                                  | array / string / number | -         |
|          `value`           | 选项值字段名                                            | string                  | `value`   |
|          `label`           | 选项显示字段名，支持字符串或多字段数组                  | string / array          | `label`   |
|         `options`          | 选项数据                                                | array                   | `[]`      |
|           `type`           | 数据类型，传 `simple` 时按基础类型数组处理              | string                  | `''`      |
|         `multiple`         | 是否多选                                                | boolean                 | `false`   |
|         `showAll`          | 多选时是否显示全选/反选                                 | boolean                 | `true`    |
|        `showPrefix`        | 是否显示前缀数量信息                                    | boolean                 | `false`   |
|        `showQuick`         | 是否显示上下快速切换按钮                                | boolean                 | `true`    |
|           `size`           | 选择器尺寸，支持 `small` / `default` / `large`          | string                  | `''`      |
|          `theme`           | 选择器主题，支持 `default` / `chenghua` / `shijingshan` | string                  | `default` |
|          `title`           | 左侧标题文案                                            | string                  | `''`      |
|      `compTitleStyle`      | 左侧标题组件样式                                        | object                  | `{}`      |
|         `connect`          | 多字段 label 拼接符                                     | string                  | `/`       |
|       `customLabel`        | 自定义 label，参数为 `{ option, index, value }`         | function                | -         |
|          `width`           | 组件宽度                                                | string / number         | `''`      |
|          `height`          | 组件高度                                                | string / number         | `''`      |
|      `disPlaceholder`      | 禁用态占位文案                                          | string                  | `''`      |
|      `customDisabled`      | 自定义禁用，参数为 `{ option, index, value }`           | `(context) => boolean`  | -         |
|           `url`            | 远程请求地址或方法                                      | string / function       | `''`      |
|        `urlParams`         | 远程请求参数                                            | object                  | `{}`      |
|    `optionsExpression`     | 远程结果取值表达式                                      | string                  | `''`      |
|        `emptyColor`        | 选项为空时是否高亮边框                                  | boolean                 | `false`   |
|       `showTooltip`        | 选中项文本溢出时是否显示 tooltip                        | boolean                 | `true`    |
|       `tooltipAttrs`       | 选中项溢出 tooltip 额外属性                             | object                  | `{}`      |
| `dangerouslyUseHTMLString` | 是否将选中项溢出 tooltip 的内容按 HTML 字符串渲染       | boolean                 | `false`   |

### 事件

|       事件名        | 说明                                                                                                       |
| :-----------------: | ---------------------------------------------------------------------------------------------------------- |
| `update:modelValue` | 选中值变化时触发                                                                                           |
|      `change`       | 值变化时触发                                                                                               |
|   `changeSelect`    | 组件内部切换选项时触发，参数为 `{ value, label, option, index }`；多选时各字段为数组，清空时为 `undefined` |

命名事件函数需要显式标注类型，TypeScript 无法从模板事件反向推断脚本区函数参数。组件库已导出 `SSelectChangeContext`：

```ts
import type { SSelectChangeContext } from 'sybz-components'

function changeSelect({ value, label, option, index }: SSelectChangeContext) {
  console.log(value, label, option, index)
}
```

### 说明

- 组件基于 `el-select` 封装，绝大多数原生属性都可以直接透传。
- 多选模式下支持全选、反选和上下快速切换。
