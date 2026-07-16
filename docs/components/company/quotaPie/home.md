# 配额饼图组件

## 使用说明

该组件属于业务图表组件，不随 `sybz-components` 主插件一起注册。使用前需要额外安装 `echarts`，并注册图表插件：

::: code-group

```sh [pnpm]
pnpm add echarts
```

```sh [bun]
bun add echarts
```

```sh [npm]
npm install echarts
```

:::

```ts
import SybzChartComponents from 'sybz-components/charts'
import 'sybz-components/charts/style.css'

app.use(SybzChartComponents)
```

## Hidden Title {.md-hidden}

<DocBasicUsage code='<SQuotaPie class="h-300" :used="used" :total="total" />' />

### 基础用法

:::demo 同时展示正常、空值和超额等配额占比。基础写法：`<SQuotaPie class="h-300" :used="used" :total="total" />`。属性：`used` 类型 `string / number`，必填，无默认值；`total` 类型 `string / number`，必填，无默认值；`type` 类型 `string`，默认值 `used`；`text` 类型 `string`，默认值 `总使用量 / 总可用量`。
company/quotaPie/base
:::

### 说明

- 用于展示配额类占比信息的饼图或环图。
