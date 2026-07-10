# title组件

## Hidden Title {.md-hidden}

<DocBasicUsage code='<s-title title="你好"></s-title>' />

## 属性事件插槽简介

<ApiIntro />

### 基础用法

:::demo 展示基础用法。基础写法：`<s-title title="你好">...</s-title>`。属性：`title` 类型 `string`，默认值 `''`。
title/base
:::

### 成华主题

#### chenghua主题示例

:::demo 展示成华主题样式。基础写法：`<s-title title="成华 AI 服务申请" theme="chenghua" sub-title="审批中 12 个，待处理 4 个">...</s-title>`。属性：`theme` 可选 `default / chenghua / shijingshan`，默认值 `default`。
title/chenghua/base
:::

### 石景山主题

#### shijingshan主题示例

:::demo 展示石景山主题样式。基础写法：`<s-title title="石景山 AI 服务申请" theme="shijingshan" sub-title="审批中 12 个，待处理 4 个">...</s-title>`。属性：`theme` 可选 `default / chenghua / shijingshan`，默认值 `default`。
title/shijingshan/base
:::

### 通常用法

:::demo 展示通常用法配置。基础写法：`<s-title title="左侧" margin="10px 0" l="10">...</s-title>`。属性：`size` 可选 `'' / small / default / large`，默认值 `''`；`margin` 类型 `string / number`，默认值 `''`；`gap` 类型 `string / number`，默认值 `''`。
title/usually
:::

`compTitle` 也可以作为独立组件使用，完整文档见 [CompTitle 组件标题前缀](/components/compTitle/home.md)。

### 属性

|   属性名   | 说明                                                  | 类型            | 默认值    |
| :--------: | ----------------------------------------------------- | --------------- | --------- |
|  `title`   | 主标题文案                                            | string          | `''`      |
|   `size`   | 尺寸，支持 `small` / `default` / `large`              | string          | `''`      |
| `subTitle` | 副标题文案                                            | string          | `''`      |
| `subAttrs` | 副标题额外属性                                        | object          | `{}`      |
|  `inner`   | 是否使用内部缩进                                      | boolean         | `false`   |
|  `margin`  | 外边距，支持 CSS margin 简写                          | string / number | `''`      |
|   `gap`    | 标题内部间距，控制图标、标题、副标题、右侧区域间距    | string / number | `''`      |
|    `t`     | 上边距，兼容快捷写法，优先级高于 `margin`             | string / number | `''`      |
|    `b`     | 下边距，兼容快捷写法，优先级高于 `margin`             | string / number | `''`      |
|    `l`     | 左边距，兼容快捷写法，优先级高于 `margin`             | string / number | `''`      |
|    `tb`    | 同时设置上下边距，兼容快捷写法，优先级高于 `margin`   | string / number | -         |
|  `height`  | 组件高度                                              | string / number | `''`      |
|   `type`   | 标题样式类型，支持 `''` / `icon` / `simple` / `form`  | string          | `''`      |
|  `theme`   | 主题样式，支持 `default` / `chenghua` / `shijingshan` | string          | `default` |

### 插槽

|  插槽名   | 说明           |
| :-------: | -------------- |
|  `title`  | 自定义标题内容 |
|  `icon`   | 自定义左侧图标 |
|  `extra`  | 右侧操作区     |
| `default` | 标题后追加内容 |
