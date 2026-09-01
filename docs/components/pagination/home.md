# Pagination 分页组件

`s-pagination` 基于 Element Plus Pagination 封装，根据 `total / pageSize` 自动计算总页数，并支持每页条数选择、页码切换、单页隐藏、手动输入回车跳页、主题样式和窄容器横向滚动。

## Hidden Title {.md-hidden}

<DocBasicUsage code='<s-pagination v-model:current-page="page" :total="100" :page-size="10" @change="handleChange" />' />

## 属性事件插槽简介

<ApiIntro />

### 基础用法（currentPage 默认值：1，total 默认值：0，pageSize 默认值：10）

:::demo 展示页码切换和总数，总页数会按照 `Math.ceil(total / pageSize)` 自动计算。基础写法：`<s-pagination v-model:current-page="page" :total="96" :page-size="10" @change="handleChange" />`。属性：`currentPage` 类型 `number`，默认值 `1`；`total` 类型 `number`，默认值 `0`；`pageSize` 类型 `number`，默认值 `10`；`background` 可选值 `true / false`，默认值 `true`。
pagination/base
:::

### 主题（theme 默认值：default）

:::demo 展示成华和石景山主题分页。基础写法：`<s-pagination theme="chenghua" :total="80" :page-size="10" />`。属性：`theme` 可选值 `default / chenghua / shijingshan`，默认值 `default`；`total` 类型 `number`，默认值 `0`；`pageSize` 类型 `number`，默认值 `10`；`currentPage` 类型 `number`，默认值 `1`。
pagination/theme
:::

### 手动输入回车跳页（showJumper 默认值：true）

:::demo 在输入框填写页码并按回车后切换页面，同时触发 `update:currentPage / change / jump`。基础写法：`<s-pagination v-model:current-page="page" :total="200" :page-size="10" @jump="handleJump" />`。属性：`showJumper` 可选值 `true / false`，默认值 `true`；`jumpText` 类型 `string`，默认值 `跳至`；`pageText` 类型 `string`，默认值 `页`；输入值自动限制在 `1` 到自动计算出的总页数之间。
pagination/jumper
:::

### 超宽滚动

:::demo 当分页内容宽度超过容器时自动显示横向滚动，不会撑破外层布局。基础写法：`<s-pagination :total="990" :page-size="10" :pager-count="11" />`。属性：`pagerCount` 类型 `number`，默认值 `7`；`showTotal` 可选值 `true / false`，默认值 `true`；`showJumper` 可选值 `true / false`，默认值 `true`。
pagination/scroll
:::

### 仅显示页码（showTotal、showJumper、showSizes 默认值：true）

:::demo 隐藏“共 X 条”、“X 条/页”和“跳至 X 页”，只保留上一页、页码和下一页。基础写法：`<s-pagination :total="100" :show-total="false" :show-jumper="false" :show-sizes="false" />`。属性：`showTotal`、`showJumper`、`showSizes` 可选值均为 `true / false`，默认值均为 `true`；`total` 类型 `number`，默认值 `0`；`pageSize` 类型 `number`，默认值 `10`。
pagination/simple
:::

### 每页条数（pageSize 默认值：10，pageSizes 默认值：[10, 20, 30, 50]）

:::demo 通过“X 条/页”下拉框切换每页条数，组件会根据 `total / pageSize` 自动重新计算总页数。基础写法：`<s-pagination v-model:page-size="pageSize" :total="85" :page-sizes="[10, 20, 50]" />`。属性：`pageSize` 类型 `number`，默认值 `10`，支持 `v-model:page-size`；`pageSizes` 类型 `number[]`，默认值 `[10, 20, 30, 50]`；`showSizes` 可选值 `true / false`，默认值 `true`。切换后触发 `update:pageSize / size-change`。
pagination/pageSize
:::

### 单页隐藏（hideOnSinglePage 默认值：false）

:::demo 总页数只有一页时，可以通过 `hideOnSinglePage` 控制是否隐藏整个分页器。勾选示例中的复选框即可观察隐藏效果。基础写法：`<s-pagination :total="8" :page-size="10" hide-on-single-page />`。属性：`hideOnSinglePage` 可选值 `true / false`，默认值 `false`；不传时单页分页器正常显示。
pagination/hideOnSinglePage
:::

### 属性

| 属性名             | 说明                                                        | 类型     | 可选值                             | 默认值             |
| ------------------ | ----------------------------------------------------------- | -------- | ---------------------------------- | ------------------ |
| `currentPage`      | 当前页码，支持 `v-model:current-page`                       | number   | `1` 到总页数                       | `1`                |
| `total`            | 数据总条数                                                  | number   | 非负整数                           | `0`                |
| `pageSize`         | 每页条数，总页数按照 `Math.ceil(total / pageSize)` 自动计算 | number   | 正整数                             | `10`               |
| `pageSizes`        | 每页条数选择器的选项                                        | number[] | 正整数数组                         | `[10, 20, 30, 50]` |
| `pagerCount`       | 页码按钮数量                                                | number   | Element Plus 支持的奇数            | `7`                |
| `theme`            | 主题样式                                                    | string   | `default / chenghua / shijingshan` | `default`          |
| `background`       | 是否显示分页按钮背景                                        | boolean  | `true / false`                     | `true`             |
| `disabled`         | 是否禁用分页和跳页输入                                      | boolean  | `true / false`                     | `false`            |
| `showTotal`        | 是否显示总条数                                              | boolean  | `true / false`                     | `true`             |
| `showJumper`       | 是否显示回车跳页输入框                                      | boolean  | `true / false`                     | `true`             |
| `showSizes`        | 是否显示“X 条/页”选择器                                     | boolean  | `true / false`                     | `true`             |
| `hideOnSinglePage` | 只有一页时是否隐藏整个分页器                                | boolean  | `true / false`                     | `false`            |
| `totalText`        | 总条数前缀文字                                              | string   | 任意文本                           | `共`               |
| `jumpText`         | 跳页输入框前缀文字                                          | string   | 任意文本                           | `跳至`             |
| `pageText`         | 跳页输入框后缀文字                                          | string   | 任意文本                           | `页`               |
| `size`             | 分页及输入框尺寸                                            | string   | `small / default / large`          | `default`          |

其他属性会透传给内部 `el-pagination`，但 `pageCount` 由 `total / pageSize` 自动计算；内部布局会根据 `showSizes` 自动加入或移除每页条数选择器，手动跳页由 `s-pagination` 统一提供。

### 事件

| 事件名               | 说明                                      | 回调参数     |
| -------------------- | ----------------------------------------- | ------------ |
| `update:currentPage` | 当前页码更新，用于 `v-model:current-page` | `(page)`     |
| `update:pageSize`    | 每页条数更新，用于 `v-model:page-size`    | `(pageSize)` |
| `change`             | 点击页码、上一页、下一页或回车跳页时触发  | `(page)`     |
| `size-change`        | 每页条数发生变化时触发                    | `(pageSize)` |
| `jump`               | 在手动输入框按回车后触发                  | `(page)`     |
| `prev-click`         | 点击上一页时触发                          | `(page)`     |
| `next-click`         | 点击下一页时触发                          | `(page)`     |
