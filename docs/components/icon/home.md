# icon图标

## Hidden Title {.md-hidden}

<DocBasicUsage code='<s-icon name="delete"></s-icon>' />

## 属性事件插槽简介

<ApiIntro />

[Element Plus Icon Documentation](https://element-plus.org/zh-CN/component/icon.html)

### 基础用法

:::demo 展示基础用法。基础写法：`<s-icon name="delete"></s-icon>`。属性：`name` 类型 `SIconName`，默认值未设置，编辑器会提示 Element Plus 图标名，同时支持任意自定义名称；`content` 类型 `string`，默认值 `''`；`dangerouslyUseHTMLString` 可选 `true / false`，默认值 `false`。
icon/base
:::

### Iconify 图标（source 默认值：auto）

:::demo 展示 Iconify 在线按需加载与离线注册。基础写法：`<s-icon name="mdi:home"></s-icon>`。属性：`name` 类型 `string`，默认值 `''`，包含 `:` 时自动使用 Iconify；`source` 可选 `auto / element-plus / iconify / svg`，默认值 `auto`；`iconifyAttrs` 类型 `object`，默认值 `{}`。
icon/iconify
:::

### 插槽

:::demo 展示插槽内容定制。基础写法：`<s-icon></s-icon>`。插槽：按示例中的插槽名定制内容。
icon/slot
:::

### 常用图标查找

:::demo 展示图标按钮配置。基础写法：`<s-icon :name="v.value" color="var(--blue)"></s-icon>`。属性：`icon` 类型 `string / Component`，默认值未设置。
icon/usually
:::

### 所有图标

:::demo 展示图标按钮。基础写法：`<s-icon :name="iconName" class="item"></s-icon>`。属性：`name` 类型 `string`，默认值未设置。
icon/all
:::

### 旋转角度（rotate 默认值：''）

:::demo 展示图标旋转角度。基础写法：`<s-icon name="arrow-up" :rotate="90"></s-icon>`。属性：`rotate` 类型 `string / number`，默认值 `''`；数字及数字字符串使用 `processWidth` 写法并按 `deg` 处理，也支持带 `deg / grad / rad / turn` 单位的角度字符串。
icon/rotate
:::

### 语义类型与背景样式（type 默认值：未设置，variant 默认值：plain）

:::demo 展示图标的语义颜色和背景样式。基础写法：`<s-icon name="warning" type="warning" variant="light"></s-icon>`。属性：`type` 可选 `primary / success / warning / danger / info`，默认值未设置；`variant` 可选 `plain / light / solid`，默认值 `plain`；`color` 类型 `string`，默认值未设置，显式设置时优先于语义颜色。
icon/type
:::

### 属性

|           属性名           | 说明                                                            | 类型            | 默认值  |
| :------------------------: | --------------------------------------------------------------- | --------------- | ------- |
|           `name`           | 图标名称，提示 Element Plus 图标名；包含 `:` 时自动使用 Iconify | SIconName       | `''`    |
|          `color`           | 图标颜色                                                        | string          | -       |
|           `size`           | 图标尺寸                                                        | string / number | `16px`  |
|          `rotate`          | 图标旋转角度，数字及数字字符串按 `deg` 处理                     | string / number | `''`    |
|         `disabled`         | 是否禁用，禁用后不会触发点击                                    | boolean         | `false` |
|          `source`          | 图标来源，可选 `auto / element-plus / iconify / svg`            | string          | `auto`  |
|           `type`           | 语义类型，可选 `primary / success / warning / danger / info`    | string          | -       |
|         `variant`          | 视觉样式，可选 `plain / light / solid`                          | string          | `plain` |
|         `svgAttrs`         | 透传给 `s-svg` 的属性                                           | object          | `{}`    |
|       `iconifyAttrs`       | 透传给 Iconify 的属性，如 `flip`、`onLoad`                      | object          | `{}`    |
| `dangerouslyUseHTMLString` | 是否将 tooltip 的 `content` 按 HTML 字符串渲染                  | boolean         | `false` |

### 事件

| 事件名  | 说明           | 回调参数 |
| :-----: | -------------- | -------- |
| `click` | 点击图标时触发 | `event`  |

### 说明

- 组件底层使用 `el-icon`，tooltip 相关属性如 `content`、`placement`、`effect` 可直接透传。
- 在支持 Vue 模板类型提示的编辑器中，输入 `name` 会提示 Element Plus 图标名；同时仍可输入小写、短横线、自定义 SVG 或 Iconify 名称。
- `name` 包含 `:` 时会自动按 Iconify 图标渲染，例如 `mdi:home`、`lucide:search`，图标名称可在 [Iconify Icon Sets](https://icon-sets.iconify.design/) 查询。
- 首次使用某个在线图标时，Iconify 会按需从公开 API 加载并缓存；内网或离线项目可通过 `addIconifyIcon(name, data)` 或 `addIconifyCollection(data)` 预注册图标数据。
