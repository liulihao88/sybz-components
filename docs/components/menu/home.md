# Menu 菜单组件

[Element Plus Menu Documentation](https://element-plus.org/zh-CN/component/menu.html)

## Hidden Title {.md-hidden}

<DocBasicUsage code='<SMenu v-model="active" :header="header" :options="menus" />' />

## 属性事件插槽简介

<ApiIntro />

### 基础用法（`defaultOpenAll` 默认值 `true`）

:::demo 传入 `header` 的 `icon / title / subtitle` 即可显示内置头部样式；同时支持任意层级递归菜单、路由跳转和图标，并默认展开全部父级。基础写法：`<SMenu v-model="active" :header="header" :options="menus" />`。属性：`header` 类型 `SMenuHeaderConfig`，默认值 `undefined`；`options` 类型 `SMenuItem[]`，默认值 `[]`；`router` 可选值 `true / false`，默认值 `true`；`defaultOpenAll` 可选值 `true / false`，默认值 `true`；`width` 类型 `string / number`，默认值 `256`；`height` 类型 `string / number`，默认值 `100%`。
menu/base
:::

### 浅色分组菜单（`variant` 默认值 `dark`）

:::demo 浅色菜单内置品牌区、主操作按钮和账号区样式，业务只需传配置，无需复制 CSS；同时支持功能菜单、历史记录分组、标签、尾部图标和鼠标移入详情卡片。基础写法：`<SMenu variant="light" :options="menus" :header="header" :action-config="actionConfig" :footer-config="footerConfig" />`。属性：`variant` 可选值 `dark / light`，默认值 `dark`；`header / actionConfig / footerConfig` 默认值均为 `undefined`；菜单项 `type` 可选值 `item / group`，默认值 `item`；`tag / tagColor / suffixIcon / detail` 默认值均为 `undefined`。
menu/light
:::

### API

| 属性名            | 说明                                         | 类型                | 可选值         | 默认值      |
| ----------------- | -------------------------------------------- | ------------------- | -------------- | ----------- |
| `modelValue`      | 当前激活菜单的 index/path                    | string              | -              | `''`        |
| `options`         | 菜单配置，children 可循环嵌套                | `SMenuItem[]`       | -              | `[]`        |
| `fieldNames`      | 自定义数据字段名                             | `SMenuFieldNames`   | -              | `{}`        |
| `router`          | 点击菜单时启用 Vue Router 跳转               | boolean             | `true / false` | `true`      |
| `defaultOpenAll`  | 默认展开所有含 children 的菜单               | boolean             | `true / false` | `true`      |
| `defaultOpeneds`  | 额外指定默认展开项                           | string[]            | -              | `[]`        |
| `width`           | 菜单宽度，数字按 px 处理                     | string / number     | -              | `256`       |
| `height`          | 菜单高度，数字按 px 处理                     | string / number     | -              | `100%`      |
| `backgroundColor` | 背景色                                       | string              | CSS 颜色       | `#1d293b`   |
| `textColor`       | 文字颜色                                     | string              | CSS 颜色       | `#cbd5e1`   |
| `activeTextColor` | 激活文字颜色                                 | string              | CSS 颜色       | `#ffffff`   |
| `collapse`        | 是否折叠菜单                                 | boolean             | `true / false` | `false`     |
| `variant`         | 菜单外观                                     | string              | `dark / light` | `dark`      |
| `header`          | 内置头部配置，传入标题和图标即应用默认样式   | `SMenuHeaderConfig` | -              | `undefined` |
| `headerConfig`    | `header` 的兼容属性，已废弃                  | `SMenuHeaderConfig` | -              | `undefined` |
| `actionConfig`    | 内置主操作按钮配置，支持文字和图标           | `SMenuActionConfig` | -              | `undefined` |
| `footerConfig`    | 内置底部账号配置，支持标题、副标题和头像文字 | `SMenuFooterConfig` | -              | `undefined` |

`SMenuItem` 默认字段为 `index / path / title / icon / children / disabled / route`。`index` 优先于 `path`；`icon / suffixIcon` 可传 Element Plus 图标名称字符串或 Vue 图标组件。`type="group"` 用于分组标题；`tag / tagColor` 用于菜单标签；`detail` 配置 `tag / title / description` 后，鼠标移入会显示详情卡片。其余 Element Plus Menu 属性和事件会透传。

### 事件

| 事件名              | 说明                                     | 参数                                     |
| ------------------- | ---------------------------------------- | ---------------------------------------- |
| `update:modelValue` | 选择菜单后更新激活值                     | `(index: string)`                        |
| `select`            | 选择菜单时触发，参数与 Element Plus 一致 | `(index, indexPath, item, routerResult)` |
| `actionClick`       | 点击内置主操作按钮时触发                 | `(event: MouseEvent)`                    |

### 插槽

| 插槽名   | 说明                     |
| -------- | ------------------------ |
| `header` | 菜单顶部品牌或自定义内容 |
| `footer` | 菜单底部操作或自定义内容 |
