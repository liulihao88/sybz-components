# svg图标组件

[https://github.com/vbenjs/vite-plugin-svg-icons](https://github.com/vbenjs/vite-plugin-svg-icons)

## Hidden Title {.md-hidden}

<DocBasicUsage code='<s-svg name="icon_file-cloud-line"></s-svg>' />

## 属性事件插槽简介

<ApiIntro />

<s-warning content="注意: 如果svg本身不支持改变颜色, 那么设置<code>color</code>也是不起作用的 . 如果希望svg能够改变颜色, 那需要将svg的代码中的<code>fill</code>改为<code>currentColor</code>" type="warning"></s-warning>

svg图片存放地址: docs/.vitepress/theme/assets/svg

### 安装和使用

```js
pnpm i vite-plugin-svg-icons -D

// vite.config.ts
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
// 这里最重要的把svg路径配置进去, 否则会找不到
plugins: [
  createSvgIconsPlugin({
    iconDirs: [path.resolve(__dirname, './src/assets/svg')],
    symbolId: 'icon-[dir]-[name]',
  }),
],

// main.ts
import 'virtual:svg-icons-register'

// 可以使用了
<s-svg name="test" color="blue"></s-svg>
```

### 基础用法

:::demo 基础写法：`<s-svg name="icon_file-cloud-line">...</s-svg>`。属性说明：`name` 示例值：`icon_file-cloud-line`，类型：string，默认值：未设置；`size` 示例值：`50`，类型：string / number，默认值：`16px`；`color` 示例值：`blue`，类型：string，默认值：未设置。本示例展示基础渲染和最小配置。之所以, options为空, 加红色边框, 是为了减少不必要的点击后才知道数据为空的操作。
svg/base
:::

### 通常用法

:::demo 基础写法：`<s-svg name="icon_file-cloud-line" :customStyle="{ width: '100px', height: '100px', color: 'red' }">...</s-svg>`。属性说明：`name` 示例值：`icon_file-cloud-line`，类型：string，默认值：未设置；`customStyle` 示例值：`{ width: '100px', height: '100px'...`，类型：object，默认值：`{}`。本示例展示通常用法配置，可以直接复制基础写法后按业务替换数据。
svg/usually
:::

### 属性

|    属性名     | 说明           | 类型            | 默认值 |
| :-----------: | -------------- | --------------- | ------ |
|   `prefix`    | symbol 前缀    | string          | `icon` |
|    `name`     | svg 图标名称   | string          | -      |
|    `color`    | 图标颜色       | string          | -      |
| `customStyle` | 自定义样式对象 | object          | `{}`   |
|    `size`     | 图标尺寸       | string / number | `16px` |
