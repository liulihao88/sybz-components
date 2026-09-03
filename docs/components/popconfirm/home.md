# popconfirm组件

[Element Plus Popover 组件文档](https://element-plus.org/zh-CN/component/popover.html)

## Hidden Title {.md-hidden}

<DocBasicUsage code='<s-popconfirm @confirm="confirm"></s-popconfirm>' />

## 属性事件插槽简介

<ApiIntro />

### 基础用法

:::demo 展示基础用法，弹层打开后可按 `Esc` 快速关闭。基础写法：`<s-popconfirm @confirm="confirm"></s-popconfirm>`。属性：`content` 类型 `string`，默认值 `''`；`dangerouslyUseHTMLString` 可选 `true / false`，默认值 `true`；`re-confirm` 可选 `true / false`，默认值 `true`。
popconfirm/base
:::

### 成华主题

#### chenghua主题示例

:::demo 展示成华主题样式和语义确认框。基础写法：`<s-popconfirm theme="chenghua" variant="delete" target="智慧档案检索" @confirm="confirm"></s-popconfirm>`。属性：`variant` 可选 `default / delete / warning`，默认值 `default`；`target` 类型 `string / number`，默认值未设置。
popconfirm/chenghua/base
:::

### 石景山主题

#### shijingshan主题示例

:::demo 展示石景山主题样式和语义确认框。基础写法：`<s-popconfirm theme="shijingshan" variant="delete" target="智慧档案检索" @confirm="confirm"></s-popconfirm>`。属性：`variant` 可选 `default / delete / warning`，默认值 `default`；`target` 类型 `string / number`，默认值未设置。
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

|           属性名           | 说明                                                                            | 类型                                                           | 默认值                     |
| :------------------------: | ------------------------------------------------------------------------------- | -------------------------------------------------------------- | -------------------------- |
|          `title`           | 标题文案；未设置时由 `variant` 生成                                             | string                                                         | 由 `variant` 决定          |
|          `width`           | 弹层宽度；语义态默认使用更适合确认内容的宽度                                    | string / number                                                | 普通态 `200`，语义态 `320` |
|         `content`          | 正文内容，默认按安全白名单 HTML 渲染                                            | string                                                         | `''`                       |
|        `reConfirm`         | 是否启用二次确认，关闭后点击即直接确认                                          | boolean                                                        | `true`                     |
| `dangerouslyUseHTMLString` | 是否将 `title` / `content` 按安全白名单 HTML 字符串渲染，可用 `<mark>` 高亮文本 | boolean                                                        | `true`                     |
|          `theme`           | 主题                                                                            | `default` / `chenghua` / `shijingshan`                         | `default`                  |
|         `variant`          | 语义样式，并统一标题、正文、确认按钮和主题颜色                                  | `default` / `delete` / `warning`                               | `default`                  |
|          `target`          | 删除场景中要操作的目标名称；未传 `content` 时自动生成标准提示                   | string / number                                                | -                          |
|    `confirmButtonText`     | 确认按钮文字；未设置时由 `variant` 生成                                         | string                                                         | 由 `variant` 决定          |
|     `cancelButtonText`     | 取消按钮文字                                                                    | string                                                         | `取消`                     |
|    `confirmButtonType`     | 确认按钮类型                                                                    | `default / primary / success / warning / info / danger / text` | `primary`                  |
|     `cancelButtonType`     | 取消按钮类型                                                                    | `default / primary / success / warning / info / danger / text` | `info`                     |

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
| `target`  | 自定义删除场景中的目标内容               |

### Exposes

|  名称   | 说明         | 类型     |
| :-----: | ------------ | -------- |
| `close` | 手动关闭弹层 | function |
