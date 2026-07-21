# dialog(弹出框)组件

[https://element-plus.org/zh-CN/component/dialog.html](https://element-plus.org/zh-CN/component/dialog.html)

## Hidden Title {.md-hidden}

<DocBasicUsage code='<s-dialog v-model="isShow">内容</s-dialog>' />

## 属性事件插槽简介

<ApiIntro />

### 基础用法

:::demo 展示基础用法。基础写法：`<s-dialog title="基础dialog" sub-title="这是一段颜色稍淡的二级标题" v-model="isShow">内容</s-dialog>`。属性：`title` 类型 `string`，默认值 `''`；`subTitle` 类型 `string`，默认值 `''`。
dialog/base
:::

### 抽屉式(drawer)用法

设置 `type="drawer"` 时，`s-dialog` 会按抽屉方式展示。`type` 的可选值是 `''` 和 `drawer`，默认值是 `''`。设置 `width` 可以控制抽屉宽度，`width` 支持 `string` 和 `number`，默认值是 `''`。

:::demo 展示抽屉式用法配置。基础写法：`<s-dialog v-model="isShow" title="抽屉式 dialog" type="drawer" width="1200"></s-dialog>`。属性：`type` 可选 `'' / drawer`，默认值 `''`；`width` 类型 `string / number`，默认值 `''`。
dialog/drawer
:::

#### drawer 配合 fillSlot

`fillSlot` 的可选值是 `true` 和 `false`，默认值是 `false`。

:::demo 展示插槽内容定制。基础写法：`<s-dialog title="基础dialog" v-model="isShow" fillSlot type="drawer"></s-dialog>`。插槽：按示例中的插槽名定制内容。
dialog/drawerFillSlot
:::

### 成华样式

设置 `theme="chenghua"` 可以切换到成华样式。成华主题默认展示底部按钮，和普通 dialog 行为一致。

#### chenghua主题示例

:::demo 展示成华主题样式。基础写法：`<s-dialog title="默认成华弹框" theme="chenghua" width="512px" v-model="visible.base"></s-dialog>`。
dialog/chenghua/base
:::

#### chenghua 抽屉式用法

设置 `theme="chenghua"` 和 `type="drawer"` 时，`s-dialog` 会按成华主题的抽屉式弹层展示。`theme` 的可选值是 `default`、`norm`、`norm16`、`simple`、`chenghua` 和 `shijingshan`，默认值是 `default`；`type` 的可选值是 `''` 和 `drawer`，默认值是 `''`；`width` 支持 `string` 和 `number`，默认值是 `''`，可用于控制抽屉宽度。

:::demo 展示成华主题样式。基础写法：`<s-dialog v-model="visible" title="成华抽屉式 dialog" theme="chenghua" type="drawer" width="1000" confirm-text="保存" cancel-text="关闭"></s-dialog>`。
dialog/chenghua/drawer
:::

### 石景山样式

设置 `theme="shijingshan"` 可以切换到石景山样式。石景山主题默认展示底部按钮，和普通 dialog 行为一致。

#### shijingshan主题示例

:::demo 展示石景山主题样式。基础写法：`<s-dialog title="默认石景山弹框" theme="shijingshan" width="512px" v-model="visible.base"></s-dialog>`。
dialog/shijingshan/base
:::

#### shijingshan 抽屉式用法

设置 `theme="shijingshan"` 和 `type="drawer"` 时，`s-dialog` 会按石景山主题的抽屉式弹层展示。`theme` 的可选值是 `default`、`norm`、`norm16`、`simple`、`chenghua` 和 `shijingshan`，默认值是 `default`；`type` 的可选值是 `''` 和 `drawer`，默认值是 `''`；`width` 支持 `string` 和 `number`，默认值是 `''`，可用于控制抽屉宽度。

:::demo 展示石景山主题样式。基础写法：`<s-dialog v-model="visible" title="石景山抽屉式 dialog" theme="shijingshan" type="drawer" width="1000" confirm-text="保存" cancel-text="关闭"></s-dialog>`。
dialog/shijingshan/drawer
:::

### 通常用法

:::demo 展示通常用法配置。基础写法：`<s-dialog ref="dialogRef" title="常用的dialog" @confirm="cusConfirm" width="100%" :closeOnClickModal="false" :confirmAttrs="{ loading: confirmLoading, }" confirmText="保存" v-model="isShow" @cancel="proxy.$toast('哈哈')" cancelText="高级配置" :cancelAttrs="{ type: 'primary', icon: 'el-icon-edit', }"></s-dialog>`。属性：`title` 类型 `string`，默认值 `''`；`width` 类型 `string / number`，默认值 `''`。
dialog/usually
:::

### 插槽

:::demo 展示插槽内容定制。基础写法：`<s-dialog title="基础dialog" v-model="isShow"></s-dialog>`。插槽：按示例中的插槽名定制内容。
dialog/slot
:::

### 全屏

:::demo 展示全屏配置。基础写法：`<s-dialog title="基础dialog" v-model="isShow" fullscreen></s-dialog>`。属性：`title` 类型 `string`，默认值 `''`。
dialog/fullscreen
:::

### 最大化高度

设置 `maximize-height` 后，普通 dialog 会尽量占满视口高度，上下各保留 `16px`，标题栏和底部操作区保持可见，内容区占满剩余空间。`maximizeHeight` 的可选值是 `true` 和 `false`，默认值是 `false`；`type="drawer"` 时无需设置，drawer 本身已经占满可用高度；`fullscreen` 与该属性同时使用时，以 `fullscreen` 为准。

:::demo 展示最大化高度配置。基础写法：`<s-dialog v-model="isShow" title="最大化高度 dialog" maximize-height></s-dialog>`。属性：`maximizeHeight` 可选 `true / false`，默认值 `false`。
dialog/maximizeHeight
:::

### 弹框form表单

:::demo 展示表单场景。基础写法：`<s-dialog ref="dialogRef" title="弹框form表单" v-model="isShow" @confirm="confirm"></s-dialog>`。属性：`title` 类型 `string`，默认值 `''`。
dialog/dialogForm
:::

### 自动给确认按钮加loading

dialog组件如果把@confirm换成:confirm, 那么子组件会优先处理属性confirm, 并在方法执行期间加载loading。confirm方法支持返回Promise、thenable或普通值；普通值会在组件内部转换为Promise，方法执行完成或抛出异常后都会自动结束loading。

:::demo 展示自动给确认按钮加loading配置。基础写法：`<s-dialog v-model="isShow" :confirm="confirm"></s-dialog>`。
dialog/confirmLoading
:::

### 内部高度占满100%: fillSlot

:::demo 展示插槽内容定制。基础写法：`<s-dialog title="基础dialog" v-model="isShow" fillSlot></s-dialog>`。插槽：按示例中的插槽名定制内容。
dialog/fillSlot
:::

### 全局默认配置

dialog 支持在 `app.use` 的第二个参数里配置全局默认值，写法和 Element Plus 的全局配置保持一致。

```js
app.use(SybzComponents, {
  theme: 'chenghua',
  dialog: {
    hideHeaderIcon: true,
  },
})
```

### 属性

|      属性名       | 说明                                                                                    | 类型                                          | 默认值    |
| :---------------: | --------------------------------------------------------------------------------------- | --------------------------------------------- | --------- |
|       title       | 顶部title                                                                               | string                                        | 提示      |
|     subTitle      | 顶部二级标题，显示在 title 下方，颜色稍淡                                               | string                                        | ''        |
|       width       | 弹框宽度；当 `type="drawer"` 时用于控制抽屉宽度                                         | string / number                               | ''        |
|       theme       | 弹框样式，可选 `default` / `norm` / `norm16` / `simple` / `chenghua` / `shijingshan`    | string                                        | `default` |
|       type        | 弹框类型，可选 `drawer`                                                                 | string                                        | ''        |
|  hideHeaderIcon   | 是否隐藏顶部默认icon                                                                    | boolean                                       | false     |
|    cancelText     | 取消按钮文本                                                                            | string                                        | 取消      |
|    confirmText    | 确认按钮文本                                                                            | string                                        | 确认      |
|      footer       | 是否显示底部操作按钮                                                                    | object                                        | -         |
|    showFooter     | 是否显示底部操作按钮                                                                    | boolean                                       | true      |
|    showCancel     | 是否显示取消按钮                                                                        | boolean <s-tip content="true\|false"></s-tip> | true      |
|    showConfirm    | 是否显示确认按钮                                                                        | boolean                                       | true      |
|   confirmAttrs    | 确认按钮的属性                                                                          | object                                        | {}        |
|    cancleAttrs    | 取消按钮的属性                                                                          | object                                        | {}        |
| destroy-on-close  | 当关闭 Dialog 时，销毁其中的元素                                                        | boolean                                       | false     |
|    fullscreen     | 是否为全屏Dialog                                                                        | boolean                                       | false     |
|  maximizeHeight   | 是否尽量占满视口高度，上下各保留16px                                                    | boolean                                       | false     |
|   enableConfirm   | 是否允许使用enter回车键执行confirm事件                                                  | boolean                                       | true      |
| closeOnClickModal | 是否允许点击模态框关闭弹框                                                              | boolean                                       | true      |
|      confirm      | 绑定确认按钮的方法, 与方法的区别是, 可以使用属性绑定异步事件而直接让确认按钮加载loading | Function                                      | -         |
|     fillSlot      | 是否让默认slot内容区撑满dialog body高度, 并由slot内部自行处理滚动                       | boolean                                       | false     |

### 方法

| 属性名  | 说明           | 类型     |
| :-----: | -------------- | -------- |
| cancel  | 取消按钮的方法 | Function |
| confirm | 确认按钮的方法 | Function |

### Slots

|   插槽名   | 说明                                                   |
| :--------: | ------------------------------------------------------ |
|   header   | 对话框标题内容区；只替换标题文字区域，默认 icon 仍保留 |
| headerIcon | 对话框标题左侧 icon 内容                               |
|   footer   | Dialog 按钮操作区的内容                                |
