# form表单组件

[https://element-plus.org/zh-CN/component/form.html](https://element-plus.org/zh-CN/component/form.html)

## Hidden Title {.md-hidden}

<DocBasicUsage code='<s-form :model="model" :fieldList="fieldList" :rules="rules" ref="gFormRef"></s-form>' />

## 属性事件插槽简介

<ApiIntro />

### 基础用法

:::demo 展示基础用法。基础写法：`<s-form :model="model" :fieldList="fieldList" :rules="rules" ref="gFormRef">...</s-form>`。
form/base
:::

### 分组标题 `type="title"`

:::demo 展示通过 `fieldList` 配置分组标题。基础写法：`<s-form :model="formData" :fieldList="fieldList" :column="2" label-width="96">...</s-form>`。属性：`title` 类型 `string`，默认值 `''`。
form/title
:::

### 表单校验规则

:::demo 展示表单场景。基础写法：`<s-form ref="TFormDemo" :model="formData" :fieldList="fieldList" :column="column" :rules="rules" />`。属性：`column` 类型 `number`，默认值 `3`。
form/rules
:::

### 动态显隐 `isShow`

:::demo 展示动态状态切换。基础写法：`<s-form ref="TFormDemo" :model="formData" :fieldList="fieldList" :size="size" :labelPosition="labelPosition" />`。属性：`size` 可选 `'' / small / default / large`，默认值 `''`。
form/isShow
:::

### 多个属性

:::demo 展示多个属性配置。基础写法：`<s-form ref="TFormDemo" :model="formData" :fieldList="fieldList" :size="size" :labelPosition="labelPosition" :disabled="isDisabled" />`。属性：`size` 可选 `'' / small / default / large`，默认值 `''`。
form/other
:::

## 添加/删除表单项

:::demo 展示多个属性配置。基础写法：`<s-form :fieldList="fieldList" :model="form" ref="sFormRef">...</s-form>`。
form/active
:::

### 每行展示多少项

:::demo 展示每行展示多少项配置。基础写法：`<s-form ref="TFormDemo" :model="formData" :fieldList="fieldList" :column="column" />`。属性：`column` 类型 `number`，默认值 `3`。
form/column
:::

### 插槽

:::demo 展示插槽内容定制。基础写法：`<s-form ref="TFormDemo" :model="formData" :fieldList="fieldList" :column="1" :rules="rules">...</s-form>`。插槽：按示例中的插槽名定制内容。
form/slot
:::

### render函数

:::demo 展示自定义配置。基础写法：`<s-form ref="TFormDemo" :model="formData" :fieldList="fieldList" :column="1">...</s-form>`。属性：`column` 类型 `number`，默认值 `3`。
form/render
:::

### 事件

:::demo 展示事件监听。基础写法：`<s-form ref="TFormDemo" :model="formData" :fieldList="fieldList" :column="1" />`。属性：`column` 类型 `number`，默认值 `3`。
form/event
:::

<!-- ### 通常用法

:::demo 展示事件监听。基础写法：`<s-form :model="model" :fieldList="fieldList" :rules="rules" ref="gFormRef">...</s-form>`。
form/usually
:::

### 远程返回的表单数据

:::demo 展示表单场景。基础写法：`<s-form :model="model" :fieldList="fieldList" ref="gFormRef" label-width="100">...</s-form>`。属性：`label-width` 类型 `string / number`，默认值 `auto`。
form/remote
:::

### 自定义指令

:::demo 展示自定义配置。基础写法：`<s-form :model="model" :fieldList="fieldList" :rules="rules" ref="gFormRef">...</s-form>`。
form/directives
::: -->

## 属性

|  属性名   | 说明        | 类型   | 默认值 |
| :-------: | ----------- | ------ | ------ |
| fieldList | fieldList值 | object | -      |
|   model   | model值     | object | -      |

## filedList属性

|    属性名     | 说明                                                              | 类型                 | 默认值    |
| :-----------: | ----------------------------------------------------------------- | -------------------- | --------- |
|     label     | 左侧显示的label值                                                 | string, slot, render | -         |
|     prop      | 值对应的属性                                                      | string               | -         |
|     comp      | 要渲染的组件名称                                                  | string               | 's-input' |
|     attrs     | 普通项时透传给表单组件；`type="title"` 时透传给 `s-title`         | object               | -         |
|     rules     | 每一项对应的rules规则                                             | object               | -         |
|  labelRender  | 对label的render渲染，参数为 `{ row, value, column, item, index }` | Function             | -         |
|   imgAttrs    | 左侧图片的属性                                                    | object               | -         |
|    useSlot    | 使用插槽                                                          | boolean              | -         |
|  directives   | 自定义指令                                                        | object               | -         |
|     type      | 项类型，设置为 `title` 时渲染分组标题                             | string               | -         |
|     title     | `type="title"` 时显示的标题                                       | string               | `''`      |
|   subTitle    | `type="title"` 时显示的副标题                                     | string               | `''`      |
| titleSlotName | `type="title"` 且 `useSlot` 时使用的插槽名，未设置时使用 `prop`   | string               | -         |
|    render     | 自定义内容渲染，参数为 `{ row, value, column, item, index }`      | Function             | -         |

## Form Exposes

|    名称     | 说明                 | 类型                                              |
| :---------: | -------------------- | ------------------------------------------------- |
|  validate   | 校验form表单是否通过 | Function(isResetFields = false, otherParams = {}) |
| resetFields | 重置form表单         | Function                                          |
