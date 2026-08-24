# empty空状态组件

[https://element-plus.org/zh-CN/component/empty.html](https://element-plus.org/zh-CN/component/empty.html)

## Hidden Title {.md-hidden}

<DocBasicUsage code='<s-empty title="暂无数据" sub-title="这里暂时没有可展示的内容"></s-empty>' />

## 属性事件插槽简介

<ApiIntro />

### 基础用法

:::demo 展示基础用法。基础写法：`<s-empty title="暂无数据" sub-title="这里暂时没有可展示的内容"></s-empty>`。属性：`title` 类型 `string`，默认值 `暂无数据`；`sub-title` 类型 `string`，默认值为空。
empty/base
:::

### 成华主题

:::demo 展示成华主题样式。基础写法：`<s-empty theme="chenghua" title="暂无服务申请" sub-title="创建申请后将在这里展示" width="72"></s-empty>`。属性：`theme` 可选 `default / chenghua / shijingshan`，默认值 `default`；`title` 默认值 `暂无数据`；`sub-title` 默认值为空。
empty/chenghua/base
:::

### 石景山主题

:::demo 展示石景山主题样式。基础写法：`<s-empty theme="shijingshan" title="暂无服务申请" sub-title="创建申请后将在这里展示" width="72"></s-empty>`。属性：`theme` 可选 `default / chenghua / shijingshan`，默认值 `default`；`title` 默认值 `暂无数据`；`sub-title` 默认值为空。
empty/shijingshan/base
:::

### 通常用法

:::demo 展示通常用法配置。基础写法：`<s-empty title="我是空白的" sub-title="换一个条件试试看" src="图片地址" width="300"></s-empty>`。属性：`title` 默认值 `暂无数据`；`sub-title` 默认值为空；`src` 类型 `string`，默认值为内置空状态图；`width` 类型 `string / number`，默认值 `60`。
empty/usually
:::

### Slots

:::demo 展示插槽内容定制。基础写法：`<s-empty><template #title>标题</template><template #sub-title>副标题</template>操作内容</s-empty>`。插槽：`title`、`sub-title`、`image` 和 `default`。
empty/slot
:::

### 属性

|   属性名    | 说明                                                  | 类型            | 默认值       |
| :---------: | ----------------------------------------------------- | --------------- | ------------ |
|   `title`   | 空状态主标题                                          | string          | `暂无数据`   |
| `sub-title` | 空状态副标题                                          | string          | -            |
|   `theme`   | 主题样式，支持 `default` / `chenghua` / `shijingshan` | string          | `default`    |
|   `width`   | 图片宽度                                              | string / number | `60`         |
|  `height`   | 图片高度                                              | string / number | -            |
| `imgAttrs`  | 图片额外样式或属性                                    | object          | `{}`         |
|    `src`    | 自定义空状态图片地址                                  | string          | 内置空状态图 |

### 插槽

|   插槽名    | 说明             |
| :---------: | ---------------- |
|   `image`   | 自定义图片区域   |
|   `title`   | 自定义主标题区域 |
| `sub-title` | 自定义副标题区域 |
|  `default`  | 额外底部内容     |
