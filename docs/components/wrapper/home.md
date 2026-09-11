# 包裹组件wrapper

## Hidden Title {.md-hidden}

<DocBasicUsage code='<sWrapper></sWrapper>' />

## 属性事件插槽简介

<ApiIntro />

### 基础用法

:::demo 展示基础用法。基础写法：`<sWrapper></sWrapper>`。该示例不需要额外属性。
wrapper/base
:::

### 更改间距大小 [gap]

:::demo 展示更改间距大小 [gap]配置。基础写法：`<sWrapper gap="12"></sWrapper>`。属性：`gap` 类型 `string / number`，默认值按组件配置。
wrapper/gap
:::

### 一行显示几个 [columns]

:::demo 展示一行显示几个 [columns]配置。基础写法：`<sWrapper gap="20px" :columns="3"></sWrapper>`。属性：`columnsCount` 类型 `number`，默认值 `null`。
wrapper/columns
:::

### 显示在一行, 超出滚动

:::demo 展示显示在一行, 超出滚动配置。基础写法：`<sWrapper gap="20px" :minWidth="'200px'"></sWrapper>`。属性：`gap` 类型 `string / number`，默认值按组件配置；`min-width` 类型 `string / number`，默认值 `0`。
wrapper/scroll
:::

### 容器宽高（width / height 默认值：空字符串）

基础写法：`<s-wrapper width="360" height="120">内容</s-wrapper>`。`width`、`height` 类型为 `string / number`，支持数字、数字字符串、px、rem、百分比等长度，默认值均为 `''`，不设置宽高。

:::demo 数字和数字字符串自动补 px；百分比宽高相对于父容器计算，使用百分比高度时需为父容器设置明确高度。
wrapper/size
:::

### API

|   属性名   | 说明                                           | 类型            | 默认值 |
| :--------: | ---------------------------------------------- | --------------- | ------ |
|  `width`   | 容器宽度，数字自动补 px，支持百分比等长度      | string / number | `''`   |
|  `height`  | 容器高度，百分比需要父容器具有明确高度         | string / number | `''`   |
|   `gap`    | 子项之间的间距，内部会经过 `processWidth` 处理 | string / number | `16px` |
| `columns`  | 每行展示的列数；不传时保持横向 flex 布局       | number          | `null` |
| `minWidth` | 子项最小宽度，内部会经过 `processWidth` 处理   | string / number | `0`    |

### 插槽

|  插槽名   | 说明                               |
| :-------: | ---------------------------------- |
| `default` | 需要包裹的 `s-item` 或任意块级内容 |

### 说明

- 用于统一包裹多个 `item` 组件，支持设置间距、列数和滚动布局。
- 设置 `columns` 后会切换为 grid 等分布局；不设置时使用横向 flex，内容超出后可横向滚动。
- `gap` 支持 `16`、`'16'`、`'16px'`、`'5%'` 这类常见写法；纯数字或数字字符串会自动补成 `px`。
- `minWidth` 也支持 `200`、`'200'`、`'200px'`、`'30%'` 这类写法。
