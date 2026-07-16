# 布局组件

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

<DocBasicUsage code='<SObjectLine :objectCount="objectCount" :objectSize="objectSize" class="h-400"></SObjectLine>' />

### 基础用法

:::demo 展示基础用法。基础写法：`<SObjectLine :objectCount="objectCount" :objectSize="objectSize" class="h-400"></SObjectLine>`。
company/objectLine/base
:::

### 简单数据

:::demo 展示简单数据配置。基础写法：`<SObjectLine :objectCount="objectCount" :objectSize="objectSize" class="h-400"></SObjectLine>`。
company/objectLine/simple
:::

### 复杂数据

:::demo 展示复杂数据配置。基础写法：`<SObjectLine :objectCount="objectCount" :objectSize="objectSize" class="h-400 w-1100"></SObjectLine>`。
company/objectLine/hard
:::

### 说明

- 用于按行展示对象型数据，适合详情页或监控信息面板。
