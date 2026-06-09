# 说明文档

## Hidden Title {.md-hidden}

::: tip 提示

1. sybz-components 是基于 Vue3 + Element-plus + 部分原生js组件 再次封装的基础组件, 适用于前端项目开发
2. @sybz-components/utils是工作中常用的封装的函数库组件
3. sybz-components全局注册了@element-plus/icons-vue的icon, 使用方式`el-icon-xxx`
   :::

### 安装

## 使用包管理器 <el-tag  effect="dark">推荐</el-tag>

**建议您使用包管理器 ([pnpm](https://pnpm.io/)<el-tag  effect="dark">推荐</el-tag> ， [yarn](https://classic.yarnpkg.com/lang/en/)，[npm](https://www.npmjs.com/)) 安装 sybz-components**。

::: code-group

```sh [pnpm]
pnpm add sybz-components -S
```

```sh [yarn]
yarn add sybz-components
```

```sh [npm]
npm install sybz-components -S
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

```sh [yarn]
yarn add @sybz-components/utils
```

```sh [npm]
npm install @sybz-components/utils -S
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

```javascript
pnpm add sybz-components@latest && pnpm add @sybz-components/utils@latest
```

### 自定义指令

不必注册, 直接使用

```
v-copy
v-number
v-focus
```

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
