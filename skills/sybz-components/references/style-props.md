# 样式简写属性（Style Props）

所有 `sybz-components` 组件都内置了 Mantine 风格的样式简写属性，可以直接把常用 CSS 写成组件 prop，无需 `:style` 或额外 class。全局 mixin 统一声明，所有组件自动支持。

## 用法

```vue
<s-flex gap="small" m="12" p="16" bg="#f0f6ff" c="#1d4ed8" />
<s-button px="100" mx="100" fs="14px" />
<s-title title="标题" fw="400" />
```

## 属性速查

- 内边距/外边距：`m` `mt` `mb` `ml` `mr` `mx` `my`、`p` `pt` `pb` `pl` `pr` `px` `py`
- 字体文本：`fs`(font-size) `fw`(font-weight) `lh`(line-height) `ta`(text-align) `tt`(text-transform) `td`(text-decoration) `ff`(font-family) `lts`(letter-spacing)
- 尺寸定位：`w` `h` `miw` `maw` `mih` `mah` `pos` `top` `bottom` `left` `right` `inset` `z` `flex`
- 背景边框：`bg` `c`(color) `opacity` `bd` `bdt` `bdb` `bdl` `bdr` `br`(border-radius)

## 取值规则

- 长度类（`m`/`p`/`w`/`h`/`fs`/`br` 等）：
  - 尺寸 token：`small`(8px) `default`(16px) `large`(24px)，如 `pl="small"` → `padding-left:8px`。
  - 数字自动补 `px`；字符串交给 `processWidth`（`"10"`→`10px`，`"1rem"` 原样，`"50%"` 原样）。
- `lh`：数字保持无单位（`1.5` 就是 `1.5`）；字符串原样。
- `inset`：支持 token 和数字（补 `px`），多值字符串原样。
- 其余（`fw`/`ta`/`tt`/`td`/`ff`/`pos`/`bg`/`c`/`bd` 等）：原样透传。

## 注意事项

- 无需每个组件单独配置，直接用。
- 组件自身已声明的同名 prop 优先（如 `s-flex` 的 `w`/`h`/`flex`/`gap`、`s-title` 的 `fs`），不会重复应用。
- 在生成业务代码时，用这些简写表达间距、字号、颜色、尺寸等样式，避免散落 `:style` 或硬编码 class。
- 收到原型图/UI 图/设计稿时，若其中样式与组件库内置样式冲突，一律以组件库样式为准，不得修改组件内部样式去贴合设计稿；仅通过组件对外的 Style Props、props、主题 token 表达业务层需求。
