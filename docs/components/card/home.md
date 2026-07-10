# 卡片组件

## Hidden Title {.md-hidden}

<DocBasicUsage code='<SCard title="基础用法"></SCard>' />

## 属性事件插槽简介

<ApiIntro />

### 基础用法

:::demo 展示基础用法。基础写法：`<SCard title="基础用法"></SCard>`。属性：`title` 类型 `string`，默认值 `''`。
card/base
:::

### 阴影和 Hover 动画（shadow 默认值 `never`，hoverAnimation 默认值 `false`）

:::demo 展示阴影和鼠标移入动画。基础写法：`<SCard shadow="hover" hover-animation title="阴影与 Hover 动画"></SCard>`。属性：`shadow` 可选 `always / never / hover`，默认值 `never`；`hoverAnimation` 可选 `true / false`，默认值 `false`。
card/shadow
:::

### 透明背景（transparent 默认值 `false`）

:::demo 展示透明背景布局。基础写法：`<SCard transparent title="透明背景"></SCard>`。属性：`transparent` 可选 `true / false`，默认值 `false`。
card/transparent
:::

### 成华主题

:::demo 展示成华主题样式。基础写法：`<s-card v-model="collapsed" theme="chenghua" title="审核规则管理"></s-card>`。属性：`theme` 可选 `default / chenghua / shijingshan`，默认值 `default`。
card/chenghua/base
:::

### 石景山主题

:::demo 展示石景山主题样式。基础写法：`<s-card v-model="collapsed" theme="shijingshan" title="审核规则管理"></s-card>`。属性：`theme` 可选 `default / chenghua / shijingshan`，默认值 `default`。
card/shijingshan/base
:::

### 展开和收缩

:::demo 展示展开和收缩配置。基础写法：`<SCard :collapsible="true"></SCard>`。
card/callapse
:::

### size 内边距（默认值 `default`）

:::demo 展示 size 控制内边距。基础写法：`<SCard :size="20"></SCard>`。属性：`size` 可选 `small / default / large / string / number`，默认值 `default`；传入预设值之外的数字或 CSS 长度时，会通过 `processWidth` 转成 padding 值。
card/other
:::

### 自适应高度

:::demo 展示高度配置。基础写法：`<SCard title="不自适应body的高度" class="m-t-16 h-block" :scroll="false"></SCard>`。属性：`height` 类型 `string / number`，默认值 `''`。
card/customLayout
:::

### slot插槽

:::demo 展示插槽内容定制。基础写法：`<SCard collapsible :boxStyle="{ border: 'none' }"></SCard>`。插槽：按示例中的插槽名定制内容。
card/slot
:::

### body正方形

:::demo 展示body正方形配置。基础写法：`<SCard title="租户容量配额" class="w-300 h-500"></SCard>`。属性：`title` 类型 `string`，默认值 `''`。
card/square
:::

### API

|          属性名          | 说明                                                          | 类型                                            | 默认值    |
| :----------------------: | ------------------------------------------------------------- | ----------------------------------------------- | --------- |
| `v-model` / `modelValue` | 折叠状态，`true` 表示收起                                     | boolean                                         | `false`   |
|          `size`          | 内边距尺寸，支持预设值或可被 `processWidth` 处理的 padding 值 | `small` / `default` / `large` / string / number | `default` |
|         `title`          | 默认头部标题，传入后会使用 `s-title` 渲染                     | string                                          | `''`      |
|     `hoverAnimation`     | 鼠标移入容器时是否启用轻微上浮动画                            | boolean                                         | `false`   |
|         `shadow`         | 阴影显示时机，语义同 Element Plus Card                        | `always` / `never` / `hover`                    | `never`   |
|        `boxStyle`        | 最外层容器样式                                                | object                                          | `{}`      |
|      `headerStyle`       | 头部区域样式                                                  | object                                          | `{}`      |
|       `bodyStyle`        | 内容区域样式                                                  | object                                          | `{}`      |
|      `footerStyle`       | 底部区域样式                                                  | object                                          | `{}`      |
|      `transparent`       | 是否使用透明容器背景，同时去掉容器边框和阴影                  | boolean                                         | `false`   |
|         `border`         | 是否显示头部下边框                                            | boolean                                         | `true`    |
|         `scroll`         | 内容区是否自动撑开并滚动                                      | boolean                                         | `true`    |
|         `square`         | 卡片内容区按宽高最大值渲染为正方形                            | boolean                                         | `false`   |
|      `collapsible`       | 是否允许点击头部展开/收起                                     | boolean                                         | `false`   |
|    `collapseTrigger`     | 折叠触发区域                                                  | `icon` / `header`                               | `header`  |
|         `theme`          | 主题样式                                                      | `default` / `chenghua` / `shijingshan`          | `default` |

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

- 用于构建业务卡片容器，支持展开收起、插槽、自适应高度等常见场景。
- 只有设置 `collapsible` 后才允许展开 / 收起；默认点击右侧图标触发，如需整块头部可点击，可设置 `collapseTrigger="header"`。
- `header` 插槽默认会自动占满头部剩余宽度；开启 `collapsible` 后，右侧会为折叠图标预留空间，不需要额外手写 `width: 100%`。
- `scroll` 为 `true` 时内容区会设置 `flex: 1` 和 `overflow: auto`，适合放在固定高度容器中。
