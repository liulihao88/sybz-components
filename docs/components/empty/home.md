# empty空状态组件

[https://element-plus.org/zh-CN/component/empty.html](https://element-plus.org/zh-CN/component/empty.html)

## Hidden Title {.md-hidden}

## 属性事件插槽简介

<ApiIntro />

### 基础用法

:::demo
empty/base
:::

### 成华主题

:::demo `theme="chenghua"` 时启用成华主题样式。`theme` 的可选值是 `''` 和 `chenghua`，默认值是 `''`；`description` 的类型是 `string`，默认值是 `暂无数据`；`width` 支持 `string` 和 `number`，默认值是 `60`。
empty/chenghua/base
:::

### 通常用法

:::demo
empty/usually
:::

### Slots

:::demo
empty/slot
:::

### 属性

|    属性名     | 说明                 | 类型            | 默认值       |
| :-----------: | -------------------- | --------------- | ------------ |
| `description` | 空状态描述文案       | string          | `暂无数据`   |
|    `theme`    | 主题样式，支持 `''` / `chenghua` | string          | `''`         |
|    `width`    | 图片宽度             | string / number | `60`         |
|   `height`    | 图片高度             | string / number | -            |
|  `imgAttrs`   | 图片额外样式或属性   | object          | `{}`         |
|     `src`     | 自定义空状态图片地址 | string          | 内置空状态图 |

### 插槽

|    插槽名     | 说明           |
| :-----------: | -------------- |
|    `image`    | 自定义图片区域 |
| `description` | 自定义描述区域 |
|   `default`   | 额外底部内容   |
