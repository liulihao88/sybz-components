# radio 单选组件

[Element Plus Radio 组件文档](https://element-plus.org/zh-CN/component/radio.html)

## Hidden Title {.md-hidden}

<DocBasicUsage code='<s-radio v-model="value" :options="options" />' />

## 属性事件插槽简介

<ApiIntro />

### 基础用法

:::demo 展示基础用法。基础写法：`<s-radio v-model="value" :options="options" />`。属性：`options` 类型 `array`，默认值 `[]`。
radio/base
:::

### 成华主题

:::demo 展示成华主题样式。基础写法：`<s-radio v-model="service" title="服务类型" theme="chenghua" :options="serviceOptions" />`。属性：`theme` 可选 `default / chenghua / shijingshan`，默认值 `default`。
radio/chenghua/base
:::

### 石景山主题

:::demo 展示石景山主题样式。基础写法：`<s-radio v-model="service" title="服务类型" theme="shijingshan" :options="serviceOptions" />`。属性：`theme` 可选 `default / chenghua / shijingshan`，默认值 `default`。
radio/shijingshan/base
:::

### disabled

:::demo 展示禁用状态。基础写法：`<s-radio v-model="value" :options="options" :disabled="true" />`。属性：`options` 类型 `array`，默认值 `[]`。
radio/disabled
:::

### 通常用法

:::demo 展示通常用法配置。基础写法：`<s-radio v-model="value" :options="options" value="id" label="name" />`。属性：`options` 类型 `array`，默认值 `[]`；`value` 类型 `string / number / boolean`，默认值按组件配置。
radio/usually
:::

### 使用type

:::demo 展示 `type`。基础写法：`<s-radio v-model="value" type="boolean" />`。属性：`type` 可选 `'' / simple / boolean`，默认值 `''`。
radio/type
:::

### 多个属性的用法

:::demo 展示多个属性的用法配置。基础写法：`<s-radio v-model="value" :options="options" value="id" label="name" showType="button" size="small" @change="change" :subAttrs="{ disabled: 'isDis' }" />`。属性：`options` 类型 `array`，默认值 `[]`；`value` 类型 `string / number / boolean`，默认值按组件配置。
radio/multyAttrs
:::

### Slots

:::demo 展示插槽内容定制。基础写法：`<s-radio v-model="value" :options="options" size="large" @change="change">...</s-radio>`。插槽：按示例中的插槽名定制内容。
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
