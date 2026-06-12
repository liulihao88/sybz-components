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

:::demo
button/chenghua
:::

### 全局默认配置

button 支持通过 `globalComponentConfig` 配置全局默认值，组件 key 为 `sButton`。

```js
app.use(SybzComponents, {
  globalComponentConfig: {
    sButton: {
      theme: 'chenghua',
    },
  },
})
```

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

|    属性名    | 说明                | 类型                                    | 默认值 |
| :----------: | ------------------- | --------------------------------------- | ------ |
|   content    | tooltip的提示文字   | string                                  | ''     |
|     time     | 防抖时长            | number(毫秒)                            | 0      |
| tooltipAttrs | s-tooltip组件的属性 | Object [去tooltip组件](../tooltip/home) | {}     |
|    theme     | 主题样式            | `'chenghua'`                            | ''     |
|    width     | 按钮宽度，支持 `processWidth` 写法 | string / number                         | ''     |
|    height    | 按钮高度，支持 `processWidth` 写法 | string / number                         | ''     |

### 事件

| 事件名  | 说明                                         |
| :-----: | -------------------------------------------- |
| `click` | 按钮点击事件，设置 `time` 后会按防抖逻辑触发 |
