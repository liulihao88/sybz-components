# popconfirm组件

[Element Plus Popover 组件文档](https://element-plus.org/zh-CN/component/popover.html)

## Hidden Title {.md-hidden}

<DocBasicUsage code='<s-popconfirm @confirm="confirm"></s-popconfirm>' />

## 属性事件插槽简介

<ApiIntro />

### 基础用法

:::demo 基础写法：`<s-popconfirm @confirm="confirm">...</s-popconfirm>`。属性说明：`content` 示例值：`确定删除<code>123</code>吗?`，类型：string，默认值：`''`；`dangerouslyUseHTMLString` 示例值：`true`，类型：boolean，默认值：`false`；`reConfirm` 示例值：`false`，类型：boolean，默认值：`true`。本示例展示基础渲染和最小配置，可以直接复制基础写法后按业务替换数据。
popconfirm/base
:::

### 成华主题

#### chenghua主题示例

:::demo 基础写法：`<s-popconfirm theme="chenghua" title="确认删除任务" content="确定删除<code>智慧档案检索</code>吗?" :dangerouslyUseHTMLString="true" width="260" trigger="click" @confirm="confirm">...</s-popconfirm>`。属性说明：`theme` 示例值：`chenghua`，类型：`'' / chenghua`，默认值：`''`；`title` 示例值：`确认删除任务`，类型：string，默认值：`确定删除吗?`；`content` 示例值：`确定删除<code>智慧档案检索</code>吗?`，类型：string，默认值：`''`；`dangerouslyUseHTMLString` 示例值：`true`，类型：boolean，默认值：`false`；`width` 示例值：`260`，类型：string / number，默认值：`200`；`trigger` 示例值：`click`，类型/可选值/默认值按内部组件或 Element Plus 对应属性。本示例展示成华主题样式，可以直接复制基础写法后按业务替换数据。
popconfirm/chenghua/base
:::

### 通常用法

:::demo 基础写法：`<s-popconfirm title="自定义title" content="自定义content" @confirm="confirm" trigger="click" width="500">...</s-popconfirm>`。属性说明：`title` 示例值：`自定义title`，类型：string，默认值：`确定删除吗?`；`content` 示例值：`自定义content`，类型：string，默认值：`''`；`trigger` 示例值：`click`，类型/可选值/默认值按内部组件或 Element Plus 对应属性；`width` 示例值：`500`，类型：string / number，默认值：`200`；`reConfirm` 示例值：`reConfirm`，类型：boolean，默认值：`true`。本示例展示通常用法配置，可以直接复制基础写法后按业务替换数据。
popconfirm/usually
:::

### Slots

:::demo 基础写法：`<s-popconfirm trigger="click" @confirm="confirm" title="" ref="popoverRef">...</s-popconfirm>`。属性说明：`trigger` 示例值：`click`，类型/可选值/默认值按内部组件或 Element Plus 对应属性；`title` 示例值：`true`，类型：string，默认值：`确定删除吗?`。本示例展示插槽内容定制，可以直接复制基础写法后按业务替换数据。
popconfirm/slot
:::

### 属性

|           属性名           | 说明                                          | 类型            | 默认值        |
| :------------------------: | --------------------------------------------- | --------------- | ------------- |
|          `title`           | 标题文案                                      | string          | `确定删除吗?` |
|          `width`           | 弹层宽度                                      | string / number | `200`         |
|         `content`          | 正文内容，默认按纯文本渲染                    | string          | `''`          |
|        `reConfirm`         | 是否启用二次确认，关闭后点击即直接确认        | boolean         | `true`        |
| `dangerouslyUseHTMLString` | 是否将 `content` 按安全白名单 HTML 字符串渲染 | boolean         | `false`       |
|          `theme`           | 主题                                          | `'' / chenghua` | `''`          |

### 事件

|  事件名   | 说明           |
| :-------: | -------------- |
| `confirm` | 点击确认时触发 |
| `cancel`  | 点击取消时触发 |

### 插槽

|  插槽名   | 说明                                     |
| :-------: | ---------------------------------------- |
| `default` | 触发器内容                               |
| `content` | 自定义正文内容，富文本内容请使用这个插槽 |
| `footer`  | 自定义底部操作区                         |

### Exposes

|  名称   | 说明         | 类型     |
| :-----: | ------------ | -------- |
| `close` | 手动关闭弹层 | function |
