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

### 关闭快捷键

线上不需要快捷键时，传入 `enableShortcut: false`；`refresh()` 仍可通过按钮调用。也可以传入响应式值或 getter，运行时切换是否启用快捷键。

```ts
const { refreshKey, refresh } = useRefresh({ enableShortcut: import.meta.env.DEV })
```

| 选项             | 类型                                         | 可选值                                                                         | 默认值                                       | 说明                                                              |
| ---------------- | -------------------------------------------- | ------------------------------------------------------------------------------ | -------------------------------------------- | ----------------------------------------------------------------- |
| `enableShortcut` | `boolean \| Ref<boolean> \| (() => boolean)` | `true`、`false`                                                                | `true`                                       | 是否响应 Mac `⌘ + Enter` / Windows `Ctrl + Enter`。               |
| `shortcut`       | `string \| Ref<string> \| (() => string)`    | 按键与 `Ctrl`、`Meta`、`Alt`、`Shift`、`Mod` 的组合，如 `Alt+R`、`Mod+Shift+R` | Mac 为 `Meta+Enter`，其他系统为 `Ctrl+Enter` | 设置刷新快捷键；`Mod` 在 Mac 上代表 `Meta`，其他系统代表 `Ctrl`。 |

例如，将快捷键改为 `Alt + R`：

```ts
const { refreshKey, refresh } = useRefresh({ shortcut: 'Alt+R' })
```

### 说明

`useRefresh` 会在组件挂载时注册快捷键，并在组件卸载时自动清理。改变 `refreshKey` 只会重新挂载绑定该 `key` 的组件，不会重新加载整个网页。
