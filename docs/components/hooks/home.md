# Hooks 总览

## Hidden Title {.md-hidden}

`hooks` 是基于 Vue 组合式 API 的状态和生命周期封装，适合放在 `sybz-components` 主包中使用。它们和组件一样依赖 Vue 运行环境；`@sybz-components/utils` 更适合放不依赖 Vue 的纯函数，例如格式化、校验、复制、时间处理。

### 主流用法

主流 Vue 组件库通常会把 composables/hooks 从组件库入口或独立子路径导出：

```ts
import { useLoading, usePagination } from 'sybz-components'
```

```ts
import { useLoading, usePagination } from 'sybz-components/hooks'
```

这种写法是合适的：业务项目不需要知道 hooks 的源码目录，也方便后续保持 API 稳定。建议业务侧优先从 `sybz-components` 引入；如果只想表达“我只用 hooks”，可以从 `sybz-components/hooks` 引入。

### 当前 Hooks

- [useBoolean 布尔状态](/components/hooks/useBoolean/home.md)
- [useLoading 加载状态](/components/hooks/useLoading/home.md)
- [usePagination 分页状态](/components/hooks/usePagination/home.md)
- [useDebounceFn 防抖函数](/components/hooks/useDebounceFn/home.md)
- [useThrottleFn 节流函数](/components/hooks/useThrottleFn/home.md)
- [useElementSize 元素尺寸](/components/hooks/useElementSize/home.md)
- [useEventListener 事件监听](/components/hooks/useEventListener/home.md)
- [useClickOutside 外部点击](/components/hooks/useClickOutside/home.md)
- [useZIndex 层级管理](/components/hooks/useZIndex/home.md)

### 放在哪里更合适

| 类型 | 推荐位置 | 说明 |
| ---- | -------- | ---- |
| 依赖 `ref`、`computed`、生命周期、DOM 响应式监听的组合式函数 | `sybz-components/hooks` | 和 Vue 强绑定，属于组件库能力 |
| 纯函数、格式化、校验、数据转换 | `@sybz-components/utils` | 不依赖 Vue，更适合作为独立工具包 |
| 只服务组件内部的封装 | `packages/hooks` 内部使用 | 可以导出，也可以不暴露给业务 |

`useGlobalComponentConfig` 是组件库内部用于合并全局组件配置的 hook，业务项目通常不需要直接使用。
