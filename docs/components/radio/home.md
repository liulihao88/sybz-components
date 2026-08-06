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

:::demo 展示成华主题样式。基础写法：`<s-radio v-model="service" title="服务类型" theme="chenghua" :options="serviceOptions" />`。
radio/chenghua/base
:::

### 石景山主题

:::demo 展示石景山主题样式。基础写法：`<s-radio v-model="service" title="服务类型" theme="shijingshan" :options="serviceOptions" />`。
radio/shijingshan/base
:::

### disabled

:::demo 展示禁用状态。基础写法：`<s-radio v-model="value" :options="options" :customDisabled="customDisabled" />`。属性：`options` 类型 `array`，默认值 `[]`；`customDisabled` 类型 `({ option, index, value }) => boolean`，默认值 `undefined`。
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

### 高级写法：动态 label 和选项样式

:::demo 展示 button 模式下使用独立语义色，通过 `computed` 动态生成 label，并为每项设置 class。基础写法：`<s-radio v-model="status" showType="button" :options="statusOptions" />`。属性：`showType` 可选 `radio / button`，默认值 `radio`；option 的 `type` 可选 `primary / success / warning / danger / info`，默认值 `undefined`；`color` 类型 `string`，默认值为 type 或主题主色；`class` 类型 `string / string[] / object`，默认值 `undefined`；`style` 类型 `object`，默认值 `undefined`。
radio/advanced
:::

### Slots

:::demo 展示插槽内容定制。基础写法：`<s-radio v-model="value" :options="options" size="large" @change="change"></s-radio>`。插槽：按示例中的插槽名定制内容。
radio/slot
:::

### 选项间距（默认值：沿用 Element Plus 样式）

:::demo 使用 `gap` 设置单选项之间的间距，内容较多时会自动换行。基础写法：`<s-radio v-model="value" :options="options" :gap="16" />`。属性：`gap` 类型 `string / number`，数字按 `px` 处理，默认值 `undefined`（沿用 Element Plus 样式）。
radio/gap
:::

### 属性

|      属性名      | 说明                                                  | 类型                                          | 默认值    |
| :--------------: | ----------------------------------------------------- | --------------------------------------------- | --------- |
|     `title`      | 左侧标题文案                                          | string                                        | -         |
| `compTitleStyle` | 左侧标题组件样式                                      | object                                        | `{}`      |
|      `type`      | 数据类型，支持 `''` / `simple` / `boolean`            | string                                        | `''`      |
|     `theme`      | 主题样式，支持 `default` / `chenghua` / `shijingshan` | string                                        | `default` |
|    `showType`    | 展示形式，支持 `radio` / `button`                     | string                                        | `radio`   |
|    `options`     | 单选项列表，支持对象数组或基础值数组                  | RadioItem[] / string[] / number[] / boolean[] | `[]`      |
|     `border`     | 是否显示边框                                          | boolean                                       | `false`   |
|      `gap`       | 单选项间距，数字按 `px` 处理                          | string / number                               | -         |
|      `size`      | 单选尺寸，支持顶层传入和全局默认配置                  | `''` / `large` / `default` / `small`          | `''`      |
|     `value`      | 选项值字段名                                          | string / number / boolean                     | `value`   |
|     `label`      | 选项展示字段名                                        | string / number / boolean                     | `label`   |
|  `customLabel`   | 自定义显示内容，参数为 `{ option, index, value }`     | `(context) => any`                            | -         |
| `customDisabled` | 自定义禁用，参数为 `{ option, index, value }`         | `(context) => boolean`                        | -         |

### 说明

- 组件底层基于 `el-radio-group` 封装，支持透传原生属性和事件。
- `options` 可以传 `{ label, value }` 对象数组，也可以直接传 string / number / boolean 基础值数组，基础值会自动转换为 `{ label, value }`。
- `type="boolean"` 时会自动生成 `true / false` 两个选项。
- `showType="button"` 时，option 的 `color` 可以覆盖当前项的选中背景色，其余样式保持 button 模式不变。
- 显式设置 `gap` 后，组件会清除选项的默认外边距并允许自动换行；未设置时保留 Element Plus 的默认间距。
- option 的 `type` 会同时设置选中、hover、边框和文字颜色，并使用当前 `theme` 对应的语义色；同时传入 `color` 时，`color` 优先覆盖选中主色。
- `options` 支持直接传入 computed；模板会自动解包，computed 内可以读取外部 `ref` 动态生成 label。
- option 的 `class` 和 `style` 会应用到对应的 Radio item；在 scoped 样式中可以配合 `:deep()` 修改内部按钮。
- 显式传入的 option `color`、`class`、`style` 优先于 `chenghua`、`shijingshan` 的默认主题样式。
- `customLabel` 可读取外部 `ref`，动态生成每个选项的显示内容。
- `customDisabled` 中的 `option` 是标准化后的当前选项，`index` 是选项下标，`value` 是按 `value` 属性解析后的实际值。
