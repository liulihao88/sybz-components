# CompTitle 组件标题前缀

`s-comp-title` 用于输入框前缀，也可作为单选、多选和开关旁的标题。

## Hidden Title {.md-hidden}

<DocBasicUsage code='<s-comp-title title="默认" />' />

## 属性事件插槽简介

<ApiIntro />

### 基础用法

:::demo 展示基础用法。基础写法：`<s-comp-title title="默认" />`。属性：`title` 类型 `string`，默认值 `''`；`size` 可选 `'' / small / default / large`，默认值 `''`。
compTitle/base
:::

### 其他用法

::: other
compTitle/other
:::

### 主题（theme 默认值：default）

:::demo
compTitle/theme
:::

### API

|      属性名      | 说明                                                    | 类型                                            | 默认值    |
| :--------------: | ------------------------------------------------------- | ----------------------------------------------- | --------- |
|     `title`      | 标题文案；为空时不渲染组件                              | string                                          | `''`      |
|      `type`      | 标题样式：`input` 输入框前缀，`label` 普通控件标签      | `input` / `label`                               | `input`   |
| `compTitleStyle` | 标题容器样式，支持 `width` 并会经过 `processWidth` 处理 | object                                          | `{}`      |
|     `theme`      | 主题样式                                                | `default` / `chenghua` / `shijingshan` / `sybz` | `default` |

### 透传属性

| 属性名  | 说明                               | 类型                          | 默认值    |
| :-----: | ---------------------------------- | ----------------------------- | --------- |
| `size`  | 尺寸，跟随 Element Plus 输入框尺寸 | `large` / `default` / `small` | `default` |
| `class` | 自定义类名                         | string / object / array       | -         |
| `style` | 自定义样式                         | string / object / array       | -         |

### 说明

- `s-comp-title` 默认用于输入类组件的左侧标题区域。
- 默认内边距为 `0 8px`，可通过 `compTitleStyle.padding` 覆盖。
- 默认高度为 `var(--el-component-size, 32px)`，`small` 为 `24px`，`large` 为 `40px`。
- 和输入框拼接时，通常需要把后面的输入框左侧圆角置为 `0`。
