# buildTime构建时间组件

用于查看 `sybz-components` 和 `@sybz-components/utils` 当前被解析到的构建时间。

## Hidden Title {.md-hidden}

## 属性事件插槽简介

<ApiIntro />

### 基础用法

:::demo
buildTime/base
:::

### 横向展示

:::demo
buildTime/inline
:::

### 属性

|       属性名       | 说明                         | 类型    | 默认值                   |
| :----------------: | ---------------------------- | ------- | ------------------------ |
|  `componentsLabel` | 组件库构建时间的标签         | string  | `sybz-components`        |
|    `utilsLabel`    | utils 构建时间的标签         | string  | `@sybz-components/utils` |
|    `emptyText`     | 未注入构建时间时的展示文案   | string  | `未注入`                 |
|      `inline`      | 是否横向展示                 | boolean | `false`                  |

### 说明

- `sybz-components` 的时间来自组件库构建时注入的 `__SYBZ_COMPONENTS_BUILD_TIME__`。
- `@sybz-components/utils` 的时间来自 `getUtilsBuildTime()`，用于判断当前项目解析到的 utils 包是否是最近构建的版本。
