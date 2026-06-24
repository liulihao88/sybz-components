# Sybz Components

<p>
  <img src="./docs/public/img/logo.svg" alt="Sybz Components" width="88" />
</p>

> 基于 Vue 3 + Element Plus 的业务组件库。把项目中高频出现的表单、表格、弹窗、筛选、布局、提示、图表等能力沉淀为可复用组件，同时提供常用工具函数和自定义指令，帮助后台系统更快落地。

[![npm](https://img.shields.io/npm/v/sybz-components?label=sybz-components)](https://www.npmjs.com/package/sybz-components)
[![utils](https://img.shields.io/npm/v/@sybz-components/utils?label=@sybz-components/utils)](https://www.npmjs.com/package/@sybz-components/utils)
[![Vue](https://img.shields.io/badge/Vue-3.x-42b883)](https://vuejs.org/)
[![Element Plus](https://img.shields.io/badge/Element%20Plus-2.x-409eff)](https://element-plus.org/)

## 在线文档

- 文档地址：[https://liulihao88.github.io/sybz-components/](https://liulihao88.github.io/sybz-components/)
- 组件总览：[组件文档](https://liulihao88.github.io/sybz-components/components/)
- 快速体验：[Button 示例](https://liulihao88.github.io/sybz-components/components/button/home)

## 项目特色

- 基于真实业务沉淀：组件来自实际项目中的通用场景，不只是 Element Plus 的简单换皮。
- 默认兼容，按需收敛：一次 `app.use(SybzComponents)` 即可注册组件、内置指令、Element Plus 图标和 VueTippy，也可以关闭部分全局能力，减少安装副作用。
- 统一默认配置：支持在安装时传入全局默认属性，例如 `theme`、`size`、组件级默认配置等。
- 主题扩展：内置 `chenghua` 主题样式，适合在同一套组件里快速切换业务视觉风格。
- 表格能力增强：提供 `STable` 相关类型和配置能力，适合复杂后台表格场景。
- 工具函数配套：`@sybz-components/utils` 提供提示、格式化、校验、复制、节流、防抖等常用方法。
- 文档驱动开发：每个组件都有独立示例，便于查看属性、默认值、不同主题和交互效果。

## 安装

推荐使用 `pnpm` 安装组件库和基础 peer 依赖：

```sh
pnpm add sybz-components element-plus @element-plus/icons-vue @vueuse/core vue-tippy tippy.js echarts
```

也可以使用 `npm` 或 `yarn`：

```sh
npm install sybz-components element-plus @element-plus/icons-vue @vueuse/core vue-tippy tippy.js echarts
```

```sh
yarn add sybz-components element-plus @element-plus/icons-vue @vueuse/core vue-tippy tippy.js echarts
```

使用 `bun`：

```sh
bun add sybz-components element-plus @element-plus/icons-vue @vueuse/core vue-tippy tippy.js echarts
```

如果使用 `quotaPie`、`countBar` 等基于 `vue-echarts` 的业务图表组件，再安装：

```sh
pnpm add vue-echarts
```

```sh
bun add vue-echarts
```

```sh
npm install vue-echarts
```

```sh
yarn add vue-echarts
```

如需使用工具函数包：

```sh
pnpm add @sybz-components/utils
```

使用其他包管理器安装工具函数包：

```sh
bun add @sybz-components/utils
```

```sh
npm install @sybz-components/utils
```

```sh
yarn add @sybz-components/utils
```

## 更新组件库

更新 `sybz-components`：

```sh
pnpm add sybz-components@latest
```

```sh
bun add sybz-components@latest
```

```sh
npm install sybz-components@latest
```

```sh
yarn add sybz-components@latest
```

同时更新组件库和工具函数包：

```sh
pnpm add sybz-components@latest @sybz-components/utils@latest
```

```sh
bun add sybz-components@latest @sybz-components/utils@latest
```

```sh
npm install sybz-components@latest @sybz-components/utils@latest
```

```sh
yarn add sybz-components@latest @sybz-components/utils@latest
```

## 快速上手

在入口文件中注册 Element Plus 和 Sybz Components：

```ts
// main.ts
import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import SybzComponents from 'sybz-components'
import 'sybz-components/style.css'
import App from './App.vue'

const app = createApp(App)

app.use(ElementPlus)
app.use(SybzComponents)
app.mount('#app')
```

然后在任意 Vue 文件中直接使用组件：

```vue
<template>
  <s-button type="primary">新建任务</s-button>
  <s-title title="任务列表" />
  <s-empty description="暂无数据" />
</template>
```

## 全局默认配置

安装组件库时可以传入默认配置，减少业务页面中的重复属性：

```ts
app.use(SybzComponents, {
  theme: 'chenghua',
  size: 'large',
  button: {
    type: 'primary',
  },
  tooltip: {
    showAfter: 500,
  },
})
```

常用全局配置：

| 配置项 | 说明 | 示例 |
| --- | --- | --- |
| `theme` | 组件主题 | `'chenghua'` |
| `size` | 组件尺寸 | `'default'` |
| `button` | Button 默认属性 | `{ type: 'primary' }` |
| `table` | Table 默认属性 | `{ stripe: true }` |
| `dialog` | Dialog 默认属性 | `{ width: '520px' }` |
| `tooltip` | Tooltip 默认属性 | `{ effect: 'light' }` |

更多配置请查看 [类型定义](./packages/types/index.ts)。

## 可选全局能力

默认安装行为与历史版本保持一致，会注册内置指令、Element Plus 图标别名和 VueTippy。如果项目已经自行管理这些能力，可以在安装时关闭：

```ts
app.use(SybzComponents, {
  registerDirectives: false,
  registerElementPlusIcons: false,
  useTippy: false,
})
```

| 配置项 | 说明 | 默认值 |
| --- | --- | --- |
| `registerDirectives` | 是否注册 `v-copy`、`v-focus`、`v-throttle` 等内置指令 | `true` |
| `registerElementPlusIcons` | 是否全局注册 `el-icon-*` 格式的 Element Plus 图标别名 | `true` |
| `useTippy` | 是否执行 `app.use(VueTippy)` | `true` |

## Peer 依赖说明

组件库发布时会把 Vue、Element Plus、图标、VueUse、Tippy、ECharts 等运行时依赖外部化，避免把宿主项目已经安装的依赖再次打进组件库产物。基础使用建议安装 `vue`、`element-plus`、`@element-plus/icons-vue`、`@vueuse/core`、`vue-tippy`、`tippy.js` 和 `echarts`；`vue-echarts` 仅在使用业务图表组件时需要。

## 常用组件

| 分类 | 组件 |
| --- | --- |
| 基础组件 | `SButton`、`SInput`、`SInputNumber`、`SSelect`、`SCheckbox`、`SRadio`、`SSwitch` |
| 数据展示 | `STable`、`STag`、`SText`、`STooltip`、`SDescriptions`、`SEmpty` |
| 反馈组件 | `SDialog`、`SDrawer`、`SPopconfirm`、`SWarning`、`SProgress` |
| 布局组件 | `SBasicLayout`、`SRow`、`SFlex`、`SItem`、`SItemWrapper`、`SSplitPane` |
| 业务组件 | `SChart`、`SDatePicker`、`SBuildTime`、`SCompTitle` |
| 图标与源码 | `SIcon`、`SSvg`、`SFunctionSourceCode` |

完整示例请访问 [组件文档](https://liulihao88.github.io/sybz-components/components/)。

## 工具函数

工具函数独立发布在 `@sybz-components/utils`，可以按需引入：

```ts
import { $toast, clone, debounce, throttle } from '@sybz-components/utils'

$toast('保存成功')

const nextData = clone(data)
const handleSearch = debounce(() => {
  // 执行搜索
}, 300)
```

也可以挂载到 Vue 全局属性：

```ts
import * as utils from '@sybz-components/utils'

Object.keys(utils).forEach((key) => {
  app.config.globalProperties[key] = utils[key]
})
```

在组件中通过 `proxy` 使用：

```ts
import { getCurrentInstance } from 'vue'

const { proxy } = getCurrentInstance()!

proxy.$toast('操作成功')
```

## 自定义指令

注册 `SybzComponents` 后，内置指令可直接使用：

| 指令 | 说明 | 示例 |
| --- | --- | --- |
| `v-copy` | 复制文本，默认双击触发 | `<span v-copy="'hello'">双击复制</span>` |
| `v-focus` | 自动聚焦输入框 | `<s-input v-focus />` |
| `v-number` | 限制输入为数字 | `<input v-number min="1" max="99" />` |
| `v-throttle` | 节流事件 | `<button v-throttle.500="submit">提交</button>` |
| `v-debounce` | 防抖事件 | `<input v-debounce.input.300="search" />` |
| `v-cus-loading` | 自定义 loading 状态 | 查看文档示例 |
| `v-cus-empty` | 自定义 empty 状态 | 查看文档示例 |

## 类型支持

组件库导出了常用类型，尤其适合在表格配置中获得类型提示：

```ts
import type { TableColumnList, STableProps } from 'sybz-components'

const columns: TableColumnList = [
  {
    label: '名称',
    prop: 'name',
  },
]

const tableProps: STableProps = {
  data: [],
  columns,
}
```

## 本地开发

```sh
pnpm install
pnpm dev
```

常用命令：

| 命令 | 说明 |
| --- | --- |
| `pnpm dev` | 启动 VitePress 文档开发服务 |
| `pnpm build` | 构建组件库 |
| `pnpm docsbuild` | 构建文档站点 |
| `pnpm lint` | 执行 ESLint 并自动修复 |
| `pnpm lint:check` | 执行 ESLint 检查，不修改文件 |
| `pnpm typecheck` | 检查组件库 TS 入口、类型和公共 API |
| `pnpm typecheck:sfc` | 检查全部 Vue SFC，适合逐步治理存量类型问题 |
| `pnpm format` | 执行 Prettier 格式化 |

## 目录结构

```text
├─ packages
│  ├─ components      # 组件源码
│  ├─ directives      # 自定义指令
│  ├─ hooks           # 组件内部 hooks
│  ├─ styles          # 全局样式与主题
│  ├─ types           # 类型定义
│  └─ utils           # 工具函数包源码
├─ docs
│  ├─ components      # 组件文档与示例
│  ├─ public          # 文档静态资源
│  └─ shared          # 文档公共组件
└─ README.md
```

## 适用场景

`sybz-components` 更适合中后台、管理端、数据平台和业务系统。如果你的项目已经使用 Vue 3 + Element Plus，并且希望减少重复封装、统一交互和样式，那么它可以作为项目组件层的基础设施。
