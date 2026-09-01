# sybz-components 项目接入

## 安装依赖

```bash
pnpm add sybz-components @sybz-components/utils vue element-plus
```

如果项目需要使用 TSX/JSX，再安装并配置：

```bash
pnpm add -D @vitejs/plugin-vue @vitejs/plugin-vue-jsx typescript vue-tsc
```

## 应用入口

在 `src/main.ts`（或项目实际入口）集中注册，业务页面不再重复导入组件样式或逐个挂载工具函数：

```ts
import type { App } from 'vue'
import SybzComponents from 'sybz-components'
import SybzChartComponents from 'sybz-components/charts'
import * as sybzUtils from '@sybz-components/utils'
import 'sybz-components/style.css'
import 'sybz-components/charts/style.css'

sybzUtils.configureUtils({ theme: 'shijingshan' })

export default function installSybz(app: App): void {
  app.use(SybzComponents, {
    theme: 'shijingshan',
    card: {
      shadow: 'hover',
    },
    input: { maxlength: 100, showWordLimit: false },
  })
  app.use(SybzChartComponents)

  Object.entries(sybzUtils).forEach(([key, value]) => {
    app.config.globalProperties[key] = value
  })
}
```

在 `main.ts` 中调用：

```ts
import { createApp } from 'vue'
import App from './App.vue'
import installSybz from './installSybz'

const app = createApp(App)
installSybz(app)
app.mount('#app')
```

图表不是必需依赖；不使用图表时，可以删除 `SybzChartComponents` 和 `sybz-components/charts/style.css` 两行及 `app.use(SybzChartComponents)`。

## Vite 的 Vue/TSX 配置

`vite.config.ts` 或 `vite.config.js`：

```ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { sybzVitePlugins } from '@sybz-components/utils/vite'

export default defineConfig({
  plugins: [vue(), vueJsx(), sybzVitePlugins()],
})
```

`sybzVitePlugins()` 是组件库推荐的 Vite 开发插件入口，会统一提供代码检查、Git 提交信息和构建时间等能力；默认配置即可使用，也可以传入配置对象关闭或定制单项能力。首次接入时应自动加入 Vite 配置，即使项目暂时没有 TSX 文件。

如果项目没有任何 `.jsx`/`.tsx` 文件，`vueJsx()` 可以不加；使用组件库的普通 Vue 模板不要求业务项目启用 JSX。TSX 项目还应在 `tsconfig.json` 中确认：

```json
{
  "compilerOptions": {
    "jsx": "preserve",
    "jsxImportSource": "vue"
  }
}
```

## 接入检查清单

- `element-plus` 在应用入口已注册，且在 `SybzComponents` 之前初始化。
- 组件样式和图表样式只在入口导入一次。
- `configureUtils` 在创建 Vue 应用前调用。
- Vite 已有 `@vitejs/plugin-vue` 时不要重复添加；已有 `vueJsx()` 时只检查配置，不重复添加。
- Vite 已有 `sybzVitePlugins()` 时不要重复添加；导入路径必须是 `@sybz-components/utils/vite`。
- 主题配置优先放在 `app.use(SybzComponents, options)`，页面只在需要局部覆盖时传 `theme` 或组件属性。
