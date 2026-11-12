# title组件

## Hidden Title {.md-hidden}

<DocBasicUsage code='<s-title title="你好"></s-title>' />

## 属性事件插槽简介

<ApiIntro />

### 基础用法

:::demo 展示基础用法。基础写法：`<s-title title="你好"></s-title>`。属性：`title` 类型 `string`，默认值 `''`。
title/base
:::

### 主题（theme 默认值：default）

:::demo
title/theme
:::

### 通常用法

:::demo 展示属性、标题插槽、追加内容和语义化标题。基础写法：`<s-title title="左侧" width="320" my="10" ml="10"></s-title>`。属性：`icon` 类型 `SIconValue`，默认值 `''`，写法与 `s-icon` 的 `icon` 属性一致，设置后自动隐藏左侧竖条；`extra` 类型 `string`，默认值 `''`；`size` 可选 `small / default / large`，默认值 `default`；`width` 类型 `string / number`，默认值 `''`，数字自动按 `px` 处理；`my`、`ml` 类型 `string / number`，默认值未设置，数字自动按 `px` 处理；`gap` 类型 `string / number`，默认值 `''`；`tag` 可选 `div / h1 / h2 / h3 / h4 / h5 / h6`，默认值 `div`；`level` 可选 `1 / 2 / 3 / 4 / 5 / 6`，默认值 `3`。
title/usually
:::

### 标题溢出提示

:::demo 标题文字超出可用宽度时，鼠标移入自动显示完整内容；未超出时不显示。基础写法：`<s-title title="这是一段很长的标题文字" style="width: 220px" />`。属性：`showTooltip` 可选 `true / false`，默认值 `true`；`tooltipAttrs` 类型 `object`，默认值 `{}`。
title/tooltip
:::

### 字号（fs 默认值：undefined）

:::demo 使用 `fs` 设置标题字号，左侧竖线高度也会同步变化；图标和间距默认由 `size` 控制，`iconAttrs.size` 可单独覆盖图标尺寸。基础写法：`<s-title title="自定义标题" fs="40px" />`。属性：`fs` 可选 `small / default / large`、数字或 px 字符串，默认值 `undefined`；三个档位分别为 `14px / 16px / 18px`，数字按 px 处理。`size` 可选 `small / default / large`，默认值 `default`；同时设置时，`fs` 决定标题字号和竖线高度，`size` 决定其余尺寸。
title/fs
:::

### 图标属性（iconAttrs 默认值：{}）

:::demo 通过 `iconAttrs` 直接传递 `s-icon` 属性。基础写法：`<s-title title="自定义图标" icon="mdi:ab-testing" :icon-attrs="{ size: 32, color: '#409eff' }" />`。属性：`iconAttrs` 类型为 `s-icon` 属性对象，默认值 `{}`；示例设置 `icon`、`size`、`color`、`rotate` 和 `cursor`。只传 `iconAttrs.icon` 也会显示图标；它与 `icon` 同时存在时，以 `iconAttrs.icon` 为准。未传入时，图标尺寸沿用标题的 `size`，鼠标指针为 `default`；`icon` 插槽优先于 `iconAttrs`。
title/iconAttrs
:::

### 更多属性（subTitleAttrs.fontSize 默认值：未设置）

:::demo 直接在 `subTitleAttrs` 中设置副标题字号。基础写法：`<s-title title="双向细目表" sub-title="统计说明" :sub-title-attrs="{ fontSize: '30px' }" />`。`fontSize` 支持数字（按 px 处理）或 CSS 长度字符串，默认值未设置，使用组件默认字号；示例可在默认值、`14px`、`20px`、`30px` 之间切换。其他 HTML 属性照常透传，已有的 `style` 写法也可继续使用。
title/other
:::

### 标题右侧追加内容（append 默认值：''）

基础写法：`<s-title title="任务标题" append="草稿" sub-title="任务摘要" />`。`subTitle` 类型为字符串，默认 `''`，固定显示在主标题下方，左侧竖条会随副标题一起撑满整个标题块；`append` 类型为字符串，默认 `''`，显示在主标题右侧，颜色和字号与副标题一致。`appendAttrs` 类型为对象，默认 `{}`，可透传追加内容的 DOM 属性；其中 `fontSize` 接受数字或 CSS 长度，默认未设置，`style` 也可直接传入。复杂内容使用 `#append` 插槽，插槽优先于 `append` 属性，`appendAttrs` 同样作用于插槽容器；`extra` 仍是最右侧操作区。

:::demo 切换追加文本和 `appendAttrs.fontSize`，并对比 `append` 插槽和最右侧 `extra` 插槽。
title/append
:::

### 属性

|     属性名      | 说明                                                                                                                                                          | 类型            | 默认值    |
| :-------------: | ------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------- | --------- |
|     `title`     | 主标题文案                                                                                                                                                    | string          | `''`      |
|     `icon`      | 左侧图标，写法与 `s-icon` 的 `icon` 属性一致，支持 Element Plus、Iconify、CSS class、在线图片、Emoji 和 Vue 图标组件；设置后自动隐藏左侧竖条；`icon` 插槽优先 | SIconValue      | `''`      |
|   `iconAttrs`   | 透传给左侧 `s-icon` 的属性，可设置 `icon`、`size`、`color`、`rotate`、`cursor` 等；插槽图标不受影响                                                           | object          | `{}`      |
|     `extra`     | 右侧操作区文本，`extra` 插槽优先于该属性                                                                                                                      | string          | `''`      |
|    `append`     | 主标题右侧追加文本，样式与副标题一致；同名插槽优先                                                                                                            | string          | `''`      |
|  `appendAttrs`  | 追加内容的 DOM 属性；`fontSize` 支持数字或 CSS 长度，也支持 `style`                                                                                           | object          | `{}`      |
|     `size`      | 尺寸，支持 `small` / `default` / `large`                                                                                                                      | string          | `default` |
|      `fs`       | 标题字号及左侧竖线高度，支持 `small` / `default` / `large`（14 / 16 / 18px）、数字（按 px 处理）或 px 字符串；覆盖 `size` 对两者的设置                        | string / number | -         |
|   `subTitle`    | 副标题文案，固定显示在主标题下方；设置后左侧竖条随副标题一起撑满整个标题块                                                                                    | string          | `''`      |
| `subTitleAttrs` | 副标题额外属性；`fontSize` 可直接设置字号，支持数字或 CSS 长度，默认未设置                                                                                    | object          | `{}`      |
|  `showTooltip`  | 标题溢出时是否显示完整内容提示                                                                                                                                | boolean         | `true`    |
| `tooltipAttrs`  | `s-tooltip` 额外属性                                                                                                                                          | object          | `{}`      |
|     `inner`     | 是否使用内部缩进                                                                                                                                              | boolean         | `false`   |
|      `gap`      | 标题内部间距，控制图标、标题、追加内容、右侧区域间距；图标尺寸变化时自动重新布局                                                                              | string / number | `''`      |
|     `width`     | 组件宽度，数字自动按 px 处理                                                                                                                                  | string / number | `''`      |
|    `height`     | 组件高度                                                                                                                                                      | string / number | `''`      |
|     `type`      | 标题样式类型，支持 `''` / `icon` / `simple` / `form`                                                                                                          | string          | `''`      |
|     `theme`     | 主题样式，支持 `default` / `chenghua` / `shijingshan` / `sybz`                                                                                                | string          | `default` |
|      `tag`      | 标题标签，支持 `div` / `h1` / `h2` / `h3` / `h4` / `h5` / `h6`                                                                                                | string          | `div`     |
|     `level`     | 非原生标题标签的无障碍标题层级，支持 `1` 到 `6`                                                                                                               | number          | `3`       |

外边距使用通用样式属性 `m / mt / mb / ml / mr / mx / my`，内边距使用 `p / pt / pb / pl / pr / px / py`。

### 插槽

|  插槽名   | 说明                                       |
| :-------: | ------------------------------------------ |
|  `title`  | 自定义标题内容，优先级高于 `title` 属性    |
| `default` | 在主标题同行追加状态、标签或其他内容       |
|  `icon`   | 自定义左侧图标，使用后自动隐藏左侧竖条     |
| `append`  | 在主标题右侧追加内容，优先于 `append` 属性 |
|  `extra`  | 自定义右侧操作区，优先级高于 `extra` 属性  |

### 宽高布尔写法

`w` / `width` 裸写或传入 `true` 表示宽度 `100%`；`h` / `height` 裸写或传入 `true` 表示高度 `100%`。传入 `false` 表示不设置该尺寸；也可传数字或 CSS 长度。未传时沿用组件属性表中的默认值。百分比高度需要父容器有明确高度。
