# 布局组件

## Hidden Title {.md-hidden}

<DocBasicUsage code='<sBasicLayout title="基础用法"></sBasicLayout>' />

## 属性事件插槽简介

<ApiIntro />

### 基础用法

:::demo 展示基础用法。基础写法：`<sBasicLayout title="基础用法">...</sBasicLayout>`。属性：`title` 类型 `string`，默认值 `''`。
basicLayout/base
:::

### 成华主题

:::demo 展示成华主题样式。基础写法：`<s-basic-layout v-model="collapsed" theme="chenghua" title="审核规则管理">...</s-basic-layout>`。属性：`theme` 可选 `default / chenghua / shijingshan`，默认值 `default`。
basicLayout/chenghua/base
:::

### 展开和收缩

:::demo 展示展开和收缩配置。基础写法：`<SBasicLayout :collapsible="true">...</SBasicLayout>`。
basicLayout/callapse
:::

### other

:::demo 展示other配置。基础写法：`<SBasicLayout :size="size">...</SBasicLayout>`。属性：`size` 可选 `'' / small / default / large`，默认值 `''`。
basicLayout/other
:::

### 自适应高度

:::demo 展示高度配置。基础写法：`<SBasicLayout title="不自适应body的高度" class="m-t-16 h-block" :scroll="false">...</SBasicLayout>`。属性：`height` 类型 `string / number`，默认值 `''`。
basicLayout/customLayout
:::

### slot插槽

:::demo 展示插槽内容定制。基础写法：`<SBasicLayout collapsible :boxStyle="{ border: 'none' }">...</SBasicLayout>`。插槽：按示例中的插槽名定制内容。
basicLayout/slot
:::

### body正方形

:::demo 展示body正方形配置。基础写法：`<sBasicLayout title="租户容量配额" class="w-300 h-500">...</sBasicLayout>`。属性：`title` 类型 `string`，默认值 `''`。
basicLayout/square
:::

### API

|          属性名          | 说明                                      | 类型                                   | 默认值    |
| :----------------------: | ----------------------------------------- | -------------------------------------- | --------- |
| `v-model` / `modelValue` | 折叠状态，`true` 表示收起                 | boolean                                | `false`   |
|          `size`          | 内边距尺寸                                | `small` / `default` / `large`          | `default` |
|         `title`          | 默认头部标题，传入后会使用 `s-title` 渲染 | string                                 | `''`      |
|        `boxStyle`        | 最外层容器样式                            | object                                 | `{}`      |
|      `headerStyle`       | 头部区域样式                              | object                                 | `{}`      |
|       `bodyStyle`        | 内容区域样式                              | object                                 | `{}`      |
|      `footerStyle`       | 底部区域样式                              | object                                 | `{}`      |
|         `border`         | 是否显示头部下边框                        | boolean                                | `true`    |
|         `scroll`         | 内容区是否自动撑开并滚动                  | boolean                                | `true`    |
|         `square`         | 内容区按宽高最大值渲染为正方形            | boolean                                | `false`   |
|      `collapsible`       | 是否允许点击头部展开/收起                 | boolean                                | `false`   |
|    `collapseTrigger`     | 折叠触发区域                              | `icon` / `header`                      | `header`  |
|         `theme`          | 主题样式                                  | `default` / `chenghua` / `shijingshan` | `default` |

### 事件

|       事件名        | 说明               | 回调参数               |
| :-----------------: | ------------------ | ---------------------- |
| `update:modelValue` | 折叠状态变化时触发 | `(collapsed: boolean)` |

### 插槽

|  插槽名   | 说明                           |
| :-------: | ------------------------------ |
| `default` | 内容区域                       |
| `header`  | 自定义头部，会覆盖默认 `title` |
|  `icon`   | 自定义折叠图标                 |
| `footer`  | 底部区域                       |

### 说明

- 用于构建业务卡片式基础布局，支持展开收起、插槽、自适应高度等常见场景。
- 只有设置 `collapsible` 后才允许展开 / 收起；默认点击右侧图标触发，如需整块头部可点击，可设置 `collapseTrigger="header"`。
- `header` 插槽默认会自动占满头部剩余宽度；开启 `collapsible` 后，右侧会为折叠图标预留空间，不需要额外手写 `width: 100%`。
- `scroll` 为 `true` 时内容区会设置 `flex: 1` 和 `overflow: auto`，适合放在固定高度容器中。
