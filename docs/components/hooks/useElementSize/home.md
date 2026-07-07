# useElementSize 元素尺寸

## Hidden Title {.md-hidden}

<DocBasicUsage code='const { width, height } = useElementSize(targetRef)' />

### 基础用法

:::demo 展示拖动改变元素宽度后实时读取尺寸。基础写法：`const { width, height } = useElementSize(targetRef)`。属性：`width` 类型 `string / number`，默认值 `''`。
hooks/useElementSize/base
:::

### 说明

`useElementSize` 基于 `ResizeObserver` 监听元素尺寸变化，适合自适应图表、虚拟列表容器、拖拽面板、响应式布局计算等场景。

### 调用形式

```ts
const targetRef = ref<HTMLElement>()
const { width, height, size } = useElementSize(targetRef)
```

### 参数说明

| 参数                    | 类型                               | 必填 | 默认值 | 说明                                   |
| ----------------------- | ---------------------------------- | ---- | ------ | -------------------------------------- |
| `target`                | `HTMLElement \| SVGElement \| Ref` | 是   | -      | 要监听尺寸的元素或元素 Ref。           |
| `options.initialWidth`  | `number`                           | 否   | `0`    | 初始宽度。                             |
| `options.initialHeight` | `number`                           | 否   | `0`    | 初始高度。                             |
| `options.box`           | `ResizeObserverBoxOptions`         | 否   | -      | `ResizeObserver.observe` 的 box 配置。 |

### 返回值

| 名称     | 类型                                             | 说明       |
| -------- | ------------------------------------------------ | ---------- |
| `width`  | `Ref<number>`                                    | 当前宽度。 |
| `height` | `Ref<number>`                                    | 当前高度。 |
| `size`   | `ComputedRef<{ width: number; height: number }>` | 宽高对象。 |
