# Menu 菜单组件

[Element Plus Menu Documentation](https://element-plus.org/zh-CN/component/menu.html)

## Hidden Title {.md-hidden}

<DocBasicUsage code='<SMenu v-model="active" :header="header" :options="menus" />' />

## 属性事件插槽简介

<ApiIntro />

### 基础用法（`defaultOpenAll` 默认值 `true`）

:::demo 传入 `header` 的 `icon / title / subtitle` 即可显示内置头部样式；示例使用 `computed` 配置头尾点击回调和样式，折叠后悬浮头部可见自定义内容；同时支持任意层级递归菜单、路由跳转和图标，并默认展开全部父级。基础写法：`<SMenu v-model="active" :header="header" :footer="footer" :options="menus" />`。属性：`header` 类型 `SMenuHeaderConfig`，默认值 `undefined`；`options` 类型 `SMenuItem[]`，默认值 `[]`；`router` 可选值 `true / false`，默认值 `true`；`defaultOpenAll` 可选值 `true / false`，默认值 `true`；`width` 类型 `string / number`，默认值 `256`；`height` 类型 `string / number`，默认值 `100%`。
menu/base
:::

### 浅色分组菜单（`variant` 默认值 `dark`）

:::demo `variant="light"` 为白色背景，任意 `theme` 都保持浅色外观。基础写法：`<SMenu variant="light" :options="menus" :header="header" :action-config="actionConfig" :footer="footer" />`。属性：`variant` 可选值 `dark / light`，默认值 `dark`；`header / actionConfig / footer` 默认值均为 `undefined`；菜单项 `type` 可选值 `item / group`，默认值 `item`；`tag / tagColor / suffixIcon / detail` 默认值均为 `undefined`。
menu/light
:::

### 主题与明暗外观（`theme` 默认值 `default`，`variant` 默认值 `dark`）

:::demo 用按钮切换 `theme` 和 `variant`，查看两者的全部组合。`variant="light"` 始终为白色背景，`variant="dark"` 始终为深色背景；`theme` 只切换强调色。基础写法：`<SMenu :theme="theme" :variant="variant" :header="header" :options="menus" />`。属性：`theme` 可选值 `default / chenghua / shijingshan / sybz / gulou`，默认值 `default`；`variant` 可选值 `dark / light`，默认值 `dark`。示例初始值为 `theme="default"`、`variant="light"`。
menu/theme
:::

### 全部展示（`autoHeight` 默认值 `false`）

:::demo 开启后会保持菜单列表容器上下左右 `16px` padding，并根据可用高度等比压缩菜单项高度、间距、图标和字号，不产生组件内部滚动条，适合需要一次看到所有菜单项的场景。基础写法：`<SMenu auto-height height="420px" :options="menus" />`。属性：`autoHeight` 可选值 `true / false`，默认值 `false`；`height` 类型 `string / number`，默认值 `100%`，用于确定自适应的高度边界。
menu/autoHeight
:::

开启后，菜单列表的实际高度与中间可用区域一致，上下左右 padding 均保持 `16px`。空间充足时保持正常行高、字号和图标尺寸，菜单从上往下排列，剩余空间留在底部，不垂直居中；仅在内容放不下时，按当前可见菜单行数压缩行高、字号和图标尺寸。请设置明确的 `height`，或确保父容器具有明确高度；头部与底部仍保留自身高度，需要给菜单内容留出空间。

### API

| 属性名            | 说明                                                   | 类型                | 可选值                                            | 默认值      |
| ----------------- | ------------------------------------------------------ | ------------------- | ------------------------------------------------- | ----------- |
| `modelValue`      | 当前激活菜单的 index/path                              | string              | -                                                 | `''`        |
| `options`         | 菜单配置，children 可循环嵌套                          | `SMenuItem[]`       | -                                                 | `[]`        |
| `fieldNames`      | 自定义数据字段名                                       | `SMenuFieldNames`   | -                                                 | `{}`        |
| `router`          | 点击菜单时启用 Vue Router 跳转                         | boolean             | `true / false`                                    | `true`      |
| `defaultOpenAll`  | 默认展开所有含 children 的菜单                         | boolean             | `true / false`                                    | `true`      |
| `defaultOpeneds`  | 额外指定默认展开项                                     | string[]            | -                                                 | `[]`        |
| `width`           | 菜单宽度，数字按 px 处理                               | string / number     | -                                                 | `256`       |
| `height`          | 菜单高度，数字按 px 处理                               | string / number     | -                                                 | `100%`      |
| `autoHeight`      | 是否保持四边 16px padding 并自适应缩放菜单项           | boolean             | `true / false`                                    | `false`     |
| `backgroundColor` | 深色模式背景色                                         | string              | CSS 颜色                                          | `#1d293b`   |
| `textColor`       | 深色模式文字颜色                                       | string              | CSS 颜色                                          | `#cbd5e1`   |
| `activeTextColor` | 深色模式激活文字颜色                                   | string              | CSS 颜色                                          | `#ffffff`   |
| `collapse`        | 是否折叠菜单                                           | boolean             | `true / false`                                    | `false`     |
| `variant`         | 明暗外观：light 固定白色背景，dark 使用深色背景        | string              | `dark / light`                                    | `dark`      |
| `theme`           | 主题强调色，不改变明暗外观                             | string              | `default / chenghua / shijingshan / sybz / gulou` | `default`   |
| `header`          | 内置头部配置，可传点击回调、class/style 和折叠悬浮文案 | `SMenuHeaderConfig` | -                                                 | `undefined` |
| `headerConfig`    | `header` 的兼容属性，已废弃                            | `SMenuHeaderConfig` | -                                                 | `undefined` |
| `actionConfig`    | 内置主操作按钮配置，支持文字和图标                     | `SMenuActionConfig` | -                                                 | `undefined` |
| `footer`          | 内置底部账号配置，可传点击回调和 class/style           | `SMenuFooterConfig` | -                                                 | `undefined` |

头部、菜单主体和底部区域的四边内边距统一为 `16px`，折叠状态和各主题也保持一致；自定义头尾插槽同样位于该内边距内。`header`、`headerConfig`、`actionConfig`、`footer` 可直接传 Vue `computed`，在模板中会自动解包并随依赖更新。`header` 和 `footer` 配置支持 `handler(event)`、`class`、`style`。折叠后悬浮在内置头部会显示 `title`，可通过 `collapsedTooltip` 自定义。默认值：`handler / class / style / collapsedTooltip` 均为 `undefined`。

`SMenuItem` 默认字段为 `index / path / title / icon / children / disabled / route`。`index` 优先于 `path`；`icon / suffixIcon` 可传 Element Plus 图标名称字符串或 Vue 图标组件。`type="group"` 用于分组标题；`tag / tagColor` 用于菜单标签；`detail` 配置 `tag / title / description` 后，鼠标移入会显示详情卡片。其余 Element Plus Menu 属性和事件会透传。

### 事件

| 事件名              | 说明                                     | 参数                                     |
| ------------------- | ---------------------------------------- | ---------------------------------------- |
| `update:modelValue` | 选择菜单后更新激活值                     | `(index: string)`                        |
| `update:collapse`   | 点击右侧按钮切换菜单折叠状态             | `(collapse: boolean)`                    |
| `select`            | 选择菜单时触发，参数与 Element Plus 一致 | `(index, indexPath, item, routerResult)` |
| `actionClick`       | 点击内置主操作按钮时触发                 | `(event: MouseEvent)`                    |

### 插槽

| 插槽名   | 说明                     |
| -------- | ------------------------ |
| `header` | 菜单顶部品牌或自定义内容 |
| `footer` | 菜单底部操作或自定义内容 |
