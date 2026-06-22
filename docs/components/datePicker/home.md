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

|   属性名    | 说明                                | 类型              | 默认值     |
| :---------: | ----------------------------------- | ----------------- | ---------- |
|   `title`   | 左侧标题文案                        | string            | `''`       |
|   `width`   | 组件整体宽度                        | string / number   | `300px`    |
|  `height`   | 组件整体高度                        | string / number   | `''`       |
|   `theme`   | 主题样式                            | `''` / `chenghua` | `''`       |
| `shortcuts` | 快捷选项，传 `false` 关闭内置快捷项 | array / false     | 内置快捷项 |

### 默认行为

- 默认透传给 `el-date-picker`：`type="date"`、`value-format="YYYY-MM-DD"`、`format="YYYY-MM-DD"`。
- `datetime` / `datetimerange` 默认 `format` 和 `value-format` 为 `YYYY-MM-DD HH:mm:ss`。
- `year` / `years` / `yearrange` 默认 `format` 和 `value-format` 为 `YYYY`。
- `month` / `months` / `monthrange` 默认 `format` 和 `value-format` 为 `YYYY-MM`。
- 组件继承 `el-date-picker` 的属性、事件、插槽，并额外支持 `title`、`width`、`height`、`theme`。
