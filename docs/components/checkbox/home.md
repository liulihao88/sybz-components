# checkbox多选框组件

[https://element-plus.org/zh-CN/component/checkbox.html](https://element-plus.org/zh-CN/component/checkbox.html)

## Hidden Title {.md-hidden}

<DocBasicUsage code='<s-checkbox v-model="checkboxValue" :options="options"></s-checkbox>' />

## 属性事件插槽简介

<ApiIntro />

### 基础用法

:::demo 展示基础用法。基础写法：`<s-checkbox v-model="checkboxValue" :options="options"></s-checkbox>`。属性：`options` 类型 `array`，默认值 `[]`。
checkbox/base
:::

### 成华主题

:::demo 展示成华主题样式。基础写法：`<s-checkbox v-model="checkedServices" theme="chenghua" :options="options" gap="18"></s-checkbox>`。
checkbox/chenghua/base
:::

### 石景山主题

:::demo 展示石景山主题样式。基础写法：`<s-checkbox v-model="checkedServices" theme="shijingshan" :options="options" gap="18"></s-checkbox>`。
checkbox/shijingshan/base
:::

### 通常用法

:::demo 展示通常用法配置。基础写法：`<s-checkbox v-model="checkboxValue" :options="options" label="name" value="id"></s-checkbox>`。属性：`options` 类型 `array`，默认值 `[]`；`label` 类型 `string / number`，默认值按组件配置。
checkbox/usually
:::

### disabled

:::demo 展示按钮模式和自定义禁用。基础写法：`<s-checkbox v-model="checkboxValue" :options="options" showType="button" :customDisabled="customDisabled"></s-checkbox>`
checkbox/disabled
:::

### 多属性用法

:::demo 展示按钮模式和自定义禁用。基础写法：`<s-checkbox v-model="checkboxValue" :options="options" showType="button" :customDisabled="customDisabled"></s-checkbox>`
checkbox/usually
:::

### 插槽用法

:::demo 展示插槽内容定制。基础写法：`<s-checkbox v-model="value" :options="options" size="large"></s-checkbox>`。插槽：按示例中的插槽名定制内容。
checkbox/slot
:::

### 自定义间距 gap

:::demo 展示自定义配置。基础写法：`<s-checkbox v-model="value" :options="options" :gap="horizontalGap"></s-checkbox>`。属性：`gap` 类型 `string / number`，默认值按组件配置。
checkbox/customGap
:::

### 属性

|     属性名     | 说明                                               | 类型                                   | 默认值    |
| :------------: | -------------------------------------------------- | -------------------------------------- | --------- |
|      type      | options参数的类型, 可以设置为simple                | string                                 | -         |
|    options     | checkbox的选项                                     | object                                 | {}        |
|    showType    | 显示样式，可选 `check` / `button`                  | string                                 | check     |
|     label      | 显示的文本对应的字段                               | string                                 | label     |
|     value      | 后台的值需要的字段                                 | string                                 | value     |
|    showAll     | 是否显示全选                                       | boolean                                | true      |
|     attrs      | 控制el-checkbox组件的参数                          | object                                 | {}        |
| customDisabled | 自定义禁用，参数为 `{ option, index, value }`      | `(context) => boolean`                 | -         |
|  customLabel   | 自定义 label，参数为 `{ option, index, value }`    | function                               | -         |
|      gap       | 多个复选框之间的水平间距，支持 `processWidth` 写法 | number/string                          | -         |
|     theme      | 主题样式                                           | `default` / `chenghua` / `shijingshan` | `default` |
|      size      | 多选尺寸，支持顶层传入和全局默认配置               | `''` / `large` / `default` / `small`   | `''`      |

### 方法

| 属性名 | 说明                           | 类型     |
| :----: | ------------------------------ | -------- |
| change | 值的改变可以通过change事件监听 | Function |

### Slots插槽

| 插槽名  | 说明             |
| :-----: | ---------------- |
| default | 默认可以使用插槽 |

### 说明

- `gap` 支持 `16`、`'16'`、`'16px'`、`'1rem'`、`'5%'` 这类常见写法；纯数字或数字字符串会自动补成 `px`。
- `customDisabled` 中的 `option` 是当前选项，`index` 是选项下标，`value` 是按 `type` 和 `value` 属性解析后的实际值。
