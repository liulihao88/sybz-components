# dayjs时间处理

## Hidden Title {.md-hidden}

### 基础用法

:::demo
utils/dayjs/base
:::

### 说明

该页面展示项目中基于 `dayjs` 封装的日期工具函数，包含格式化日期、格式化到天或分钟、计算日期差值、把秒数转换成“多久前”文案等能力。

### 函数列表

| 函数                             | 作用                                  |
| -------------------------------- | ------------------------------------- |
| `formatDate(date?, format?)`     | 使用 `dayjs` 把日期格式化为指定格式。 |
| `formatDateToDay(date)`          | 把日期格式化为 `YYYY-MM-DD`。         |
| `formatDateToMinute(date)`       | 把日期格式化为 `YYYY-MM-DD HH:mm`。   |
| `diffDate(date1, date2?, unit?)` | 计算两个日期之间的差值。              |
| `diffDateFromCurrent(second)`    | 把秒数转换成中文相对时间文案。        |

### 参数说明

`formatDate`：

| 参数     | 类型               | 必填 | 默认值                  | 说明                                                               |
| -------- | ------------------ | ---- | ----------------------- | ------------------------------------------------------------------ |
| `date`   | `dayjs.ConfigType` | 否   | `new Date()`            | 要格式化的日期值。支持 `Date`、字符串、时间戳等 `dayjs` 可解析值。 |
| `format` | `string`           | 否   | `'YYYY-MM-DD HH:mm:ss'` | 输出格式，规则同 `dayjs().format()`。                              |

`diffDate`：

| 参数    | 类型               | 必填 | 默认值     | 说明                                               |
| ------- | ------------------ | ---- | ---------- | -------------------------------------------------- |
| `date1` | `dayjs.ConfigType` | 是   | -          | 起始时间。未传时返回 `undefined`。                 |
| `date2` | `dayjs.ConfigType` | 否   | `dayjs()`  | 对比时间。                                         |
| `unit`  | `dayjs` 单位       | 否   | `'second'` | 差值单位，例如 `second`、`minute`、`hour`、`day`。 |

`diffDateFromCurrent`：

| 参数     | 类型     | 必填 | 默认值 | 说明                                                             |
| -------- | -------- | ---- | ------ | ---------------------------------------------------------------- |
| `second` | `number` | 是   | -      | 距离当前时间的秒数。函数会按秒、分钟、小时、天、月、年转换文案。 |

### 返回值

| 函数                                                    | 返回值                                     |
| ------------------------------------------------------- | ------------------------------------------ |
| `formatDate` / `formatDateToDay` / `formatDateToMinute` | 格式化后的日期字符串。                     |
| `diffDate`                                              | 数字差值；`date1` 为空时返回 `undefined`。 |
| `diffDateFromCurrent`                                   | 中文相对时间字符串，例如 `3分钟前`。       |

### 常用场景

```ts
formatDate('2026-04-24 12:30:45')
// '2026-04-24 12:30:45'

formatDateToDay(new Date())
// '2026-06-10'

diffDate('2026-04-24 12:00:00', '2026-04-24 11:59:00')
// 60

diffDate('2026-04-24 12:00:00', '2026-04-24 11:30:00', 'minute')
// 30

diffDateFromCurrent(3600)
// '1小时前'
```

### 注意事项

这些函数依赖 `dayjs` 的解析能力。`diffDate(date1, date2)` 内部计算的是 `dayjs(date1).diff(dayjs(date2), unit)`，所以结果正负取决于两个时间的先后顺序。


:::utils-source formatDate formatDateToDay formatDateToMinute diffDate diffDateFromCurrent
:::
