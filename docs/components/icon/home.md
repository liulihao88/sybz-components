# icon图标

## Hidden Title {.md-hidden}

## 属性事件插槽简介

<ApiIntro />

[Element Plus Icon Documentation](https://element-plus.org/zh-CN/component/icon.html)

### 基础用法

:::demo 基础写法：`<s-icon name="delete">...</s-icon>`。属性说明：`name` 示例值：`delete`，类型：string，默认值：未设置；`content` 示例值：`警告`，类型/可选值/默认值按内部组件或 Element Plus 对应属性；`dangerouslyUseHtmlString` 示例值：`true`，类型：boolean，默认值：`false`；`color` 示例值：`var(--yellow)`，类型：string，默认值：未设置；`size` 示例值：`50`，类型：string / number，默认值：`16px`；`placement` 示例值：`right`，类型/可选值/默认值按内部组件或 Element Plus 对应属性。本示例展示基础渲染和最小配置，可以直接复制基础写法后按业务替换数据。
icon/base
:::

### 插槽

:::demo 基础写法：`<s-icon>...</s-icon>`。属性说明：`content` 示例值：`添加`，类型/可选值/默认值按内部组件或 Element Plus 对应属性。本示例展示插槽内容定制，可以直接复制基础写法后按业务替换数据。
icon/slot
:::

### 常用图标查找

:::demo 基础写法：`<s-icon :name="v.value" color="var(--blue)">...</s-icon>`。属性说明：`name` 示例值：`v.value`，类型：string，默认值：未设置；`color` 示例值：`var(--blue)`，类型：string，默认值：未设置。本示例展示图标按钮配置，可以直接复制基础写法后按业务替换数据。
icon/usually
:::

### 所有图标

:::demo 基础写法：`<s-icon :name="`${proxy.toLine(v.name)}`" class="item">...</s-icon>`。属性说明：`name` 示例值：``${proxy.toLine(v.name)}``，类型：string，默认值：未设置。本示例展示图标按钮配置，可以直接复制基础写法后按业务替换数据。
icon/all
:::

### 属性

|           属性名           | 说明                                           | 类型            | 默认值  |
| :------------------------: | ---------------------------------------------- | --------------- | ------- |
|           `name`           | 图标名称                                       | string          | -       |
|          `color`           | 图标颜色                                       | string          | -       |
|           `size`           | 图标尺寸                                       | string / number | `16px`  |
|         `disabled`         | 是否禁用，禁用后不会触发点击                   | boolean         | `false` |
|           `type`           | 图标类型，传 `svg` 时走 `s-svg` 渲染           | string          | `''`    |
|         `svgAttrs`         | 透传给 `s-svg` 的属性                          | object          | `{}`    |
| `dangerouslyUseHtmlString` | 是否将 tooltip 的 `content` 按 HTML 字符串渲染 | boolean         | `false` |

### 事件

| 事件名  | 说明           | 回调参数 |
| :-----: | -------------- | -------- |
| `click` | 点击图标时触发 | `event`  |

### 说明

- 组件底层使用 `el-icon`，tooltip 相关属性如 `content`、`placement`、`effect` 可直接透传。
