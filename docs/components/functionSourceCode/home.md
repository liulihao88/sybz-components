# FunctionSourceCode 函数源码展示

`s-function-source-code` 用于在文档中展示 `@sybz-components/utils` 中指定函数的源码，常用于工具函数文档页。

## Hidden Title {.md-hidden}

<DocBasicUsage code='<s-function-source-code :function-name="functionName" />' />

## 属性事件插槽简介

<ApiIntro />

### 基础用法

:::demo 基础写法：`<s-function-source-code :function-name="functionName" />`。属性说明：`function-name` 示例值：`functionName`，类型：string，默认值：`mockValue`。本示例展示基础渲染和最小配置，可以直接复制基础写法后按业务替换数据。
functionSourceCode/base
:::

### API

|     属性名     | 说明                       | 类型   | 默认值      |
| :------------: | -------------------------- | ------ | ----------- |
| `functionName` | 需要展示源码的工具函数名称 | string | `mockValue` |

### 说明

- 组件会从 `@sybz-components/utils` 中按 `functionName` 查找对应导出。
- 如果函数不存在，会展示“未能找到函数”的提示。
- 该组件主要服务于文档站，不建议作为业务页面组件使用。
