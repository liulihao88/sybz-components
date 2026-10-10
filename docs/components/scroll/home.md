# Scroll 滚动区域

`s-scroll` 提供自定义滚动条，保留原生视口的滚轮、触摸和键盘滚动能力。用法参考 [Mantine ScrollArea](https://mantine.dev/core/scroll-area/)。

## Hidden Title {.md-hidden}

<DocBasicUsage code='<s-scroll height="200px"><div>内容</div></s-scroll>' />

## 属性事件插槽简介

<ApiIntro />

### 基础用法（`type` 默认值：`hover`）

:::demo 基础写法：`<s-scroll height="200px">内容</s-scroll>`。设置高度后，内容超出时可滚动；`type` 可选 `hover / scroll / auto / always / never`，默认 `hover`。
scroll/base
:::

### 显示策略与配置

:::demo 基础写法：`<s-scroll type="hover" :scrollbar-size="8" :scroll-hide-delay="1000">内容</s-scroll>`。`type` 可选 `hover / scroll / auto / always / never`，默认 `hover`；`offsetScrollbars` 可选 `false / true / x / y / present`，默认 `false`；`overscrollBehavior` 可选 `auto / contain / none`，默认 `auto`；`scrollbarSize` 为非负数字，`0` 时隐藏滚动条，默认 `8`；`scrollHideDelay` 为毫秒数，默认 `1000`。
scroll/usage
:::

### 横向滚动

:::demo 基础写法：`<s-scroll width="300px" height="200px">宽内容</s-scroll>`。`scrollbars` 可选 `x / y / xy`，默认 `xy`；`width`、`height` 可用字符串或数字，默认由父元素和内容决定。
scroll/horizontal
:::

### 禁用横向滚动

:::demo 基础写法：`<s-scroll scrollbars="y">宽内容</s-scroll>`。`scrollbars` 可选 `x / y / xy`，默认 `xy`。
scroll/verticalOnly
:::

### 纵向滚动条位置

:::demo 基础写法：`<s-scroll vertical-scrollbar-position="right" offset-scrollbars>内容</s-scroll>`。`verticalScrollbarPosition` 可选 `left / right`，默认跟随文本方向；`offsetScrollbars` 默认 `false`。
scroll/verticalPosition
:::

### 订阅滚动位置

:::demo 基础写法：`<s-scroll @scroll-position-change="handleScroll">内容</s-scroll>`。事件返回 `{ x, y }`，坐标为视口滚动位置；无需额外属性。
scroll/position
:::

### 滚动边界回调

:::demo 基础写法：`<s-scroll @top-reached="onTop" @bottom-reached="onBottom" @left-reached="onLeft" @right-reached="onRight">内容</s-scroll>`。四个事件分别在进入相应边界时触发；无需额外属性。
scroll/boundaries
:::

### 滚动到指定位置

:::demo 基础写法：通过组件 `ref.viewport` 取得原生视口，调用 `scrollTo({ top, behavior: 'smooth' })`；也可调用组件实例的 `scrollTo` 方法。该示例不需要额外属性。
scroll/scrollTo
:::

### 初始滚动位置

:::demo 基础写法：`<s-scroll :start-scroll-position="{ y: 150 }">内容</s-scroll>`。`startScrollPosition` 支持 `{ x?: number, y?: number }`，默认 `{ x: 0, y: 0 }`。
scroll/start
:::

### 自定义样式

:::demo 基础写法：给 `s-scroll` 设置类名，再针对 `.s-scroll__track` 和 `.s-scroll__thumb` 定制轨道和滑块。`type` 可选 `hover / scroll / auto / always / never`，默认 `hover`；`offsetScrollbars` 默认 `false`。
scroll/styles
:::

### 滚动元素进入视口

:::demo 基础写法：从组件 `ref.viewport` 中找到目标元素，调用 `scrollIntoView({ block: 'nearest' })`。`type` 默认 `hover`，`scrollbars` 默认 `xy`。
scroll/intoView
:::

### 自动高度

:::demo 基础写法：`<s-scroll autosize max-height="300px">内容</s-scroll>`。`autosize` 可选 `true / false`，默认 `false`；`maxHeight` 支持字符串或数字，默认不设置；`overflow-change` 在纵向溢出状态改变时返回布尔值。
scroll/autosize
:::

### 自动高度与弹出层

:::demo 基础写法：在弹出层中使用 `<s-scroll autosize max-height="200px" type="always" scrollbars="y">列表</s-scroll>`。`autosize` 默认 `false`，`maxHeight` 默认不设置，`type` 默认 `hover`，`scrollbars` 默认 `xy`。
scroll/popover
:::

### API

| 属性                        | 说明                         | 类型 / 可选值                            | 默认值           |
| --------------------------- | ---------------------------- | ---------------------------------------- | ---------------- |
| `width` / `w`               | 容器宽度                     | string / number                          | 父元素决定       |
| `height` / `h`              | 容器高度                     | string / number                          | 内容决定         |
| `maxHeight`                 | 自动高度上限                 | string / number                          | 不设置           |
| `autosize`                  | 内容撑开高度，到上限后滚动   | boolean                                  | `false`          |
| `type`                      | 滚动条显示策略               | `hover / scroll / auto / always / never` | `hover`          |
| `scrollbars`                | 可滚动方向                   | `x / y / xy`                             | `xy`             |
| `offsetScrollbars`          | 为滚动条留出空间             | `false / true / x / y / present`         | `false`          |
| `scrollbarSize`             | 滚动条宽度；`0` 时隐藏滚动条 | 非负 number                              | `8`              |
| `scrollHideDelay`           | 隐藏延时，毫秒               | number                                   | `1000`           |
| `overscrollBehavior`        | 越界滚动行为                 | `auto / contain / none`                  | `auto`           |
| `verticalScrollbarPosition` | 纵向条位置                   | `left / right`                           | 跟随文本方向     |
| `startScrollPosition`       | 初始位置                     | `{ x?: number, y?: number }`             | `{ x: 0, y: 0 }` |

### 事件

| 事件                             | 参数       | 说明             |
| -------------------------------- | ---------- | ---------------- |
| `scroll-position-change`         | `{ x, y }` | 滚动坐标变化     |
| `top-reached` / `bottom-reached` | 无         | 进入纵向边界     |
| `left-reached` / `right-reached` | 无         | 进入横向边界     |
| `overflow-change`                | `boolean`  | 纵向溢出状态变化 |

### 插槽和实例

默认插槽放滚动内容。组件实例提供 `viewport` 原生元素与 `scrollTo(options)` 方法；`viewport` 可以使用原生 `scrollIntoView`、`scrollTo` 等 API。
