# 自定义loading和自定义empty

## v-copy

<DocBasicUsage code='<span v-copy:click="text">{{ text }}</span>' />

### 基础用法

:::demo
directives/copy/base
:::

### 说明

- `v-copy` 用于一键复制文本内容到剪贴板。
- 指令值通常直接传待复制的字符串。
- 默认复制成功或失败后会显示 toast。
- 不需要显示 toast 时，可以传 `{ value, hideToast: true }`，也可以使用 `v-copy.hideToast="value"`。
