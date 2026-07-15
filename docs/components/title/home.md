# title组件

## Hidden Title {.md-hidden}

<DocBasicUsage code='<s-title title="你好"></s-title>' />

## 属性事件插槽简介

<ApiIntro />

### 基础用法

:::demo 展示基础用法。基础写法：`<s-title title="你好"></s-title>`。属性：`title` 类型 `string`，默认值 `''`。
title/base
:::

### 成华主题

#### chenghua主题示例

:::demo 展示成华主题样式。基础写法：`<s-title title="成华 AI 服务申请" theme="chenghua" sub-title="审批中 12 个，待处理 4 个"></s-title>`。
title/chenghua/base
:::

### 石景山主题

#### shijingshan主题示例

:::demo 展示石景山主题样式。基础写法：`<s-title title="石景山 AI 服务申请" theme="shijingshan" sub-title="审批中 12 个，待处理 4 个"></s-title>`。
title/shijingshan/base
:::

### 通常用法

:::demo 展示属性、标题插槽、追加内容和语义化标题。基础写法：`<s-title title="左侧" margin="10px 0" l="10"></s-title>`。属性：`size` 可选 `small / default / large`，默认值 `default`；`margin` 类型 `string / number`，默认值 `''`；`gap` 类型 `string / number`，默认值 `''`；`tag` 可选 `div / h1 / h2 / h3 / h4 / h5 / h6`，默认值 `div`；`level` 可选 `1 / 2 / 3 / 4 / 5 / 6`，默认值 `3`。
title/usually
:::

`compTitle` 也可以作为独立组件使用，完整文档见 [CompTitle 组件标题前缀](/components/compTitle/home.md)。

### 标题内容

标题内容按 `title` 命名插槽、默认插槽、`title` 属性的顺序取值，三种方式共享相同的标题样式：

```vue
<s-title title="属性标题" />
<s-title>默认插槽标题</s-title>
<s-title>
  <template #title>命名插槽标题</template>
</s-title>
```

需要在标题后追加状态、标签或操作内容时，使用 `append` 插槽：

```vue
<s-title title="服务状态">
  <template #append><s-tag type="success">运行中</s-tag></template>
</s-title>
```

### 属性

|   属性名   | 说明                                                           | 类型            | 默认值    |
| :--------: | -------------------------------------------------------------- | --------------- | --------- |
|  `title`   | 主标题文案                                                     | string          | `''`      |
|   `size`   | 尺寸，支持 `small` / `default` / `large`                       | string          | `default` |
| `subTitle` | 副标题文案                                                     | string          | `''`      |
| `subAttrs` | 副标题额外属性                                                 | object          | `{}`      |
|  `inner`   | 是否使用内部缩进                                               | boolean         | `false`   |
|  `margin`  | 外边距，支持 CSS margin 简写                                   | string / number | `''`      |
|   `gap`    | 标题内部间距，控制图标、标题、副标题、右侧区域间距             | string / number | `''`      |
|    `t`     | 上边距，兼容快捷写法，优先级高于 `margin`                      | string / number | `''`      |
|    `b`     | 下边距，兼容快捷写法，优先级高于 `margin`                      | string / number | `''`      |
|    `l`     | 左边距，兼容快捷写法，优先级高于 `margin`                      | string / number | `''`      |
|    `tb`    | 同时设置上下边距，兼容快捷写法，优先级高于 `margin`            | string / number | -         |
|  `height`  | 组件高度                                                       | string / number | `''`      |
|   `type`   | 标题样式类型，支持 `''` / `icon` / `simple` / `form`           | string          | `''`      |
|  `theme`   | 主题样式，支持 `default` / `chenghua` / `shijingshan`          | string          | `default` |
|   `tag`    | 标题标签，支持 `div` / `h1` / `h2` / `h3` / `h4` / `h5` / `h6` | string          | `div`     |
|  `level`   | 非原生标题标签的无障碍标题层级，支持 `1` 到 `6`                | number          | `3`       |

### 插槽

|  插槽名   | 说明                                              |
| :-------: | ------------------------------------------------- |
|  `title`  | 自定义标题内容，优先级高于默认插槽和 `title` 属性 |
| `default` | 自定义标题内容，未提供 `title` 命名插槽时生效     |
|  `icon`   | 自定义左侧图标                                    |
| `append`  | 在标题、副标题后追加状态或其他内容                |
|  `extra`  | 右侧操作区                                        |
