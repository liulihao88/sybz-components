# warning警告组件

## Hidden Title {.md-hidden}

<DocBasicUsage code='<s-warning content="这是基础用法" title="我是title"></s-warning>' />

## 属性事件插槽简介

<ApiIntro />

### 基础用法

:::demo 基础写法：`<s-warning content="这是基础用法" title="我是title">...</s-warning>`。属性说明：`content` 示例值：`这是基础用法`，类型/可选值/默认值按内部组件或 Element Plus 对应属性；`title` 示例值：`我是title`，类型：string，默认值：`""`；`size` 示例值：`small`，类型：string，可选值：`large` / `default` / `small`，默认值：继承全局尺寸或 `default`；`dangerouslyUseHTMLString` 示例值：`true`，类型/可选值/默认值按内部组件或 Element Plus 对应属性；`icon` 示例值：`false`，类型：string / Component，可选值：图标名或图标组件，默认值：未设置；`type` 示例值：`warning`，类型：string，可选值：`primary` / `success` / `warning` / `danger` / `info` / `text`，默认值：`default` 或 `""`；`iconAttrs` 示例值：`{ name: 'delete', }`，类型/可选值/默认值按内部组件或 Element Plus 对应属性。本示例展示基础渲染和最小配置。这是warning的最基础用法。
warning/base
:::

### 成华主题

:::demo 基础写法：`<s-warning theme="chenghua" title="服务提示" content="已启用成华主题的信息提示，可用于展示普通说明。" />`。属性说明：`theme` 示例值：`chenghua`，类型：`default` / `chenghua` / `shijingshan`，默认值：`default`；`title` 示例值：`服务提示`，类型：string，默认值：`""`；`content` 示例值：`已启用成华主题的信息提示，可用于展示普通说明。`，类型/可选值/默认值按内部组件或 Element Plus 对应属性；`type` 示例值：`warning`，类型：string，可选值：`primary` / `success` / `warning` / `danger` / `info` / `text`，默认值：`default` 或 `""`；`dotted` 示例值：`true`，类型/可选值/默认值按内部组件或 Element Plus 对应属性；`size` 示例值：`small`，类型：string，可选值：`large` / `default` / `small`，默认值：继承全局尺寸或 `default`。本示例展示成华主题样式。`theme="chenghua"` 时启用成华主题样式；`type` 的可选值是 `info`、`simple`、`warning`、`error`，默认值是 `info`；`size` 的可选值是 `small` 和 `default`，默认值是 `default`。
warning/chenghua/base
:::

### 插槽

:::demo 基础写法：`<s-warning>...</s-warning>`。属性说明：该示例不需要额外属性，未传属性时使用组件默认值。本示例展示插槽内容定制。插槽。
warning/slot
:::

### 属性

|          属性名          | 说明                                                  | 类型                      | 默认值    |
| :----------------------: | ----------------------------------------------------- | ------------------------- | --------- |
|          title           | 标题内容                                              | string                    | `''`      |
|          theme           | 主题样式，支持 `default` / `chenghua` / `shijingshan` | string                    | `default` |
|           type           | 提示类型，支持 `info/simple/warning/error`            | string                    | `info`    |
|         content          | 显示的正文内容                                        | string                    | -         |
|          width           | 宽度                                                  | string / number           | `100%`    |
| dangerouslyUseHTMLString | 是否将 `content` 作为 HTML 片段处理                   | boolean                   | `false`   |
|           icon           | 是否显示图标                                          | boolean                   | `true`    |
|           size           | 组件尺寸，支持 `small/default`                        | string                    | `default` |
|          dotted          | 是否使用虚线边框                                      | boolean                   | `false`   |
|       customStyle        | 自定义样式对象                                        | object                    | `{}`      |
|        iconAttrs         | 图标额外属性                                          | object                    | `{}`      |
|           left           | 左侧额外间距，传 `true` 时默认 `8px`                  | boolean / string / number | `false`   |

### Slots

| 插槽名  | 说明           |
| :-----: | -------------- |
| default | 默认正文内容   |
|  title  | 自定义标题内容 |
| content | 自定义正文内容 |
