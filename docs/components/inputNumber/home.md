# inputNumber数字输入框组件

[Element Plus 数字输入框组件文档](https://element-plus.org/zh-CN/component/input-number.html)

::: tip 常用属性说明

- `precision`: 精度
- `prefix`: 插槽前缀
- `suffix`: 插槽后缀
- `value-on-clear`: 输入框被清空时显示的值，支持 `number` / `null` / `min` / `max`。
- `controls-position`: 控制按钮位置，`s-input-number` 默认值为 `right`。
- `step-strictly`: 严格步进，设置为 `true` 后只能输入步进倍数。

:::

## Hidden Title {.md-hidden}

## 属性事件插槽简介

<ApiIntro />

### 基础用法

:::demo
inputNumber/base
:::

### 成华主题

:::demo `theme="chenghua" 时启用成华主题样式`
inputNumber/chenghua/base
:::

### 高度

:::demo
inputNumber/height
:::

### 尺寸

:::demo
inputNumber/size
:::

### usually常用

:::demo
inputNumber/usually
:::

### 属性

|    属性名    | 说明             | 类型            | 默认值 |
| :----------: | ---------------- | --------------- | ------ |
| `modelValue` | 绑定值           | any             | -      |
|   `title`    | 左侧标题前缀文案 | string          | `''`   |
|  `boxStyle`  | 标题前缀区域样式 | object          | `{}`   |
|   `width`    | 组件总宽度       | string / number | `''`   |
|   `height`   | 组件总高度       | string / number | `''`   |
|   `theme`    | 主题样式         | `''` / `chenghua` | `''` |
| `controls-position` | 控制按钮位置 | `''` / `right` | `right` |
|  `subAttrs`  | 外层容器额外属性 | object          | `{}`   |

### 插槽

|     插槽名      | 说明           |
| :-------------: | -------------- |
|    `prefix`     | 输入框前缀内容 |
|    `suffix`     | 输入框后缀内容 |
| `decrease-icon` | 减少按钮图标   |
| `increase-icon` | 增加按钮图标   |

### 说明

- 默认基于 `el-input-number` 二次封装，并透传绝大多数 `el-input-number` 属性。
- 传入 `title` 后会在左侧渲染 `s-comp-title`，用于和其他表单组件保持一致。
- 支持透传 `el-input-number` 的命名插槽。
