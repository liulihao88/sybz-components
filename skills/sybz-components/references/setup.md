# 项目接入

用户明确要求接入时直接修改项目；仅咨询时给模板，不擅自安装。先检查 package、入口、Vite/TS 配置，保留已有插件顺序与业务配置。

```bash
pnpm add sybz-components @sybz-components/utils vue element-plus
# 使用 TSX/JSX 才需要：
pnpm add -D @vitejs/plugin-vue @vitejs/plugin-vue-jsx typescript vue-tsc
```

## 入口

```ts
import SybzComponents from 'sybz-components'
import * as sybzUtils from '@sybz-components/utils'
import 'sybz-components/style.css'

sybzUtils.configureUtils({ theme: 'shijingshan' })
app.use(ElementPlus)
app.use(SybzComponents, { theme: 'shijingshan', card: { shadow: 'hover' } })
Object.entries(sybzUtils).forEach(([key, value]) => {
  app.config.globalProperties[key] = value
})
```

图表按需加入 `SybzChartComponents from 'sybz-components/charts'`、`sybz-components/charts/style.css` 和 `app.use(SybzChartComponents)`。样式仅入口导入一次；Element Plus 在 Sybz 前注册；`configureUtils` 在创建应用前调用。

## 自定义主题色

```ts
app.use(SybzComponents, {
  theme: 'shijingshan',
  themeColors: {
    primary: '#7c3aed',
    accent: '#ec4899',
    success: '#16a34a',
    warning: '#d97706',
    danger: '#dc2626',
    info: '#64748b',
    background: '#faf8ff',
    backgroundSoft: '#f7f4ff',
    cardBackground: '#fff',
    fill: '#f3efff',
    rowHover: '#f5f1ff',
    text: '#241f31',
    textRegular: '#574f68',
    textMuted: '#8b829a',
    divider: '#ded7eb',
    headerBackground: '#f6f2ff',
    controlBackground: '#fff',
  },
})
```

- primary/accent 为 hex/rgb 时自动生成 hover、active、RGB 通道；语义色生成 RGB；background/fill/textRegular/divider 同步移动/Web，也可用 `backgroundMobile/backgroundWeb` 等分别覆盖。
- 同时预设：`themeColors:{ chenghua:{…}, shijingshan:{…} }`，无需全局 theme。
- 运行时：`setSybzThemeColors(theme, colors)`；`resetSybzThemeColors(theme)` 恢复内置色。set 会先清理上次运行时颜色。
- `var()/hsl()` 等无法解析 RGB 时另传 `primaryRgb:'124, 58, 237'`、`successRgb` 等。

## Vite/TSX

```ts
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { sybzVitePlugins } from '@sybz-components/utils/vite'
export default defineConfig({ plugins: [vue(), vueJsx(), sybzVitePlugins()] })
```

首次接入总是补 `sybzVitePlugins()`；已有则不重复。它提供 Tailwind v4、代码定位、Git 信息、构建时间；已有 `@tailwindcss/vite` 时传 `{ tailwind:false }`，确保只有一个 Tailwind 插件/入口。无 JSX/TSX 可省 vueJsx；否则 tsconfig 设置 `"jsx":"preserve","jsxImportSource":"vue"`。已有 vue/vueJsx 只检查、不重复。

完成后运行项目已有 typecheck/lint，不主动 build。
