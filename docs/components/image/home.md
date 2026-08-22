# image图片

## Hidden Title {.md-hidden}

<DocBasicUsage code='<s-image src="https://example.com/image.png" width="240" height="150" />' />

## 属性事件插槽简介

<ApiIntro />

[Element Plus Image Documentation](https://element-plus.org/zh-CN/component/image.html)

### 基础用法（width 默认值：未设置；height 默认值：未设置）

:::demo 展示基础图片和尺寸设置。基础写法：`<s-image src="图片地址" width="240" height="150" />`。属性：`src` 类型 `string`，默认值 `''`；`width`、`height` 类型 `string / number`，默认值未设置；`fit` 继承 Element Plus，可选 `fill / contain / cover / none / scale-down`，默认值 `''`。
image/base
:::

### 本地源码图片（resolver 默认值：未设置）

:::demo 展示 `src/assets` 图片的简写路径。基础写法：`<s-image src="overview/group1.png" :resolver="resolver" />`。属性：`resolver` 类型 `(src: string) => string | undefined`，默认值未设置；全局配置后无需在每个组件上传递。
image/resolver
:::

### 单图预览（preview 默认值：false）

:::demo 点击图片即可预览，无需重复填写 `src`。基础写法：`<s-image src="图片地址" preview />`。属性：`preview` 可选 `true / false`，默认值 `false`；如果同时传入非空的 `preview-src-list`，则优先使用该列表，适合多图预览。
image/preview
:::

### 插槽

:::demo `s-image` 使用可正常加载的本地图片，并保留 Element Plus Image 的全部插槽。基础写法：`<s-image src="图片地址"><template #error>加载失败</template></s-image>`。插槽：`placeholder / error / viewer / progress / toolbar / viewer-error`；其中 `placeholder` 仅在加载过程中出现，`error` 仅在加载失败时出现。
image/slots
:::

### 全局路径配置

如果图片位于 `public/images`，可以统一配置基础路径：

```ts
app.use(SybzComponents, {
  image: {
    basePath: '/images',
  },
})
```

之后业务中只需使用：

```vue
<s-image src="tenant/test1.png" />
```

如果图片位于 `src/assets/images`，必须先让 Vite 静态收集资源，再统一配置解析器：

```ts
import SybzComponents, { createImageResolver } from 'sybz-components'

const imageModules = import.meta.glob('/src/assets/images/**/*', {
  eager: true,
  query: '?url',
  import: 'default',
})

app.use(SybzComponents, {
  image: {
    resolver: createImageResolver(imageModules, '/src/assets/images'),
  },
})
```

业务组件中同样只需写 `<s-image src="tenant/test1.png" />`。`preview-src-list` 中的相对路径也会自动解析。

### 属性

| 属性名           | 说明                                               | 类型                      | 默认值  |
| ---------------- | -------------------------------------------------- | ------------------------- | ------- |
| `src`            | 图片地址，相对路径会通过 resolver 或 basePath 解析 | string                    | `''`    |
| `width`          | 图片宽度，数字自动补 `px`                          | string / number           | -       |
| `height`         | 图片高度，数字自动补 `px`                          | string / number           | -       |
| `basePath`       | 相对图片的公共基础路径                             | string                    | `''`    |
| `resolver`       | 自定义图片路径解析函数                             | `(src) => string \| void` | -       |
| `preview`        | 是否直接使用当前 `src` 开启单图预览                | boolean                   | `false` |
| `previewSrcList` | 图片预览列表，其中的相对路径也会被解析             | string[]                  | `[]`    |

其他属性、事件和方法与 Element Plus Image 保持一致，包括 `fit`、`lazy`、`loading`、`preview-src-list`、`load`、`error`、`switch`、`close`、`show` 和 `showPreview()`。
