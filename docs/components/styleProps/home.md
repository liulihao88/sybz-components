# 样式简写属性（Style Props）

`syz-components` 所有组件都内置了一套 **Mantine 风格的样式简写属性**（Style Props）。你可以把常见的 CSS 样式直接写成组件的 prop，不必再写 `:style` 或单独套一层 `class`。

这套属性由全局 mixin 统一声明，**所有组件都自动支持**，组件内部已接好解析逻辑，业务代码直接传值即可。

## 快速上手

```vue
<template>
  <!-- 外边距 12px、内边距 16px、浅蓝背景、蓝字 -->
  <s-flex gap="small" m="12" p="16" bg="#f0f6ff" c="#1d4ed8">内容</s-flex>

  <!-- 按钮：水平内边距 100px、水平外边距 100px -->
  <s-button px="100" mx="100">按钮</s-button>

  <!-- 标题：字重 400 -->
  <s-title title="标题" fw="400" />
</template>
```

## 属性一览

### 内边距与外边距

| 简写 | 对应 CSS                       | 简写 | 对应 CSS                         |
| :--: | :----------------------------- | :--: | :------------------------------- |
| `m`  | `margin`                       | `p`  | `padding`                        |
| `mt` | `margin-top`                   | `pt` | `padding-top`                    |
| `mb` | `margin-bottom`                | `pb` | `padding-bottom`                 |
| `ml` | `margin-left`                  | `pl` | `padding-left`                   |
| `mr` | `margin-right`                 | `pr` | `padding-right`                  |
| `mx` | `margin-left` + `margin-right` | `px` | `padding-left` + `padding-right` |
| `my` | `margin-top` + `margin-bottom` | `py` | `padding-top` + `padding-bottom` |

### 字体与文本

| 简写  | 对应 CSS          | 说明                                   |
| :---: | :---------------- | :------------------------------------- |
| `fs`  | `font-size`       | 数字补 `px`                            |
| `fw`  | `font-weight`     | 如 `400`、`700`、`bold`                |
| `lh`  | `line-height`     | 数字保持无单位（如 `1.5`），字符串原样 |
| `ta`  | `text-align`      | `left / center / right`                |
| `tt`  | `text-transform`  | `uppercase / capitalize` 等            |
| `td`  | `text-decoration` | `underline` 等                         |
| `ff`  | `font-family`     | 字体族                                 |
| `lts` | `letter-spacing`  | 数字补 `px`                            |

### 尺寸与定位

|  简写   | 对应 CSS    |   简写   | 对应 CSS     |
| :-----: | :---------- | :------: | :----------- |
|   `w`   | `width`     |   `h`    | `height`     |
|  `miw`  | `min-width` |  `mih`   | `min-height` |
|  `maw`  | `max-width` |  `mah`   | `max-height` |
|  `pos`  | `position`  |   `z`    | `z-index`    |
|  `top`  | `top`       | `bottom` | `bottom`     |
| `left`  | `left`      | `right`  | `right`      |
| `inset` | `inset`     |  `flex`  | `flex`       |

### 背景与边框

|   简写    | 对应 CSS        | 说明               |
| :-------: | :-------------- | :----------------- |
|   `bg`    | `background`    | 颜色或完整背景值   |
|    `c`    | `color`         | 文字颜色           |
| `opacity` | `opacity`       | 如 `0.5`           |
|   `bd`    | `border`        | 如 `1px solid red` |
|   `bdt`   | `border-top`    | —                  |
|   `bdb`   | `border-bottom` | —                  |
|   `bdl`   | `border-left`   | —                  |
|   `bdr`   | `border-right`  | —                  |
|   `br`    | `border-radius` | 数字补 `px`        |

## 尺寸 token

长度类属性（`m` / `p` / `w` / `h` / `fs` / `br` / `inset` 等）除了数字和 CSS 长度，还支持组件库统一的尺寸 token（与 `gap` / `size` 一致）：

|   token   | 对应值 |  token  | 对应值 |
| :-------: | :----- | :-----: | :----- |
|  `small`  | `8px`  | `large` | `24px` |
| `default` | `16px` |    —    | —      |

例如 `pl="small"` → `padding-left: 8px`，`m="default"` → `margin: 16px`，`br="large"` → `border-radius: 24px`。

## 取值规则

1. **长度类属性**（`m` / `p` / `w` / `h` / `fs` / `br` 等）：支持尺寸 token（`small` / `default` / `large`）、数字（自动补 `px`）或 CSS 长度字符串——`"10"` → `10px`、`"1rem"` 原样、`"50%"` 原样。
2. **关键词类属性**（`fw` / `ta` / `tt` / `td` / `ff` / `pos` / `bg` / `c` / `bd` 等）：原样透传。
3. **`lh`**（行高）：数字保持无单位（`1.5` 就是 `1.5`，不会变 `1.5px`），字符串原样。
4. **`inset`**：支持 token 和数字（补 `px`，四边同值），多值字符串（如 `"10px 20px"`）原样透传。

## 注意事项

- **无需每个组件单独配置**：样式简写由全局 mixin 统一声明，组件已内置解析与绑定，业务代码直接用。
- **同名 prop 优先组件自身**：少数组件自身已声明同名 prop（如 `s-flex` 的 `w` / `h` / `flex` / `gap`、`s-title` 的 `fs` 等），此时以组件自身语义为准，不会重复应用。
- **数字写法**：模板中直接写 `m="10"`（字符串）或 `:m="10"`（数字）都会得到 `10px`。

## 类型支持

所有组件的 `.d.ts` 类型都已带上 `SybzStyleProps`，在 IDE 里写 `<s-flex m="10" fs="14px" bg="#fff" />` 会有完整的属性提示与类型校验。
