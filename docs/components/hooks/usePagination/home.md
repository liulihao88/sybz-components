# usePagination 分页状态

## Hidden Title {.md-hidden}

### 基础用法

:::demo 基础用法：`const { page, pageSize, total, setPage, setPageSize } = usePagination({ pageSize: 10, total: 86 })`。属性说明：`page` 示例值：`1`，类型：number，默认值：`1`；`pageSize` 示例值：`10`，类型：number，默认值：`10`；`total` 示例值：`86`，类型：number / Ref<number>，默认值：`0`；`pageSizes` 示例值：`[10, 20, 30, 50, 100]`，类型：number[]，默认值：`[10, 20, 30, 50, 100]`；`resetPageOnPageSizeChange` 示例值：`true`，类型：boolean，默认值：`true`。本示例展示 Element Plus 分页联动，可以直接复制基础写法后替换列表请求逻辑。
hooks/usePagination/base
:::

### 说明

`usePagination` 用来统一维护分页参数，适合表格、列表、卡片流等需要分页查询的页面。

### 调用形式

```ts
const pagination = usePagination({
  page: 1,
  pageSize: 10,
  total: 0,
})
```

### 参数说明

| 参数                        | 类型                    | 必填 | 默认值                  | 说明                           |
| --------------------------- | ----------------------- | ---- | ----------------------- | ------------------------------ |
| `page`                      | `number`                | 否   | `1`                     | 当前页。                       |
| `pageSize`                  | `number`                | 否   | `10`                    | 每页数量。                     |
| `total`                     | `number \| Ref<number>` | 否   | `0`                     | 总数量，传 Ref 时会自动同步。  |
| `pageSizes`                 | `number[]`              | 否   | `[10, 20, 30, 50, 100]` | 可选每页数量。                 |
| `resetPageOnPageSizeChange` | `boolean`               | 否   | `true`                  | 修改每页数量时是否回到第一页。 |

### 返回值

| 名称          | 类型                      | 说明                                 |
| ------------- | ------------------------- | ------------------------------------ |
| `page`        | `Ref<number>`             | 当前页。                             |
| `pageSize`    | `Ref<number>`             | 每页数量。                           |
| `total`       | `Ref<number>`             | 总数量。                             |
| `pageSizes`   | `number[]`                | 可选每页数量。                       |
| `pageCount`   | `ComputedRef<number>`     | 总页数，最小为 1。                   |
| `offset`      | `ComputedRef<number>`     | 当前分页偏移量。                     |
| `limit`       | `ComputedRef<number>`     | 当前分页 limit。                     |
| `setPage`     | `(value: number) => void` | 设置当前页，并自动限制在合法范围内。 |
| `setPageSize` | `(value: number) => void` | 设置每页数量。                       |
| `setTotal`    | `(value: number) => void` | 设置总数。                           |
| `resetPage`   | `() => void`              | 回到第一页。                         |
| `reset`       | `() => void`              | 恢复初始页码和初始每页数量。         |
