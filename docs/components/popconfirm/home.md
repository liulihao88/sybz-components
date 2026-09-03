# popconfirm组件

[Element Plus Popover 组件文档](https://element-plus.org/zh-CN/component/popover.html)

## Hidden Title {.md-hidden}

<DocBasicUsage code='<s-popconfirm @confirm="confirm"></s-popconfirm>' />

## 属性事件插槽简介

<ApiIntro />

### 基础用法

:::demo 展示基础用法。基础写法：`<s-popconfirm @confirm="confirm"></s-popconfirm>`。属性：`content` 类型 `string`，默认值 `''`；`dangerouslyUseHTMLString` 可选 `true / false`，默认值 `false`；`re-confirm` 可选 `true / false`，默认值 `true`。
popconfirm/base
:::

### 成华主题

#### chenghua主题示例

:::demo 展示成华主题样式。基础写法：`<s-popconfirm theme="chenghua" title="确认删除任务" content="确定删除<mark>智慧档案检索</mark>吗?" width="260" trigger="click" @confirm="confirm"></s-popconfirm>`。
popconfirm/chenghua/base
:::

### 石景山主题

#### shijingshan主题示例

:::demo 展示石景山主题样式。基础写法：`<s-popconfirm theme="shijingshan" title="确认删除任务" content="确定删除<mark>智慧档案检索</mark>吗?" width="260" trigger="click" @confirm="confirm"></s-popconfirm>`。
popconfirm/shijingshan/base
:::

### 通常用法

:::demo 展示通常用法配置。基础写法：`<s-popconfirm title="自定义title" content="自定义content" @confirm="confirm" trigger="click" width="500"></s-popconfirm>`。属性：`title` 类型 `string`，默认值 `''`；`content` 类型 `string`，默认值 `''`。
popconfirm/usually
:::

### Slots

:::demo 展示插槽内容定制。基础写法：`<s-popconfirm trigger="click" @confirm="confirm" title="" ref="popoverRef"></s-popconfirm>`。插槽：按示例中的插槽名定制内容。
popconfirm/slot
:::

### 属性

|           属性名           | 说明                                                                            | 类型                                                           | 默认值        |
| :------------------------: | ------------------------------------------------------------------------------- | -------------------------------------------------------------- | ------------- |
|          `title`           | 标题文案；配合 `dangerouslyUseHTMLString` 可解析 HTML                           | string                                                         | `确定删除吗?` |
|          `width`           | 弹层宽度                                                                        | string / number                                                | `200`         |
|         `content`          | 正文内容，默认按安全白名单 HTML 渲染                                            | string                                                         | `''`          |
|        `reConfirm`         | 是否启用二次确认，关闭后点击即直接确认                                          | boolean                                                        | `true`        |
| `dangerouslyUseHTMLString` | 是否将 `title` / `content` 按安全白名单 HTML 字符串渲染，可用 `<mark>` 高亮文本 | boolean                                                        | `true`        |
|          `theme`           | 主题                                                                            | `default` / `chenghua` / `shijingshan`                         | `default`     |
|    `confirmButtonText`     | 确认按钮文字                                                                    | string                                                         | `确定`        |
|     `cancelButtonText`     | 取消按钮文字                                                                    | string                                                         | `取消`        |
|    `confirmButtonType`     | 确认按钮类型                                                                    | `default / primary / success / warning / info / danger / text` | `primary`     |
|     `cancelButtonType`     | 取消按钮类型                                                                    | `default / primary / success / warning / info / danger / text` | `text`        |

### 事件

|  事件名   | 说明           |
| :-------: | -------------- |
| `confirm` | 点击确认时触发 |
| `cancel`  | 点击取消时触发 |

### 插槽

|  插槽名   | 说明                                     |
| :-------: | ---------------------------------------- |
| `default` | 触发器内容                               |
|  `title`  | 自定义标题内容                           |
| `content` | 自定义正文内容，富文本内容请使用这个插槽 |
| `footer`  | 自定义底部操作区                         |

### Exposes

|  名称   | 说明         | 类型     |
| :-----: | ------------ | -------- |
| `close` | 手动关闭弹层 | function |
