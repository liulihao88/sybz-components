# table组件

[https://element-plus.org/zh-CN/component/table.html](https://element-plus.org/zh-CN/component/table.html)

## Hidden Title {.md-hidden}

<DocBasicUsage code='<s-table :columns="columns" :data="data" :loading="loading"></s-table>' />

## 属性事件插槽简介

<ApiIntro />

### all

:::demo 基础写法：`<el-card shadow="never">...</el-card>`。属性说明：`shadow` 示例值：`never`，类型/可选值/默认值按内部组件或 Element Plus 对应属性；`href` 示例值：`https://element-plus.org/zh-CN/co...`，类型/可选值/默认值按内部组件或 Element Plus 对应属性；`target` 示例值：`_blank`，类型/可选值/默认值按内部组件或 Element Plus 对应属性。本示例展示all配置，可以直接复制基础写法后按业务替换数据。
table/all
:::

### 基础用法

:::demo 基础写法：`<s-table :columns="columns" :data="data" :loading="loading">...</s-table>`。属性说明：`columns` 示例值：`columns`，类型：array，默认值：`[]`；`data` 示例值：`data`，类型：array，默认值：`[]`；`loading` 示例值：`loading`，类型：boolean，默认值：`false`。本示例展示基础渲染和最小配置，可以直接复制基础写法后按业务替换数据。
table/base
:::

### 成华主题

#### chenghua主题示例

:::demo 基础写法：`<s-table theme="chenghua" size="small" :columns="columns" :data="data" :total="36" />`。属性说明：`theme` 示例值：`chenghua`，类型：string，默认值：`''`；`size` 示例值：`small`，类型：string，默认值：`size` prop 或 Element Plus 全局尺寸；`columns` 示例值：`columns`，类型：array，默认值：`[]`；`data` 示例值：`data`，类型：array，默认值：`[]`；`total` 示例值：`36`，类型：number，默认值：`total ?? data.length`。本示例展示成华主题样式，可以直接复制基础写法后按业务替换数据。
table/chenghua/base
:::

### other

:::demo 基础写法：`<s-table :columns="columns" :data="data" v-bind="otherParams" :pageAttrs="{ layout: 'prev, pager, next, jumper', }">...</s-table>`。属性说明：`columns` 示例值：`columns`，类型：array，默认值：`[]`；`data` 示例值：`data`，类型：array，默认值：`[]`；`v-bind` 示例值：`otherParams`，类型/可选值/默认值按内部组件或 Element Plus 对应属性；`pageAttrs` 示例值：`{ layout: 'prev, pager, next, jum...`，类型：object，默认值：`{}`。本示例展示other配置，可以直接复制基础写法后按业务替换数据。
table/other
:::

### 单选

:::demo 基础写法：`<s-table v-model="selectedRow" selection-type="single" :columns="columns" :data="data" :showPage="false" highlight-current-row />`。属性说明：`v-model` 示例值：`selectedRow`，类型由绑定值决定，默认值由绑定变量初始值决定；`selection-type` 示例值：`single`，类型：string，默认值：`''`；`columns` 示例值：`columns`，类型：array，默认值：`[]`；`data` 示例值：`data`，类型：array，默认值：`[]`；`showPage` 示例值：`false`，类型：boolean，默认值：`true`；`highlight-current-row` 示例值：`true`，类型/可选值/默认值按内部组件或 Element Plus 对应属性。本示例展示单选交互。基础单选，点击当前行进行选中。
table/click/basic
:::

:::demo 基础写法：`<s-table v-model="selectedRow" selection-type="single" :columns="columns" :data="data" :showPage="false" row-key="id" highlight-current-row />`。属性说明：`v-model` 示例值：`selectedRow`，类型由绑定值决定，默认值由绑定变量初始值决定；`selection-type` 示例值：`single`，类型：string，默认值：`''`；`columns` 示例值：`columns`，类型：array，默认值：`[]`；`data` 示例值：`data`，类型：array，默认值：`[]`；`showPage` 示例值：`false`，类型：boolean，默认值：`true`；`row-key` 示例值：`id`，类型/可选值/默认值按内部组件或 Element Plus 对应属性；`highlight-current-row` 示例值：`true`，类型/可选值/默认值按内部组件或 Element Plus 对应属性。本示例展示单选交互。通过 `v-model + row-key` 回显单选值。
table/click/echo
:::

### 多选

:::demo 基础写法：`<s-table v-model="selectedRows" selection-type="multiple" :columns="columns" :data="data" :showPage="false" />`。属性说明：`v-model` 示例值：`selectedRows`，类型由绑定值决定，默认值由绑定变量初始值决定；`selection-type` 示例值：`multiple`，类型：string，默认值：`''`；`columns` 示例值：`columns`，类型：array，默认值：`[]`；`data` 示例值：`data`，类型：array，默认值：`[]`；`showPage` 示例值：`false`，类型：boolean，默认值：`true`。本示例展示多选交互。基础多选。
table/select/basic
:::

:::demo 基础写法：`<s-table v-model="selectedRows" selection-type="multiple" :columns="columns" :data="data" :showIndex="false" :showPage="false" row-key="id" />`。属性说明：`v-model` 示例值：`selectedRows`，类型由绑定值决定，默认值由绑定变量初始值决定；`selection-type` 示例值：`multiple`，类型：string，默认值：`''`；`columns` 示例值：`columns`，类型：array，默认值：`[]`；`data` 示例值：`data`，类型：array，默认值：`[]`；`showIndex` 示例值：`false`，类型：boolean，默认值：`true`；`showPage` 示例值：`false`，类型：boolean，默认值：`true`；`row-key` 示例值：`id`，类型/可选值/默认值按内部组件或 Element Plus 对应属性。本示例展示多选交互。通过 `v-model + row-key` 回显多选值。
table/select/echo
:::

:::demo 基础写法：`<s-table v-model="selectedRows" selection-type="multiple" :columns="columns" :data="displayData" :total="fullData.length" :pageSize="pageSize" :pageSizes="[2, 10, 30, 50]" :pageNumber="currentPage" :showIndex="false" row-key="id" @page-change="handlePageChange" />`。属性说明：`v-model` 示例值：`selectedRows`，类型由绑定值决定，默认值由绑定变量初始值决定；`selection-type` 示例值：`multiple`，类型：string，默认值：`''`；`columns` 示例值：`columns`，类型：array，默认值：`[]`；`data` 示例值：`displayData`，类型：array，默认值：`[]`；`total` 示例值：`fullData.length`，类型：number，默认值：`total ?? data.length`；`pageSize` 示例值：`pageSize`，类型：number，默认值：`pageSize` prop，默认 `30`；`pageSizes` 示例值：`[2, 10, 30, 50]`，类型：number[]，默认值：`pageSizes` prop，默认 `[10, 30, 50]`；`pageNumber` 示例值：`currentPage`，类型：number，默认值：`1`。本示例展示多选交互。跨页多选需要传 `row-key`, 默认就是支持跨页多选的。
table/select/crossPage
:::

### 多级表头

:::demo 基础写法：`<s-table :columns="columns" :data="data" :showIndex="false" :showPage="false">...</s-table>`。属性说明：`columns` 示例值：`columns`，类型：array，默认值：`[]`；`data` 示例值：`data`，类型：array，默认值：`[]`；`showIndex` 示例值：`false`，类型：boolean，默认值：`true`；`showPage` 示例值：`false`，类型：boolean，默认值：`true`。本示例展示多级表头配置，可以直接复制基础写法后按业务替换数据。
table/groupHeader
:::

### 隐藏按钮或列 isShow

:::demo 基础写法：`<s-table :columns="columns" :data="data" :showPage="false">...</s-table>`。属性说明：`columns` 示例值：`columns`，类型：array，默认值：`[]`；`data` 示例值：`data`，类型：array，默认值：`[]`；`showPage` 示例值：`false`，类型：boolean，默认值：`true`。本示例展示隐藏按钮或列 isShow配置，可以直接复制基础写法后按业务替换数据。
table/isShow
:::

### 通常用法

:::demo 基础写法：`<s-table :columns="columns" :total="total" :data="data" ref="tableRef">...</s-table>`。属性说明：`columns` 示例值：`columns`，类型：array，默认值：`[]`；`total` 示例值：`total`，类型：number，默认值：`total ?? data.length`；`data` 示例值：`data`，类型：array，默认值：`[]`。本示例展示通常用法配置，可以直接复制基础写法后按业务替换数据。
table/usually
:::

### 编辑

:::demo 基础写法：`<s-table :columns="columns" :data="form.data">...</s-table>`。属性说明：`columns` 示例值：`columns`，类型：array，默认值：`[]`；`data` 示例值：`form.data`，类型：array，默认值：`[]`。本示例展示编辑配置，可以直接复制基础写法后按业务替换数据。
table/edit
:::

### reConfirm再确认

:::demo 基础写法：`<s-table :columns="columns" :data="data">...</s-table>`。属性说明：`columns` 示例值：`columns`，类型：array，默认值：`[]`；`data` 示例值：`data`，类型：array，默认值：`[]`。本示例展示reConfirm再确认配置，可以直接复制基础写法后按业务替换数据。
table/reConfirm
:::

### 表格里嵌套表格

:::demo 基础写法：`<s-table :columns="columns" :preserve-expanded-content="preserveExpanded" :data="data" ref="tableRef">...</s-table>`。属性说明：`columns` 示例值：`columns`，类型：array，默认值：`[]`；`preserve-expanded-content` 示例值：`preserveExpanded`，类型/可选值/默认值按内部组件或 Element Plus 对应属性；`data` 示例值：`data`，类型：array，默认值：`[]`；`size` 示例值：`small`，类型：string，默认值：`size` prop 或 Element Plus 全局尺寸；`showIndex` 示例值：`false`，类型：boolean，默认值：`true`；`showPage` 示例值：`false`，类型：boolean，默认值：`true`；`custom-header-cell-style` 示例值：`{ height: 'unset', }`，类型/可选值/默认值按内部组件或 Element Plus 对应属性。本示例展示表格场景，可以直接复制基础写法后按业务替换数据。
table/wrap
:::

### render生成html

:::demo 基础写法：`<s-table :columns="columns" :data="data" ref="tableRef">...</s-table>`。属性说明：`columns` 示例值：`columns`，类型：array，默认值：`[]`；`data` 示例值：`data`，类型：array，默认值：`[]`。本示例展示render生成html配置，可以直接复制基础写法后按业务替换数据。
table/render
:::

### 改变操作按钮的属性

:::demo 基础写法：`<s-table :columns="columns" :data="data" ref="tableRef">...</s-table>`。属性说明：`columns` 示例值：`columns`，类型：array，默认值：`[]`；`data` 示例值：`data`，类型：array，默认值：`[]`。本示例展示改变操作按钮的属性配置，可以直接复制基础写法后按业务替换数据。
table/operator
:::

### 对比

:::demo 基础写法：`<s-table :columns="columns" :data="data" :show-page="false" />`。属性说明：`columns` 示例值：`columns`，类型：array，默认值：`[]`；`data` 示例值：`data`，类型：array，默认值：`[]`；`show-page` 示例值：`false`，类型：boolean，默认值：`true`。本示例展示对比配置，可以直接复制基础写法后按业务替换数据。
table/compare
:::

### 属性

|      属性名       | 说明                                               | 类型    | 默认值         |
| :---------------: | -------------------------------------------------- | ------- | -------------- |
|      `data`       | 表格数据源                                         | array   | `[]`           |
|     `columns`     | 列配置                                             | array   | `[]`           |
|    `showPage`     | 是否显示分页                                       | boolean | `true`         |
|    `showIndex`    | 是否显示序号列                                     | boolean | `true`         |
|      `size`       | 表格和分页尺寸，支持 `small` / `default` / `large` | string  | `''`           |
|      `theme`      | 主题样式，支持 `chenghua`                          | string  | `''`           |
|    `pageSize`     | 每页条数                                           | number  | `30`           |
|   `pageNumber`    | 当前页码                                           | number  | `1`            |
|    `pageSizes`    | 分页器可选每页条数                                 | array   | `[10, 30, 50]` |
|      `total`      | 总条数，不传时默认取 `data.length`                 | number  | -              |
| `columnEmptyText` | 单元格空值占位文案                                 | string  | `-`            |
|     `loading`     | 表格加载状态                                       | boolean | `false`        |
|   `indexAttrs`    | 序号列透传给 `el-table-column` 的配置              | object  | `{}`           |
|   `modelValue`    | 选中值；单选时为当前行，多选时为选中行数组         | any     | -              |
|  `selectionType`  | 内置选中模式，支持 `single` / `multiple`           | string  | `''`           |
| `selectionAttrs`  | 内置单选列/多选列透传配置                          | object  | `{}`           |
|   `asyncUpdate`   | 是否由外部异步控制分页状态                         | boolean | `false`        |
|    `pageAttrs`    | 分页组件透传配置                                   | object  | `{}`           |

### pageAttrs 内部属性

`pageAttrs` 会透传给内部 `el-pagination`。`s-table` 默认会先设置 `current-page`、`page-size`、`page-sizes`、`layout`、`total`、`size` 等分页属性，再合并 `pageAttrs`；所以 `pageAttrs` 中同名属性会覆盖默认值。分页事件仍统一由 `s-table` 处理并触发 `page-change`。

|        字段名        | 说明                                                                       | 类型               | 默认值                                |
| :------------------: | -------------------------------------------------------------------------- | ------------------ | ------------------------------------- |
|      `pageSize`      | 每页条数；覆盖内部根据 `pageSize` prop 维护的值                            | number             | `pageSize` prop，默认 `30`            |
|  `defaultPageSize`   | 非受控模式下的默认每页条数                                                 | number             | -                                     |
|       `total`        | 总条数；覆盖内部根据 `total` / `data.length` 计算的值                      | number             | `total ?? data.length`                |
|     `pageCount`      | 总页数；设置后 `el-pagination` 可不依赖 `total`                            | number             | -                                     |
|     `pagerCount`     | 页码按钮数量，需要大于 `4` 小于 `22` 的奇数                                | number             | `7`                                   |
|    `currentPage`     | 当前页码；覆盖内部根据 `pageNumber` prop 维护的值                          | number             | `pageNumber` prop，默认 `1`           |
| `defaultCurrentPage` | 非受控模式下的默认当前页码                                                 | number             | -                                     |
|       `layout`       | 分页布局，可包含 `prev`、`pager`、`next`、`jumper`、`sizes`、`total`、`->` | string             | `prev, pager, next, jumper, sizes`    |
|     `pageSizes`      | 每页条数选项；覆盖 `pageSizes` prop                                        | number[]           | `pageSizes` prop，默认 `[10, 30, 50]` |
|    `popperClass`     | 每页条数下拉框的 class                                                     | string             | `''`                                  |
|    `popperStyle`     | 每页条数下拉框样式                                                         | string / object    | -                                     |
|      `prevText`      | 替代上一页图标的文字                                                       | string             | `''`                                  |
|      `prevIcon`      | 上一页图标                                                                 | string / Component | Element Plus 默认图标                 |
|      `nextText`      | 替代下一页图标的文字                                                       | string             | `''`                                  |
|      `nextIcon`      | 下一页图标                                                                 | string / Component | Element Plus 默认图标                 |
|     `teleported`     | 下拉框是否挂载到 body                                                      | boolean            | `true`                                |
|       `small`        | 是否使用小尺寸，Element Plus 已推荐改用 `size`                             | boolean            | `false`                               |
|        `size`        | 分页尺寸，支持 `small` / `default` / `large`                               | string             | `size` prop 或 Element Plus 全局尺寸  |
|     `background`     | 是否为分页按钮添加背景色                                                   | boolean            | `true`                                |
|      `disabled`      | 是否禁用分页                                                               | boolean            | `false`                               |
|  `hideOnSinglePage`  | 只有一页时是否隐藏分页                                                     | boolean            | `false`                               |
|    `appendSizeTo`    | 每页条数下拉框挂载目标                                                     | string             | -                                     |

### 事件

|       事件名        | 说明                      | 回调参数                        |
| :-----------------: | ------------------------- | ------------------------------- |
|    `page-change`    | 页码或每页条数变化时触发  | `({ pageNumber, pageSize })`    |
| `update:modelValue` | 内置单选/多选值变化时触发 | `(selectedRow \| selectedRows)` |

### columns 内部属性

`columns` 每一项都会生成一个 `el-table-column`。`s-table` 会额外处理 `useSlot`、`render`、`filter`、`handler`、`isShow`、`columnEmptyText`、`btns`、`maxBtns` 等字段；其它 `el-table-column` 属性会继续透传。

TypeScript 项目中建议从 `sybz-components/types/table` 引入列配置类型，并给 `computed` 或列数组显式标注行数据类型，这样 `filter: ({ row }) => ...`、`render: ({ row }) => ...` 里的 `row` 才能被推导：

```ts
import type { TableColumnList } from 'sybz-components/types/table'

type TemplateRow = {
  rank: number
  templateName: string
}

const templateTableColumns = computed<TableColumnList<TemplateRow>>(() => [
  { prop: 'rank', label: '序号', width: 64, align: 'center', useSlot: 'rank' },
  { prop: 'templateName', label: '热门文案模版', minWidth: 420, filter: ({ row }) => getTemplateName(row) },
])
```

|        字段名         | 说明                                                                   | 类型                         | 默认值                              |
| :-------------------: | ---------------------------------------------------------------------- | ---------------------------- | ----------------------------------- |
|        `label`        | 列标题                                                                 | string / number              | -                                   |
|        `prop`         | 对应字段名，也是 `useSlot: true` 时的默认插槽名                        | string                       | -                                   |
|      `property`       | `prop` 的别名，透传给 `el-table-column`                                | string                       | -                                   |
|        `type`         | 特殊列类型，支持 `selection` / `index` / `expand` 等 Element Plus 类型 | string                       | -                                   |
|      `className`      | 当前列单元格 class                                                     | string                       | -                                   |
|   `labelClassName`    | 当前列表头 class                                                       | string                       | -                                   |
|        `width`        | 列宽                                                                   | string / number              | -                                   |
|      `minWidth`       | 最小列宽；未设置 `width` 时，`s-table` 会根据标题自动补一个最小宽度    | string / number              | -                                   |
|        `fixed`        | 固定列，`true` 表示固定在左侧，也可传 `left` / `right`                 | string / boolean             | -                                   |
|        `align`        | 单元格对齐方式，支持 `left` / `center` / `right`                       | string                       | -                                   |
|     `headerAlign`     | 表头对齐方式，未设置时跟随 `align`                                     | string                       | -                                   |
|      `sortable`       | 是否可排序；远程排序传 `custom`                                        | boolean / string             | `false`                             |
|     `sortMethod`      | 自定义排序方法，`sortable` 为 `true` 时生效                            | function                     | -                                   |
|       `sortBy`        | 指定排序字段或排序取值函数                                             | string / string[] / function | -                                   |
|     `sortOrders`      | 点击表头时排序顺序                                                     | array                        | `['ascending', 'descending', null]` |
|      `resizable`      | 是否可拖拽调整列宽，表格 `border` 为 `true` 时生效                     | boolean                      | `true`                              |
|      `columnKey`      | 列 key，使用筛选事件时用于标识列                                       | string                       | -                                   |
|    `renderHeader`     | Element Plus 表头渲染函数                                              | function                     | -                                   |
| `showOverflowTooltip` | 内容溢出时是否显示 tooltip                                             | boolean / object             | `true`                              |
|  `tooltipFormatter`   | 溢出 tooltip 内容格式化函数                                            | function                     | -                                   |
|      `formatter`      | Element Plus 单元格格式化函数                                          | function                     | -                                   |
|     `selectable`      | `type="selection"` 时判断某行是否可选                                  | function                     | -                                   |
|  `reserveSelection`   | `type="selection"` 时是否保留选中状态，需要配合 `row-key`              | boolean                      | `false`                             |
|    `filterMethod`     | Element Plus 筛选方法                                                  | function                     | -                                   |
|    `filteredValue`    | 已选中的筛选值                                                         | array                        | -                                   |
|       `filters`       | 筛选选项，每项通常包含 `text` 和 `value`                               | array                        | -                                   |
|   `filterPlacement`   | 筛选下拉框位置                                                         | string                       | -                                   |
|   `filterMultiple`    | 筛选是否支持多选                                                       | boolean                      | `true`                              |
|   `filterClassName`   | 筛选下拉框 class                                                       | string                       | -                                   |
|        `index`        | `type="index"` 时自定义序号                                            | number / function            | -                                   |
|       `useSlot`       | 使用插槽渲染；传 `true` 时插槽名为 `prop`，传字符串时插槽名为该字符串  | boolean / string             | `false`                             |
|       `render`        | `s-table` 自定义渲染函数，接收对象参数                                 | function                     | -                                   |
|       `filter`        | `s-table` 自定义文本处理，支持方法名字符串或对象参数函数               | string / function            | -                                   |
|       `handler`       | 单元格点击事件；存在时单元格内容会带点击样式                           | function                     | -                                   |
|       `isShow`        | 控制列是否显示，支持布尔值或函数                                       | boolean / function           | `true`                              |
|   `columnEmptyText`   | 当前列的空值占位文案，会覆盖全局 `columnEmptyText`                     | string                       | -                                   |
|        `btns`         | 操作栏按钮配置，存在且不为空时该列作为操作列渲染                       | array                        | `[]`                                |
|       `maxBtns`       | 操作栏最多显示的总数量，包含“更多”入口                                 | number / string              | `4`                                 |

### columns.btns 内部属性

`btns` 用于配置操作栏按钮。按钮数量超过 `maxBtns` 时，会展示 `maxBtns - 1` 个按钮，其余按钮放入“更多”下拉中。

|           字段名           | 说明                                                                  | 类型                       | 默认值        |
| :------------------------: | --------------------------------------------------------------------- | -------------------------- | ------------- |
|           `prop`           | 操作按钮关联字段，回调参数中的 `value` 会读取 `row[prop]`             | string                     | -             |
|         `content`          | 按钮文案，支持函数                                                    | string / number / function | -             |
|          `title`           | `reConfirm` 开启时的确认提示文案，支持函数                            | string / number / function | `确定删除吗?` |
| `dangerouslyUseHTMLString` | 是否把确认提示里的字符串按 HTML 渲染，可用于解析 `<code>`             | boolean                    | `true`        |
|         `handler`          | 点击按钮或确认后执行的方法                                            | function                   | -             |
|          `isShow`          | 控制按钮是否显示，支持布尔值或函数                                    | boolean / function         | `true`        |
|         `disabled`         | 控制按钮是否禁用，支持布尔值或函数                                    | boolean / function         | `false`       |
|        `reConfirm`         | 是否点击后先弹出二次确认，支持布尔值或函数                            | boolean / function         | `false`       |
|          `render`          | 自定义按钮渲染函数，接收对象参数                                      | function                   | -             |
|         `useSlot`          | 使用插槽渲染；传 `true` 时插槽名为 `prop`，传字符串时插槽名为该字符串 | boolean / string           | `false`       |
|           `comp`           | 自定义按钮组件，传组件名或组件对象                                    | string / Component         | -             |
|          `attrs`           | 使用 `comp` 时透传给自定义组件的属性                                  | object                     | -             |
|          `width`           | 操作栏宽度计算时使用的按钮宽度                                        | number / string            | -             |
|          其它字段          | 未在上表列出的字段会继续透传给内部 `el-button`                        | any                        | -             |

### render 参数

`render` 统一接收一个对象参数：

```ts
render({ row, scope, value, column, action, index })
```

|  参数名  | 说明                                                               |
| :------: | ------------------------------------------------------------------ |
|  `row`   | 当前行数据                                                         |
| `scope`  | `el-table-column` 默认插槽作用域                                   |
| `value`  | 当前列 `prop` 对应的值；操作按钮未配置 `prop` 时可能为 `undefined` |
| `column` | 当前列配置对象                                                     |
| `action` | 当前操作按钮配置对象，仅操作栏下存在                               |
| `index`  | 当前行索引，对应 `scope.$index`                                    |

### 回调参数

`filter` 支持字符串或函数。传字符串时，会优先读取当前组件实例上的同名方法并用当前单元格 `value` 调用；没有同名方法时读取当前行的同名字段。传函数时只接收一个对象参数，和 `disabled` 用法保持一致。

`filter`、`handler`、`isShow`、`disabled`、`reConfirm`，以及按钮的 `content` / `title` 函数，推荐统一使用对象参数：

```ts
const callback = ({ row, scope, value, column, action, index, event }) => {}
```

- `value` 是当前列或当前按钮 `prop` 对应的值。
- `event` 仅点击相关回调下存在。
- `filter` 不再使用旧的位置参数写法；函数形式固定为一个对象参数，和 `render` 保持一致。

### 说明

- 组件底层基于 `el-table` 和 `el-pagination` 封装，未在上表列出的表格属性可继续通过 attrs 透传。
- 当 `asyncUpdate` 为 `true` 时，分页切换只触发 `page-change` 事件，由外部维护 `pageNumber` 和 `pageSize`。
- 操作栏 `maxBtns` 默认值为 `4`，表示总共最多显示 `4` 个槽位；当按钮数量超出时，会显示 `maxBtns - 1` 个按钮加一个“更多”入口。
- 单选推荐直接用 `v-model + selection-type="single"`；多选推荐直接用 `v-model + selection-type="multiple"`，如果要跨页保留选中项，记得传 `row-key`。
