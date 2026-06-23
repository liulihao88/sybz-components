# item列表组件

## Hidden Title {.md-hidden}

## 属性事件插槽简介

<ApiIntro />

### 基础用法

:::demo 基础写法：`<SItem label="label" value="value" src="https://img.yzcdn.cn/vant/logo.png">...</SItem>`。属性说明：`label` 示例值：`label`，类型：string / number，默认值：未设置；`value` 示例值：`value`，类型：string / number，默认值：未设置；`src` 示例值：`https://img.yzcdn.cn/vant/logo.png`，类型：string，默认值：`''`。本示例展示基础渲染和最小配置，可以直接复制基础写法后按业务替换数据。
item/base
:::

### 包裹用法

:::demo 基础写法：`<SItem label="label" value="value" src="https://img.yzcdn.cn/vant/logo.png">...</SItem>`。属性说明：`label` 示例值：`label`，类型：string / number，默认值：未设置；`value` 示例值：`value`，类型：string / number，默认值：未设置；`src` 示例值：`https://img.yzcdn.cn/vant/logo.png`，类型：string，默认值：`''`。本示例展示包裹用法配置，可以直接复制基础写法后按业务替换数据。
item/wrapper
:::

### 样式

:::demo 基础写法：`<SItem label="label" value="value" src="https://img.yzcdn.cn/vant/logo.png" style="background: lightblue" :labelStyle="{ fontSize: '40px', color: 'red' }" :valueStyle="{ fontSize: '30px', color: 'var(--blue)' }">...</SItem>`。属性说明：`label` 示例值：`label`，类型：string / number，默认值：未设置；`value` 示例值：`value`，类型：string / number，默认值：未设置；`src` 示例值：`https://img.yzcdn.cn/vant/logo.png`，类型：string，默认值：`''`；`labelStyle` 示例值：`{ fontSize: '40px', color: 'red' }`，类型：object，默认值：`{}`；`valueStyle` 示例值：`{ fontSize: '30px', color: 'var(-...`，类型：object，默认值：`{}`。本示例展示样式配置，可以直接复制基础写法后按业务替换数据。
item/style
:::

### 不同类型

:::demo 基础写法：`<SItem label="这是默认类型" value="123456" src="https://img.yzcdn.cn/vant/logo.png" :imgStyle="{ height: '100px' }" height="300">...</SItem>`。属性说明：`label` 示例值：`这是默认类型`，类型：string / number，默认值：未设置；`value` 示例值：`123456`，类型：string / number，默认值：未设置；`src` 示例值：`https://img.yzcdn.cn/vant/logo.png`，类型：string，默认值：`''`；`imgStyle` 示例值：`{ height: '100px' }`，类型：object，默认值：`{}`；`height` 示例值：`300`，类型：string / number，默认值：`''`；`type` 示例值：`value`，类型：`''` / `value`，默认值：`''`；`attrs` 示例值：`{ formatBytes: true, formatThousa...`，类型：object，默认值：`{}`。本示例展示不同类型配置，可以直接复制基础写法后按业务替换数据。
item/type
:::

### API

|    属性名    | 说明                                            | 类型            | 默认值 |
| :----------: | ----------------------------------------------- | --------------- | ------ |
|    `src`     | 图片地址；为空且未传 `img` 插槽时不展示图片区域 | string          | `''`   |
|   `label`    | 标签文本                                        | string / number | -      |
|   `value`    | 数值内容                                        | string / number | -      |
|   `width`    | 组件宽度，会经过 `processWidth` 处理            | string / number | `''`   |
|   `height`   | 组件高度，会经过 `processWidth` 处理            | string / number | `''`   |
| `labelStyle` | 标签区域样式                                    | object          | `{}`   |
| `valueStyle` | 数值区域样式                                    | object          | `{}`   |
| `itemStyle`  | 右侧内容容器样式                                | object          | `{}`   |
|  `imgStyle`  | 图片区域样式                                    | object          | `{}`   |
|  `boxStyle`  | 最外层容器样式                                  | object          | `{}`   |
|    `type`    | 展示类型，`value` 表示数值优先布局              | `''` / `value`  | `''`   |
|   `attrs`    | 扩展配置                                        | object          | `{}`   |

### attrs 扩展配置

|      属性名       | 说明                                                | 类型             | 默认值 |
| :---------------: | --------------------------------------------------- | ---------------- | ------ |
|   `formatBytes`   | 是否按字节大小格式化 `value`                        | boolean          | -      |
|     `toFixed`     | 是否格式化小数位；传 `true` 默认为 2 位，也可传数字 | boolean / number | -      |
| `formatThousands` | 是否对 `value` 做千分位格式化                       | boolean          | -      |
|     `center`      | `type="value"` 时内容是否居中                       | boolean          | -      |

### 插槽

| 插槽名  | 说明           |
| :-----: | -------------- |
|  `img`  | 自定义图片区域 |
| `label` | 自定义标签内容 |
| `value` | 自定义数值内容 |

### 说明

- 用于展示单条业务信息项，支持包裹布局、样式切换和不同展示类型。
- `label` 和 `value` 是必填属性，如果需要完全自定义内容，也建议保留基础值作为兜底。
