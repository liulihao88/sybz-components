# STableSearch 表格搜索组件

## Hidden Title {.md-hidden}

<DocBasicUsage code='<s-table-search v-model="form" :options="fields" @search="handleSearch" />' />

## 属性事件插槽简介

<ApiIntro />

### 基础用法（`column` 默认 `3`，`showReset` 默认 `true`）

通过 `options` 配置搜索字段，使用 `v-model` 获取表单值。搜索和重置按钮默认以固定宽度显示在搜索项右侧。点击搜索或按回车时触发 `search`。基础写法：`<s-table-search v-model="form" :options="fields" @search="handleSearch" />`。

:::demo 属性：`options` 类型 `STableSearchField[]`，默认值 `[]`；`column` 类型 `number`，默认值 `3`；`showReset` 类型 `boolean`，可选值 `true / false`，默认值 `true`。
tableSearch/base
:::

### 自动搜索（`searchOn` 默认按字段组件决定）

`s-select` 默认在 `change / clear` 时搜索，其他组件默认只在 `clear` 时搜索；字段的 `searchOn` 优先于组件的全局 `searchOn`。基础写法：`<s-table-search :items="fields" :search-on="['change']" @search="handleSearch" />`。

:::demo 属性：`items` 类型 `STableSearchField[]`，默认值 `undefined`，设置后优先于 `options`；`searchOn` 类型 `('change' | 'clear')[] | false`，可选值 `change / clear / false`，默认值 `undefined`。
tableSearch/autoSearch
:::

### 自定义字段和操作区

字段配置 `useSlot: true` 时使用 `prop` 作为插槽名，传字符串时使用指定插槽名；原有 `field-${prop}` 插槽继续兼容。通过 `actions` 插槽扩展按钮。存在 `actions` 或默认插槽时，操作区会自动显示在搜索项下方，扩展操作靠左，搜索和重置靠右。基础写法：`<template #date="{ item, model, value, update }">...</template>`。

:::demo 属性：`useSlot` 类型 `boolean | string`，可选值 `true / false / 自定义插槽名`，默认值 `false`；`initialValue` 类型 `object`，默认值 `{}`；字段插槽参数包含 `item / model / value / update`；`actions` 插槽无参数。
tableSearch/custom
:::

### 属性

|     属性名     | 说明                               | 类型                  | 可选值                       | 默认值      |
| :------------: | ---------------------------------- | --------------------- | ---------------------------- | ----------- |
|  `modelValue`  | 搜索表单值，支持 `v-model`         | object                | -                            | `undefined` |
|   `options`    | 搜索字段配置                       | `STableSearchField[]` | -                            | `[]`        |
|    `items`     | 搜索字段配置，优先级高于 `options` | `STableSearchField[]` | -                            | `undefined` |
|    `column`    | 每行字段数                         | number                | 正整数                       | `3`         |
| `initialValue` | 初始值及重置后的值                 | object                | -                            | `{}`        |
|   `searchOn`   | 全局自动搜索事件，传 `false` 关闭  | array / false         | `change` / `clear` / `false` | `undefined` |
|  `showReset`   | 是否显示重置按钮                   | boolean               | `true` / `false`             | `true`      |

### options / items 字段属性

|   字段名   | 说明                                                 | 类型               | 可选值                       | 默认值      |
| :--------: | ---------------------------------------------------- | ------------------ | ---------------------------- | ----------- |
|   `prop`   | 表单字段名                                           | string             | -                            | -           |
|  `label`   | 字段标题，用于生成 placeholder 和 title              | string             | -                            | -           |
|   `comp`   | 字段组件                                             | string / Component | 已注册组件或组件对象         | `s-input`   |
|  `attrs`   | 透传给字段组件的属性                                 | object             | -                            | `{}`        |
|  `render`  | 自定义字段渲染组件                                   | Component          | -                            | `undefined` |
| `useSlot`  | 使用字段插槽；`true` 使用 `prop`，字符串使用指定名称 | boolean / string   | `true` / `false` / 插槽名    | `false`     |
| `searchOn` | 当前字段自动搜索事件，优先于全局配置                 | array / false      | `change` / `clear` / `false` | `undefined` |
|    `on`    | 当前字段的 `change / clear` 回调                     | object             | `change` / `clear`           | `{}`        |

### 事件

|       事件名        | 说明                                     | 回调参数 |
| :-----------------: | ---------------------------------------- | -------- |
| `update:modelValue` | 字段值变化或重置时触发                   | `(form)` |
|      `search`       | 点击搜索、按回车或命中自动搜索事件时触发 | `(form)` |
|       `reset`       | 点击重置后触发                           | `(form)` |

### 插槽

|            插槽名            | 说明                     | 参数                             |
| :--------------------------: | ------------------------ | -------------------------------- |
| `prop` 或 `useSlot` 指定名称 | `useSlot` 启用的字段插槽 | `{ item, model, value, update }` |
|       `field-${prop}`        | 兼容原有的自定义字段写法 | `{ item, model, value, update }` |
|          `actions`           | 搜索和重置按钮前的操作区 | -                                |
|          `default`           | `actions` 的兼容写法     | -                                |
