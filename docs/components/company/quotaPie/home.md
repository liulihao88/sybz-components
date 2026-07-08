# 配额饼图组件

## 使用说明

该组件属于业务图表组件，不随 `sybz-components` 主插件一起注册。使用前需要额外安装 `echarts`、`vue-echarts`，并注册图表插件：

```sh
pnpm add echarts vue-echarts
```

```ts
import SybzChartComponents from 'sybz-components/charts'
import 'sybz-components/charts/style.css'

app.use(SybzChartComponents)
```

## Hidden Title {.md-hidden}

<DocBasicUsage code='<SCard title="租户容量配额" class="w-200" :square="true"></SCard>' />

### 基础用法

:::demo 展示基础用法。基础写法：`<SCard title="租户容量配额" class="w-200" :square="true">...</SCard>`。属性：`title` 类型 `string`，默认值 `''`。
company/quotaPie/base
:::

### 说明

- 用于展示配额类占比信息的饼图或环图。
