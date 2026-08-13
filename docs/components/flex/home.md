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

:::demo 设置非零 `gap` 后，按钮间距统一由 `s-flex` 管理，Element Plus 按钮默认的 `margin-left` 不再生效。基础写法：`<s-flex wrap="wrap" gap="small"><s-button>按钮</s-button></s-flex>`。属性：`gap` 可选 `small / default / large / 自定义宽度`，默认值 `0px`；`wrap` 可选 `nowrap / wrap / wrap-reverse`，默认值 `nowrap`。
flex/buttonGap
:::

### 常用属性

:::demo 展示常用属性配置。基础写法：`<s-flex :direction="direction" :justify="justify" :align="align" :wrap="wrap" :gap="gap" class="h-100 w-block"></s-flex>`。属性：`direction` 可选 `row / row-reverse / column / column-reverse`，默认值 `row`；`justify` 可选 `start / end / center / space-between / space-around / space-evenly / normal`，默认值 `normal`。
flex/usually
:::

### 容器尺寸

:::demo 设置容器的宽度和高度。基础写法：`<s-flex width="320px" height="120px" align="center" justify="center"></s-flex>`。属性：`width`、`height` 类型均为 `string / number`，支持 CSS 长度值，默认不设置。
flex/size
:::

### API

|   属性名    | 说明                                                                 | 类型               | 可选值                                                                                    | 默认值   |
| :---------: | -------------------------------------------------------------------- | ------------------ | ----------------------------------------------------------------------------------------- | -------- |
| `direction` | 主轴方向，对应 `flex-direction`                                      | string             | `row` / `row-reverse` / `column` / `column-reverse`                                       | `row`    |
|   `wrap`    | 是否换行，对应 `flex-wrap`                                           | string             | `nowrap` / `wrap` / `wrap-reverse`                                                        | `nowrap` |
|  `justify`  | 主轴对齐方式，对应 `justify-content`                                 | string             | `start` / `end` / `center` / `space-between` / `space-around` / `space-evenly` / `normal` | `normal` |
|   `align`   | 交叉轴对齐方式，对应 `align-items`                                   | string             | `start` / `end` / `center` / `baseline` / `stretch` / `normal`                            | `normal` |
|    `gap`    | 子元素间距，对应 `gap`                                               | string / number    | `small` / `default` / `large` / 任意可被 `processWidth` 处理的宽度                        | `0px`    |
|   `flex`    | 当前 `s-flex` 自身在父级 flex 容器中的伸缩规则，对应 CSS `flex` 简写 | string             | 任意合法 CSS `flex` 值，如 `1`、`0 0 180px`                                               | `''`     |
|   `width`   | 容器宽度                                                             | string / number    | 任意可被 `processWidth` 处理的 CSS 长度                                                   | -        |
|  `height`   | 容器高度                                                             | string / number    | 任意可被 `processWidth` 处理的 CSS 长度                                                   | -        |
| `component` | 自定义根节点标签或组件                                               | string / Component | 原生标签名或 Vue 组件                                                                     | `div`    |

### Gap 预设

|    值     | 转换结果                                             |
| :-------: | ---------------------------------------------------- |
|  `small`  | `8px`                                                |
| `default` | `16px`                                               |
|  `large`  | `24px`                                               |
|  number   | 交给 `processWidth` 处理，通常转成 `px`              |
|  string   | 交给 `processWidth` 处理，例如 `12px`、`1rem`、`50%` |

### 插槽

|  插槽名   | 说明              |
| :-------: | ----------------- |
| `default` | flex 容器内部内容 |

### 说明

- `justify="normal"` 和 `align="normal"` 时不会输出对应 CSS 属性，由浏览器默认行为决定。
- `flex` 控制的是 `s-flex` 自身在父级 flex 容器里的伸缩，不是控制子项。
- `component` 可以传原生标签，例如 `component="section"`，也可以传 Vue 组件对象。
