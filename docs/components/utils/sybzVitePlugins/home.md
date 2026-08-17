# sybzVitePlugins Vite 插件预设

## Hidden Title {.md-hidden}

<DocBasicUsage code="...sybzVitePlugins()" />

### 基础用法

`sybzVitePlugins()` 默认同时启用代码定位、Git 提交信息和打包时间。业务项目安装 `@sybz-components/utils` 后，不需要再单独安装或配置 `code-inspector-plugin`、`vite-plugin-html`。

```ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { sybzVitePlugins } from '@sybz-components/utils/vite'

export default defineConfig({
  plugins: [vue(), ...sybzVitePlugins()],
})
```

### 配置项

| 属性名称        | 类型                                  | 可选值                | 默认值 | 说明                                |
| --------------- | ------------------------------------- | --------------------- | ------ | ----------------------------------- |
| `codeInspector` | `boolean \| SybzCodeInspectorOptions` | `false/true/配置对象` | `true` | 是否启用代码定位，或传入插件配置。  |
| `gitCommitLog`  | `boolean \| GitCommitLogOptions`      | `false/true/配置对象` | `true` | 是否启用 Git 信息，或传入插件配置。 |
| `buildTime`     | `boolean \| object`                   | `false/true/配置对象` | `true` | 是否注入打包时间及其 meta 配置。    |

`bundler` 已固定为 `vite`，业务项目无需重复传入。

### 查看打包时间

默认会在 HTML 头部注入：

```html
<meta name="buildTime" content="2026-08-16 08:30:00" />
```

可以从 meta 或全局变量读取：

```ts
const metaBuildTime = document.querySelector<HTMLMetaElement>('meta[name="buildTime"]')?.content
const globalBuildTime = window.__SYBZ_BUILD_TIME__
```

不需要打包时间时可关闭：

```ts
plugins: [...sybzVitePlugins({ buildTime: false })]
```

### 自定义配置

```ts
plugins: [
  ...sybzVitePlugins({
    codeInspector: {
      needEnvInspector: true,
    },
    gitCommitLog: {
      autoPrint: true,
      expanded: false,
      defaultLimit: 10,
    },
    buildTime: {
      metaName: 'buildTime',
    },
  }),
]
```

### 按需关闭

```ts
// 只启用代码定位
plugins: [...sybzVitePlugins({ gitCommitLog: false })]

// 只启用 Git 提交信息
plugins: [...sybzVitePlugins({ codeInspector: false })]
```

:::utils-source sybzVitePlugins
:::
