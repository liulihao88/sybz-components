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

:::demo 展示成华主题按钮。基础写法：`<s-button theme="chenghua" variant="gradient" icon="set-up" width="288" size="large">审核规则管理</s-button>`。`variant` 可选 `'' / outline / gradient`，默认值 `''`；`ghost` 可选 `true / false`，默认值 `false`；`width`、`height` 类型 `string / number`，默认值 `''`。
button/chenghua/base
:::

### 石景山主题

#### shijingshan主题示例

:::demo 展示石景山主题按钮。基础写法：`<s-button theme="shijingshan" type="primary" icon="plus">新增项目</s-button>`。`ghost` 可选 `true / false`，默认值 `false`；`width`、`height` 类型 `string / number`，默认值 `''`。
button/shijingshan/base
:::

### Hover 动效（hoverAnimation 默认值：false）

:::demo 展示 `hoverAnimation`。基础写法：`<s-button hover-animation type="primary">移入动效</s-button>`。属性：`hoverAnimation` 可选 `true / false`，默认值 `false`。
button/hoverAnimation
:::

### 图标按钮

:::demo 展示 `icon` 的 Element Plus 组件、图标名称和 Iconify 写法。基础写法：`<s-button icon="tabler:user-dollar" type="warning">Iconify 图标</s-button>`。属性：`icon` 类型 `string / Component`，默认值未设置；字符串包含 `:` 时自动使用 Iconify，后台业务图标默认推荐 `tabler:*`；普通字符串按 Element Plus 图标名称处理。
button/icon
:::

### 图标位置（iconPlacement 默认值：start）

:::demo 展示按钮图标在文字前后的位置。基础写法：`<s-button icon="plus" icon-placement="end">图标在后</s-button>`。属性：`iconPlacement` 可选 `start / end`，默认值 `start`。
button/iconPlacement
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

### 幽灵按钮（ghost 默认值：false）

:::demo 展示透明背景的幽灵按钮，适合在复杂或深色背景中使用。基础写法：`<s-button ghost type="primary">Primary</s-button>`。属性：`ghost` 可选 `true / false`，默认值 `false`；可与 `type`、`disabled` 等按钮属性组合使用。
button/ghost
:::

### 链接 link

:::demo
button/link
:::

### 自定义颜色（color 默认值：''，dark 默认值：false）

:::demo 展示自定义颜色及深色模式下的颜色适配。基础写法：`<s-button color="#626aef">自定义颜色</s-button>`。属性：`color` 类型 `string`，默认值 `''`；`dark` 可选 `true / false`，默认值 `false`；可与 `plain`、`disabled` 组合使用。
button/customColor
:::

### other

:::demo
button/other
:::

### 属性

其他属性默认继承 `el-button`

:::demo 展示链接按钮。设置 `href` 后会渲染为链接并直接打开 URL。基础写法：`<s-button href="https://element-plus.org" target="_blank">在新窗口打开文档</s-button>`。属性：`href` 类型 `string`，默认值 `''`；`target` 可选 `_blank / _parent / _self / _top`，默认值 `_self`。
button/href

:::

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
|          `ghost`           | 幽灵按钮，使背景透明                | boolean                                    | `false`   |
|      `iconPlacement`       | 按钮图标的位置                      | `'start' \| 'end'`                         | `start`   |

| `href` | 链接地址，设置后渲染为链接 | string | `''` |
| `target` | 链接打开目标 | `'_blank' \| '_parent' \| '_self' \| '_top'` | `_self` |

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
