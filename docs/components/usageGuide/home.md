# 组件库使用指南

这篇文档从一个空 Vue3 项目开始，带你完成 `sybz-components` 的安装、引入、注册和组件使用。按顺序做完，就可以在项目里直接使用组件库开发页面。

## 1. 创建 Vue3 项目

如果你已经有 Vue3 项目，可以跳过这一步。

::: code-group

```sh [pnpm]
pnpm create vite my-sybz-app --template vue-ts
cd my-sybz-app
pnpm install
```

```sh [bun]
bun create vite my-sybz-app --template vue-ts
cd my-sybz-app
bun install
```

```sh [npm]
npm create vite@latest my-sybz-app -- --template vue-ts
cd my-sybz-app
npm install
```

:::

## 2. 安装组件库

`sybz-components` 基于 Vue3 和 Element Plus 二次封装，所以项目里需要同时安装 Element Plus。

::: code-group

```sh [pnpm]
pnpm add sybz-components element-plus
```

```sh [bun]
bun add sybz-components element-plus
```

```sh [npm]
npm install sybz-components element-plus
```

:::

如果你还需要使用公共函数库，例如 `$toast`、`clone`、`validateForm`，再安装 utils：

::: code-group

```sh [pnpm]
pnpm add @sybz-components/utils
```

```sh [bun]
bun add @sybz-components/utils
```

```sh [npm]
npm install @sybz-components/utils
```

:::

## 3. 在 main.ts 中注册

打开项目里的 `src/main.ts`，按下面写法引入 Element Plus、组件库和样式。

```ts
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

这一步完成后，`s-button`、`s-input`、`s-select`、`s-dialog` 等组件就可以在任意 `.vue` 文件里直接使用。

## 4. 写第一个页面

把 `src/App.vue` 改成下面这样，先确认组件能正常显示和交互。

```vue
<script setup lang="ts">
import { ref } from 'vue'

const keyword = ref('')
const status = ref('')
const showDialog = ref(false)

const statusOptions = [
  { label: '启用', value: 'enabled' },
  { label: '停用', value: 'disabled' },
]
</script>

<template>
  <div>
    <s-title title="我的第一个组件库页面" theme="chenghua" />

    <s-flex>
      <s-input v-model="keyword" />
      <s-select v-model="status" :options="statusOptions" />
      <s-button @click="showDialog = true">打开弹窗</s-button>
    </s-flex>

    <s-dialog v-model="showDialog" title="提示">这里是弹窗内容</s-dialog>
  </div>
</template>
```

## 5. 组件的基本语法

组件库的组件命名一般是 `s-组件名`。

```vue
<s-button>按钮</s-button>
<s-input v-model="name" />
<s-select v-model="value" :options="options" />
<s-dialog v-model="visible" title="标题">内容</s-dialog>
```

常见写法主要分为四类：

```vue
<!-- 1. 普通属性 -->
<s-button type="primary" size="small">保存</s-button>

<!-- 2. 动态属性，前面加冒号 -->
<s-select :options="options" :width="240" />

<!-- 3. 双向绑定 -->
<s-input v-model="form.name" />

<!-- 4. 事件监听 -->
<s-button @click="submit">提交</s-button>
```

## 6. 使用表单输入组件

```vue
<script setup lang="ts">
import { reactive } from 'vue'

const form = reactive({
  name: '',
  type: '',
})

const typeOptions = [
  { label: '普通用户', value: 'normal' },
  { label: '管理员', value: 'admin' },
]
</script>

<template>
  <s-input v-model="form.name" placeholder="请输入名称" clearable />
  <s-select v-model="form.type" :options="typeOptions" placeholder="请选择类型" clearable />
</template>
```

## 7. 使用表格组件

```vue
<script setup lang="ts">
const columns = [
  { label: '姓名', prop: 'name' },
  { label: '地址', prop: 'address' },
  {
    label: '操作',
    btns: [
      {
        content: '编辑',
        handler: ({ row }) => {
          console.log('编辑当前行', row)
        },
      },
    ],
  },
]

const data = [
  { name: '张三', address: '北京市朝阳区' },
  { name: '李四', address: '上海市浦东新区' },
]
</script>

<template>
  <s-table :columns="columns" :data="data" />
</template>
```

## 8. 使用工具函数

工具函数从 `@sybz-components/utils` 引入。

```ts
import { $toast, clone, delay } from '@sybz-components/utils'

$toast('保存成功')

const newData = clone(oldData)

await delay(500)
```

也可以把常用方法挂到全局，不过新项目更推荐在需要的文件里按需引入，这样来源更清楚。

## 9. 使用内置指令

注册 `SybzComponents` 后，内置指令可以直接在模板里使用。

```vue
<template>
  <s-button v-copy="'要复制的文字'">复制</s-button>
  <s-input v-focus />
</template>
```

## 10. 全局默认配置

如果项目里很多组件都想统一尺寸、主题或默认属性，可以在 `app.use(SybzComponents, options)` 里配置。

```ts
app.use(SybzComponents, {
  button: {
    size: 'small',
  },
  dialog: {
    width: '520px',
  },
  table: {
    pageSize: 30,
  },
})
```

## 11. 常见问题

### 页面上没有样式

检查 `main.ts` 是否引入了这两个样式：

```ts
import 'element-plus/dist/index.css'
import 'sybz-components/style.css'
```

### 组件标签不生效

检查是否执行了：

```ts
app.use(ElementPlus)
app.use(SybzComponents)
```

### TypeScript 不认识组件属性

优先确认安装的是最新版本：

::: code-group

```sh [pnpm]
pnpm add sybz-components@latest
```

```sh [bun]
bun add sybz-components@latest
```

```sh [npm]
npm install sybz-components@latest
```

:::

如果项目自己有严格的类型配置，重启一下编辑器的 TS 服务，通常即可恢复提示。

## 12. 推荐学习顺序

1. 先看本页，把组件库接入项目。
2. 看 [Button 按钮](/components/button/home.md)、[Input 输入框](/components/input/home.md)、[Select 选择器](/components/select/home.md)。
3. 再看 [Dialog 弹窗](/components/dialog/home.md)、[Table 表格](/components/table/home.md)、[Form 表单](/components/form/home.md)。
4. 最后看 [项目常见写法](/components/projectWriting/home.md)，统一项目里的写法风格。
