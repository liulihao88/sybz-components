# switch切换组件

[https://element-plus.org/zh-CN/component/switch.html](https://element-plus.org/zh-CN/component/switch.html)

## Hidden Title {.md-hidden}

## 属性事件插槽简介

<ApiIntro />

### 基础用法

:::demo 基础写法：`<s-switch v-model="cc">...</s-switch>`。属性说明：`v-model` 示例值：`cc`，类型由绑定值决定，默认值由绑定变量初始值决定；`active-text` 示例值：`这是active的text`，类型/可选值/默认值按内部组件或 Element Plus 对应属性；`inline-prompt` 示例值：`false`，类型/可选值/默认值按内部组件或 Element Plus 对应属性；`inactive-text` 示例值：`否`，类型/可选值/默认值按内部组件或 Element Plus 对应属性；`active-value` 示例值：`1`，类型/可选值/默认值按内部组件或 Element Plus 对应属性；`inactive-value` 示例值：`0`，类型/可选值/默认值按内部组件或 Element Plus 对应属性；`width` 示例值：`100`，类型/可选值/默认值按内部组件或 Element Plus 对应属性；`before-change` 示例值：`beforeChange`，类型/可选值/默认值按内部组件或 Element Plus 对应属性。本示例展示基础渲染和最小配置。这是switch的最基础用法。
switch/base
:::

### 成华主题

:::demo 基础写法：`<s-switch v-model="enabled" theme="chenghua" active-text="启用" inactive-text="停用" />`。属性说明：`v-model` 示例值：`enabled`，类型由绑定值决定，默认值由绑定变量初始值决定；`theme` 示例值：`chenghua`，类型/可选值/默认值按内部组件或 Element Plus 对应属性；`active-text` 示例值：`启用`，类型/可选值/默认值按内部组件或 Element Plus 对应属性；`inactive-text` 示例值：`停用`，类型/可选值/默认值按内部组件或 Element Plus 对应属性；`width` 示例值：`92`，类型/可选值/默认值按内部组件或 Element Plus 对应属性；`active-value` 示例值：`1`，类型/可选值/默认值按内部组件或 Element Plus 对应属性；`inactive-value` 示例值：`0`，类型/可选值/默认值按内部组件或 Element Plus 对应属性。本示例展示成华主题样式。`theme="chenghua"` 时启用成华主题样式。`theme` 的可选值是 `''` 和 `chenghua`，默认值是 `''`；`width` 支持 `string` 和 `number`，默认值是 `''`；`active-text` 和 `inactive-text` 的类型是 `string`，默认值都是 `''`。
switch/chenghua/base
:::

### 属性

|    属性名     | 说明                                                                             | 类型               | 默认值 |
| :-----------: | -------------------------------------------------------------------------------- | ------------------ | ------ |
|     theme     | 主题样式，支持 `''` / `chenghua`                                                 | string             | `''`   |
|  active-text  | switch 打开时的文字描述                                                          | string             | ''     |
| inactive-text | switch 的状态为 off 时的文字描述                                                 | string             | ''     |
| before-change | switch 状态改变前的钩子， 返回 `false` 或者返回 `Promise` 且被 reject 则停止切换 | boolean / Function | -      |
|     width     | switch 宽度                                                                      | string / number    | `''`   |

### 方法

| 属性名 | 说明                            | 类型     |
| :----: | ------------------------------- | -------- |
| change | switch 状态发生变化时的回调函数 | Function |

### 说明

- 组件内部会接管 `before-change`，自动处理异步切换时的 `loading` 状态。
- 默认透传 `inline-prompt`，并将文案显示在开关两侧。
