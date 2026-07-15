# useFlexFillSize Flex 剩余空间尺寸

## Hidden Title {.md-hidden}

<DocBasicUsage code='const { height } = useFlexFillSize(tableContainerRef)' />

::: warning
父容器需要设置flex布局
:::

### 基础用法（默认值：flex = `1 1 0`、overflow = `hidden`、box = `border-box`）

:::demo 自动填充纵向 Flex 容器的剩余空间，并将实时高度传给表格。基础写法：`const { height } = useFlexFillSize(tableContainerRef)`。选项：`flex` 可传任意合法 CSS flex 值，默认值 `1 1 0`；`overflow` 可传任意合法 CSS overflow 值，默认值 `hidden`；`box` 可选 `content-box`、`border-box`、`device-pixel-content-box`，默认值 `border-box`；`initialSize` 默认值 `{ width: 0, height: 0 }`。
hooks/useFlexFillSize/base
:::

### 说明

`useFlexFillSize` 会让目标 HTML 元素填满 Flex 容器的剩余空间，同时返回响应式宽高。适用于页面、Dialog、Drawer 中需要自动适应可用高度的表格或列表容器。

目标元素的父级需要设置固定或可计算的高度，并使用 Flex 布局；纵向填充时还需要设置 `flex-direction: column` 和 `min-height: 0`。

### 调用形式

```ts
const tableContainerRef = ref<HTMLElement>()
const { width, height, stop } = useFlexFillSize(tableContainerRef)
```

### 参数说明

| 参数                  | 类型                                | 可选值                                                    | 必填 | 默认值                    | 说明                         |
| --------------------- | ----------------------------------- | --------------------------------------------------------- | ---- | ------------------------- | ---------------------------- |
| `target`              | `MaybeComputedElementRef`           | HTML 元素、组件实例、Ref 或 getter                        | 是   | -                         | 要填充并监听尺寸的目标元素。 |
| `options.flex`        | `string`                            | 任意合法 CSS `flex` 值                                    | 否   | `1 1 0`                   | 目标元素的 Flex 填充规则。   |
| `options.overflow`    | `string`                            | 任意合法 CSS `overflow` 值                                | 否   | `hidden`                  | 目标元素的溢出规则。         |
| `options.box`         | `ResizeObserverBoxOptions`          | `content-box` / `border-box` / `device-pixel-content-box` | 否   | `border-box`              | ResizeObserver 的盒模型。    |
| `options.initialSize` | `{ width: number; height: number }` | 宽高数值                                                  | 否   | `{ width: 0, height: 0 }` | 首次测量前使用的初始尺寸。   |
| 其他选项              | `UseResizeObserverOptions`          | VueUse `useResizeObserver` 支持的选项                     | 否   | -                         | 透传给 VueUse 的尺寸监听。   |

### 返回值

| 名称     | 类型          | 说明                   |
| -------- | ------------- | ---------------------- |
| `width`  | `Ref<number>` | 目标元素的实时宽度。   |
| `height` | `Ref<number>` | 目标元素的实时高度。   |
| `stop`   | `() => void`  | 停止监听目标元素尺寸。 |
