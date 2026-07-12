# button按钮组件

[https://element-plus.org/zh-CN/component/button.html](https://element-plus.org/zh-CN/component/button.html)

## Hidden Title {.md-hidden}

<DocBasicUsage code='<s-button>按钮</s-button>' />

## 属性事件插槽简介

<ApiIntro />

### 基础用法

:::demo 展示 `content` 和 `icon`。基础写法：`<s-button content="我是提示文字" icon="plus">有提示且有icon</s-button>`。属性：`content` 类型 `string`，默认值 `''`；`icon` 类型 `string / Component`，默认值未设置。
button/base
:::

### 成华主题

#### chenghua主题示例

:::demo 展示成华主题按钮。基础写法：`<s-button theme="chenghua" variant="gradient" icon="set-up" width="288" size="large">审核规则管理</s-button>`。属性：`theme` 可选 `default / chenghua / shijingshan`，默认值 `default`；`variant` 可选 `'' / outline / gradient`，默认值 `''`；`width`、`height` 类型 `string / number`，默认值 `''`。
button/chenghua/base
:::

### 石景山主题

#### shijingshan主题示例

:::demo 展示石景山主题按钮。基础写法：`<s-button theme="shijingshan" type="primary" icon="plus">新增项目</s-button>`。属性：`theme` 可选 `default / chenghua / shijingshan`，默认值 `default`；`width`、`height` 类型 `string / number`，默认值 `''`。
button/shijingshan/base
:::

### Hover 动效（hoverAnimation 默认值：false）

:::demo 展示 `hoverAnimation`。基础写法：`<s-button hover-animation type="primary">移入动效</s-button>`。属性：`hoverAnimation` 可选 `true / false`，默认值 `false`。
button/hoverAnimation
:::

### 图标按钮

:::demo 展示 `icon` 的字符串和组件写法。基础写法：`<s-button :icon="Plus" type="primary">导入 Plus</s-button>`。属性：`icon` 类型 `string / Component`，默认值未设置。
button/icon
:::

### 提示文字

:::demo 展示提示文字。基础写法：`<s-button content="我是提示文字" icon="plus" @click="handleClick">有提示且有icon</s-button>`。属性：`content` 类型 `string`，默认值 `''`；`dangerouslyUseHTMLString` 可选 `true / false`，默认值 `false`；`tooltipAttrs` 类型 `object`，默认值 `{}`。
button/content
:::

### 防抖

:::demo 展示点击防抖。基础写法：`<s-button :time="timeValue" icon="plus" @click="handleClick">1秒防抖</s-button>`。属性：`time` 类型 `number`，单位毫秒，默认值 `0`。
button/throttle
:::

### 插槽（icon / loading / default）

:::demo 展示 `icon`、`loading` 和默认插槽。基础写法：`<s-button type="primary"><template #icon></template>左侧图标 + 文字</s-button>`。插槽：`default` 默认内容；`icon` 自定义左侧图标；`loading` 自定义加载图标。
button/slots
:::

### other

:::demo 展示 Element Plus 按钮能力透传。基础写法：`<s-button type="primary" :size="dynamicSize">Primary</s-button>`。属性：该示例主要展示 `el-button` 属性透传，具体可选值以 Element Plus Button 为准。
button/other
:::

### 属性

其他属性默认继承 `el-button`

|           属性名           | 说明                                | 类型                                       | 默认值    |
| :------------------------: | ----------------------------------- | ------------------------------------------ | --------- |
|         `content`          | tooltip 的提示文字                  | string                                     | `''`      |
|           `time`           | 防抖时长                            | number(毫秒)                               | `0`       |
|       `tooltipAttrs`       | s-tooltip 组件的属性                | Object [去tooltip组件](../tooltip/home)    | `{}`      |
| `dangerouslyUseHTMLString` | 是否将 `content` 按 HTML 字符串渲染 | boolean                                    | `false`   |
|          `theme`           | 主题样式                            | `'default' \| 'chenghua' \| 'shijingshan'` | `default` |
|         `variant`          | 主题样式变体                        | `'' \| 'outline' \| 'gradient'`            | `default` |
|           `size`           | 按钮尺寸                            | `'small' \| 'default' \| 'large'`          | `''`      |
|          `width`           | 按钮宽度，支持 `processWidth` 写法  | string / number                            | `''`      |
|          `height`          | 按钮高度，支持 `processWidth` 写法  | string / number                            | `''`      |
|      `hoverAnimation`      | 鼠标移入时上移并轻微放大的动效      | boolean                                    | `false`   |

### 事件

| 事件名  | 说明                                         |
| :-----: | -------------------------------------------- |
| `click` | 按钮点击事件，设置 `time` 后会按防抖逻辑触发 |

### 插槽

|  插槽名   | 说明                | 参数 |
| :-------: | ------------------- | ---- |
| `default` | 自定义按钮内容      | -    |
|  `icon`   | 自定义按钮左侧图标  | -    |
| `loading` | 自定义 loading 图标 | -    |
