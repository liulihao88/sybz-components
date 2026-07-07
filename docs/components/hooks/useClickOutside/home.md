# useClickOutside 外部点击

## Hidden Title {.md-hidden}

<DocBasicUsage code='useClickOutside(panelRef, () => { visible.value = false })' />

### 基础用法

:::demo 展示点击外部关闭面板。基础写法：`useClickOutside(panelRef, () => { visible.value = false })`。
hooks/useClickOutside/base
:::

### 说明

`useClickOutside` 用于判断点击是否发生在指定元素外部，适合下拉面板、浮层、搜索建议、简易弹窗等场景。

### 调用形式

```ts
const panelRef = ref<HTMLElement>()
useClickOutside(panelRef, callback)
```

### 参数说明

| 参数         | 类型                            | 必填 | 默认值 | 说明                 |
| ------------ | ------------------------------- | ---- | ------ | -------------------- |
| `elementRef` | `Ref<HTMLElement \| undefined>` | 是   | -      | 要判断内外部的元素。 |
| `callback`   | `(event: MouseEvent) => void`   | 是   | -      | 点击外部时执行。     |
