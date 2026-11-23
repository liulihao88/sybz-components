# Text 文字

`s-text` 用于三档常用文字色、状态色和文字排版，也提供 `mark` 高亮与 `code` 代码片段两种行内格式。默认渲染 `span`，继承父元素字号；可以通过 `component` 改为语义标签，`code` 开启且未指定根元素时默认渲染 `code`。文字层级和 `type` 使用 sybz 主题 token，CSS 标准颜色名按原色显示；全局设置主题时自动继承，也可用 `theme` 单独覆盖。

默认的 `span` 是行内元素，`mt / mb / pt / pb / p / w / h` 等只在块级元素上生效的样式简写会被浏览器忽略；`s-text` 检测到这类属性时会自动补 `display: inline-block` 让它们生效，不需要再额外传 `component="div"`。

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

:::demo 交互切换同一段文字的渐变、类型、文字层级、根元素、行数、鼠标指针、装饰、选择能力，以及 `mark` 高亮、`code` 代码片段和富文本解析。`cursor` 默认不设置；`<s-text cursor>` 等同于 `cursor="pointer"`，`:cursor="false"` 不设置，也可传 `auto / default / help / not-allowed` 等 CSS 值。`fs / fw / td` 分别设置字号、字重和文字装饰，默认均不设置；`italic / mark / code / unselectable` 默认均为 `false`；`dangerouslyUseHTMLString` 可选 `true / false`，默认 `true`，会解析插槽字符串中的 `<s-tag>`、`<br>` 等白名单标签，以及任意已全局注册的组件标签（如 `<s-button>`、`<el-button>`），设为 `false` 时按纯文本显示。`code` 开启后根元素默认变为 `code`，复用代码片段的等宽字体、边框和底色，`type` 切换 `primary / success / warning / danger / error / info` 语义配色；`mark` 默认黄色高亮底并继承文字色，`c / bg / fs / p / br` 等样式简写优先于默认样式。
text/other
:::

### API

| 属性                       | 可选值                                                                                                                         | 默认值    | 说明                                                                                                                                       |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------------ | --------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| `theme`                    | `default / sybz / chenghua / shijingshan / gulou`                                                                              | `default` | 主题；`gulou` 复用石景山结构                                                                                                               |
| `color` / `c`              | `main / default / secondary / regular / disabled / placeholder / white / black / blue / red / green / yellow`，或任意 CSS 颜色 | 不设置    | 常用文字色；不设置时默认正文色。`c` 优先于 `color`                                                                                         |
| `type`                     | `default / primary / success / warning / danger / error / info`                                                                | `default` | 品牌或状态色；被 `color` / `c` 覆盖                                                                                                        |
| `gradient`                 | CSS 渐变值，如 `linear-gradient(...)` 或 `var(--gradient)`                                                                     | 不设置    | 渐变文字，优先于 `c / color / type`                                                                                                        |
| `component`                | HTML 标签或 Vue 组件                                                                                                           | `span`    | 根元素                                                                                                                                     |
| `lineClamp`                | `0` 或正整数                                                                                                                   | `0`       | 最大行数                                                                                                                                   |
| `italic`                   | boolean                                                                                                                        | `false`   | 斜体                                                                                                                                       |
| `mark`                     | boolean                                                                                                                        | `false`   | 高亮标记；默认黄色底，未设置颜色时继承文字色                                                                                               |
| `code`                     | boolean                                                                                                                        | `false`   | 代码片段；默认根元素变为 `code`，`type` 控制语义配色                                                                                       |
| `unselectable`             | boolean                                                                                                                        | `false`   | 禁止选择                                                                                                                                   |
| `dangerouslyUseHTMLString` | `true / false`                                                                                                                 | `true`    | 默认解析插槽中的白名单 HTML 字符串和任意已全局注册的组件标签（如 `s-text`、`s-tag`、`s-button`、`el-button`）；设为 `false` 时按纯文本输出 |

原生 HTML 属性和事件透传到根元素；默认插槽为文字内容。`fs / fw / td` 等公共属性见 [样式简写属性](../styleProps/home.md)。`s-text` 也可以直接写在 `s-title` 的 `title / append / subTitle` 字符串里，例如 `<s-title title="<s-text type='danger'>你好</s-text>" />`（`dangerouslyUseHTMLString` 默认 `true`）；SafeHtml 会把标签渲染成真实组件，属性按 prop 解析，`c / bg / fs / p` 等样式简写同样生效。`mark` 与富文本里的 `<mark>` 共用同一套高亮样式。

基础写法：`<s-text>{{ html }}</s-text>`。`html` 可以是 `普通文字<br><s-tag type="danger">危险</s-tag><s-button type="primary" size="small">按钮</s-button>`。字符串默认按白名单解析，插槽中已有的 Vue 组件保持原样，字符串里已全局注册的组件也会渲染成真实组件（仅支持静态属性和默认插槽）；设置 `:dangerouslyUseHTMLString="false"` 时，字符串显示为普通文本。请只传入可信内容。

默认的 `span` 是行内元素，纵向 `margin` / `padding` 和宽高会被浏览器忽略；当检测到 `m / my / mt / mb / p / py / pt / pb / w / h / minw / maxw / minh / maxh` 时，会自动把根元素显示方式切换为 `inline-block`（`lineClamp > 0` 时除外），因此无需再传 `component="div"`。如需保持行内显示，可用 `style="display: inline"` 或自定义 class 覆盖。
