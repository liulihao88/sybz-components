# 数量统计柱状图组件(旧)

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

<DocBasicUsage code='<SCountBarOld :data="data" style="height: 300px"></SCountBarOld>' />

### 基础用法

:::demo 展示基础用法。基础写法：`<SCountBarOld :data="data" style="height: 300px"></SCountBarOld>`。属性：`data` 类型 `array`，默认值 `[]`。
company/countBarOld/base
:::

### 说明

- 旧版数量统计柱状图，主要用于兼容历史页面。
