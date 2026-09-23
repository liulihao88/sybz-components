# useRefresh 页面刷新

## Hidden Title {.md-hidden}

<DocBasicUsage code="const { refreshKey, refresh } = useRefresh()" />

### 基础用法

使用 `refreshKey` 重新挂载当前路由组件；Mac 使用 `⌘ + Enter`，Windows 使用 `Ctrl + Enter`，也可以点击刷新按钮。

```vue
<script setup lang="ts">
import { useRefresh } from 'sybz-components'

const { refreshKey, refresh } = useRefresh()
</script>

<template>
  <s-button icon="refresh" @click="refresh">刷新当前页面</s-button>

  <RouterView v-slot="{ Component, route: viewRoute }">
    <component :is="Component" :key="`${String(viewRoute.name)}-${refreshKey}`" />
  </RouterView>
</template>
```

### 返回值

| 名称         | 类型          | 说明                           |
| ------------ | ------------- | ------------------------------ |
| `refreshKey` | `Ref<number>` | 当前刷新标识，用于组件 `key`。 |
| `refresh`    | `() => void`  | 手动刷新当前组件。             |

### 说明

`useRefresh` 会在组件挂载时注册快捷键，并在组件卸载时自动清理。改变 `refreshKey` 只会重新挂载绑定该 `key` 的组件，不会重新加载整个网页。
