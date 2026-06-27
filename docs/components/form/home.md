# form表单组件

[https://element-plus.org/zh-CN/component/form.html](https://element-plus.org/zh-CN/component/form.html)

## Hidden Title {.md-hidden}

<DocBasicUsage code='<s-form :model="model" :fieldList="fieldList" :rules="rules" ref="gFormRef"></s-form>' />

## 属性事件插槽简介

<ApiIntro />

### 基础用法

:::demo 基础写法：`<s-form :model="model" :fieldList="fieldList" :rules="rules" ref="gFormRef">...</s-form>`。属性说明：`model` 示例值：`model`，类型/可选值/默认值按内部组件或 Element Plus 对应属性；`fieldList` 示例值：`fieldList`，类型/可选值/默认值按内部组件或 Element Plus 对应属性；`rules` 示例值：`rules`，类型/可选值/默认值按内部组件或 Element Plus 对应属性。本示例展示基础渲染和最小配置，可以直接复制基础写法后按业务替换数据。
form/base
:::

### 表单校验规则

:::demo 基础写法：`<s-form ref="TFormDemo" :model="formData" :fieldList="fieldList" :column="column" :rules="rules" />`。属性说明：`model` 示例值：`formData`，类型/可选值/默认值按内部组件或 Element Plus 对应属性；`fieldList` 示例值：`fieldList`，类型/可选值/默认值按内部组件或 Element Plus 对应属性；`column` 示例值：`column`，类型/可选值/默认值按内部组件或 Element Plus 对应属性；`rules` 示例值：`rules`，类型/可选值/默认值按内部组件或 Element Plus 对应属性。本示例展示表单场景，可以直接复制基础写法后按业务替换数据。
form/rules
:::

### 动态显隐 `isShow`

:::demo 基础写法：`<s-form ref="TFormDemo" :model="formData" :fieldList="fieldList" :size="size" :labelPosition="labelPosition" />`。属性说明：`model` 示例值：`formData`，类型/可选值/默认值按内部组件或 Element Plus 对应属性；`fieldList` 示例值：`fieldList`，类型/可选值/默认值按内部组件或 Element Plus 对应属性；`size` 示例值：`size`，类型：string，可选值：`large` / `default` / `small`，默认值：继承全局尺寸或 `default`；`labelPosition` 示例值：`labelPosition`，类型/可选值/默认值按内部组件或 Element Plus 对应属性。本示例展示动态状态切换，可以直接复制基础写法后按业务替换数据。
form/isShow
:::

### 多个属性

:::demo 基础写法：`<s-form ref="TFormDemo" :model="formData" :fieldList="fieldList" :size="size" :labelPosition="labelPosition" :disabled="isDisabled" />`。属性说明：`model` 示例值：`formData`，类型/可选值/默认值按内部组件或 Element Plus 对应属性；`fieldList` 示例值：`fieldList`，类型/可选值/默认值按内部组件或 Element Plus 对应属性；`size` 示例值：`size`，类型：string，可选值：`large` / `default` / `small`，默认值：继承全局尺寸或 `default`；`labelPosition` 示例值：`labelPosition`，类型/可选值/默认值按内部组件或 Element Plus 对应属性；`disabled` 示例值：`isDisabled`，类型：boolean，可选值：`true` / `false`，默认值：`false`。本示例展示多个属性配置，可以直接复制基础写法后按业务替换数据。
form/other
:::

## 添加/删除表单项

:::demo 基础写法：`<s-form :fieldList="fieldList" :model="form" ref="sFormRef">...</s-form>`。属性说明：`fieldList` 示例值：`fieldList`，类型/可选值/默认值按内部组件或 Element Plus 对应属性；`model` 示例值：`form`，类型/可选值/默认值按内部组件或 Element Plus 对应属性。本示例展示多个属性配置，可以直接复制基础写法后按业务替换数据。
form/active
:::

### 每行展示多少项

:::demo 基础写法：`<s-form ref="TFormDemo" :model="formData" :fieldList="fieldList" :column="column" />`。属性说明：`model` 示例值：`formData`，类型/可选值/默认值按内部组件或 Element Plus 对应属性；`fieldList` 示例值：`fieldList`，类型/可选值/默认值按内部组件或 Element Plus 对应属性；`column` 示例值：`column`，类型/可选值/默认值按内部组件或 Element Plus 对应属性。本示例展示每行展示多少项配置，可以直接复制基础写法后按业务替换数据。
form/column
:::

### 插槽

:::demo 基础写法：`<s-form ref="TFormDemo" :model="formData" :fieldList="fieldList" :column="1" :rules="rules">...</s-form>`。属性说明：`model` 示例值：`formData`，类型/可选值/默认值按内部组件或 Element Plus 对应属性；`fieldList` 示例值：`fieldList`，类型/可选值/默认值按内部组件或 Element Plus 对应属性；`column` 示例值：`1`，类型/可选值/默认值按内部组件或 Element Plus 对应属性；`rules` 示例值：`rules`，类型/可选值/默认值按内部组件或 Element Plus 对应属性。本示例展示插槽内容定制，可以直接复制基础写法后按业务替换数据。
form/slot
:::

### 自定义 label jsx 渲染

:::demo 基础写法：`<s-form ref="TFormDemo" :model="formData" :fieldList="fieldList" :column="1">...</s-form>`。属性说明：`model` 示例值：`formData`，类型/可选值/默认值按内部组件或 Element Plus 对应属性；`fieldList` 示例值：`fieldList`，类型/可选值/默认值按内部组件或 Element Plus 对应属性；`column` 示例值：`1`，类型/可选值/默认值按内部组件或 Element Plus 对应属性。本示例展示自定义配置，可以直接复制基础写法后按业务替换数据。
form/render
:::

### 事件

:::demo 基础写法：`<s-form ref="TFormDemo" :model="formData" :fieldList="fieldList" :column="1" />`。属性说明：`model` 示例值：`formData`，类型/可选值/默认值按内部组件或 Element Plus 对应属性；`fieldList` 示例值：`fieldList`，类型/可选值/默认值按内部组件或 Element Plus 对应属性；`column` 示例值：`1`，类型/可选值/默认值按内部组件或 Element Plus 对应属性。本示例展示事件监听，可以直接复制基础写法后按业务替换数据。
form/event
:::

<!-- ### 通常用法

:::demo 基础写法：`<s-form :model="model" :fieldList="fieldList" :rules="rules" ref="gFormRef">...</s-form>`。属性说明：`model` 示例值：`model`，类型/可选值/默认值按内部组件或 Element Plus 对应属性；`fieldList` 示例值：`fieldList`，类型/可选值/默认值按内部组件或 Element Plus 对应属性；`rules` 示例值：`rules`，类型/可选值/默认值按内部组件或 Element Plus 对应属性。本示例展示事件监听。`model` 示例值：`model`，可选值/默认值按内部组件或 Element Plus 对应属性；`fieldList` 示例值：`fieldList`，可选值/默认值按内部组件或 Element Plus 对应属性；`rules` 示例值：`rules`，可选值/默认值按内部组件或 Element Plus 对应属性。
form/usually
:::

### 远程返回的表单数据

:::demo 基础写法：`<s-form :model="model" :fieldList="fieldList" ref="gFormRef" label-width="100">...</s-form>`。属性说明：`model` 示例值：`model`，类型/可选值/默认值按内部组件或 Element Plus 对应属性；`fieldList` 示例值：`fieldList`，类型/可选值/默认值按内部组件或 Element Plus 对应属性；`label-width` 示例值：`100`，类型/可选值/默认值按内部组件或 Element Plus 对应属性。本示例展示表单场景。直接在一个对象里, 处理默认数据和校验规则。
form/remote
:::

### 自定义指令

:::demo 基础写法：`<s-form :model="model" :fieldList="fieldList" :rules="rules" ref="gFormRef">...</s-form>`。属性说明：`model` 示例值：`model`，类型/可选值/默认值按内部组件或 Element Plus 对应属性；`fieldList` 示例值：`fieldList`，类型/可选值/默认值按内部组件或 Element Plus 对应属性；`rules` 示例值：`rules`，类型/可选值/默认值按内部组件或 Element Plus 对应属性。本示例展示自定义配置。直接在一个对象里, 处理默认数据和校验规则。
form/directives
::: -->

## 属性

|  属性名   | 说明        | 类型   | 默认值 |
| :-------: | ----------- | ------ | ------ |
| fieldList | fieldList值 | object | -      |
|   model   | model值     | object | -      |

## filedList属性

|   属性名    | 说明                  | 类型                 | 默认值    |
| :---------: | --------------------- | -------------------- | --------- |
|    label    | 左侧显示的label值     | string, slot, render | -         |
|    prop     | 值对应的属性          | string               | -         |
|    comp     | 要渲染的组件名称      | string               | 's-input' |
|    attrs    | form绑定的属性        | object               | -         |
|    rules    | 每一项对应的rules规则 | object               | -         |
| labelRender | 对label的render渲染   | Function             | -         |
|  imgAttrs   | 左侧图片的属性        | object               | -         |
|   useSlot   | 使用插槽              | boolean              | -         |
| directives  | 自定义指令            | object               | -         |

## Form Exposes

|    名称     | 说明                 | 类型                                              |
| :---------: | -------------------- | ------------------------------------------------- |
|  validate   | 校验form表单是否通过 | Function(isResetFields = false, otherParams = {}) |
| resetFields | 重置form表单         | Function                                          |
