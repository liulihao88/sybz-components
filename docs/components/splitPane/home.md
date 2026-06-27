# SplitPane 切割面板

参考 `vue3-template` 中的 `ReSplitPane` 封装，用原生 Vue + CSS 实现，不依赖 Element Plus 布局组件。

## Hidden Title {.md-hidden}

<DocBasicUsage code='<s-split-pane :split-set="setting" @resize="handleResize"></s-split-pane>' />

## 属性事件插槽简介

<ApiIntro />

### 基础用法

:::demo 基础写法：`<s-split-pane :split-set="setting" @resize="handleResize">...</s-split-pane>`。属性说明：`split-set` 示例值：`setting`，类型：`{ minPercent?: number; defaultPercent?: number; split?: 'vertical' / 'horizontal' }`，默认值：`{}`。本示例展示基础渲染和最小配置，可以直接复制基础写法后按业务替换数据。
splitPane/base
:::

### 嵌套切割

:::demo 基础写法：`<s-split-pane :split-set="settingLR">...</s-split-pane>`。属性说明：`split-set` 示例值：`settingLR`，类型：`{ minPercent?: number; defaultPercent?: number; split?: 'vertical' / 'horizontal' }`，默认值：`{}`。本示例展示嵌套切割配置，可以直接复制基础写法后按业务替换数据。
splitPane/nested
:::

### 滑块控制左侧宽度

:::demo 基础写法：`<s-split-pane v-model="leftPercent" :min-percent="10">...</s-split-pane>`。属性说明：`v-model` 示例值：`leftPercent`，类型由绑定值决定，默认值由绑定变量初始值决定；`min-percent` 示例值：`10`，类型：number，默认值：`0`。本示例展示宽度配置，可以直接复制基础写法后按业务替换数据。
splitPane/slider
:::

### 多选控制区域显隐

:::demo 基础写法：`<s-split-pane v-model="splitPercent" :min-percent="0" :reset-on-click="visiblePanels.length === 2">...</s-split-pane>`。属性说明：`v-model` 示例值：`splitPercent`，类型由绑定值决定，默认值由绑定变量初始值决定；`min-percent` 示例值：`0`，类型：number，默认值：`0`；`reset-on-click` 示例值：`visiblePanels.length === 2`，类型：boolean，默认值：`true`。本示例展示多选交互，可以直接复制基础写法后按业务替换数据。
splitPane/visible
:::

### API

|      属性名      | 说明                                                     | 类型                                                                                  | 默认值     |
| :--------------: | -------------------------------------------------------- | ------------------------------------------------------------------------------------- | ---------- |
|   `modelValue`   | 当前左侧或上方面板百分比，支持 `v-model`                 | number                                                                                | -          |
|    `splitSet`    | 面板配置，兼容 `vue3-template` 的写法                    | `{ minPercent?: number; defaultPercent?: number; split?: 'vertical' / 'horizontal' }` | `{}`       |
|     `split`      | 切割方向，`vertical` 为左右切割，`horizontal` 为上下切割 | `vertical` / `horizontal`                                                             | `vertical` |
|   `minPercent`   | 左/上面板最小百分比，右/下面板同样会保留该最小百分比     | number                                                                                | `0`        |
| `defaultPercent` | 左/上面板默认百分比                                      | number                                                                                | `50`       |
|  `resizerSize`   | 拖拽条尺寸                                               | string / number                                                                       | `6`        |
|  `resetOnClick`  | 点击拖拽条是否重置为 50%                                 | boolean                                                                               | `true`     |

### 插槽

| 插槽名  | 说明                               |
| :-----: | ---------------------------------- |
| `paneL` | 左侧或上方面板内容，兼容源组件命名 |
| `paneR` | 右侧或下方面板内容，兼容源组件命名 |
| `left`  | 左侧或上方面板内容别名             |
| `right` | 右侧或下方面板内容别名             |

### 事件

|       事件名        | 说明                                 | 回调参数                    |
| :-----------------: | ------------------------------------ | --------------------------- |
| `update:modelValue` | 拖拽改变百分比时触发，用于 `v-model` | `(percent: number) => void` |
|      `resize`       | 拖拽改变面板比例时触发               | `(percent: number) => void` |
