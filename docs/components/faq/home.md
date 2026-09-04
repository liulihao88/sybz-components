---
outline: 2
---

# 项目使用组件常见问题

这里汇总业务项目使用 `sybz-components` 时的常见问题和推荐写法。

## 1. 如何全局注册组件、设置组件默认属性和工具函数？

建议在项目中创建统一的安装文件，例如 `installSybz.ts`，集中注册组件库、图表组件、主题、组件默认属性和工具函数：

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
    button: { size: 'small' },
    compTitleStyle: { padding: '0 16px' },
    card: {
      hoverAnimation: true,
      shadow: 'hover',
      mergeSections: true,
    },
    dialog: {
      appendToBody: true,
    },
    table: {
      pageSizes: [10, 20, 50, 100],
      pageSize: 20,
      showPage: false,
    },
    input: {
      maxlength: 100,
      showWordLimit: false,
    },
  })
  app.use(SybzChartComponents)

  Object.entries(sybzUtils).forEach(([key, value]) => {
    app.config.globalProperties[key] = value
  })
}
```

这里包含三类全局配置：

- `theme` 和 `compTitleStyle` 是组件公共默认属性，会应用到所有声明了对应属性的组件。例如 `compTitleStyle` 会同时影响支持标题样式的输入框、选择器、日期选择器等组件。
- `button`、`card`、`dialog`、`table` 和 `input` 是组件级默认配置，键名使用组件去掉 `s-` 后的驼峰名称。例如 `s-comp-title` 对应 `compTitle`，`s-date-picker` 对应 `datePicker`。
- `configureUtils({ theme: 'shijingshan' })` 设置工具函数的全局默认主题；把 `sybzUtils` 挂载到 `app.config.globalProperties` 后，可以在组件实例中直接使用 `$toast` 等工具函数。

组件上显式传入的属性优先级最高，可以覆盖全局默认值。例如全局设置按钮尺寸为 `small` 后，下面的按钮仍然会使用 `large`：

```vue
<s-button size="large">大按钮</s-button>
```

全局配置的默认值是未配置；未设置的属性继续使用各组件自身的默认值。示例中各项配置的含义如下：

| 配置                        | 示例值                  | 作用                         |
| --------------------------- | ----------------------- | ---------------------------- |
| `theme`                     | `shijingshan`           | 设置组件默认主题             |
| `button.size`               | `small`                 | 设置按钮默认尺寸             |
| `compTitleStyle`            | `{ padding: '0 16px' }` | 设置标题容器公共默认内边距   |
| `card.hoverAnimation`       | `true`                  | 默认启用卡片悬浮动画         |
| `card.shadow`               | `hover`                 | 鼠标移入卡片时显示阴影       |
| `card.mergeSections`        | `true`                  | 默认合并卡片各区块的重复间距 |
| `dialog.appendToBody`       | `true`                  | 默认将弹窗挂载到 body        |
| `table.pageSizes`           | `[10, 20, 50, 100]`     | 设置分页条数选项             |
| `table.pageSize`            | `20`                    | 设置表格默认每页条数         |
| `table.showPage`            | `false`                 | 默认隐藏表格分页器           |
| `input.maxlength`           | `100`                   | 设置输入框默认最大长度       |
| `input.showWordLimit`       | `false`                 | 默认不显示输入字数统计       |
| `configureUtils` 的 `theme` | `shijingshan`           | 设置工具函数默认主题         |

最后在应用入口安装一次：

```ts
import { createApp } from 'vue'
import App from './App.vue'
import installSybz from './installSybz'

const app = createApp(App)

installSybz(app)
app.mount('#app')
```

## 2. 如何在 Vite 中注册 sybzVitePlugins？

`sybzVitePlugins()` 是组件库项目推荐的 Vite 插件预设，默认同时提供代码定位、Git 提交信息和打包时间。业务项目安装 `@sybz-components/utils` 后，在 `vite.config.ts` 中直接注册即可：

```ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { sybzVitePlugins } from '@sybz-components/utils/vite'

export default defineConfig({
  plugins: [vue(), sybzVitePlugins()],
})
```

`sybzVitePlugins()` 返回 Vite 支持的插件数组，Vite 会自动将其扁平化，因此直接放进 `plugins` 即可，不要写成 `...sybzVitePlugins()`。

默认启用的功能如下：

| 配置项          | 功能                                 | 类型                                  | 默认值 |
| --------------- | ------------------------------------ | ------------------------------------- | ------ |
| `codeInspector` | 在开发环境中从页面元素定位到对应源码 | `boolean \| SybzCodeInspectorOptions` | `true` |
| `gitCommitLog`  | 提供项目 Git 提交信息                | `boolean \| GitCommitLogOptions`      | `true` |
| `buildTime`     | 向页面注入本次构建时间               | `boolean \| { metaName?: string }`    | `true` |

每项功能都可以单独关闭，也可以传入配置对象进行定制：

```ts
export default defineConfig({
  plugins: [
    vue(),
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
    }),
  ],
})
```

例如只需要代码定位功能时，可以关闭另外两项：

```ts
sybzVitePlugins({
  gitCommitLog: false,
  buildTime: false,
})
```

启用 `buildTime` 后，插件默认会向 HTML 头部注入名为 `buildTime` 的 meta，并提供 `window.__SYBZ_BUILD_TIME__`。更完整的配置说明可查看 [sybzVitePlugins 文档](/components/utils/sybzVitePlugins/home.md)。

## 3. 如何在保留公司主题规范的同时快速修改主题色？

`chenghua` 和 `shijingshan` 主题已经包含符合公司规范的组件布局、圆角和交互样式。如果项目只需要替换品牌色，在注册组件库时同时配置 `theme` 和 `themeColors` 即可，不需要在业务页面重写组件样式。

### 基于 shijingshan 主题修改颜色

```ts
import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import SybzComponents from 'sybz-components'
import 'sybz-components/style.css'
import App from './App.vue'

const app = createApp(App)

app.use(ElementPlus)
app.use(SybzComponents, {
  theme: 'shijingshan',
  themeColors: {
    primary: '#7c3aed',
    accent: '#ec4899',
    success: '#16a34a',
    warning: '#f59e0b',
    danger: '#dc2626',
  },
})

app.mount('#app')
```

`theme` 的可选值是 `default`、`chenghua` 和 `shijingshan`，默认值是 `default`。快速换色时将它设置为 `chenghua` 或 `shijingshan`，表示继续使用对应的公司主题规范。

`themeColors` 的默认值是未配置，常用属性如下：

| 属性      | 说明   | 默认值               |
| --------- | ------ | -------------------- |
| `primary` | 主色   | 对应主题的内置主色   |
| `accent`  | 强调色 | 对应主题的内置强调色 |
| `success` | 成功色 | 对应主题的内置成功色 |
| `warning` | 警告色 | 对应主题的内置警告色 |
| `danger`  | 危险色 | 对应主题的内置危险色 |
| `info`    | 信息色 | 对应主题的内置信息色 |

只需要填写项目要替换的颜色。未填写的属性继续使用对应主题的默认值。`primary` 和 `accent` 使用十六进制或 `rgb(...)` 颜色时，组件库会自动生成 hover、active 和透明度相关的颜色值。

### 同时配置两套主题颜色

如果同一个项目会切换两套主题，可以使用嵌套配置：

```ts
app.use(SybzComponents, {
  theme: 'chenghua',
  themeColors: {
    chenghua: {
      primary: '#165dff',
      accent: '#00c5e7',
    },
    shijingshan: {
      primary: '#2a6df4',
      accent: '#f5a623',
    },
  },
})
```

### 运行时修改或恢复主题色

```ts
import { resetSybzThemeColors, setSybzThemeColors } from 'sybz-components'

setSybzThemeColors('chenghua', {
  primary: '#7c3aed',
  accent: '#06b6d4',
})

// 恢复成华主题的内置颜色
resetSybzThemeColors('chenghua')
```

`setSybzThemeColors` 的 `theme` 可选值是 `chenghua` 和 `shijingshan`，没有默认值；`colors` 没有默认值，只需传入本次要替换的颜色。`resetSybzThemeColors` 会移除运行时设置的颜色，恢复对应主题的内置值。

## 4. s-icon 如何使用，怎样使用 Iconify 图标？

根据 Iconify 官方图标库集 的最新实时统计，Iconify 目前总共拥有 超过 34.4 万个（具体为 344,208 个） 开源矢量图标。这些图标来自于 222 个 不同的开源图标集（如熟悉的 Material Design、FontAwesome、Remix Icon、Tabler 等), 已集成至s-icon内部, 均可以通过s-icon进行使用.

`s-icon` 可以统一展示 Element Plus 图标、Iconify 图标、SVG、在线图片和 Vue 图标组件。最简单的写法是直接把图标名称传给 `icon`：

```vue
<s-icon icon="delete" />
```

名称不含冒号时，默认会按照 Element Plus 图标处理。常用属性如下：

```vue
<s-icon icon="delete" size="20" color="#f56c6c" content="删除" />
<s-icon icon="warning" type="warning" variant="light" />
<s-icon icon="refresh" :rotate="90" />
```

| 属性      | 可选值或类型                                            | 默认值    |
| --------- | ------------------------------------------------------- | --------- |
| `icon`    | 图标名称或 Vue 组件                                     | `''`      |
| `source`  | `auto / element-plus / iconify / svg / url`             | `auto`    |
| `size`    | `string / number`                                       | `16px`    |
| `color`   | CSS 颜色值                                              | 未设置    |
| `type`    | `default / primary / success / warning / danger / info` | `default` |
| `variant` | `plain / light / solid`                                 | `plain`   |
| `content` | tooltip 提示文字                                        | `''`      |

### 使用 Iconify 图标

[Iconify](https://icon-sets.iconify.design/) 汇集了大量开源图标集。项目使用 `s-icon` 时不需要单独安装 `@iconify/vue`，也不需要逐个导入图标组件，直接传入完整的 Iconify 名称即可：

```vue
<s-icon icon="tabler:home" />
<s-icon icon="tabler:user" size="20" />
<s-icon icon="tabler:circle-check" type="success" />
<s-icon icon="logos:vue" size="24" />
```

Iconify 名称的格式是 `图标集前缀:图标名称`。例如 `tabler:home` 中，`tabler` 是图标集前缀，`home` 是图标名称。业务项目推荐优先使用 [Tabler Icons](https://icon-sets.iconify.design/tabler/)，同一页面尽量使用同一套图标，避免线条粗细和视觉风格不一致；企业或产品 Logo 可以使用 `logos:*`。

`source` 的默认值是 `auto`。只要 `icon` 是 `tabler:home` 这样的完整名称，`s-icon` 就会自动识别为 Iconify 图标，通常不需要再写 `source`。如果需要明确限定来源，也可以这样写：

```vue
<s-icon icon="tabler:search" source="iconify" />
```

Iconify 图标支持与其他 `s-icon` 相同的大小、颜色、语义类型、背景样式和 tooltip 属性。还可以通过 `iconifyAttrs` 将属性透传给底层 Iconify Icon；`iconifyAttrs` 类型是 `object`，默认值是 `{}`：

```vue
<s-icon icon="tabler:login" size="24" color="#165dff" content="登录" :iconify-attrs="{ flip: 'horizontal' }" />
```

大部分线性单色图标使用 `currentColor`，可以通过 `color` 或 `type` 改色；`logos:vue` 这类自带多种颜色的品牌图标通常不会跟随 `color` 改变。

### Iconify 在线加载与内网使用

默认情况下，浏览器会在第一次显示某个 Iconify 图标时从 Iconify API 获取图标数据并缓存，只加载页面实际使用的图标，不会把整个图标库打包进项目。因此项目运行环境需要能够访问 Iconify API。

如果项目部署在内网、离线环境，或者不希望在运行时请求外部服务，可以在应用入口提前注册图标数据：

```ts
import { addIconifyIcon } from 'sybz-components'

addIconifyIcon('project:rocket', {
  width: 24,
  height: 24,
  body: '<path fill="currentColor" d="这里填写图标的 SVG path" />',
})
```

注册后仍然通过 `s-icon` 使用，不需要修改业务组件的写法：

```vue
<s-icon icon="project:rocket" />
```

需要一次注册一组图标时，可以使用 `addIconifyCollection`。建议在应用入口统一完成注册，确保页面渲染前图标数据已经可用。

如果图标没有显示，依次检查图标名称是否使用英文冒号、名称是否存在，以及当前网络是否能够访问 Iconify API。更完整的属性和示例可查看 [icon 图标组件文档](/components/icon/home.md)。
