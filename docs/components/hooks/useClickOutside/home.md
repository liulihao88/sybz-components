# useClickOutside 外部点击

## Hidden Title {.md-hidden}

<DocBasicUsage code='useClickOutside(panelRef, () => { visible.value = false })' />

### 基础用法

:::demo 基础用法：`useClickOutside(panelRef, () => { visible.value = false })`。属性说明：`elementRef` 示例值：`panelRef`，类型：Ref<HTMLElement | undefined>，默认值：必传；`callback` 示例值：`() => { ... }`，类型：function，默认值：必传。点击目标元素外部时会执行回调。本示例展示点击外部关闭面板。
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
