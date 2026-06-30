# CompTitle 组件标题前缀

`s-comp-title` 是表单类组件左侧标题前缀，用来和 `s-input`、`s-select`、`s-input-number` 等输入控件拼接展示。单独使用时会保持和 Element Plus 输入框一致的高度。

## Hidden Title {.md-hidden}

<DocBasicUsage code='<s-comp-title title="默认" />' />

## 属性事件插槽简介

<ApiIntro />

### 基础用法

:::demo 基础写法：`<s-comp-title title="默认" />`。属性说明：`title` 示例值：`默认`，类型：string，默认值：`''`；`size` 示例值：`large`，类型：`large` / `default` / `small`，默认值：`default`；`comp-title-style` 示例值：`{ width: 88 }`，类型：object，默认值：`{}`。本示例展示基础渲染和最小配置，可以直接复制基础写法后按业务替换数据。
compTitle/base
:::

### 成华主题

:::demo 基础写法：`<s-comp-title title="审核周期" theme="chenghua" :comp-title-style="{ width: 96 }" />`。属性说明：`title` 示例值：`审核周期`，类型：string，默认值：`''`；`theme` 示例值：`chenghua`，类型：`''` / `chenghua`，默认值：`''`；`compTitleStyle` 示例值：`{ width: 96 }`，类型：object，默认值：`{}`。本示例展示成华主题样式。theme="chenghua" 时启用成华主题样式。
compTitle/chenghua/base
:::

### API

|      属性名      | 说明                                                    | 类型              | 默认值 |
| :--------------: | ------------------------------------------------------- | ----------------- | ------ |
|     `title`      | 标题文案；为空时不渲染组件                              | string            | `''`   |
| `compTitleStyle` | 标题容器样式，支持 `width` 并会经过 `processWidth` 处理 | object            | `{}`   |
|     `theme`      | 主题样式                                                | `''` / `chenghua` | `''`   |

### 透传属性

| 属性名  | 说明                               | 类型                          | 默认值    |
| :-----: | ---------------------------------- | ----------------------------- | --------- |
| `size`  | 尺寸，跟随 Element Plus 输入框尺寸 | `large` / `default` / `small` | `default` |
| `class` | 自定义类名                         | string / object / array       | -         |
| `style` | 自定义样式                         | string / object / array       | -         |

### 说明

- `s-comp-title` 默认用于输入类组件的左侧标题区域。
- 默认高度为 `var(--el-component-size, 32px)`，`small` 为 `24px`，`large` 为 `40px`。
- 和输入框拼接时，通常需要把后面的输入框左侧圆角置为 `0`。
