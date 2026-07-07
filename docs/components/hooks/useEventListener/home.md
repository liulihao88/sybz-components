# useEventListener 事件监听

## Hidden Title {.md-hidden}

<DocBasicUsage code="useEventListener(targetRef, 'click', handler)" />

### 基础用法

:::demo 展示给指定元素绑定点击事件。基础写法：`useEventListener(targetRef, 'click', handler)`。
hooks/useEventListener/base
:::

### 说明

`useEventListener` 用于给元素、`window`、`document` 等目标绑定事件，并在组件卸载时自动清理。

### 调用形式

```ts
useEventListener(target, event, handler)
```

### 参数说明

| 参数      | 类型                                      | 必填 | 默认值 | 说明           |
| --------- | ----------------------------------------- | ---- | ------ | -------------- |
| `target`  | `EventTarget \| Ref<EventTarget \| null>` | 是   | -      | 事件目标。     |
| `event`   | `string`                                  | 是   | -      | 事件名称。     |
| `handler` | `(event: Event) => any`                   | 是   | -      | 事件处理函数。 |

### 注意事项

如果 `target` 是普通 DOM 对象，会在 `onMounted` 后绑定；如果 `target` 是 Ref，会在 Ref 变化时自动切换监听对象。
