# 说明文档

## Hidden Title {.md-hidden}

::: warning 重要声明

组件库目前仍在持续建设和完善中，部分组件可能存在缺陷、API 设计不够合理、功能覆盖不完整，或需要进一步优化升级的情况。

如果各位同事在使用过程中发现 Bug、API 使用不便、功能缺失或有更好的改进建议，请及时沟通和反馈。每一次真实使用中的问题与建议，都会帮助我们持续完善组件库、提升组件质量，让大家获得更加稳定、高效、顺畅的开发体验。

欢迎大家共同参与建设，让组件库在实际项目中不断成长、越来越好用。

:::

::: tip 提示

1. sybz-components 是基于 Vue3 + Element-plus + 部分原生js组件 再次封装的基础组件, 适用于前端项目开发
2. @sybz-components/utils是工作中常用的封装的函数库组件
3. @sybz-components/portal-dev用户快速登录门户
   :::

### 安装

## 使用包管理器 <el-tag  effect="dark">推荐</el-tag>

**建议您使用包管理器 ([pnpm](https://pnpm.io/)<el-tag  effect="dark">推荐</el-tag>、[bun](https://bun.sh/)、[npm](https://www.npmjs.com/)、[yarn](https://classic.yarnpkg.com/lang/en/)) 安装 sybz-components**。

::: code-group

```sh [pnpm]
pnpm add sybz-components -S
```

```sh [bun]
bun add sybz-components
```

```sh [npm]
npm install sybz-components -S
```

```sh [yarn]
yarn add sybz-components
```

:::

### 使用

> #### 前提条件：使用项目必须注册 Element-plus组件库, 否则样式不生效

```js
// main.ts
import App from './App.vue'

const app = createApp(App)
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import SybzComponents from 'sybz-components'
import 'sybz-components/style.css'

app.use(ElementPlus).use(SybzComponents).mount('#app')
```

### 安装函数库方法

首先安装`@sybz-components/utils`

::: code-group

```sh [pnpm]
pnpm add @sybz-components/utils -S
```

```sh [bun]
bun add @sybz-components/utils
```

```sh [npm]
npm install @sybz-components/utils -S
```

```sh [yarn]
yarn add @sybz-components/utils
```

:::

```js
// 将sybz-components下的公共函数赋值到全局
import * as utils from '@sybz-components/utils'
Object.keys(utils).forEach((v) => {
  app.config.globalProperties[v] = utils[v]
})
proxy.$toast('全局提示')

// 按需引入
import { $toast } from '@sybz-components/utils'
$toast('我是成功提示')
$toast('我是失败提示', 'e')
```

### 升级包

::: code-group

```sh [pnpm]
pnpm add sybz-components@latest @sybz-components/utils@latest
```

```sh [bun]
bun add sybz-components@latest @sybz-components/utils@latest
```

```sh [npm]
npm install sybz-components@latest @sybz-components/utils@latest
```

```sh [yarn]
yarn add sybz-components@latest @sybz-components/utils@latest
```

:::

### 自定义指令

不必注册, 直接使用

```
v-copy
v-number
v-focus
```

### Hooks

Hooks 是基于 Vue 组合式 API 的公共状态和生命周期封装，已经从 `sybz-components` 主包导出。

```ts
import { useLoading, usePagination } from 'sybz-components'
```

只想单独表达使用 hooks 时，也可以从 hooks 子路径引入：

```ts
import { useLoading, usePagination } from 'sybz-components/hooks'
```

完整示例见 [Hooks 总览](/components/hooks/home.md)。

### docs文档结构目录

```
├─ examples               # VPDemo组件自动解析此文件夹下的所有.vue文件
├─ components             # .md文件
├─ public                 # 静态资源文件
├─ .vitepress
│  ├─ config              # 插件配置
|  │  ├─ global.ts        # 全局变量定义
|  │  └─ plugins.ts       # 自定义.md文件渲染
│  ├─ theme               # 主题配置
│  ├─ utils               # 文档展开隐藏代码高亮
│  ├─ vitepress
|  │  ├─ vp-demo          # VPDemo组件源码
|  │  ├─ style            # VPDemo组件样式
|  │  └─ index.ts         # 暴露VPDemo组件
│  └─ config.ts           # vitepress配置文件
├─ index.md               # 文档home页面
├─ tsconfig.json          # typescript 全局配置
└─ vite.config.ts         # vite 全局配置文件（支持tsx）
```

### 说明

- 本页用于介绍组件库安装方式、基础接入方式和文档目录结构。
