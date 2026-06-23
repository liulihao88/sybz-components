# button按钮组件

[https://element-plus.org/zh-CN/component/button.html](https://element-plus.org/zh-CN/component/button.html)

## Hidden Title {.md-hidden}

## 属性事件插槽简介

<ApiIntro />

### 基础用法

:::demo
button/base
:::

### 成华主题

#### chenghua主题示例

:::demo
button/chenghua/base
:::

### Hover 动效（hoverAnimation 默认值：false）

:::demo `hoverAnimation` 控制按钮鼠标移入时是否上移并轻微放大，可选值是 `true` 和 `false`，默认值是 `false`。
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

:::demo
button/icon
:::

### 提示文字

:::demo
button/content
:::

### 防抖

:::demo
button/throttle
:::

### slots

:::demo
button/slots
:::

### other

:::demo
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
