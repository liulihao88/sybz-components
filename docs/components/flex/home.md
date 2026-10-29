# Flex 弹性布局

`s-flex` 是一个轻量级 flex 容器组件，用来快速设置主轴方向、换行、对齐方式、间距，以及组件自身在父级 flex 容器中的伸缩规则。

参考：[Ant Design Vue Flex](https://antdv.com/components/flex-cn) / [MDN flex](https://developer.mozilla.org/zh-CN/docs/Web/CSS/flex)

## Hidden Title {.md-hidden}

<DocBasicUsage code='<s-flex class="h-100"></s-flex>' />

## 属性事件插槽简介

<ApiIntro />

### 基础用法

:::demo 展示基础用法。基础写法：`<s-flex class="h-100"></s-flex>`。该示例不需要额外属性。
flex/base
:::

### 按钮间距（`gap` 默认值：`0px`）

:::demo 设置非零 `gap` 后，按钮间距统一由 `s-flex` 管理，Element Plus 按钮默认的 `margin-left` 不再生效；裸写 `wrap` 等价于 `wrap="wrap"`，裸写 `gap` 等价于 `gap="small"`。基础写法：`<s-flex wrap gap><s-button>按钮</s-button></s-flex>`；水平、垂直间距不同时写 `:gap="[24, 8]"`。属性：`gap` 可选 `true / false / small / default / large / 自定义宽度 / [水平间距, 垂直间距]`，默认值 `0px`，其中裸写或 `true` 等价于 `small`，`false` 等价于 `0px`；`wrap` 可选 `true / false / nowrap / wrap / wrap-reverse`，默认值 `nowrap`，其中 `true` 等价于 `wrap`，`false` 等价于 `nowrap`。
flex/buttonGap
:::

### 常用属性（`direction=row`、`justify=normal`、`align=normal`、`wrap=nowrap`、`gap=0px`）

:::demo 基础写法：`<s-flex direction="column" gap="small">内容</s-flex>`。用交互选项调整排列、对齐、换行与间距，并展示自定义根标签及自身伸缩。`direction` 可选 `row / row-reverse / column / column-reverse`，默认 `row`；`justify` 可选 `start / end / center / space-between / space-around / space-evenly / normal`，默认 `normal`；`align` 可选 `start / end / center / baseline / stretch / normal`，默认 `normal`；`wrap` 可选 `true / false / nowrap / wrap / wrap-reverse`，默认 `nowrap`；`gap` 可选 `true / false / small / default / large / 自定义宽度`，默认 `0px`。
flex/usually
:::

### 容器尺寸

:::demo 设置容器的宽度和高度。基础写法：`<s-flex width="320px" height="120px" align="center" justify="center"></s-flex>`。属性：`width`、`height` 类型均为 `string / number`，支持 CSS 长度值，默认不设置。
flex/size
:::

### 图标间距（gap 默认值：0px）

基础写法：`<s-flex gap="12"><s-icon icon="Edit" /><s-icon icon="Delete" /></s-flex>`。`gap` 支持 `small / default / large`（8 / 16 / 24px）、数字和带单位的长度，默认值为 `0px`；裸写 `gap` 等价于 `gap="small"`。

:::demo 设置非零 gap 后，直接子级 s-icon 的默认相邻间距会被清除，横向和纵向间距统一由 gap 控制。未设置 gap 时保留图标默认的 8px 相邻间距。
flex/iconGap
:::

### 样式简写属性（Style Props）

所有 sybz 组件都通过全局 mixin 自动接受 Mantine 风格的样式简写属性，无需逐个声明，直接以简写作为 prop 传入即可，例如 `m`（margin）、`p`（padding）、`fs`（font-size）、`bg`（background）、`c`（color）、`w` / `h`（宽高）、`bd`（border）、`br`（border-radius）等；长度类属性的数字会自动补全为 `px`。基础写法：`<s-flex gap="small" m="12px" p="16px" bg="#f0f6ff"></s-flex>`。

:::demo 属性：`m / mt / mb / ml / mr / mx / my / p / pt / pb / pl / pr / px / py`（内外边距）、`fs / fw / lh / ta / tt / td / ff / lts`（文字）、`w / h / miw / maw / mih / mah / pos / top / bottom / left / right / inset / z / flex`（尺寸定位与弹性）、`bg / c / opacity / bd / bdr / bdl / bdt / bdb`（背景边框）。长度类属性可选 `数字（自动补 px）/ 带单位长度`。
flex/styleProps
:::

### 其他布局属性（`alignContent=normal`、`inline=false`、`alignSelf=auto`、`order=0`）

:::demo 基础写法：`<s-flex wrap :gap="[12, 8]" align-content="center" inline>内容</s-flex>`。数组中第一个值是水平间距（x），第二个值是垂直间距（y），两项都支持 `true / false / small / default / large / 自定义宽度`；`alignContent` 可选 `normal / start / end / center / stretch / space-between / space-around / space-evenly`，默认 `normal`；`inline` 可选 `true / false`，默认 `false`。子项上可写 `align-self="start"` 与 `:order="-1"`；`alignSelf` 可选 `auto / normal / start / end / center / baseline / stretch / flex-start / flex-end`，默认 `auto`；`order` 为数字，默认 `0`。
flex/other
:::

### API

|     属性名     | 说明                                                                 | 类型                                 | 可选值                                                                                                | 默认值   |
| :------------: | -------------------------------------------------------------------- | ------------------------------------ | ----------------------------------------------------------------------------------------------------- | -------- |
|  `direction`   | 主轴方向，对应 `flex-direction`                                      | string                               | `row` / `row-reverse` / `column` / `column-reverse`                                                   | `row`    |
|     `wrap`     | 是否换行；裸写或传 `true` 等价于 `wrap`，传 `false` 等价于 `nowrap`  | boolean / string                     | `true` / `false` / `nowrap` / `wrap` / `wrap-reverse`                                                 | `nowrap` |
|   `justify`    | 主轴对齐方式，对应 `justify-content`                                 | string                               | `start` / `end` / `center` / `space-between` / `space-around` / `space-evenly` / `normal`             | `normal` |
|    `align`     | 交叉轴对齐方式，对应 `align-items`                                   | string                               | `start` / `end` / `center` / `baseline` / `stretch` / `normal`                                        | `normal` |
| `alignContent` | 多行整体在交叉轴上的对齐方式，对应 `align-content`                   | string                               | `normal` / `start` / `end` / `center` / `stretch` / `space-between` / `space-around` / `space-evenly` | `normal` |
|    `inline`    | 使用 `inline-flex` 展示容器                                          | boolean                              | `true` / `false`                                                                                      | `false`  |
|     `gap`      | 单值同时控制水平和垂直间距；数组按 `[x, y]` 分别控制水平、垂直间距   | boolean / string / number / 二元数组 | 单值或数组项：`true` / `false` / `small` / `default` / `large` / 自定义宽度                           | `0px`    |
|     `flex`     | 当前 `s-flex` 自身在父级 flex 容器中的伸缩规则，对应 CSS `flex` 简写 | string                               | 任意合法 CSS `flex` 值，如 `1`、`0 0 180px`                                                           | `''`     |
|    `width`     | 容器宽度                                                             | string / number                      | 任意可被 `processWidth` 处理的 CSS 长度                                                               | -        |
|    `height`    | 容器高度                                                             | string / number                      | 任意可被 `processWidth` 处理的 CSS 长度                                                               | -        |
|  `component`   | 自定义根节点标签或组件                                               | string / Component                   | 原生标签名或 Vue 组件                                                                                 | `div`    |

### 插槽

|  插槽名   | 说明              |
| :-------: | ----------------- |
| `default` | flex 容器内部内容 |

### 说明

- `justify="normal"` 和 `align="normal"` 时不会输出对应 CSS 属性，由浏览器默认行为决定。
- `alignContent="normal"` 时不输出 `align-content`；多行布局需设置 `wrap` 并给容器留出交叉轴空间。
- `alignSelf` 和 `order` 是子项的通用样式属性，应写在父容器内部的子组件上；`order` 只改变视觉顺序，不改变 DOM 顺序。
- `flex` 控制的是 `s-flex` 自身在父级 flex 容器里的伸缩，不是控制子项。
- `component` 可以传原生标签，例如 `component="section"`，也可以传 Vue 组件对象。

### 宽高布尔写法

`w` / `width` 裸写或传入 `true` 表示宽度 `100%`；`h` / `height` 裸写或传入 `true` 表示高度 `100%`。传入 `false` 表示不设置该尺寸；也可传数字或 CSS 长度。未传时沿用组件属性表中的默认值。百分比高度需要父容器有明确高度。
