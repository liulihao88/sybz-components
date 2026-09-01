# Item 信息项

## Hidden Title {.md-hidden}

<DocBasicUsage code='<SItem title="发起对话" sub-title="与数字员工直接交流" extra="立即进入" clickable />' />

## 属性事件插槽简介

<ApiIntro />

### 基础用法

:::demo `SItem` 默认显示边框，由前缀、标题、副标题、正文、扩展和操作等语义区域组成，所有区域都可通过插槽替换。基础写法：`<SItem title="发起对话" sub-title="与数字员工直接交流" extra="立即进入" clickable />`。属性：`title / subTitle / extra` 类型 `string / number`，默认值 `undefined`；`clickable` 类型 `boolean`，可选值 `true / false`，默认值 `false`；`border` 类型 `boolean / string`，默认值 `true`。
item/base
:::

### 背景、边框与分割线

:::demo 外观可直接通过属性控制，也可继续使用原生 `class / style`。`background` 和 `hoverBackground` 接收完整的 CSS `background`，支持纯色、`linear-gradient()`、`radial-gradient()` 等背景。基础写法：`<SItem background="linear-gradient(135deg, #eaf4ff, #f3edff)" />`。属性：`background / hoverBackground` 类型 `string`，默认值 `''`；`border` 类型 `boolean / string`，可选值 `true / false / CSS border`，默认值 `true`；`borderRadius` 类型 `string / number`，默认值 `''`；`divider` 类型 `boolean`，可选值 `true / false`，默认值 `false`。
item/appearance
:::

### 多行标题和副标题

:::demo 标题和副标题支持固定行数，也支持自然展开；超出行数时仍会显示完整内容提示。基础写法：`<SItem :sub-title-lines="3" align="start" />`。属性：`titleLines / subTitleLines` 类型 `number`，可选值为 `0` 或正整数，默认值均为 `1`，其中 `0` 表示不限制行数；`align` 可选值 `start / center / end / stretch`，默认值 `center`。
item/multiline
:::

### 扩展区域布局

:::demo `extra` 与 `actions` 可位于标题同行、整高右侧或底部；`styles` 可精确修改每个语义区域。基础写法：`<SItem extra-placement="side" :styles="{ extra: { background: '#eaf4ff' } }" />`。属性：`extraPlacement` 可选值 `header / side / bottom`，默认值 `header`；`extraAlign` 可选值 `start / center / end / stretch`，默认值 `center`；`styles` 类型 `SItemStyles`，默认值 `undefined`。
item/extraPlacement
:::

### 阴影和 Hover 动画

:::demo `width / height / color / hoverAnimation` 由公共 Hook 统一处理，`shadow="hover"` 与 `hover-animation` 均可独立生效。基础写法：`<SItem shadow="hover" hover-animation color="#7c3aed" />`。属性：`shadow` 可选值 `always / never / hover`，默认值 `never`；`color` 类型 `string`，默认值 `''`；`hoverAnimation` 类型 `boolean`，可选值 `true / false`，默认值 `false`；`clickable` 只控制点击交互、键盘可访问性和悬停背景，默认值 `false`。
item/hover
:::

### 成华主题（theme 默认值 `default`）

:::demo 展示成华主题信息项。基础写法：`<SItem theme="chenghua" title="成华企业服务" sub-title="查看企业政策与服务进度" clickable />`。属性：`theme` 可选值 `default / chenghua / shijingshan`，默认值 `default`。
item/chenghua
:::

### 石景山主题（theme 默认值 `default`）

:::demo 展示石景山主题信息项。基础写法：`<SItem theme="shijingshan" title="石景山产业服务" sub-title="查看产业服务与申报进度" clickable />`。属性：`theme` 可选值 `default / chenghua / shijingshan`，默认值 `default`。
item/shijingshan
:::

### API

| 属性名            | 说明                                                     | 类型             | 可选值                               | 默认值      |
| ----------------- | -------------------------------------------------------- | ---------------- | ------------------------------------ | ----------- |
| `title`           | 标题，截断且溢出时鼠标移入显示完整内容                   | string / number  | -                                    | `undefined` |
| `subTitle`        | 副标题，截断且溢出时鼠标移入显示完整内容                 | string / number  | -                                    | `undefined` |
| `extra`           | 扩展区域的简单文本                                       | string / number  | -                                    | `undefined` |
| `src`             | 左侧图片地址                                             | string           | -                                    | `''`        |
| `width`           | 组件宽度，数字按 px 处理                                 | string / number  | -                                    | `''`        |
| `height`          | 组件高度，数字按 px 处理                                 | string / number  | -                                    | `''`        |
| `color`           | 组件文字颜色                                             | string           | 合法 CSS 颜色                        | `''`        |
| `size`            | 预设内边距，也可直接传自定义尺寸                         | string / number  | `small / default / large / CSS 尺寸` | `default`   |
| `padding`         | 内容内边距，优先级高于 `size`                            | string / number  | -                                    | `undefined` |
| `gap`             | 前缀、主内容及标题右侧区域之间的间距                     | string / number  | -                                    | `12`        |
| `contentGap`      | 标题、副标题、正文及操作项之间的间距                     | string / number  | -                                    | `4`         |
| `align`           | 前缀与主内容在交叉轴上的对齐方式                         | string           | `start / center / end / stretch`     | `center`    |
| `background`      | 根节点 CSS 背景，支持纯色、线性渐变和径向渐变            | string           | 合法 CSS `background`                | `''`        |
| `hoverBackground` | 可点击状态的悬停背景；未设置时沿用 `background`          | string           | 合法 CSS `background`                | `''`        |
| `border`          | 显示默认边框或传入完整 CSS border；传 `false` 可关闭边框 | boolean / string | `true / false / CSS border`          | `true`      |
| `borderRadius`    | 圆角，数字按 px 处理                                     | string / number  | -                                    | `''`        |
| `divider`         | 是否显示底部分割线                                       | boolean          | `true / false`                       | `false`     |
| `titleLines`      | 标题最大行数，`0` 表示不限制                             | number           | `0 / 正整数`                         | `1`         |
| `subTitleLines`   | 副标题最大行数，`0` 表示不限制                           | number           | `0 / 正整数`                         | `1`         |
| `extraPlacement`  | `extra / actions` 的布局位置                             | string           | `header / side / bottom`             | `header`    |
| `extraAlign`      | `side` 布局下扩展区域的垂直对齐方式                      | string           | `start / center / end / stretch`     | `center`    |
| `styles`          | 各语义区域的内联样式                                     | `SItemStyles`    | 见“语义样式区域”                     | `undefined` |
| `clickable`       | 是否显示点击交互，并支持 Enter / Space 键盘触发          | boolean          | `true / false`                       | `false`     |
| `disabled`        | 是否禁用点击                                             | boolean          | `true / false`                       | `false`     |
| `theme`           | 主题样式                                                 | string           | `default / chenghua / shijingshan`   | `default`   |
| `shadow`          | 阴影显示时机                                             | string           | `always / never / hover`             | `never`     |
| `hoverAnimation`  | 悬停时是否上移动画                                       | boolean          | `true / false`                       | `false`     |

### 语义样式区域

`styles` 支持 `root / row / main / prefix / content / header / title / subTitle / body / extra / actions`。其中 `root` 的优先级高于同名外观属性；`extra` 在 `side / bottom` 布局下会覆盖完整的独立区域。

### 事件

| 事件名  | 说明                                  | 参数                  |
| ------- | ------------------------------------- | --------------------- |
| `click` | 点击信息项时触发；`disabled` 时不触发 | `(event: MouseEvent)` |

### 插槽

| 插槽名     | 说明                       |
| ---------- | -------------------------- |
| `prefix`   | 左侧图片、图标或头像       |
| `title`    | 自定义标题                 |
| `subTitle` | 自定义副标题               |
| `extra`    | 自定义扩展区域内容         |
| `actions`  | 自定义扩展区域操作         |
| `default`  | 标题和副标题下方的扩展内容 |

### 说明

- `padding` 优先于 `size`；数字会转换成像素值，字符串可传 `12px 20px` 等完整 CSS 内边距。
- `small / default / large` 对应内边距默认值分别为 `8px / 16px / 24px`。
- `extraPlacement="side"` 时，扩展区域是主内容的兄弟节点，因此设置背景或左边框会覆盖完整高度。
- 原生 `class / style` 会继续作用于根节点；复杂定制优先使用 `styles`，避免依赖组件内部 DOM 层级。
