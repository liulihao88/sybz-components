---
name: sybz-document-descriptions
description: >-
  Use this skill when improving sybz-components documentation so utility
  function descriptions clearly explain usage patterns, parameters, return
  values, examples, and edge cases.
metadata:
  short-description: Improve utility function documentation
---

# sybz-document-descriptions

## 目标

让函数方法文档不只是简单说明“这个函数做什么”，而是让读者看完说明后，基本能知道这个函数怎么用、不同参数有什么作用、适合在哪些场景使用。

## 函数方法文档要求

为 `@sybz-components/utils` 中的函数方法补充或优化说明时，优先保证下面这些内容完整清晰：

1. 用一句话说明函数的核心用途。
2. 写出函数签名或常见调用形式。
3. 说明每个参数的含义、类型、是否必填、默认值和可选值。
4. 说明不同参数组合会产生什么效果。
5. 说明返回值的类型、含义，以及失败、空值或异常场景下的返回结果。
6. 覆盖基础用法、常用用法和需要注意的高阶用法。
7. 给出能直接复制运行的示例代码。
8. 如果函数依赖浏览器环境、Element Plus、Vue 实例、`localStorage`、`document`、`window`、`WebSocket` 等上下文，要明确写出使用前提。
9. 如果函数有兼容旧逻辑、特殊参数、兜底逻辑或边界行为，要单独说明。
10. 保持描述准确，不夸大功能，不写源码里不存在的能力。

## 推荐文档结构

函数方法单页文档推荐按下面顺序组织：

1. `# 函数名 简短标题`
2. `### 基础用法`
3. `### 参数说明`
4. `### 返回值`
5. `### 常用场景`
6. `### 注意事项`

如果页面已经有 demo 块，保留现有 demo，并在 demo 后补充说明内容。

## 参数说明写法

参数说明优先使用 Markdown 表格：

```md
| 参数    | 类型      | 必填 | 默认值 | 说明                     |
| ------- | --------- | ---- | ------ | ------------------------ |
| value   | `unknown` | 是   | -      | 要处理的数据。           |
| options | `object`  | 否   | `{}`   | 控制格式化行为的配置项。 |
```

如果某个参数是对象，要继续说明对象字段：

```md
| 字段   | 类型     | 默认值 | 说明                     |
| ------ | -------- | ------ | ------------------------ |
| digit  | `number` | `2`    | 保留的小数位数。         |
| suffix | `string` | `''`   | 展示时追加的单位或后缀。 |
```

## 示例要求

示例要覆盖不同用法，尤其是不同参数的效果：

```ts
// 基础用法
formatBytes(1024)

// 修改小数位
formatBytes(1024, { digit: 1 })

// 添加后缀
formatBytes(1024, { suffix: '/s' })
```

示例旁边要写清楚预期结果或使用场景，避免只贴代码不解释。

## 语言风格

1. 用中文说明，函数名、参数名、类型和代码使用反引号。
2. 描述要具体，不写“支持多种配置”这种空泛句子；要列出具体配置和作用。
3. 语气保持文档风格，简洁但完整。
4. 不要为了变长而重复解释，同一信息只写一次。
