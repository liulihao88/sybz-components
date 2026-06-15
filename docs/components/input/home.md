# input输入框组件

[Element Plus 输入框组件文档](https://element-plus.org/zh-CN/component/input.html)

## Hidden Title {.md-hidden}

## 属性事件插槽简介

<ApiIntro />

### 基础用法

:::demo
input/base
:::

### 成华主题

#### chenghua主题示例

:::demo
input/chenghua/base
:::

### size 尺寸

:::demo
input/size
:::

### maxlength 最大长度

:::demo
input/maxlength
:::

### other

:::demo
input/other
:::

### Modifiers

<el-tag>注意</el-tag> : s-input默认设置`trim`为true, 去掉首尾空格. 如果不想要这个设置, 请设置`trim`为false
:::demo
input/modifiers
:::

### 禁用状态

:::demo
input/disabled
:::

### 一键清空

使用`clearable`属性即可得到一个可一键清空的输入框, `s-input`默认clearable是`true`的.

:::demo
input/clearable
:::

### 格式化

:::demo
input/formatter
:::

### 通常用法

:::demo
input/usually
:::

### 复合型输入框

:::demo
input/slot
:::

### 封装el-autocomplete的用法

:::demo
input/autocomplete
:::

### 属性

|             属性名              | 说明                                                  | 类型             | 默认值  |
| :-----------------------------: | ----------------------------------------------------- | ---------------- | ------- |
|          `modelValue`           | 绑定值                                                | any              | -       |
|           `boxStyle`            | 标题前缀区域样式                                      | object           | `{}`    |
|             `width`             | 输入框宽度                                            | string / number  | `100%`  |
|            `height`             | 输入框高度                                            | string / number  | `''`    |
|           `maxlength`           | 最大输入长度，超出后截断输入并触发 `$toast` 提示      | string / number  | `10`    |
|      `hideMaxLengthError`       | 是否隐藏超出最大长度时的 `$toast` 提示                | boolean          | `false` |
|      `maxLengthErrorText`       | 自定义超出最大长度时的 `$toast` 提示文案              | string           | `''`    |
|             `size`              | 输入框尺寸                                            | string           | `''`    |
|            `theme`              | 输入框主题                                            | string           | `''`    |
|         `showWordLimit`         | 是否显示字数统计                                      | boolean / string | `''`    |
|             `block`             | 是否按块级宽度展示                                    | boolean          | `false` |
|        `disPlaceholder`         | 禁用态下显示的占位文案                                | string           | `''`    |
|           `subAttrs`            | 外层容器额外属性                                      | object           | `{}`    |
|         `tooltipAttrs`          | tooltip 额外属性                                      | object           | `{}`    |
|           `iconAttrs`           | 右侧提示图标属性                                      | object           | `{}`    |
|          `hideTooltip`          | 是否关闭溢出提示                                      | boolean          | `false` |
|            `options`            | 自动补全候选项，存在时渲染为 `el-autocomplete`        | array            | -       |
|            `content`            | 右侧说明提示文案                                      | string           | `''`    |
| `dangerouslyUseHTMLString`      | 是否将右侧说明提示的 `content` 按 HTML 字符串渲染     | boolean          | `false` |

### 说明

- 默认基于 `el-input` 二次封装，并透传绝大多数 `el-input` 属性。
- 当传入 `options` 时会切换为 `el-autocomplete` 模式。
