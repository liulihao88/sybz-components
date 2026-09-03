# s-icon 使用参考

使用、迁移或生成图标代码时遵循本页。`s-icon` 已统一封装 Element Plus、Iconify、项目 SVG、在线图片、tooltip、语义颜色和交互状态，不要再组合 `el-icon`、`el-tooltip` 或手写图标容器。

## 直接使用

新增业务图标优先选用 [Tabler Icons](https://icon-sets.iconify.design/tabler/)，名称写成完整的 `tabler:图标名`。同一页面保持同一套线性图标，不混用 `tabler:*`、`mdi:*`、`lucide:*`；企业或产品 Logo 可以使用 `logos:*`。

```vue
<template>
  <s-icon icon="tabler:home" />
  <s-icon icon="tabler:search" size="20" color="#165dff" content="搜索" />
  <s-icon icon="tabler:trash" type="danger" variant="light" content="删除" @click="remove" />
</template>
```

- `source` 默认是 `auto`，`tabler:home` 等含英文冒号的合法名称会自动使用 Iconify，无需写 `source="iconify"`。
- Iconify 图标由 `s-icon` 提供，业务代码无需安装或导入 `@iconify/vue`，也无需逐个导入图标组件。
- `s-button` 的 `icon`、`loading-icon` 和 `loadingIcon` 与 `s-icon` 共用同一套字符串解析规则，因此也支持 Tabler、远程图片、Emoji 和 Element Plus 图标名。
- 在线 Iconify 首次显示时需要访问 Iconify API；内网或离线项目按下方方式预注册。
- 已有 Element Plus 图标可以继续写 `icon="delete"`，新增或统一改造时优先使用 Tabler。

## 按来源选择

| 场景              | 写法                                             | 说明                                           |
| ----------------- | ------------------------------------------------ | ---------------------------------------------- |
| 新增业务图标      | `<s-icon icon="tabler:user" />`                  | 首选，自动识别为 Iconify                       |
| Element Plus 图标 | `<s-icon icon="delete" />`                       | 名称支持大小写、驼峰和短横线                   |
| 明确指定 Iconify  | `<s-icon icon="tabler:user" source="iconify" />` | 仅在需要限定来源时使用                         |
| 项目 SVG          | `<s-icon icon="custom-name" source="svg" />`     | 交给项目已配置的 `s-svg` 解析                  |
| 在线图片          | `<s-icon icon="https://example.com/icon.svg" />` | `http://`、`https://`、`//` 自动识别为 URL     |
| Emoji 文本        | `<s-icon icon="❌" />`                           | `source="auto"` 下按文本字形渲染，不当作图标名 |
| Vue 图标组件      | `<s-icon :icon="Search" />`                      | 需要在脚本中导入 `Search`                      |
| 自定义内容        | `<s-icon><CustomIcon /></s-icon>`                | 默认插槽优先于 `icon` 属性                     |

不要给能被自动识别的普通用法重复传 `source="auto"`。只有名称格式特殊或业务需要强制来源时才显式设置 `source`。

## 常用属性

| 属性                          | 类型与可选值                                            | 默认值     | 用途                                                                   |
| ----------------------------- | ------------------------------------------------------- | ---------- | ---------------------------------------------------------------------- |
| `icon`                        | `string / Component`                                    | `''`       | 图标名、组件或在线图片 URL                                             |
| `source`                      | `auto / element-plus / iconify / svg / url`             | `auto`     | 图标来源                                                               |
| `size`                        | `string / number`                                       | `16px`     | 图标尺寸，数字自动补 `px`                                              |
| `color`                       | `string`                                                | 未设置     | 显式颜色，优先于 `type`，禁用态除外；`default + plain` 继承父元素颜色  |
| `type`                        | `default / primary / success / warning / danger / info` | `default`  | 语义颜色                                                               |
| `variant`                     | `plain / light / solid`                                 | `plain`    | 无背景、浅色背景、实色背景                                             |
| `border-radius`               | `string / number`                                       | 未显式设置 | 背景圆角；数字自动补 `px`，`light/solid` 默认呈现 8px 圆角，主题可覆盖 |
| `rotate`                      | `string / number`                                       | `''`       | 数字按 `deg`，也支持 `deg / grad / rad / turn`                         |
| `cursor`                      | 合法 CSS `cursor`                                       | `pointer`  | 鼠标指针                                                               |
| `disabled`                    | `boolean`                                               | `false`    | 禁止点击并使用禁用颜色和 `not-allowed` 指针                            |
| `shadow`                      | `always / never / hover`                                | `never`    | 阴影显示时机                                                           |
| `hover-animation`             | `boolean`                                               | `false`    | Hover 时轻微上浮，禁用态不执行                                         |
| `theme`                       | `default / chenghua / shijingshan`                      | `default`  | 使用组件库主题样式                                                     |
| `content`                     | `string`                                                | `''`       | tooltip 内容                                                           |
| `dangerously-use-html-string` | `boolean`                                               | `false`    | 将 tooltip 内容按 HTML 渲染，仅用于可信内容                            |
| `iconify-attrs`               | `object`                                                | `{}`       | 透传给 Iconify，如 `flip`、`onLoad`                                    |
| `svg-attrs`                   | `object`                                                | `{}`       | 透传给 `s-svg`                                                         |
| `image-attrs`                 | `object`                                                | `{}`       | 透传给 `img`，如 `alt`、`crossorigin`、`referrerpolicy`                |

tooltip 的 `placement`、`effect`、`show-after` 等 Element Plus tooltip 属性可直接传给 `s-icon`。点击事件为 `click(event)`；`disabled` 时组件不会触发该事件。

## 常见组合

```vue
<template>
  <!-- 语义色 -->
  <s-icon icon="tabler:circle-check" type="success" />

  <!-- 浅色操作图标 -->
  <s-icon icon="tabler:edit" type="primary" variant="light" content="编辑" @click="edit" />

  <!-- 实色危险操作 -->
  <s-icon icon="tabler:trash" type="danger" variant="solid" border-radius="6" content="删除" @click="remove" />

  <!-- 旋转与 Hover 效果 -->
  <s-icon icon="tabler:refresh" :rotate="90" shadow="hover" hover-animation />

  <!-- 禁用 -->
  <s-icon icon="tabler:trash" type="danger" disabled content="当前不可删除" />
</template>
```

颜色选择规则：业务状态优先使用 `type`，品牌色或特殊视觉要求才使用 `color`；`variant="solid"` 默认使用白色前景，显式 `color` 可以覆盖。多彩图标如 `logos:vue` 通常不会跟随 `color` 改色。

## Iconify 离线注册

内网、离线环境或禁止运行时请求时，在应用入口统一注册所需图标，保证页面渲染前完成注册：

```ts
import { addIconifyCollection, addIconifyIcon } from 'sybz-components'

addIconifyIcon('project:rocket', {
  width: 24,
  height: 24,
  body: '<path fill="currentColor" d="这里填写 SVG path" />',
})

addIconifyCollection({
  prefix: 'project',
  width: 24,
  height: 24,
  icons: {
    home: { body: '<path fill="currentColor" d="这里填写 SVG path" />' },
    user: { body: '<path fill="currentColor" d="这里填写 SVG path" />' },
  },
})
```

注册后仍按普通名称使用：

```vue
<s-icon icon="project:rocket" />
<s-icon icon="project:home" />
```

## 配置化组件中的写法

在 `s-table`、`s-form`、`s-select` 等支持 `comp` 和 `attrs` 的配置中，直接指定 `s-icon`，不要写额外渲染函数：

```ts
const columns = [
  {
    label: '状态',
    prop: 'status',
    comp: 's-icon',
    attrs: {
      icon: 'tabler:circle-check',
      type: 'success',
      content: '正常',
    },
  },
]
```

只有图标或属性依赖当前行且现有配置回调无法表达时，才使用插槽或 `render`。

## 迁移规则

- `el-icon` 包裹 Element Plus 图标时，改为一个 `s-icon`，通常不再导入 `@element-plus/icons-vue`。
- `el-tooltip` 包裹图标时，把 `content`、`placement` 等属性直接放到 `s-icon`。
- 手写颜色 class 优先改成 `type`；确实是品牌色再保留 `color`。
- 手写背景、padding、圆角优先改成 `variant` 和 `border-radius`。
- 手写禁用判断应改用 `disabled`；业务处理函数仍需自行校验权限或状态。
- 迁移后删除无用的图标 import、tooltip 包装、class 和样式。

```vue
<!-- 迁移前 -->
<el-tooltip content="删除">
  <el-icon class="danger-icon" @click="remove"><Delete /></el-icon>
</el-tooltip>

<!-- 迁移后 -->
<s-icon icon="tabler:trash" type="danger" content="删除" @click="remove" />
```

## 排查

- Iconify 不显示：检查是否为英文冒号、名称是否存在，以及运行环境能否访问 Iconify API。
- 内网不显示：使用 `addIconifyIcon` 或 `addIconifyCollection` 离线注册。
- Element Plus 图标不显示：确认名称存在；`delete`、`Delete`、`delete-filled` 等形式会统一解析。
- `color` 不生效：检查是否为自带多色的 `logos:*` 图标，或组件是否处于 `disabled` 状态。
- tooltip 不显示：确认传入了非空 `content`。
- 点击无反应：检查 `disabled`，并确认事件写在 `s-icon` 上。
