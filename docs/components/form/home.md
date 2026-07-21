# form表单组件

[https://element-plus.org/zh-CN/component/form.html](https://element-plus.org/zh-CN/component/form.html)

## Hidden Title {.md-hidden}

<DocBasicUsage code='<s-form :model="model" :fieldList="fieldList" :rules="rules" ref="gFormRef"></s-form>' />

## 属性事件插槽简介

<ApiIntro />

### 基础用法

:::demo 展示基础用法。基础写法：`<s-form :model="model" :fieldList="fieldList" :rules="rules" ref="gFormRef"></s-form>`。
form/base
:::

### 成华主题

:::demo 展示成华主题表单。基础写法：`<s-form :model="model" :field-list="fieldList" theme="chenghua" />`。主题会传递给 schema 中的 `s-*` 控件和分组标题，单项 `attrs.theme` 可以覆盖。
form/chenghua
:::

### 石景山主题

:::demo 展示石景山主题表单。基础写法：`<s-form :model="model" :field-list="fieldList" theme="shijingshan" />`。主题会传递给 schema 中的 `s-*` 控件和分组标题，单项 `attrs.theme` 可以覆盖。
form/shijingshan
:::

### gap 左右间隙，默认值 `16px`

:::demo 展示多列表单项左右间隙配置。基础写法：`<s-form :model="formData" :field-list="fieldList" :column="2" :gap="gap" />`。属性：`gap` 类型 `string / number`，可选值为数字、数字字符串或 CSS 长度值，例如 `0`、`16`、`'16px'`、`'1rem'`、`'5%'`，默认值 `16px`，仅在 `column > 1` 时作为左右间距生效。
form/gap
:::

### 高级 schema 用法

:::demo 展示深层路径、动态显隐、动态校验、默认值、输入归一化、插槽上下文。基础写法：`<s-form ref="formRef" :model="formData" :fieldList="fieldList" :column="2" label-width="96"></s-form>`。属性：`autoSetDefaultValue` 可选 `true / false`，默认值 `true`；`prop` 支持 `user.name`、`contacts.0.phone`、`contacts[0].phone`。
form/advanced
:::

### 分组标题 `type="title"`

:::demo 展示通过 `fieldList` 配置分组标题。基础写法：`<s-form :model="formData" :fieldList="fieldList" :column="2" label-width="96"></s-form>`。属性：`title` 类型 `string`，默认值 `''`。
form/title
:::

### 表单校验规则

:::demo 展示表单场景。基础写法：`<s-form ref="TFormDemo" :model="formData" :fieldList="fieldList" :column="column" :rules="rules" />`。
form/rules
:::

### 动态显隐 `isShow`

:::demo 展示动态状态切换。基础写法：`<s-form ref="TFormDemo" :model="formData" :fieldList="fieldList" :size="size" :labelPosition="labelPosition" />`。
form/isShow
:::

### 多个属性

:::demo 展示多个属性配置。基础写法：`<s-form ref="TFormDemo" :model="formData" :fieldList="fieldList" :size="size" :labelPosition="labelPosition" :disabled="isDisabled" />`。
form/other
:::

## 添加/删除表单项

:::demo 展示多个属性配置。基础写法：`<s-form :fieldList="fieldList" :model="form" ref="sFormRef"></s-form>`。
form/active
:::

### 每行展示多少项

:::demo 展示每行展示多少项配置。基础写法：`<s-form ref="TFormDemo" :model="formData" :fieldList="fieldList" :column="column" />`。
form/column
:::

### 插槽

:::demo 展示插槽内容定制。基础写法：`<s-form ref="TFormDemo" :model="formData" :fieldList="fieldList" :column="1" :rules="rules"></s-form>`。插槽：按示例中的插槽名定制内容。
form/slot
:::

|             插槽名              | 说明                                                                  | 插槽参数       |
| :-----------------------------: | --------------------------------------------------------------------- | -------------- |
|        `prop / slotName`        | 内容插槽；`useSlot: true` 时启用，未设置 `slotName` 时使用当前 `prop` | `SFormContext` |
| `${prop}-label / labelSlotName` | label 插槽；未设置 `labelSlotName` 时使用 `${prop}-label`             | `SFormContext` |
|           `slotName`            | 分组标题插槽；`type="title"` 且 `useSlot: true` 时启用                | `SFormContext` |

### render函数

:::demo 展示自定义配置。基础写法：`<s-form ref="TFormDemo" :model="formData" :fieldList="fieldList" :column="1"></s-form>`。
form/render
:::

### 事件

:::demo 展示事件监听。基础写法：`<s-form ref="TFormDemo" :model="formData" :fieldList="fieldList" :column="1" />`。
form/event
:::

### 通常用法

:::demo 展示事件监听。基础写法：`<s-form :model="model" :fieldList="fieldList" :rules="rules" ref="gFormRef"></s-form>`。
form/usually
:::

### 远程返回的表单数据

:::demo 展示表单场景。基础写法：`<s-form :model="model" :fieldList="fieldList" ref="gFormRef" label-width="100"></s-form>`。属性：`label-width` 类型 `string / number`，默认值 `auto`。
form/remote
:::

### 自定义指令

:::demo 展示自定义配置。基础写法：`<s-form :model="model" :fieldList="fieldList" :rules="rules" ref="gFormRef"></s-form>`。
form/directives
:::

## 属性

|       属性名        | 说明                                       | 类型                               | 默认值                                                 |
| :-----------------: | ------------------------------------------ | ---------------------------------- | ------------------------------------------------------ |
|      fieldList      | 表单 schema 配置                           | array / object                     | -                                                      |
|        model        | 表单数据对象                               | object                             | -                                                      |
|        theme        | 主题，传递给 `s-*` 控件和分组标题          | `default / chenghua / shijingshan` | `default`                                              |
|       column        | 默认每行展示几项                           | `1 / 2 / 3 / 4 / 5 / 6`            | `1`                                                    |
|         gap         | 多列表单项左右间距，仅 `column > 1` 时生效 | string / number                    | `16px`                                                 |
|        align        | 表单项垂直对齐                             | `center / top / flex-end`          | `top`                                                  |
|     showFooter      | 是否显示调试按钮                           | boolean                            | 开发环境为 `true`                                      |
|       footer        | `showFooter` 的别名，设置后优先级更高      | boolean                            | -                                                      |
| autoSetDefaultValue | 是否自动写入字段默认值                     | boolean                            | `true`                                                 |
|  componentDefaults  | 所有控件的默认透传属性                     | object                             | `{ clearable: true, filterable: true, width: '100%' }` |

### fieldList 内部属性

`fieldList` 是 `s-form` 的表单 schema 配置。每一项只保留表单编排需要的字段；控件属性统一放到 `attrs`，表单项属性统一放到 `formItemAttrs`。例如 `type="title"` 时，`s-title` 的 `title`、`subTitle`、`theme`、`type` 等属性都写到 `attrs` 里。

TypeScript 项目中建议从 `sybz-components/types` 引入表单项类型，让动态函数里的 `model`、`value`、`setFieldValue` 等上下文有明确提示：

```ts
import type { SFormFieldItem } from 'sybz-components/types'

const fieldList: SFormFieldItem[] = [
  { label: '账号', prop: 'account', required: true },
  { label: '角色', prop: 'role', comp: 's-select', attrs: { options: roleOptions } },
]
```

|    属性名     | 说明                                                                  | 类型                      | 默认值    |
| :-----------: | --------------------------------------------------------------------- | ------------------------- | --------- |
|     label     | 左侧显示的 label 值                                                   | string                    | -         |
|     prop      | 值对应路径，支持 `a.b`、`a.0.b`、`a[0].b`                             | string                    | -         |
|     comp      | 要渲染的组件名称或组件对象                                            | string / Component        | `s-input` |
|     attrs     | 透传给表单控件；`type="title"` 时透传给 `s-title`，标题文案也写在这里 | object / Function         | -         |
| formItemAttrs | 透传给 `el-form-item`                                                 | object / Function         | -         |
|     rules     | 当前项校验规则，函数参数为表单上下文                                  | object / array / Function | -         |
|   required    | 快速生成必填规则；传字符串时作为错误提示                              | boolean / string          | -         |
| defaultValue  | 默认值，model 对应路径不存在时写入                                    | any                       | -         |
|    render     | 自定义内容渲染，参数为表单上下文                                      | Function                  | -         |
|    isShow     | 是否展示当前项，函数参数为表单上下文                                  | boolean / Function        | `true`    |
|    useSlot    | 使用插槽渲染                                                          | boolean                   | `false`   |
|   slotName    | 内容插槽名；未设置时使用 `prop`，`type="title"` 时也作为标题插槽名    | string                    | -         |
| labelSlotName | label 插槽名，未设置时使用 `${prop}-label`                            | string                    | -         |
|     type      | 项类型；设置为 `title` 时渲染分组标题，`attrs` 会透传给 `s-title`     | string                    | -         |

## 表单上下文

`attrs`、`formItemAttrs`、`rules`、`isShow`、`render` 和插槽都会拿到同一份上下文：`{ option, model, value, prop, index, formRef, getValue, setValue, setFieldValue }`。其中 `option` 是当前 `fieldList` 配置项，`model` 是完整表单数据。

## Form Exposes

|        名称        | 说明                                 | 类型                                                      |
| :----------------: | ------------------------------------ | --------------------------------------------------------- | --- |
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
| formRef / sFormRef | 获取内部 `el-form` 实例              | Ref                                                       | --> |
