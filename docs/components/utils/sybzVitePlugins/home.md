# sybzVitePlugins Vite 插件预设

## Hidden Title {.md-hidden}

<DocBasicUsage code="sybzVitePlugins()" />

### 基础用法

`sybzVitePlugins()` 默认同时启用 Vue JSX/TSX、Tailwind CSS v4、控制台源码定位、代码定位、Git 提交信息、打包时间和构建版本检测。业务项目安装 `@sybz-components/utils` 后，不需要再单独安装或配置 `@vitejs/plugin-vue-jsx`、`@tailwindcss/vite`、`code-inspector-plugin`、`vite-plugin-html`。

```ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { sybzVitePlugins } from '@sybz-components/utils/vite'

export default defineConfig({
  plugins: [vue(), sybzVitePlugins()],
})
```

`sybzVitePlugins()` 内部包含多个插件，并自动向 HTML 注入 Tailwind CSS 样式入口。业务项目无需单独安装 `tailwindcss` 或在 CSS 中写 `@import 'tailwindcss'`。Vite 的 `PluginOption` 原生支持插件数组并会自动扁平化，因此直接放入 `plugins`，无需使用展开运算符。

预设当前支持 Vite 5 和 6（Vite 7 / `rolldown-vite` 需在实际项目验证）。项目仍需自行安装并注册 `@vitejs/plugin-vue`。

:::tip 代码统一规范为什么不放进 Vite 插件？
ESLint、Prettier、lint-staged 和 Husky 分别运行在编辑器、命令行、Git 提交和 CI 阶段，不属于 Vite 生命周期。把它们放进 `sybzVitePlugins()` 会导致只有启动或构建 Vite 时才生效。统一规则已由同一工具包的 `@sybz-components/utils/codeStandard` 集中提供，业务项目只需导入预设，升级工具包即可同步规则。
:::

### 配置项

| 属性名称            | 类型                                  | 可选值                | 默认值  | 说明                                                           |
| ------------------- | ------------------------------------- | --------------------- | ------- | -------------------------------------------------------------- |
| `vueJsx`            | `boolean \| VueJsxOptions`            | `false/true/配置对象` | `true`  | 是否启用 Vue JSX/TSX，或传入插件配置。                         |
| `tailwind`          | `boolean \| TailwindPluginOptions`    | `false/true/配置对象` | `true`  | 是否启用 Tailwind CSS v4 插件。                                |
| `tailwindCss`       | `boolean`                             | `false/true`          | `true`  | 是否自动注入 Tailwind CSS 样式。                               |
| `tailwindPreflight` | `boolean`                             | `false/true`          | `true`  | 是否注入 Tailwind preflight 全局重置；已有全局样式时建议关闭。 |
| `codeInspector`     | `boolean \| SybzCodeInspectorOptions` | `false/true/配置对象` | `true`  | 是否启用代码定位，或传入插件配置。                             |
| `gitCommitLog`      | `boolean \| GitCommitLogOptions`      | `false/true/配置对象` | `true`  | 是否启用 Git 信息，或传入插件配置。                            |
| `buildTime`         | `boolean \| object`                   | `false/true/配置对象` | `true`  | 是否注入打包时间及其 meta 配置。                               |
| `consoleSource`     | `boolean \| SybzConsoleSourceOptions` | `false/true/配置对象` | `true`  | 开发环境给 console 日志追加源码位置。                          |
| `versionCheck`      | `boolean \| SybzVersionCheckOptions`  | `false/true/配置对象` | `true`  | 构建产物检测新版本并提示刷新。                                 |
| `compat`            | `boolean \| SybzCompatOptions`        | `false/true/配置对象` | `false` | 应用级 Chrome 60+ 兼容：target + legacy + PostCSS。            |

`bundler` 已固定为 `vite`，业务项目无需重复传入。

如果项目已自行注册 `vueJsx()`，请使用 `sybzVitePlugins({ vueJsx: false })`，避免重复注册。TSX 项目还需在 `tsconfig.json` 中设置 `"jsx": "preserve"` 和 `"jsxImportSource": "vue"`。

### 应用级低版本兼容（Chrome 60+）

`compat: true` 用于业务应用构建，会统一设置 Chrome 60 构建目标、生成 legacy 产物并注入 PostCSS 兼容插件。Chrome 60 不支持原生 ESM，必须生成 `nomodule` / SystemJS 产物，只设置 `build.target` 不够：

```sh
pnpm add -D @vitejs/plugin-legacy
```

如果项目未安装 `terser`，同时安装 `terser`（`plugin-legacy` 的 peer 依赖）。

```ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { sybzVitePlugins } from '@sybz-components/utils/vite'

export default defineConfig({
  plugins: [vue(), sybzVitePlugins({ compat: true })],
})
```

- `@vitejs/plugin-legacy` 需要与 Vite 大版本匹配：Vite 5 用 `^5`、Vite 6 用 `^6`、Vite 7 用 `^7`。
- 该选项只用于应用构建，不要用于组件库的 lib 构建。
- 项目已有 `postcss.config` 时，预设会跳过自动注入，请合并 `createSybzCompatPostcssPlugins()`。
- `compat` 也可传对象调整 `targets`、`buildTarget`、`legacy`、`postcss`、`browsers`。

### 默认使用 VS Code 打开源码

`codeInspector` 默认使用 VS Code 打开定位到的源码，无需额外配置，等同于：

```ts
plugins: [
  sybzVitePlugins({
    vueJsx: {
      defineComponentName: ['defineComponent'],
    },
    codeInspector: {
      editor: 'code',
    },
  }),
]
```

| 属性名称 | 可选值                                                                                                  | 默认值 | 说明                 |
| -------- | ------------------------------------------------------------------------------------------------------- | ------ | -------------------- |
| `editor` | `code`、`cursor`、`webstorm` 等[受支持的编辑器](https://github.com/zh-lx/launch-ide#-supported-editors) | `code` | 打开源码使用的编辑器 |

其他编辑器的配置可查看 [code-inspector IDE 配置列表](https://inspector.fe-dev.cn/guide/ide.html)。

如果项目已有全局样式，Tailwind preflight 的 `* { margin: 0; padding: 0 }` 可能与现有布局冲突，表现为整页样式被重置。此时可以关闭 preflight，只保留 theme/utilities：`sybzVitePlugins({ tailwindPreflight: false })`。

项目只保留一个 Tailwind Vite 插件和一个 Tailwind CSS 入口。若项目已有手动的 `@import 'tailwindcss'`，请设置 `tailwindCss: false`，避免重复注入；若已自行注册 `@tailwindcss/vite`，请关闭预设中的 Tailwind：

```ts
plugins: [tailwindcss(), sybzVitePlugins({ tailwind: false })]
```

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
plugins: [sybzVitePlugins({ buildTime: false })]
```

### 控制台日志定位源码（`consoleSource` 默认 `true`，仅开发环境）

开发环境下，每条日志最左侧会输出一个 `↗`，后面跟着可点击的跳转链接；点击链接会在对应 IDE 中打开文件并定位到行：

```ts
console.log('接口返回', data)
// 控制台：↗ http://localhost:5173/s/1/c 接口返回 ...
```

`↗` 是视觉入口，真正可点击的是后面紧跟的 URL。浏览器控制台只能把 URL 变成可点击内容，纯图标点击需要 DevTools 扩展，原生 console 做不到。

| 属性名称  | 类型                     | 默认值        | 说明                                                              |
| --------- | ------------------------ | ------------- | ----------------------------------------------------------------- |
| `methods` | `SybzConsoleMethod[]`    | 全部常用方法  | 需要追加位置的 console 方法。                                     |
| `include` | `RegExp \| string[]`     | -             | 只处理匹配的文件，匹配文件相对路径和完整 id。                     |
| `exclude` | `RegExp \| string[]`     | -             | 跳过匹配的文件。                                                  |
| `build`   | `boolean`                | `false`       | 是否在生产构建中也保留源码前缀；默认只在开发服务启用。            |
| `jump`    | `boolean`                | `true`        | 是否输出可点击的 IDE 跳转链接；false 时只输出静态 `[file:line]`。 |
| `editor`  | `string`                 | `code`        | 编辑器命令，默认复用 `codeInspector.editor`。                     |
| `format`  | `(file, line) => string` | `[file:line]` | 自定义静态前缀；仅在 `jump: false` 或生产构建中生效。             |

```ts
plugins: [
  sybzVitePlugins({
    consoleSource: {
      methods: ['log', 'warn', 'error'],
      include: [/^src\//],
      exclude: ['src/legacy/'],
      editor: 'cursor',
      jump: true,
    },
  }),
]
```

`editor` 支持 `code`、`cursor`、`webstorm` 等常见命令；也可以传本机可执行文件路径。点击链接后由 Vite 开发服务器打开编辑器，随后自动关闭新标签页；如果浏览器拦截关闭，会显示已打开的提示。生产构建（`build: true`）没有开发服务器，会退回静态 `[file:line]` 前缀。

不需要时关闭：

```ts
plugins: [sybzVitePlugins({ consoleSource: false })]
```

### 构建版本更新检测（`versionCheck` 默认 `true`，仅生产构建）

构建时会生成 `version.json` 并注入检测脚本。页面加载后 1 秒检查一次，之后每隔一段时间、窗口重新获得焦点或页面重新可见时检查；发现版本变化后会派发可取消的 `sybz:version-update` 事件，默认还会在右下角显示内置提示。组件库 lib 构建和 SSR 构建会自动跳过。内置提示不会修改全局样式；不想用这套自定义样式时，设置 `prompt: false` 并监听事件，用项目自己的 `confirm` / `$toast` 处理即可。

构建后 `dist/version.json`：

```json
{ "version": "mwu3mt2p-j9a1ni", "buildTime": "2026-11-24 10:52:13" }
```

| 属性名称      | 类型                                                           | 默认值                   | 说明                                    |
| ------------- | -------------------------------------------------------------- | ------------------------ | --------------------------------------- |
| `interval`    | `number`                                                       | `300000`（5 分钟）       | 轮询间隔，单位毫秒。                    |
| `versionFile` | `string`                                                       | `version.json`           | 版本文件路径，相对于构建 base。         |
| `versionUrl`  | `string`                                                       | -                        | 直接指定版本文件 URL，设置后忽略 base。 |
| `version`     | `string`                                                       | 自动生成                 | 手动固定版本号，例如 `2026.11.24`。     |
| `text`        | `string`                                                       | `发现新版本，请刷新页面` | 更新提示文案。                          |
| `reloadText`  | `string`                                                       | `刷新`                   | 刷新按钮文案。                          |
| `position`    | `'top-left' \| 'top-right' \| 'bottom-left' \| 'bottom-right'` | `bottom-right`           | 提示位置。                              |
| `prompt`      | `boolean`                                                      | `true`                   | 是否显示内置提示；false 时只派发事件。  |
| `eventName`   | `string`                                                       | `sybz:version-update`    | 检测到新版本时派发的事件名。            |

```ts
plugins: [
  sybzVitePlugins({
    versionCheck: {
      interval: 60 * 1000,
      position: 'bottom-right',
      text: '页面已更新，刷新后生效',
    },
  }),
]
```

`version.json` 会随构建产物一起部署；如果放在 CDN 或自定义目录，可通过 `versionFile` 或 `versionUrl` 调整。检测请求会带时间戳参数，避免命中旧缓存。

用 utils 的 `confirm` 展示更新提示：

```ts
import { confirm } from '@sybz-components/utils'

window.addEventListener('sybz:version-update', async (event) => {
  event.preventDefault()
  try {
    await confirm('发现新版本，是否刷新页面？')
    window.location.reload()
  } catch {
    // 用户取消
  }
})
```

配置 `versionCheck: { prompt: false }` 时只派发事件，不会显示内置提示；保持默认 `prompt: true` 时，事件里调用 `event.preventDefault()` 也可以阻止内置提示。事件参数可通过 `event.detail` 读取 `version` 和 `currentVersion`。

不需要时关闭：

```ts
plugins: [sybzVitePlugins({ versionCheck: false })]
```

### 自定义配置

```ts
plugins: [
  sybzVitePlugins({
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
    tailwind: {
      optimize: true,
    },
  }),
]
```

### 按需关闭

```ts
// 只启用代码定位
plugins: [sybzVitePlugins({ gitCommitLog: false })]

// 使用项目自行注册的 Vue JSX 插件
plugins: [vueJsx(), sybzVitePlugins({ vueJsx: false })]

// 只启用 Git 提交信息
plugins: [sybzVitePlugins({ codeInspector: false })]

// 使用项目自行配置的 Tailwind 插件
plugins: [tailwindcss(), sybzVitePlugins({ tailwind: false })]

// 关闭控制台源码定位
plugins: [sybzVitePlugins({ consoleSource: false })]

// 关闭版本更新检测
plugins: [sybzVitePlugins({ versionCheck: false })]
```

:::utils-source sybzVitePlugins
:::
