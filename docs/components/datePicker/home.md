# datePicker 组件

[Element Plus 日期选择器文档](https://element-plus.org/zh-CN/component/date-picker.html)

## Hidden Title {.md-hidden}

## 属性事件插槽简介

<ApiIntro />

### 基础用法

:::demo `默认 type="date"，value-format="YYYY-MM-DD"，format="YYYY-MM-DD"`
datePicker/base
:::

### 成华主题

:::demo `theme="chenghua" 时启用成华主题样式`
datePicker/chenghua/base
:::

### 日期时间

:::demo `type="datetime" 或 type="datetimerange" 时默认 format 和 value-format 为 YYYY-MM-DD HH:mm:ss`
datePicker/datetime
:::

### 年月周和多选

:::demo `支持 year、years、month、months、week、dates 等 Element Plus DatePicker 类型`
datePicker/types
:::

### 范围选择

:::demo `支持 daterange、datetimerange、monthrange、yearrange`
datePicker/range
:::

### 禁用状态和禁用日期

:::demo `支持 disabled、readonly、disabled-date`
datePicker/disabled
:::

### 快捷选项

:::demo `默认带内置快捷项，可传 shortcuts 覆盖，也可传 shortcuts=false 关闭`
datePicker/shortcuts
:::

### 格式化

:::demo `支持 format 和 value-format`
datePicker/format
:::

### 时间戳

:::demo `value-format="x" 返回毫秒时间戳，value-format="X" 返回秒级时间戳`
datePicker/timestamp
:::

### 默认面板日期和默认时间

:::demo `支持 default-value 和 default-time`
datePicker/defaultValue
:::

### 高度

:::demo `height 默认值为 ''`
datePicker/height
:::

### 标题和组合属性

:::demo `title 默认值为 ''，boxStyle 默认值为 {}`
datePicker/usually
:::

### 控制面板和插槽

:::demo `支持 prefix-icon、default 插槽和 handleOpen 等实例方法`
datePicker/controlled
:::

### 选择 7 天以内的日期

:::demo `通过 disabled-date 和 calendar-change 限制范围`
datePicker/limitRange
:::

### 属性

|        属性名        | 说明                                                         | 类型                         | 可选值                     | 默认值             |
| :------------------: | ------------------------------------------------------------ | ---------------------------- | -------------------------- | ------------------ |
|     `modelValue`     | 绑定值，支持 `v-model`                                       | string / number / Date / array | -                        | `''`               |
|        `type`        | 选择器类型                                                   | string                       | `year` / `years` / `month` / `months` / `date` / `dates` / `week` / `datetime` / `daterange` / `datetimerange` / `monthrange` / `yearrange` | `date`             |
|       `title`        | 左侧标题文案                                                 | string                       | -                          | `''`               |
|       `width`        | 组件整体宽度                                                 | string / number              | -                          | `300px`            |
|       `height`       | 组件整体高度                                                 | string / number              | -                          | `''`               |
|      `boxStyle`      | 标题区域样式                                                 | object                       | -                          | `{}`               |
|       `theme`        | 主题样式                                                     | string                       | `''` / `chenghua`          | `''`               |
|       `format`       | 显示在输入框中的格式                                         | string                       | -                          | 按 `type` 自动设置 |
|    `value-format`    | 绑定值的格式，支持传 `x` 返回毫秒时间戳，传 `X` 返回秒时间戳 | string                       | -                          | 按 `type` 自动设置 |
|    `placeholder`     | 非范围选择时的占位文案                                       | string                       | -                          | `请选择日期`       |
| `start-placeholder`  | 范围选择开始占位文案                                         | string                       | -                          | `开始日期`         |
|  `end-placeholder`   | 范围选择结束占位文案                                         | string                       | -                          | `结束日期`         |
|  `range-separator`   | 范围选择分隔符                                               | string                       | -                          | `-`                |
|     `shortcuts`      | 快捷选项，传 `false` 关闭内置快捷项                          | array / false                | -                          | 内置快捷项         |
|   `default-value`    | 面板打开时默认显示的日期                                     | Date / Date[]                | -                          | -                  |
|    `default-time`    | 范围选择时默认补全的时间                                     | Date / Date[]                | -                          | -                  |
|   `disabled-date`    | 禁用日期判断函数                                             | function                     | `(date: Date) => boolean`  | -                  |
|        `size`        | 输入框尺寸                                                   | string                       | `large` / `default` / `small` | -               |
|     `clearable`      | 是否显示清除按钮                                             | boolean                      | `true` / `false`           | `true`             |
|      `readonly`      | 是否只读                                                     | boolean                      | `true` / `false`           | `false`            |
|      `disabled`      | 是否禁用                                                     | boolean                      | `true` / `false`           | `false`            |
|      `editable`      | 文本框是否可输入                                             | boolean                      | `true` / `false`           | `true`             |
|   `unlink-panels`    | 范围选择时是否取消两个日期面板之间的联动                     | boolean                      | `true` / `false`           | `false`            |
|  `show-week-number`  | 是否显示周数                                                 | boolean                      | `true` / `false`           | `false`            |
|    `prefix-icon`     | 自定义前缀图标                                               | string / Component           | -                          | `''`               |
|     `clear-icon`     | 自定义清除图标                                               | string / Component           | -                          | -                  |
|    `popper-class`    | 下拉面板类名                                                 | string                       | -                          | -                  |
|    `popper-style`    | 下拉面板样式                                                 | string / object / array      | -                          | -                  |

### 事件

|       事件名        | 说明                         | 回调参数 |
| :-----------------: | ---------------------------- | -------- |
| `update:modelValue` | 绑定值变化时触发             | `value`  |
|      `change`       | 用户确认选中值时触发         | `value`  |
|       `focus`       | 输入框聚焦时触发             | `event`  |
|       `blur`        | 输入框失焦时触发             | `event`  |
| `calendar-change`   | 范围选择时，日历选中项变化触发 | `value`  |
|  `visible-change`   | 下拉面板显示或隐藏时触发     | `visible` |

### 方法

|    方法名     | 说明             | 参数 |
| :-----------: | ---------------- | ---- |
|    `focus`    | 聚焦输入框       | -    |
|    `blur`     | 使输入框失焦     | -    |
|  `handleOpen` | 打开日期选择面板 | -    |
| `handleClose` | 关闭日期选择面板 | -    |

### 插槽

|      插槽名       | 说明                   | 参数 |
| :---------------: | ---------------------- | ---- |
|     `default`     | 自定义日期单元格内容   | `cell` |
| `range-separator` | 自定义范围选择分隔内容 | -    |

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
