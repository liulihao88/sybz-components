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

### 高级 schema 用法

:::demo 展示深层路径、动态显隐、动态校验、默认值、输入归一化、插槽上下文。基础写法：`<s-form ref="formRef" :model="formData" :fieldList="fieldList" :column="2" label-width="96"></s-form>`。属性：`autoSetDefaultValue` 可选 `true / false`，默认值 `true`；`prop` 支持 `user.name`、`contacts.0.phone`、`contacts[0].phone`。
form/advanced
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

|       属性名        | 说明                                  | 类型                      | 默认值                                                 |
| :-----------------: | ------------------------------------- | ------------------------- | ------------------------------------------------------ |
|      fieldList      | 表单 schema 配置                      | array / object            | -                                                      |
|        model        | 表单数据对象                          | object                    | -                                                      |
|       column        | 默认每行展示几项                      | `1 / 2 / 3 / 4 / 5 / 6`   | `1`                                                    |
|        align        | 表单项垂直对齐                        | `center / top / flex-end` | `top`                                                  |
|     showFooter      | 是否显示调试按钮                      | boolean                   | 开发环境为 `true`                                      |
|       footer        | `showFooter` 的别名，设置后优先级更高 | boolean                   | -                                                      |
| autoSetDefaultValue | 是否自动写入字段默认值                | boolean                   | `true`                                                 |
|  componentDefaults  | 所有控件的默认透传属性                | object                    | `{ clearable: true, filterable: true, width: '100%' }` |

## fieldList属性

|     属性名     | 说明                                                                       | 类型                      | 默认值                |
| :------------: | -------------------------------------------------------------------------- | ------------------------- | --------------------- |
|     label      | 左侧显示的 label 值                                                        | string                    | -                     |
|      prop      | 值对应路径，支持 `a.b`、`a.0.b`、`a[0].b`                                  | string                    | -                     |
|      comp      | 要渲染的组件名称或组件对象                                                 | string / Component        | `s-input`             |
|     attrs      | 透传给表单控件；`type="title"` 时透传给 `s-title`                          | object / Function         | -                     |
|      bind      | `attrs` 的兼容别名，优先级低于 `attrs`                                     | object / Function         | -                     |
| componentProps | `attrs` 的语义化别名，优先级介于 `bind` 和 `attrs` 之间                    | object / Function         | -                     |
| formItemAttrs  | 透传给 `el-form-item`                                                      | object / Function         | -                     |
|   formAttrs    | `formItemAttrs` 的兼容别名                                                 | object / Function         | -                     |
|     rules      | 每一项对应的 rules 规则，函数参数为表单上下文                              | object / array / Function | -                     |
|    required    | 快速生成必填规则；传字符串时作为错误提示                                   | boolean / string          | -                     |
|  defaultValue  | 默认值，model 对应路径不存在时写入                                         | any                       | -                     |
|    default     | `defaultValue` 的兼容别名                                                  | any                       | -                     |
|  labelRender   | 自定义 label 渲染，参数为表单上下文                                        | Function                  | -                     |
|     render     | 自定义内容渲染，参数为表单上下文                                           | Function                  | -                     |
|     isShow     | 是否展示当前项，函数参数为表单上下文                                       | boolean / Function        | `true`                |
|    disabled    | 是否禁用当前控件，函数参数为表单上下文                                     | boolean / Function        | -                     |
|    imgAttrs    | 左侧图片或图标的属性                                                       | object                    | -                     |
|    useSlot     | 使用插槽                                                                   | boolean                   | `false`               |
|    slotName    | 内容插槽名，未设置时使用 `prop`                                            | string                    | -                     |
| labelSlotName  | label 插槽名，未设置时使用 `${prop}-label`                                 | string                    | -                     |
|   directives   | 自定义指令                                                                 | object                    | -                     |
|   modelProp    | 自定义控件的值属性名                                                       | string                    | `modelValue`          |
|   modelEvent   | 自定义控件的值更新事件                                                     | string                    | `update:${modelProp}` |
|   valueProp    | `modelProp` 的兼容别名                                                     | string                    | -                     |
|   normalize    | 写入 model 前的值转换，函数参数为 `(value, context)`                       | Function                  | -                     |
|   transform    | `normalize` 的兼容别名                                                     | Function                  | -                     |
|  formatValue   | 展示到控件前的值格式化，函数参数为 `(value, context)`                      | Function                  | -                     |
|     events     | 自定义事件，key 支持 `change / blur / update:modelValue / onChange`        | object                    | -                     |
|    onChange    | `change` 事件快捷写法，参数为 `(value, context, ...args)`                  | Function                  | -                     |
|    onUpdate    | 值更新事件快捷写法，参数为 `(value, context, ...args)`                     | Function                  | -                     |
|      type      | 项类型，设置为 `title` 时渲染分组标题；普通项会透传给控件                  | string                    | -                     |
|     title      | `type="title"` 时显示的标题                                                | string                    | `''`                  |
|    subTitle    | `type="title"` 时显示的副标题                                              | string                    | `''`                  |
| titleSlotName  | `type="title"` 且 `useSlot` 时使用的插槽名，未设置时使用 `slotName / prop` | string                    | -                     |

## 表单上下文

`attrs`、`bind`、`componentProps`、`formItemAttrs`、`formAttrs`、`rules`、`isShow`、`disabled`、`render`、`labelRender` 和插槽都会拿到同一份上下文：`{ item, row, model, value, prop, column, index, formRef, getValue, setValue, setFieldValue }`。

## Form Exposes

|        名称        | 说明                                 | 类型                                                      |
| :----------------: | ------------------------------------ | --------------------------------------------------------- |
|      validate      | 校验 form 表单，成功后返回当前 model | Function(isResetFieldsOrParams = false, otherParams = {}) |
|   validateField    | 校验指定字段                         | Function                                                  |
|    resetFields     | 重置 form 表单                       | Function                                                  |
|   clearValidate    | 清除校验                             | Function(props?: string / string[])                       |
|   scrollToField    | 滚动到指定字段                       | Function(prop: string)                                    |
|       submit       | 调用 `validate`                      | Function                                                  |
|      getModel      | 获取当前 model                       | Function                                                  |
|      getValue      | 获取指定路径的值                     | Function(prop: string)                                    |
|      setValue      | 设置指定路径的值                     | Function(prop: string, value: any)                        |
|     getFields      | 获取全部字段配置                     | Function                                                  |
|      getField      | 获取指定字段配置                     | Function(prop: string)                                    |
|  getVisibleFields  | 获取当前可见字段配置                 | Function                                                  |
| formRef / sFormRef | 获取内部 `el-form` 实例              | Ref                                                       |
