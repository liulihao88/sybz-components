# 项目接入

用户要求在 Vue 项目中使用本 skill 开发、替换或新增组件时，自动完成接入，不要求用户先手动安装。仅咨询用法或没有可修改的目标项目时给出说明。先确认目标项目是 Vue 3，定位实际应用包的 `package.json`、锁文件、应用入口和现有注册方式；在 monorepo 中只修改目标应用包。保留已有插件顺序与业务配置。

检查 `dependencies`、`devDependencies`、工作区依赖和实际解析结果。对缺少的 `sybz-components`、`@sybz-components/utils`、`element-plus`，使用项目已有包管理器（pnpm/npm/yarn/bun）执行一次安装，写入目标应用的 `dependencies`；已有依赖不升级、不重复安装。不为这一步额外安装 Vue、Vite、TypeScript 等项目基础依赖。安装失败时说明具体原因，继续完成能做的入口修改，不把安装命令留给用户作为默认完成方式。

## 入口

```ts
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import SybzComponents from 'sybz-components'
import 'sybz-components/style.css'

app.use(ElementPlus)
app.use(SybzComponents, {
  theme: 'sybz',
})
```

合并进现有入口，不替换应用创建、路由或其他插件代码。样式仅入口导入一次；Element Plus 在 Sybz 前注册。业务代码用到工具函数时按需 `import { $toast } from '@sybz-components/utils'`，无需把整个 utils 包挂到全局属性。已有全局主题时保留；用户要求主题时才传对应主题配置。图表按需加入 `SybzChartComponents from 'sybz-components/charts'`、`sybz-components/charts/style.css` 和 `app.use(SybzChartComponents)`。

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
import { sybzVitePlugins } from '@sybz-components/utils/vite'
export default defineConfig({ plugins: [vue(), sybzVitePlugins()] })
```

仅在任务确实需要这些 Vite 扩展时补 `sybzVitePlugins()`；已有则不重复。它默认提供 Vue JSX/TSX、Tailwind v4、代码定位、Git 信息、构建时间；已有同类插件或样式入口时按需关闭重复功能。TSX 项目在 tsconfig 设置 `"jsx":"preserve","jsxImportSource":"vue"`。已有 vue 只检查、不重复。
当前预设支持 Vite 5 和 6。

完成后运行项目已有 typecheck/lint，不主动 build。
