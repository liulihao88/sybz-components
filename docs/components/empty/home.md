# empty空状态组件

[https://element-plus.org/zh-CN/component/empty.html](https://element-plus.org/zh-CN/component/empty.html)

## Hidden Title {.md-hidden}

<DocBasicUsage code='<s-empty></s-empty>' />

## 属性事件插槽简介

<ApiIntro />

### 基础用法

:::demo 展示基础用法。基础写法：`<s-empty></s-empty>`。该示例不需要额外属性。
empty/base
:::

### 成华主题

:::demo 展示成华主题样式。基础写法：`<s-empty theme="chenghua" description="暂无服务申请" width="72"></s-empty>`。
empty/chenghua/base
:::

### 石景山主题

:::demo 展示石景山主题样式。基础写法：`<s-empty theme="shijingshan" description="暂无服务申请" width="72"></s-empty>`。
empty/shijingshan/base
:::

### 通常用法

:::demo 展示通常用法配置。基础写法：`<s-empty description="我是空白的" src="https://atts.w3cschool.cn/rabbit600x600.png" width="300"></s-empty>`。属性：`description` 类型 `string`，默认值按组件默认配置；`src` 类型 `string`，默认值 `''`。
empty/usually
:::

### Slots

:::demo 展示插槽内容定制。基础写法：`<s-empty></s-empty>`。插槽：按示例中的插槽名定制内容。
empty/slot
:::

### 属性

|    属性名     | 说明                                                  | 类型            | 默认值       |
| :-----------: | ----------------------------------------------------- | --------------- | ------------ |
| `description` | 空状态描述文案                                        | string          | `暂无数据`   |
|    `theme`    | 主题样式，支持 `default` / `chenghua` / `shijingshan` | string          | `default`    |
|    `width`    | 图片宽度                                              | string / number | `60`         |
|   `height`    | 图片高度                                              | string / number | -            |
|  `imgAttrs`   | 图片额外样式或属性                                    | object          | `{}`         |
|     `src`     | 自定义空状态图片地址                                  | string          | 内置空状态图 |

### 插槽

|    插槽名     | 说明           |
| :-----------: | -------------- |
|    `image`    | 自定义图片区域 |
| `description` | 自定义描述区域 |
|   `default`   | 额外底部内容   |
