# icon图标

## Hidden Title {.md-hidden}

<DocBasicUsage code='<s-icon icon="delete"></s-icon>' />

## 属性事件插槽简介

<ApiIntro />

[Element Plus Icon Documentation](https://element-plus.org/zh-CN/component/icon.html)

### 基础用法

:::demo 展示基础用法。基础写法：`<s-icon icon="delete"></s-icon>`。属性：`icon` 类型 `SIconValue`，默认值未设置，编辑器会提示 Element Plus 图标名，同时支持 Vue 图标组件和任意自定义名称；`content` 类型 `string`，默认值 `''`；`dangerouslyUseHTMLString` 可选 `true / false`，默认值 `false`。
icon/base
:::

`icon` 也支持直接传入 Emoji 文本，例如 `<s-icon icon="❌" />`；`source="auto"` 下会按文本字形渲染，不会当作 Element Plus 图标名解析。

### 成华主题

:::demo 展示成华主题下的默认、主题、成功、警告、危险和信息类型。基础写法：`<s-icon icon="warning" theme="chenghua" type="warning" variant="light"></s-icon>`。属性：`theme` 可选 `default / chenghua / shijingshan`，默认值 `default`；`type` 可选 `default / primary / success / warning / danger / info`，默认值未设置；`variant` 可选 `plain / light / solid`，默认值 `plain`。
icon/chenghua
:::

### 石景山主题

:::demo 展示石景山主题下的默认、主题、成功、警告、危险和信息类型。基础写法：`<s-icon icon="warning" theme="shijingshan" type="warning" variant="light"></s-icon>`。属性：`theme` 可选 `default / chenghua / shijingshan`，默认值 `default`；`type` 可选 `default / primary / success / warning / danger / info`，默认值未设置；`variant` 可选 `plain / light / solid`，默认值 `plain`。
icon/shijingshan
:::

### Iconify 图标（ https://icon-sets.iconify.design/ ）

Iconify 汇集了大量开源图标集。使用 `s-icon` 时不需要单独安装 `@iconify/vue`，也不需要导入每一个图标组件，只要提供图标名称即可。

#### 组件库默认推荐：Tabler Icons

`sybz-components` 默认推荐业务项目使用 [Tabler Icons](https://icon-sets.iconify.design/tabler/)，图标名称统一以 `tabler:` 开头，例如：

```vue
<s-icon icon="tabler:layout-dashboard" />
<s-icon icon="tabler:user" />
<s-icon icon="tabler:settings" />
<s-icon icon="tabler:search" />
<s-icon icon="tabler:trash" />
```

Tabler 很适合后台管理系统：它以线性图标为主，线宽、圆角和视觉尺寸比较统一，覆盖菜单、表格操作、表单、文件、用户、权限、数据看板等常见后台场景。

项目使用时遵循以下约定：

- 新增业务功能图标时，优先从 `tabler:*` 中选择。
- 同一个页面不要混用 `tabler:*`、`mdi:*`、`lucide:*` 等多套线性图标。
- 企业或产品 Logo 可以使用 `logos:*`，这是品牌图标的例外情况。
- 项目已有 Element Plus 图标不要求立即替换；新增或统一改造时优先使用 Tabler。

这里的“默认推荐”是组件库的视觉规范，不会偷偷修改图标名称。仍然需要写完整的 `tabler:图标名`，这样代码中可以直接看出图标来源。

#### 第一步：查找图标

优先打开 [Tabler Icons 图标集](https://icon-sets.iconify.design/tabler/)，搜索需要的图标并复制名称。例如首页图标的名称是 `tabler:home`。如果 Tabler 确实没有合适的图标，再到 [Iconify Icon Sets](https://icon-sets.iconify.design/) 的全部图标集中搜索。

Iconify 名称由两部分组成，中间使用英文冒号连接：

```text
tabler:home
│      └─ 图标名称：home
└──────── 图标集前缀：tabler（Tabler Icons）
```

后台项目常用名称包括 `tabler:layout-dashboard`、`tabler:user`、`tabler:settings`、`tabler:search`、`tabler:edit` 和 `tabler:trash`。

#### 第二步：直接使用

将复制的名称传给 `icon`。当名称包含 `:` 时，`source="auto"` 会自动识别为 Iconify 图标，因此通常不用手动设置 `source`：

```vue
<s-icon icon="tabler:home" />
```

第一次显示某个在线图标时，浏览器会从 Iconify API 获取图标数据并缓存。组件库只加载页面实际使用的图标，不会把整个图标库打包进项目。

:::demo 展示默认推荐的 Tabler 图标、显式指定来源、语义颜色、属性透传、品牌图标和离线注册。基础写法：`<s-icon icon="tabler:home"></s-icon>`。属性：`icon` 类型 `SIconValue`，默认值 `''`，Iconify 字符串格式为 `图标集前缀:图标名称`；`source` 可选 `auto / element-plus / iconify / svg / url`，默认值 `auto`；`type` 可选 `default / primary / success / warning / danger / info`，默认值未设置；`color` 类型 `string`，默认值未设置；`size` 类型 `string / number`，默认值 `16px`；`iconifyAttrs` 类型 `object`，默认值 `{}`。
icon/iconify
:::

#### 修改大小、颜色和提示文字

Iconify 图标与普通 `s-icon` 使用相同的 `size`、`color`、`type`、`variant` 和 tooltip 属性：

```vue
<s-icon icon="tabler:home" size="24" />
<s-icon icon="tabler:circle-check" type="success" size="28" />
<s-icon icon="tabler:alert-triangle" type="warning" variant="light" size="24" />
<s-icon icon="tabler:search" color="#165dff" content="搜索" placement="top" />
```

大部分线性、单色图标使用 `currentColor`，可以通过 `color` 或 `type` 改色。`logos:vue` 这类品牌图标自身包含多种颜色，通常不会跟随 `color` 改变。

#### 什么时候需要 source="iconify"

默认的 `source="auto"` 已经能识别 `tabler:home` 这类带冒号的名称。只有希望明确限定图标来源，或者自定义名称无法被自动识别时，才需要显式设置：

```vue
<s-icon icon="tabler:search" source="iconify" />
```

`source` 的全部可选值为 `auto / element-plus / iconify / svg / url`，默认值为 `auto`。

#### 透传 Iconify 专属属性

通过 `iconifyAttrs` 可以把属性直接传给底层 Iconify Icon，例如翻转图标或监听加载完成：

```vue
<script setup lang="ts">
const handleLoad = () => {
  console.log('图标加载完成')
}
</script>

<template>
  <s-icon
    icon="tabler:login"
    :iconify-attrs="{
      flip: 'horizontal',
      onLoad: handleLoad,
    }"
  />
</template>
```

#### 内网或离线项目

在线模式需要浏览器能够访问 Iconify API。如果项目运行在内网、离线环境，或者不希望运行时发送图标请求，可以提前注册图标数据。

注册单个图标时，从 `sybz-components` 导入 `addIconifyIcon`：

```ts
import { addIconifyIcon } from 'sybz-components'

addIconifyIcon('project:rocket', {
  width: 24,
  height: 24,
  body: '<path fill="currentColor" d="这里填写图标的 SVG path" />',
})
```

注册后使用方式与在线图标完全相同：

```vue
<s-icon icon="project:rocket" />
```

需要一次注册多个图标时，可以使用 `addIconifyCollection`：

```ts
import { addIconifyCollection } from 'sybz-components'

addIconifyCollection({
  prefix: 'project',
  width: 24,
  height: 24,
  icons: {
    home: {
      body: '<path fill="currentColor" d="这里填写 home 图标路径" />',
    },
    user: {
      body: '<path fill="currentColor" d="这里填写 user 图标路径" />',
    },
  },
})
```

之后分别通过 `project:home` 和 `project:user` 使用。建议在应用入口文件中统一注册，确保页面渲染前图标数据已经可用。

#### 常见问题

- 图标不显示：先检查名称是否包含英文冒号，并确认图标名称在 Iconify 网站中存在。
- 本地开发能显示、内网不能显示：通常是内网无法访问 Iconify API，应改用离线注册。
- 设置 `color` 没有效果：图标可能是 `logos:*` 这类自带颜色的品牌图标。
- 想使用普通 Element Plus 图标：直接写 `<s-icon icon="delete" />`，名称不含冒号时，`source="auto"` 会按 Element Plus 图标处理。

### 插槽

:::demo 展示插槽内容定制。基础写法：`<s-icon></s-icon>`。插槽：按示例中的插槽名定制内容。
icon/slot
:::

### 旋转角度（rotate 默认值：''）

:::demo 展示图标旋转角度。基础写法：`<s-icon icon="arrow-up" :rotate="90"></s-icon>`。属性：`rotate` 类型 `string / number`，默认值 `''`；数字及数字字符串使用 `processWidth` 写法并按 `deg` 处理，也支持带 `deg / grad / rad / turn` 单位的角度字符串。
icon/rotate
:::

### 语义类型与背景样式（type 默认值：未设置，variant 默认值：plain）

:::demo 展示图标的语义颜色和背景样式。基础写法：`<s-icon icon="warning" type="warning" variant="light"></s-icon>`。属性：`type` 可选 `default / primary / success / warning / danger / info`，默认值未设置；`variant` 可选 `plain / light / solid`，默认值 `plain`；`color` 类型 `string`，默认值未设置，显式设置时优先于语义颜色；`type="default"` 配合 `variant="solid"` 时使用白色背景和默认边框。
icon/type
:::

### 常用图标查找

:::demo 展示图标按钮配置。基础写法：`<s-icon :icon="v.value" color="var(--blue)"></s-icon>`。属性：`icon` 类型 `string / Component`，默认值未设置。
icon/usually
:::

### 所有图标

:::demo 展示图标按钮。基础写法：`<s-icon :icon="iconName" class="item"></s-icon>`。属性：`icon` 类型 `SIconValue`，默认值未设置。
icon/all
:::

### 鼠标指针（cursor 默认值：pointer）

:::demo 展示图标的鼠标指针样式。基础写法：`<s-icon icon="tabler:trash" cursor="pointer"></s-icon>`。属性：`cursor` 类型 `SIconCursor`，默认值 `pointer`，支持任意合法的 CSS `cursor` 值，常用值包括 `pointer / default / help / move / grab / grabbing / not-allowed / zoom-in / zoom-out`；`disabled` 可选值 `true / false`，默认值 `false`，禁用时始终使用 `not-allowed`。
icon/cursor
:::

### 背景圆角（borderRadius 默认值：8px）

:::demo 展示 `light / solid` 背景的圆角设置。基础写法：`<s-icon icon="tabler:trash" type="danger" variant="solid" border-radius="12"></s-icon>`。属性：`borderRadius` 类型 `string / number`，默认值 `8px`，数字和数字字符串自动补 `px`，也支持 `rem / em / %` 等 CSS 单位；`variant` 可选值 `plain / light / solid`，默认值 `plain`。成华和石景山主题默认使用各自的常规圆角 token，显式设置 `borderRadius` 时优先。
icon/borderRadius
:::

### 阴影和 Hover 动画（shadow 默认值：never，hoverAnimation 默认值：false）

:::demo 展示图标阴影和鼠标移入上浮动画。基础写法：`<s-icon icon="tabler:trash" shadow="hover" hover-animation></s-icon>`。属性：`shadow` 可选值 `always / never / hover`，默认值 `never`；`hoverAnimation` 可选值 `true / false`，默认值 `false`。两个属性可以单独使用，也可以组合使用；禁用状态下不会触发 Hover 效果。
icon/hoverShadow
:::

### 在线图片（source 默认值：auto）

:::demo `icon` 支持传入 `http://`、`https://` 和 `//` 开头的在线图片地址，`source="auto"` 会优先识别 URL，不会因为地址中包含 `:` 而误判为 Iconify 名称。基础写法：`<s-icon icon="https://api.iconify.design/mdi/home.svg" size="32"></s-icon>`。属性：`source` 可选值 `auto / element-plus / iconify / svg / url`，默认值 `auto`；`imageAttrs` 类型 `object`，默认值 `{}`，用于向内部 `img` 透传 `alt / crossorigin / referrerpolicy` 等属性；也可以通过 `source="url"` 显式指定图片来源。
icon/url
:::

### 属性

|           属性名           | 说明                                                                   | 类型            | 默认值    |
| :------------------------: | ---------------------------------------------------------------------- | --------------- | --------- |
|           `icon`           | 图标组件、名称或在线图片 URL                                           | SIconValue      | `''`      |
|          `color`           | 图标颜色                                                               | string          | -         |
|           `size`           | 图标尺寸                                                               | string / number | `16px`    |
|       `borderRadius`       | 背景圆角，数字自动补 `px`，显式设置时覆盖主题圆角                      | string / number | `8px`     |
|          `cursor`          | 鼠标指针样式，支持任意合法的 CSS `cursor` 值                           | SIconCursor     | `pointer` |
|      `hoverAnimation`      | 鼠标移入时是否启用轻微上浮动画                                         | boolean         | `false`   |
|          `shadow`          | 阴影显示时机，可选 `always / never / hover`                            | string          | `never`   |
|          `rotate`          | 图标旋转角度，数字及数字字符串按 `deg` 处理                            | string / number | `''`      |
|         `disabled`         | 是否禁用，禁用后不会触发点击                                           | boolean         | `false`   |
|          `theme`           | 主题，可选 `default / chenghua / shijingshan`                          | string          | `default` |
|          `source`          | 图标来源，可选 `auto / element-plus / iconify / svg / url`             | string          | `auto`    |
|           `type`           | 语义类型，可选 `default / primary / success / warning / danger / info` | string          | -         |
|         `variant`          | 视觉样式，可选 `plain / light / solid`                                 | string          | `plain`   |
|         `svgAttrs`         | 透传给 `s-svg` 的属性                                                  | object          | `{}`      |
|       `iconifyAttrs`       | 透传给 Iconify 的属性，如 `flip`、`onLoad`                             | object          | `{}`      |
|        `imageAttrs`        | 透传给在线图片 `img` 的属性，如 `alt`、`crossorigin`                   | object          | `{}`      |
| `dangerouslyUseHTMLString` | 是否将 tooltip 的 `content` 按 HTML 字符串渲染                         | boolean         | `false`   |

### 事件

| 事件名  | 说明           | 回调参数 |
| :-----: | -------------- | -------- |
| `click` | 点击图标时触发 | `event`  |

### 说明

- 组件底层使用 `el-icon`，tooltip 相关属性如 `content`、`placement`、`effect` 可直接透传。
- 在支持 Vue 模板类型提示的编辑器中，输入 `icon` 会提示 Element Plus 图标名；同时仍可传入 Vue 图标组件、小写、短横线、自定义 SVG 或 Iconify 名称。
- `source="auto"` 会先识别在线图片 URL，再按 `图标集前缀:图标名称` 格式识别 Iconify；完整用法见上方“Iconify 图标”和“在线图片”章节。
