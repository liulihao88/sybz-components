# 包裹组件itemWrapper

## Hidden Title {.md-hidden}

## 属性事件插槽简介

<ApiIntro />

### 基础用法

:::demo 基础写法：`<sItemWrapper>...</sItemWrapper>`。属性说明：该示例不需要额外属性，未传属性时使用组件默认值。本示例展示基础渲染和最小配置，可以直接复制基础写法后按业务替换数据。
itemWrapper/base
:::

### 更改间距大小 [gap]

:::demo 基础写法：`<s-item-wrapper gap="12">...</s-item-wrapper>`。属性说明：`gap` 示例值：`12`，类型：string / number，默认值：`16px`。本示例展示更改间距大小 [gap]配置，可以直接复制基础写法后按业务替换数据。
itemWrapper/gap
:::

### 一行显示几个 [columns]

:::demo 基础写法：`<sItemWrapper gap="20px" :columns="3">...</sItemWrapper>`。属性说明：`gap` 示例值：`20px`，类型：string / number，默认值：`16px`；`columns` 示例值：`3`，类型：number，默认值：`null`。本示例展示一行显示几个 [columns]配置，可以直接复制基础写法后按业务替换数据。
itemWrapper/columns
:::

### 显示在一行, 超出滚动

:::demo 基础写法：`<sItemWrapper gap="20px" :minWidth="'200px'">...</sItemWrapper>`。属性说明：`gap` 示例值：`20px`，类型：string / number，默认值：`16px`；`minWidth` 示例值：`'200px'`，类型：string / number，默认值：`0`。本示例展示显示在一行, 超出滚动配置，可以直接复制基础写法后按业务替换数据。
itemWrapper/scroll
:::

### API

|   属性名   | 说明                                           | 类型            | 默认值 |
| :--------: | ---------------------------------------------- | --------------- | ------ |
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
