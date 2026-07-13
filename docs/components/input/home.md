# input输入框组件

[Element Plus 输入框组件文档](https://element-plus.org/zh-CN/component/input.html)

## Hidden Title {.md-hidden}

<DocBasicUsage code='<s-input v-model="name" />' />

## 属性事件插槽简介

<ApiIntro />

### 基础用法

:::demo 展示基础用法。基础写法：`<s-input v-model="name" />`。
input/base
:::

### 成华主题

#### chenghua主题示例

:::demo 展示成华主题样式。基础写法：`<s-input v-model="input" width="320" theme="chenghua" size="large" placeholder="请输入服务名称" />`。
input/chenghua/base
:::

### 石景山主题

#### shijingshan主题示例

:::demo 展示石景山主题样式。基础写法：`<s-input v-model="input" width="320" theme="shijingshan" size="large" placeholder="请输入服务名称" />`。
input/shijingshan/base
:::

### size 尺寸

:::demo 展示尺寸配置。基础写法：`<s-input v-model="input" width="220" size="large" placeholder="large" />`。属性：`size` 可选 `'' / small / default / large`，默认值 `''`。
input/size
:::

### maxlength 最大长度

:::demo 展示maxlength 最大长度配置。基础写法：`<s-input v-model="customValue" width="320" title="自定义 maxlength 和 toast 文案" :maxlength="6" max-length-error-text="最多只能输入 6 个字符" />`。
input/maxlength
:::

### other

:::demo 展示 Element Plus Input 属性透传。基础写法：`<s-input title="密码框" v-model="input" style="width: 240px" type="password" placeholder="Please input password" show-password />`。属性：`type`、`show-password` 等继承 `el-input`。
input/other
:::

### Modifiers

<el-tag>注意</el-tag> : s-input默认设置`trim`为true, 去掉首尾空格. 如果不想要这个设置, 请设置`trim`为false
:::demo 展示Modifiers配置。基础写法：`<s-input v-model.lazy="input" style="width: 240px" placeholder="lazy" />`。
input/modifiers
:::

### 禁用状态

:::demo 展示禁用状态。基础写法：`<s-input v-model="input" style="width: 240px" disabled placeholder="Please input" />`。
input/disabled
:::

### 一键清空

使用 `clearable` 属性即可得到一个可一键清空的输入框，`s-input` 默认值为 `true`。textarea 始终隐藏 Element Plus 原生清除按钮，只显示 `s-input` 自定义清除按钮；设置 `clearable="false"` 后自定义按钮也会隐藏。

:::demo 展示 textarea 一键清空配置。基础写法：`<s-input v-model="textarea" type="textarea" :clearable="false" />`。属性：`clearable` 可选 `true / false`，默认值 `true`。
input/clearable
:::

### 格式化

:::demo 展示格式化配置。基础写法：`<el-input v-model="input" :formatter="formatter" :parser="parser" />`。属性：`formatter`、`parser` 类型 `function`，默认值未设置。
input/formatter
:::

### 通常用法

:::demo 展示通常用法配置。基础写法：`<s-input content="这里主要是为了让其鼠标移入显示文本" v-model="iptValue"></s-input>`。属性：`content` 类型 `string`，默认值 `''`。
input/usually
:::

### 复合型输入框

:::demo 展示复合型输入框配置。基础写法：`<s-input v-model="input1" style="max-width: 600px" placeholder="Please input"></s-input>`。
input/slot
:::

### 封装el-autocomplete的用法

:::demo 展示封装el-autocomplete的用法配置。基础写法：`<s-input v-model="cc" :options="options" width="300"></s-input>`。属性：`options` 类型 `array`，默认值 `[]`；`width` 类型 `string / number`，默认值 `''`。
input/autocomplete
:::

### 属性

|           属性名           | 说明                                              | 类型             | 默认值    |
| :------------------------: | ------------------------------------------------- | ---------------- | --------- |
|        `modelValue`        | 绑定值                                            | any              | -         |
|      `compTitleStyle`      | 标题前缀组件样式                                  | object           | `{}`      |
|          `width`           | 输入框宽度                                        | string / number  | `100%`    |
|          `height`          | 输入框高度                                        | string / number  | `''`      |
|        `maxlength`         | 最大输入长度，超出后截断输入并触发 `$toast` 提示  | string / number  | `10`      |
|    `hideMaxLengthError`    | 是否隐藏超出最大长度时的 `$toast` 提示            | boolean          | `false`   |
|    `maxLengthErrorText`    | 自定义超出最大长度时的 `$toast` 提示文案          | string           | `''`      |
|           `size`           | 输入框尺寸                                        | string           | `''`      |
|          `theme`           | 输入框主题                                        | string           | `default` |
|      `showWordLimit`       | 是否显示字数统计                                  | boolean / string | `''`      |
|          `block`           | 是否按块级宽度展示                                | boolean          | `false`   |
|      `disPlaceholder`      | 禁用态下显示的占位文案                            | string           | `''`      |
|         `subAttrs`         | 外层容器额外属性                                  | object           | `{}`      |
|       `tooltipAttrs`       | tooltip 额外属性                                  | object           | `{}`      |
|        `iconAttrs`         | 右侧提示图标属性                                  | object           | `{}`      |
|       `hideTooltip`        | 是否关闭溢出提示                                  | boolean          | `false`   |
|         `options`          | 自动补全候选项，存在时渲染为 `el-autocomplete`    | array            | -         |
|         `content`          | 右侧说明提示文案                                  | string           | `''`      |
| `dangerouslyUseHTMLString` | 是否将右侧说明提示的 `content` 按 HTML 字符串渲染 | boolean          | `false`   |

### 说明

- 默认基于 `el-input` 二次封装，并透传绝大多数 `el-input` 属性。
- 当传入 `options` 时会切换为 `el-autocomplete` 模式。
