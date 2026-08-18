# Item 信息项

## Hidden Title {.md-hidden}

<DocBasicUsage code='<SItem title="发起对话" sub-title="与数字员工直接交流" extra="立即进入" clickable />' />

## 属性事件插槽简介

<ApiIntro />

### 基础用法

:::demo `title` 和 `subTitle` 超出可用宽度时默认显示省略号，鼠标移入后显示完整内容。基础写法：`<SItem title="发起对话" sub-title="与数字员工直接交流" extra="立即进入" clickable />`。属性：`title` 类型 `string / number`，默认值 `undefined`；`subTitle` 类型 `string / number`，默认值 `undefined`；`extra` 类型 `string / number`，默认值 `undefined`；`clickable` 类型 `boolean`，可选值 `true / false`，默认值 `false`。
item/base
:::

### API

| 属性名       | 说明                               | 类型            | 可选值                               | 默认值      |
| ------------ | ---------------------------------- | --------------- | ------------------------------------ | ----------- |
| `title`      | 标题，溢出时鼠标移入显示完整内容   | string / number | -                                    | `undefined` |
| `subTitle`   | 副标题，溢出时鼠标移入显示完整内容 | string / number | -                                    | `undefined` |
| `extra`      | 右侧文本                           | string / number | -                                    | `undefined` |
| `src`        | 左侧图片地址                       | string          | -                                    | `''`        |
| `size`       | 内边距尺寸，也可直接传自定义尺寸   | string / number | `small / default / large / 自定义值` | `default`   |
| `padding`    | 自定义内边距，优先级高于 `size`    | string / number | -                                    | `undefined` |
| `clickable`  | 是否显示可点击交互样式             | boolean         | `true / false`                       | `false`     |
| `disabled`   | 是否禁用点击                       | boolean         | `true / false`                       | `false`     |
| `width`      | 组件宽度                           | string / number | -                                    | `''`        |
| `height`     | 组件高度                           | string / number | -                                    | `''`        |
| `labelStyle` | 标题样式                           | object          | -                                    | `{}`        |
| `valueStyle` | 副标题样式                         | object          | -                                    | `{}`        |
| `itemStyle`  | 内容区域样式                       | object          | -                                    | `{}`        |
| `imgStyle`   | 前缀区域样式                       | object          | -                                    | `{}`        |
| `boxStyle`   | 外层容器样式                       | object          | -                                    | `{}`        |

### 事件

| 事件名  | 说明                                  | 参数                  |
| ------- | ------------------------------------- | --------------------- |
| `click` | 点击信息项时触发；`disabled` 时不触发 | `(event: MouseEvent)` |

### 插槽

| 插槽名     | 说明                       |
| ---------- | -------------------------- |
| `prefix`   | 左侧图片、图标或头像       |
| `title`    | 自定义标题                 |
| `subTitle` | 自定义副标题               |
| `extra`    | 自定义右侧内容             |
| `actions`  | 自定义右侧操作             |
| `default`  | 标题和副标题下方的扩展内容 |

### 说明

- `padding` 优先于 `size`；数字会转换成像素值，字符串可传 `12px 20px` 等完整 CSS 内边距。
- `small / default / large` 对应内边距默认值分别为 `8px / 16px / 24px`。
