# Text 文字

`s-text` 用于三档常用文字色、状态色和文字排版。默认渲染 `span`，继承父元素字号；可以通过 `component` 改为语义标签。文字层级和 `type` 使用 sybz 主题 token，CSS 标准颜色名按原色显示；全局设置主题时自动继承，也可用 `theme` 单独覆盖。

## Hidden Title {.md-hidden}

<DocBasicUsage code='<s-text>文字内容</s-text>' />

## 属性事件插槽简介

<ApiIntro />

### 基础用法（`color` 默认不设置、`type=default`、`component=span`、`lineClamp=0`）

:::demo 基础写法：`<s-text>正文</s-text>`；`color="main" / "default" / "secondary"` 对应常用的 85 / 65 / 45 三档文字色，未设置时使用 `default`。`fw="600"` 可加粗；`fw` 默认不设置。`type` 可选 `default / primary / success / warning / danger / error / info`，默认 `default`；`component` 默认 `span`，`lineClamp` 默认 `0`。
text/base
:::

### 其他文字属性（`gradient` / `color` / `c` 默认不设置、`type=default`、`lineClamp=0`）

基础写法：`<s-text type="danger" :line-clamp="2">文字</s-text>`；渐变文字可写 `<s-text gradient="linear-gradient(90deg, red, blue)">文字</s-text>`。`gradient` 默认不设置，优先于 `c / color / type`，也支持 `var(--my-gradient)`。`color` 与 `c` 使用同一套常用文字色名称，也接受任意 CSS 颜色；`blue / red / green / yellow / white / black` 是 CSS 标准色，不随主题变化；`type="primary"` 才使用主题主色；`c` 优先于 `color`，`color` 优先于 `type`；`lineClamp=0` 不截断，`1 / 2 / 3` 分别显示最多一、二、三行。`lineClamp=1` 即单行省略。浏览器原生 `title` 可用于显示完整内容。

:::demo 交互切换同一段文字的渐变、类型、文字层级、根元素、行数、鼠标指针、装饰和选择能力。`cursor` 默认不设置；`<s-text cursor>` 等同于 `cursor="pointer"`，`:cursor="false"` 不设置，也可传 `auto / default / help / not-allowed` 等 CSS 值。`fs / fw / td` 分别设置字号、字重和文字装饰，默认均不设置；`italic / mark / unselectable` 默认均为 `false`。
text/other
:::

### API

| 属性           | 可选值                                                                                                                         | 默认值    | 说明                                               |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------ | --------- | -------------------------------------------------- |
| `theme`        | `default / sybz / chenghua / shijingshan / gulou`                                                                              | `default` | 主题；`gulou` 复用石景山结构                       |
| `color` / `c`  | `main / default / secondary / regular / disabled / placeholder / white / black / blue / red / green / yellow`，或任意 CSS 颜色 | 不设置    | 常用文字色；不设置时默认正文色。`c` 优先于 `color` |
| `type`         | `default / primary / success / warning / danger / error / info`                                                                | `default` | 品牌或状态色；被 `color` / `c` 覆盖                |
| `gradient`     | CSS 渐变值，如 `linear-gradient(...)` 或 `var(--gradient)`                                                                     | 不设置    | 渐变文字，优先于 `c / color / type`                |
| `component`    | HTML 标签或 Vue 组件                                                                                                           | `span`    | 根元素                                             |
| `lineClamp`    | `0` 或正整数                                                                                                                   | `0`       | 最大行数                                           |
| `italic`       | boolean                                                                                                                        | `false`   | 斜体                                               |
| `mark`         | boolean                                                                                                                        | `false`   | 高亮背景                                           |
| `unselectable` | boolean                                                                                                                        | `false`   | 禁止选择                                           |

原生 HTML 属性和事件透传到根元素；默认插槽为文字内容。`fs / fw / td` 等公共属性见 [样式简写属性](../styleProps/home.md)。
