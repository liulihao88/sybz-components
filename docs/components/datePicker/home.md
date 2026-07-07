# datePicker 组件

[Element Plus 日期选择器文档](https://element-plus.org/zh-CN/component/date-picker.html)

## Hidden Title {.md-hidden}

<DocBasicUsage code='<s-date-picker v-model="dateValue"></s-date-picker>' />

## 属性事件插槽简介

<ApiIntro />

### 基础用法

:::demo 展示基础用法。基础写法：`<s-date-picker v-model="dateValue">...</s-date-picker>`。
datePicker/base
:::

### 成华主题

:::demo 展示成华主题样式。基础写法：`<s-date-picker v-model="rangeValue" theme="chenghua" type="daterange" title="审核周期" width="520" height="40" :compTitleStyle="{ width: 84 }">...</s-date-picker>`。属性：`theme` 可选 `default / chenghua / shijingshan`，默认值 `default`。
datePicker/chenghua/base
:::

### 日期时间

:::demo 展示日期时间配置。基础写法：`<s-date-picker v-model="datetimeValue" type="datetime" width="360" placeholder="选择日期时间">...</s-date-picker>`。属性：`type` 可选 `date / datetime / daterange / datetimerange` 等日期选择类型，默认值 `date`。
datePicker/datetime
:::

### 年月周和多选

:::demo 展示年月周和多选类型。基础写法：`<s-date-picker v-model="yearValue" type="year" placeholder="选择年份">...</s-date-picker>`。属性：`type` 可选 `year / years / month / months / week / dates` 等类型，默认值 `date`。
datePicker/types
:::

### 范围选择

:::demo 展示范围选择。基础写法：`<s-date-picker v-model="dateRange" type="daterange" width="520" start-placeholder="开始日期" end-placeholder="结束日期">...</s-date-picker>`。属性：`type` 可选 `daterange / datetimerange / monthrange / yearrange`，默认值 `date`。
datePicker/range
:::

### 禁用状态和禁用日期

:::demo 展示禁用状态和禁用日期。基础写法：`<s-date-picker v-model="beforeDateValue" type="datetime" value-format="x" width="360" placeholder="仅可选择当前时间之前" :disabled-date="disabledAfterToday">...</s-date-picker>`。属性：`disabled-date` 类型 `function`，默认值未设置。
datePicker/disabled
:::

### 快捷选项

:::demo 展示快捷选项配置。基础写法：`<s-date-picker v-model="dateValue" :shortcuts="shortcuts" placeholder="自定义快捷项">...</s-date-picker>`。属性：`shortcuts` 类型 `array / false`，默认值为内置快捷项。
datePicker/shortcuts
:::

### 格式化

:::demo 展示格式化配置。基础写法：`<s-date-picker v-model="dateValue" format="YYYY/MM/DD" value-format="YYYY/MM/DD">...</s-date-picker>`。属性：`format`、`value-format` 类型 `string`，默认值按 `type` 自动设置。
datePicker/format
:::

### 时间戳

:::demo 展示时间戳配置。基础写法：`<s-date-picker v-model="millisecondValue" type="datetime" value-format="x" width="360" placeholder="毫秒时间戳">...</s-date-picker>`。属性：`value-format` 可选 `x / X / 日期格式字符串`，默认值按 `type` 自动设置。
datePicker/timestamp
:::

### 默认面板日期和默认时间

:::demo 展示默认面板日期和默认时间配置。基础写法：`<s-date-picker v-model="dateValue" :default-value="defaultValue">...</s-date-picker>`。属性：`default-value` 类型 `Date / Date[]`，默认值未设置；`default-time` 类型 `Date / Date[]`，默认值未设置。
datePicker/defaultValue
:::

### 高度

:::demo 展示高度配置。基础写法：`<s-date-picker v-model="rangeValue" title="时间范围" type="daterange" width="520" height="40" :compTitleStyle="{ width: 84 }">...</s-date-picker>`。属性：`height` 类型 `string / number`，默认值 `''`。
datePicker/height
:::

### 标题和组合属性

:::demo 展示标题和组合属性配置。基础写法：`<s-date-picker v-model="rangeValue" title="选择日期" type="daterange" width="560" start-placeholder="开始" end-placeholder="结束" range-separator="///" :compTitleStyle="{ width: 84 }">...</s-date-picker>`。属性：`title` 类型 `string`，默认值 `''`；`compTitleStyle` 类型 `object`，默认值 `{}`。
datePicker/usually
:::

### 控制面板和插槽

:::demo 展示插槽内容定制。基础写法：`<s-date-picker ref="datePickerRef" v-model="dateValue" :prefix-icon="Clock">...</s-date-picker>`。插槽：按示例中的插槽名定制内容。
datePicker/controlled
:::

### 选择 7 天以内的日期

:::demo 展示选择 7 天以内的日期配置。基础写法：`<s-date-picker v-model="dateRange" type="daterange" width="520" format="YYYY-MM-DD" value-format="YYYY-MM-DD" :disabled-date="disabledDate" @calendar-change="calendarChange">...</s-date-picker>`。属性：`disabled-date` 类型 `function`，默认值未设置；`calendar-change` 为日期面板变化事件。
datePicker/limitRange
:::

### 属性

|       属性名        | 说明                                                         | 类型                           | 可选值                                                                                                                                      | 默认值             |
| :-----------------: | ------------------------------------------------------------ | ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------- | ------------------ |
|    `modelValue`     | 绑定值，支持 `v-model`                                       | string / number / Date / array | -                                                                                                                                           | `''`               |
|       `type`        | 选择器类型                                                   | string                         | `year` / `years` / `month` / `months` / `date` / `dates` / `week` / `datetime` / `daterange` / `datetimerange` / `monthrange` / `yearrange` | `date`             |
|       `title`       | 左侧标题文案                                                 | string                         | -                                                                                                                                           | `''`               |
|       `width`       | 组件整体宽度                                                 | string / number                | -                                                                                                                                           | `300px`            |
|      `height`       | 组件整体高度                                                 | string / number                | -                                                                                                                                           | `''`               |
|  `compTitleStyle`   | 左侧标题组件样式                                             | object                         | -                                                                                                                                           | `{}`               |
|       `theme`       | 主题样式                                                     | string                         | `default` / `chenghua` / `shijingshan`                                                                                                      | `default`          |
|      `format`       | 显示在输入框中的格式                                         | string                         | -                                                                                                                                           | 按 `type` 自动设置 |
|   `value-format`    | 绑定值的格式，支持传 `x` 返回毫秒时间戳，传 `X` 返回秒时间戳 | string                         | -                                                                                                                                           | 按 `type` 自动设置 |
|    `placeholder`    | 非范围选择时的占位文案                                       | string                         | -                                                                                                                                           | `请选择日期`       |
| `start-placeholder` | 范围选择开始占位文案                                         | string                         | -                                                                                                                                           | `开始日期`         |
|  `end-placeholder`  | 范围选择结束占位文案                                         | string                         | -                                                                                                                                           | `结束日期`         |
|  `range-separator`  | 范围选择分隔符                                               | string                         | -                                                                                                                                           | `-`                |
|     `shortcuts`     | 快捷选项，传 `false` 关闭内置快捷项                          | array / false                  | -                                                                                                                                           | 内置快捷项         |
|   `default-value`   | 面板打开时默认显示的日期                                     | Date / Date[]                  | -                                                                                                                                           | -                  |
|   `default-time`    | 范围选择时默认补全的时间                                     | Date / Date[]                  | -                                                                                                                                           | -                  |
|   `disabled-date`   | 禁用日期判断函数                                             | function                       | `(date: Date) => boolean`                                                                                                                   | -                  |
|       `size`        | 输入框尺寸，支持顶层传入和全局默认配置                       | string                         | `large` / `default` / `small`                                                                                                               | `''`               |
|     `clearable`     | 是否显示清除按钮                                             | boolean                        | `true` / `false`                                                                                                                            | `true`             |
|     `readonly`      | 是否只读                                                     | boolean                        | `true` / `false`                                                                                                                            | `false`            |
|     `disabled`      | 是否禁用                                                     | boolean                        | `true` / `false`                                                                                                                            | `false`            |
|     `editable`      | 文本框是否可输入                                             | boolean                        | `true` / `false`                                                                                                                            | `true`             |
|   `unlink-panels`   | 范围选择时是否取消两个日期面板之间的联动                     | boolean                        | `true` / `false`                                                                                                                            | `false`            |
| `show-week-number`  | 是否显示周数                                                 | boolean                        | `true` / `false`                                                                                                                            | `false`            |
|    `prefix-icon`    | 自定义前缀图标                                               | string / Component             | -                                                                                                                                           | `''`               |
|    `clear-icon`     | 自定义清除图标                                               | string / Component             | -                                                                                                                                           | -                  |
|   `popper-class`    | 下拉面板类名                                                 | string                         | -                                                                                                                                           | -                  |
|   `popper-style`    | 下拉面板样式                                                 | string / object / array        | -                                                                                                                                           | -                  |

### 事件

|       事件名        | 说明                           | 回调参数  |
| :-----------------: | ------------------------------ | --------- |
| `update:modelValue` | 绑定值变化时触发               | `value`   |
|      `change`       | 用户确认选中值时触发           | `value`   |
|       `focus`       | 输入框聚焦时触发               | `event`   |
|       `blur`        | 输入框失焦时触发               | `event`   |
|  `calendar-change`  | 范围选择时，日历选中项变化触发 | `value`   |
|  `visible-change`   | 下拉面板显示或隐藏时触发       | `visible` |

### 方法

|    方法名     | 说明             | 参数 |
| :-----------: | ---------------- | ---- |
|    `focus`    | 聚焦输入框       | -    |
|    `blur`     | 使输入框失焦     | -    |
| `handleOpen`  | 打开日期选择面板 | -    |
| `handleClose` | 关闭日期选择面板 | -    |

### 插槽

|      插槽名       | 说明                   | 参数   |
| :---------------: | ---------------------- | ------ |
|     `default`     | 自定义日期单元格内容   | `cell` |
| `range-separator` | 自定义范围选择分隔内容 | -      |

### 默认行为

- 默认透传给 `el-date-picker`：`type="date"`、`value-format="YYYY-MM-DD"`、`format="YYYY-MM-DD"`。
- `type` 可选值：`year`、`years`、`month`、`months`、`date`、`dates`、`week`、`datetime`、`daterange`、`datetimerange`、`monthrange`、`yearrange`。
- `datetime` / `datetimerange` 默认 `format` 和 `value-format` 为 `YYYY-MM-DD HH:mm:ss`。
- `year` / `years` / `yearrange` 默认 `format` 和 `value-format` 为 `YYYY`。
- `month` / `months` / `monthrange` 默认 `format` 和 `value-format` 为 `YYYY-MM`。
- 范围快捷项会按自然日边界计算，日期时间范围开始为 `00:00:00.000`，结束为 `23:59:59.999`。
- `daterange` / `datetimerange` 内置快捷项：今天、昨天、最近7天、最近30天、最近90天、最近1年、本周、上周、本月、上月、本季度、上季度、今年、去年。
- `monthrange` 内置快捷项：本月、上月、最近3个月、最近6个月、最近12个月、今年、去年。
- `yearrange` 内置快捷项：今年、去年、最近3年、最近5年、最近10年。
- 组件继承 `el-date-picker` 的属性、事件、插槽，并额外支持 `title`、`width`、`height`、`theme`。
