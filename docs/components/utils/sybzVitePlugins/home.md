# sybzVitePlugins Vite 插件预设

## Hidden Title {.md-hidden}

<DocBasicUsage code="...sybzVitePlugins()" />

### 基础用法

`sybzVitePlugins()` 默认同时启用代码定位和 Git 提交信息。业务项目安装 `sybz-components` 后，不需要再单独安装或配置 `code-inspector-plugin`。

```ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { sybzVitePlugins } from 'sybz-components/vite'

export default defineConfig({
  plugins: [vue(), ...sybzVitePlugins()],
})
```

### 配置项

| 属性名称        | 类型                                  | 可选值                | 默认值 | 说明                                |
| --------------- | ------------------------------------- | --------------------- | ------ | ----------------------------------- |
| `codeInspector` | `boolean \| SybzCodeInspectorOptions` | `false/true/配置对象` | `true` | 是否启用代码定位，或传入插件配置。  |
| `gitCommitLog`  | `boolean \| GitCommitLogOptions`      | `false/true/配置对象` | `true` | 是否启用 Git 信息，或传入插件配置。 |

`bundler` 已固定为 `vite`，业务项目无需重复传入。

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
