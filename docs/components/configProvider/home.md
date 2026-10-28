# Config Provider 局部配置

`s-config-provider` 以与 [Element Plus Config Provider](https://element-plus.org/zh-CN/component/config-provider) 相同的用法为子树提供语言、尺寸、层级、命名空间以及按钮、弹窗、消息等配置。它同时把 `theme`、`size`、`clearable`、`disabled` 和组件名配置作为 `s-*` 组件的局部默认值；子级显式传入的属性优先，嵌套 Provider 可以覆盖父级配置。`clearable` 仅作用于支持清空的组件（如 `s-input`、`s-select`、`s-date-picker`）；`s-input-number` 不支持清空按钮。

Provider 自身支持 `useStyleProps` 样式简写（如 `p`、`m`、`bg`、`w`），样式作用于包裹子树的容器，不会作为子组件的默认样式传播。基础写法：`<s-config-provider p="small" bg="var(--el-fill-color-light)">...</s-config-provider>`。

## Hidden Title {.md-hidden}

<DocBasicUsage code='<s-config-provider size="small"><s-button>按钮</s-button></s-config-provider>' />

## 属性事件插槽简介

<ApiIntro />

### 基础用法（`size` 默认 `default`）

:::demo 基础写法：`<s-config-provider :clearable="false" :disabled="true"><s-input /></s-config-provider>`。在 Provider 内统一设置子组件默认属性。`size` 可选 `small / default / large`，默认 `default`；`clearable`、`disabled` 可选 `true / false`，默认继承父级或组件自身默认值。
configProvider/base
:::

### 成华主题（`theme` 默认 `default`）

:::demo 基础写法：`<s-config-provider theme="chenghua"><s-button>按钮</s-button></s-config-provider>`。`theme` 可选值与组件库主题一致，默认 `default`，仅作用于后代 `s-*` 组件。
configProvider/theme
:::

### 其他配置

:::demo 基础写法：`<s-config-provider p="small" :button="{ plain: true }"><s-button>按钮</s-button></s-config-provider>`。`button`、`table` 等对象属性提供对应组件默认值；`p` 等样式简写作用于 Provider 容器。示例展示 `locale` 的 `zh-cn / en`、`size` 和 `p` 的 `small / default / large`（`p` 默认不设置）、`clearable` 和 `disabled` 的 `true / false`、`button.plain` 的 `true / false`、`table.showPage` 的 `true / false`，以及嵌套覆盖。
configProvider/other
:::

### 属性

| 属性                                        | 说明                                          | 类型                                                   | 默认值                |
| ------------------------------------------- | --------------------------------------------- | ------------------------------------------------------ | --------------------- |
| `locale`                                    | Element Plus 语言包                           | `Language`                                             | Element Plus 默认语言 |
| `size`                                      | Element Plus 与 sybz 子组件的尺寸             | `small / default / large`                              | `default`             |
| `zIndex`                                    | Element Plus 初始层级                         | `number`                                               | 未设置                |
| `namespace`                                 | Element Plus 样式命名空间                     | `string`                                               | `el`                  |
| `a11y` / `keyboardNavigation`               | Element Plus 无障碍与键盘导航设置             | `boolean`                                              | `true`                |
| `button` / `card` / `dialog`                | Element Plus 与同名 sybz 子组件的默认配置     | `object`                                               | 继承父级              |
| `link` / `message` / `experimentalFeatures` | Element Plus 对应功能配置                     | `object`                                               | 继承父级              |
| `emptyValues` / `valueOnClear`              | Element Plus 输入类组件的空值与清空值         | `array` / `string` / `number` / `boolean` / `Function` | Element Plus 默认值   |
| `theme`                                     | sybz 子组件的主题                             | `SybzComponentTheme`                                   | 继承父级或组件默认值  |
| `clearable`                                 | 支持清空的 sybz 子组件是否显示清空按钮        | `boolean`                                              | 继承父级或组件默认值  |
| `disabled`                                  | sybz 子组件是否禁用                           | `boolean`                                              | 继承父级或组件默认值  |
| `p` / `m` / `bg` 等                         | Provider 容器的样式简写，参见 `useStyleProps` | `string` / `number`                                    | 不设置                |
| `table` / `select` / `input` 等             | 同名 sybz 子组件的默认配置                    | `object`                                               | 继承父级              |

`s-config-provider` 的默认插槽会暴露 `config`，与 `el-config-provider` 一致。其他 Element Plus 属性按当前安装版本的 [官方 API](https://element-plus.org/zh-CN/component/config-provider) 使用。`table` 在本组件库内作用于 `s-table`；底层 Element Plus 2.13.0 尚不支持该 Provider 属性。
