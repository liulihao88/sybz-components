# button按钮组件

[https://element-plus.org/zh-CN/component/button.html](https://element-plus.org/zh-CN/component/button.html)

## Hidden Title {.md-hidden}

## 属性事件插槽简介

<ApiIntro />

### 基础用法

:::demo 基础写法：`<s-button icon="plus" type="primary">我是按钮</s-button>`。属性说明：`icon` 示例值：`plus`，类型：string / Component，可选值：图标名或图标组件，默认值：未设置；`type` 示例值：`primary`，类型：string，可选值：`primary` / `success` / `warning` / `danger` / `info` / `text`，默认值：`default` 或 `""`；`content` 示例值：`我是提示文字`，类型：string，默认值：`''`。本示例展示基础渲染和最小配置，可以直接复制基础写法后按业务替换数据。
button/base
:::

### 成华主题

#### chenghua主题示例

:::demo 基础写法：`<s-button theme="chenghua" variant="gradient" icon="set-up" width="288" size="large">审核规则管理</s-button>`。属性说明：`theme` 示例值：`chenghua`，类型：`'' \| 'chenghua'`，默认值：`''`；`variant` 示例值：`gradient`，类型：`'' \| 'outline' \| 'gradient'`，默认值：`''`；`icon` 示例值：`set-up`，类型：string / Component，可选值：图标名或图标组件，默认值：未设置；`width` 示例值：`288`，类型：string / number，默认值：`''`；`size` 示例值：`large`，类型：`'' \| 'small' \| 'default' \| 'large'`，默认值：`''`；`type` 示例值：`primary`，类型：string，可选值：`primary` / `success` / `warning` / `danger` / `info` / `text`，默认值：`default` 或 `""`；`disabled` 示例值：`true`，类型：boolean，可选值：`true` / `false`，默认值：`false`。本示例展示成华主题样式，可以直接复制基础写法后按业务替换数据。
button/chenghua/base
:::

### Hover 动效（hoverAnimation 默认值：false）

:::demo 基础写法：`<s-button hover-animation type="primary">移入动效</s-button>`。属性说明：`hover-animation` 示例值：`true`，类型：boolean，默认值：`false`；`type` 示例值：`primary`，类型：string，可选值：`primary` / `success` / `warning` / `danger` / `info` / `text`，默认值：`default` 或 `""`；`disabled` 示例值：`true`，类型：boolean，可选值：`true` / `false`，默认值：`false`。本示例展示鼠标移入上移并轻微放大的动效。`hoverAnimation` 控制按钮鼠标移入时是否上移并轻微放大，可选值是 `true` 和 `false`，默认值是 `false`。
button/hoverAnimation
:::

### 全局默认配置

button 支持在 `app.use` 的第二个参数里配置全局默认值，写法和 Element Plus 的全局配置保持一致。
文档站已全局设置 `dangerouslyUseHTMLString: true`，所以示例里的 `<code>` 默认会被解析；组件源码默认值仍是 `false`。

```js
app.use(SybzComponents, {
  theme: 'chenghua',
  size: 'small',
  dangerouslyUseHTMLString: true,
  button: {},
})
```

| 配置项                       | 可选值                                   | 默认值  | 说明                                      |
| ---------------------------- | ---------------------------------------- | ------- | ----------------------------------------- |
| `theme`                      | `'' \| 'chenghua'`                       | `''`    | 公共主题，声明同名 prop 的组件会读取      |
| `size`                       | `'' \| 'small' \| 'default' \| 'large'` | `''`    | 公共尺寸，button 会作为默认尺寸           |
| `dangerouslyUseHTMLString`   | `true \| false`                          | `false` | 是否将 content 类提示内容按 HTML 字符串渲染 |
| `button`                     | object                                   | `{}`    | button 单独默认配置，优先级高于公共配置   |

### 图标按钮

:::demo 基础写法：`<s-button :icon="Plus" type="primary">导入 Plus</s-button>`。属性说明：`icon` 示例值：`Plus`，类型：string / Component，可选值：图标名或图标组件，默认值：未设置；`type` 示例值：`primary`，类型：string，可选值：`primary` / `success` / `warning` / `danger` / `info` / `text`，默认值：`default` 或 `""`；`size` 示例值：`large`，类型：`'' \| 'small' \| 'default' \| 'large'`，默认值：`''`；`plain` 示例值：`true`，类型：boolean，可选值：`true` / `false`，默认值：`false`。本示例展示图标按钮配置，可以直接复制基础写法后按业务替换数据。
button/icon
:::

### 提示文字

:::demo 基础写法：`<s-button content="我是提示文字" icon="plus" @click="handleClick">有提示且有icon</s-button>`。属性说明：`content` 示例值：`我是提示文字`，类型：string，默认值：`''`；`icon` 示例值：`plus`，类型：string / Component，可选值：图标名或图标组件，默认值：未设置；`dangerouslyUseHTMLString` 示例值：`true`，类型：boolean，默认值：`false`；`tooltipAttrs` 示例值：`{ placement: 'right' }`，类型：Object [去tooltip组件](../tooltip/home)，默认值：`{}`；`text` 示例值：`true`，类型：boolean，可选值：`true` / `false`，默认值：`false`。本示例展示提示内容配置，可以直接复制基础写法后按业务替换数据。
button/content
:::

### 防抖

:::demo 基础写法：`<s-button :time="timeValue" @click="handleClick" icon="plus">1秒防抖</s-button>`。属性说明：`time` 示例值：`timeValue`，类型：number(毫秒)，默认值：`0`；`icon` 示例值：`plus`，类型：string / Component，可选值：图标名或图标组件，默认值：未设置；`loading` 示例值：`false`，类型：boolean，可选值：`true` / `false`，默认值：`false`。本示例展示点击频率控制，可以直接复制基础写法后按业务替换数据。
button/throttle
:::

### slots

:::demo 基础写法：`<el-button :time="1000" @click="handleClick">...</el-button>`。属性说明：`time` 示例值：`1000`，类型：number(毫秒)，默认值：`0`。本示例展示插槽内容定制，可以直接复制基础写法后按业务替换数据。
button/slots
:::

### other

:::demo 基础写法：`<el-card shadow="never">...</el-card>`。属性说明：`shadow` 示例值：`never`，类型/可选值/默认值按内部组件或 Element Plus 对应属性；`wrap` 示例值：`true`，类型/可选值/默认值按内部组件或 Element Plus 对应属性；`size` 示例值：`40`，类型：`'' \| 'small' \| 'default' \| 'large'`，默认值：`''`；`v-tippy` 示例值：`{ content: '点击查看详细文档', }`，类型/可选值/默认值按内部组件或 Element Plus 对应属性；`href` 示例值：`https://element-plus.org/zh-CN/co...`，类型/可选值/默认值按内部组件或 Element Plus 对应属性；`target` 示例值：`_blank`，类型/可选值/默认值按内部组件或 Element Plus 对应属性；`v-model` 示例值：`size`，类型由绑定值决定，默认值由绑定变量初始值决定；`value` 示例值：`large`，类型：string / number，默认值：未设置。本示例展示other配置，可以直接复制基础写法后按业务替换数据。
button/other
:::

### 属性

其他属性默认继承 `el-button`

|             属性名              | 说明                                | 类型                                    | 默认值  |
| :-----------------------------: | ----------------------------------- | --------------------------------------- | ------- |
|            `content`            | tooltip 的提示文字                  | string                                  | `''`    |
|             `time`              | 防抖时长                            | number(毫秒)                            | `0`     |
|         `tooltipAttrs`          | s-tooltip 组件的属性                | Object [去tooltip组件](../tooltip/home) | `{}`    |
| `dangerouslyUseHTMLString`      | 是否将 `content` 按 HTML 字符串渲染 | boolean                                 | `false` |
|            `theme`              | 主题样式                            | `'' \| 'chenghua'`                      | `''`    |
|           `variant`             | 成华主题样式变体                    | `'' \| 'outline' \| 'gradient'`         | `''`    |
|             `size`              | 按钮尺寸                            | `'' \| 'small' \| 'default' \| 'large'` | `''`    |
|            `width`              | 按钮宽度，支持 `processWidth` 写法  | string / number                         | `''`    |
|            `height`             | 按钮高度，支持 `processWidth` 写法  | string / number                         | `''`    |
|       `hoverAnimation`          | 鼠标移入时上移并轻微放大的动效      | boolean                                 | `false` |

### 事件

| 事件名  | 说明                                         |
| :-----: | -------------------------------------------- |
| `click` | 按钮点击事件，设置 `time` 后会按防抖逻辑触发 |
