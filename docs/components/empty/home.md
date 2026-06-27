# empty空状态组件

[https://element-plus.org/zh-CN/component/empty.html](https://element-plus.org/zh-CN/component/empty.html)

## Hidden Title {.md-hidden}

<DocBasicUsage code='<s-empty></s-empty>' />

## 属性事件插槽简介

<ApiIntro />

### 基础用法

:::demo 基础写法：`<s-empty>...</s-empty>`。属性说明：该示例不需要额外属性，未传属性时使用组件默认值。本示例展示基础渲染和最小配置，可以直接复制基础写法后按业务替换数据。
empty/base
:::

### 成华主题

:::demo 基础写法：`<s-empty theme="chenghua" description="暂无服务申请" width="72">...</s-empty>`。属性说明：`theme` 示例值：`chenghua`，类型：string，默认值：`''`；`description` 示例值：`暂无服务申请`，类型：string，默认值：`暂无数据`；`width` 示例值：`72`，类型：string / number，默认值：`60`。本示例展示成华主题样式。`theme="chenghua"` 时启用成华主题样式。`theme` 的可选值是 `''` 和 `chenghua`，默认值是 `''`；`description` 的类型是 `string`，默认值是 `暂无数据`；`width` 支持 `string` 和 `number`，默认值是 `60`。
empty/chenghua/base
:::

### 通常用法

:::demo 基础写法：`<s-empty description="我是空白的" src="https://atts.w3cschool.cn/rabbit600x600.png" width="300">...</s-empty>`。属性说明：`description` 示例值：`我是空白的`，类型：string，默认值：`暂无数据`；`src` 示例值：`https://atts.w3cschool.cn/rabbit6...`，类型：string，默认值：内置空状态图；`width` 示例值：`300`，类型：string / number，默认值：`60`。本示例展示通常用法配置，可以直接复制基础写法后按业务替换数据。
empty/usually
:::

### Slots

:::demo 基础写法：`<s-empty>...</s-empty>`。属性说明：该示例不需要额外属性，未传属性时使用组件默认值。本示例展示插槽内容定制，可以直接复制基础写法后按业务替换数据。
empty/slot
:::

### 属性

|    属性名     | 说明                             | 类型            | 默认值       |
| :-----------: | -------------------------------- | --------------- | ------------ |
| `description` | 空状态描述文案                   | string          | `暂无数据`   |
|    `theme`    | 主题样式，支持 `''` / `chenghua` | string          | `''`         |
|    `width`    | 图片宽度                         | string / number | `60`         |
|   `height`    | 图片高度                         | string / number | -            |
|  `imgAttrs`   | 图片额外样式或属性               | object          | `{}`         |
|     `src`     | 自定义空状态图片地址             | string          | 内置空状态图 |

### 插槽

|    插槽名     | 说明           |
| :-----------: | -------------- |
|    `image`    | 自定义图片区域 |
| `description` | 自定义描述区域 |
|   `default`   | 额外底部内容   |
