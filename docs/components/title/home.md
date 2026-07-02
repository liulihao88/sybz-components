# title组件

## Hidden Title {.md-hidden}

<DocBasicUsage code='<s-title title="你好"></s-title>' />

## 属性事件插槽简介

<ApiIntro />

### 基础用法

:::demo 基础写法：`<s-title title="你好">...</s-title>`。属性说明：`title` 示例值：`你好`，类型：string，默认值：`''`；`height` 示例值：`40`，类型：string / number，默认值：`''`；`type` 示例值：`simple`，类型：string，默认值：`icon`。本示例展示基础渲染和最小配置，可以直接复制基础写法后按业务替换数据。
title/base
:::

### 成华主题

#### chenghua主题示例

:::demo 基础写法：`<s-title title="成华 AI 服务申请" theme="chenghua" sub-title="审批中 12 个，待处理 4 个">...</s-title>`。属性说明：`title` 示例值：`成华 AI 服务申请`，类型：string，默认值：`''`；`theme` 示例值：`chenghua`，类型：string，默认值：`''`；`sub-title` 示例值：`审批中 12 个，待处理 4 个`，类型：string，默认值：`''`。本示例展示成华主题样式，可以直接复制基础写法后按业务替换数据。
title/chenghua/base
:::

### 通常用法

:::demo 基础写法：`<s-title title="左侧" tb="10" l="10">...</s-title>`。属性说明：`title` 示例值：`左侧`，类型：string，默认值：`''`；`tb` 示例值：`10`，类型：string / number，默认值：未设置；`l` 示例值：`10`，类型：string / number，默认值：`''`。本示例展示通常用法配置，可以直接复制基础写法后按业务替换数据。
title/usually
:::

`compTitle` 也可以作为独立组件使用，完整文档见 [CompTitle 组件标题前缀](/components/compTitle/home.md)。

### 属性

|   属性名   | 说明                                          | 类型            | 默认值  |
| :--------: | --------------------------------------------- | --------------- | ------- |
|  `title`   | 主标题文案                                    | string          | `''`    |
|   `size`   | 尺寸标识，保留字段                            | string          | `''`    |
| `subTitle` | 副标题文案                                    | string          | `''`    |
| `subAttrs` | 副标题额外属性                                | object          | `{}`    |
|  `inner`   | 是否使用内部缩进                              | boolean         | `false` |
|    `t`     | 上边距                                        | string / number | `''`    |
|    `b`     | 下边距                                        | string / number | `''`    |
|    `l`     | 左边距                                        | string / number | `''`    |
|    `tb`    | 同时设置上下边距                              | string / number | -       |
|  `height`  | 组件高度                                      | string / number | `''`    |
|   `type`   | 标题样式类型，支持 `icon` / `simple` / `form` | string          | `icon`  |
|  `theme`   | 主题样式，支持 `chenghua`                     | string          | `''`    |

### 插槽

|  插槽名   | 说明           |
| :-------: | -------------- |
|  `title`  | 自定义标题内容 |
|  `icon`   | 自定义左侧图标 |
|  `extra`  | 右侧操作区     |
| `default` | 标题后追加内容 |
